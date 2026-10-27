#!/usr/bin/env node
// Live crawl of a small site (site-standards 21, How to build it, step 1). No dependencies.
//
//   node tests/check-live.mjs https://example.com
//
// Starts from /sitemap.xml and follows every internal <a href> on the pages it finds.
// For each URL: status, redirect hops, <title>, meta description, canonical, H1 count,
// robots meta or X-Robots-Tag, and how many crawled pages link to it.
// Fails on: a sitemap URL that does not answer 200, a broken internal link, an internal
// link that points at a redirect, an indexable page missing from the sitemap, a sitemap
// URL marked noindex, a canonical that differs from the URL, a missing canonical, not
// exactly one H1, a duplicate title or description, and a sitemap URL no page links to.
// Meant for sites of tens to a few hundred pages; it fetches one URL at a time.

const base = new URL(process.argv[2] || "");
const UA = "Mozilla/5.0 (compatible; check-live/1.0)";
const ASSET = /\.(css|js|mjs|png|jpe?g|webp|avif|svg|gif|ico|txt|xml|json|webmanifest|woff2?|pdf|mp4|webm)$/i;

async function follow(url) {
  let cur = url, r, hops = 0;
  for (; hops < 10; hops++) {
    r = await fetch(cur, { redirect: "manual", headers: { "user-agent": UA } });
    const loc = r.headers.get("location");
    if (r.status >= 300 && r.status < 400 && loc) { cur = new URL(loc, cur).href; continue; }
    break;
  }
  return { r, hops, final: cur };
}
const pick = (re, s) => { const m = s.match(re); return m ? m[1].trim() : null; };
const decode = (s) => s && s.replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');

const sm = await (await fetch(new URL("/sitemap.xml", base), { headers: { "user-agent": UA } })).text();
const sitemap = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const queue = [...sitemap], seen = new Set(), rows = [], inlinks = new Map();

while (queue.length) {
  const url = queue.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  const { r, hops, final } = await follow(url);
  const row = { url, status: r.status, hops, final, inSitemap: sitemap.includes(url) };
  if (r.status === 200 && (r.headers.get("content-type") || "").includes("html")) {
    const html = await r.text();
    row.title = decode(pick(/<title[^>]*>([^<]*)<\/title>/i, html));
    row.desc = decode(pick(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i, html));
    row.canonical = pick(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i, html);
    row.h1 = (html.match(/<h1[\s>]/gi) || []).length;
    row.robots = pick(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i, html) || r.headers.get("x-robots-tag") || "";
    const linked = new Set();
    for (const m of html.matchAll(/<a\s[^>]*href=["']([^"'#]+)/gi)) {
      let u; try { u = new URL(m[1], final); } catch { continue; }
      if (u.host !== base.host || !/^https?:$/.test(u.protocol) || ASSET.test(u.pathname)) continue;
      linked.add(u.origin + u.pathname);
    }
    for (const href of linked) {
      if (href === final) continue;
      inlinks.set(href, (inlinks.get(href) || 0) + 1);
      if (!seen.has(href)) queue.push(href);
    }
  }
  rows.push(row);
}

const count = (key) => rows.reduce((m, r) => (r[key] ? m.set(r[key], (m.get(r[key]) || 0) + 1) : m), new Map());
const titles = count("title"), descs = count("desc");
let problems = 0;
const flag = (msg) => { problems++; console.log("  FAIL " + msg); };
for (const r of rows) {
  console.log(`${r.status} ${r.url}${r.hops ? ` (${r.hops} hop${r.hops > 1 ? "s" : ""} to ${r.final})` : ""}`);
  if (r.status !== 200) {
    if (r.inSitemap) flag("sitemap URL does not answer 200");
    else if (r.status >= 400) flag("broken internal link");
    else if (r.hops) flag("internal link points at a redirect");
    continue;
  }
  if (r.title === undefined) continue; // not HTML
  console.log(`    title(${r.title?.length ?? 0}) desc(${r.desc?.length ?? 0}) h1=${r.h1} inlinks=${inlinks.get(r.url) || 0}${r.robots ? " robots=" + r.robots : ""}`);
  const noindex = /noindex/i.test(r.robots);
  if (!r.inSitemap && !noindex) flag("indexable page missing from the sitemap");
  if (r.inSitemap && noindex) flag("sitemap URL is noindex");
  if (r.canonical && r.canonical !== r.url) flag(`canonical differs from the URL: ${r.canonical}`);
  if (!r.canonical && !noindex) flag("no canonical");
  if (r.h1 !== 1) flag(`${r.h1} H1 elements`);
  if (r.title && titles.get(r.title) > 1) flag("duplicate title");
  if (r.desc && descs.get(r.desc) > 1) flag("duplicate description");
  if (r.inSitemap && r.url !== new URL("/", base).href && !inlinks.get(r.url)) flag("orphan: no crawled page links to it");
}
console.log(`\n${rows.length} URLs crawled (${sitemap.length} in the sitemap): ${problems} problems`);
process.exit(problems ? 1 : 0);

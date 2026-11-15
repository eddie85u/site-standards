#!/usr/bin/env node
// Static guardrail checks for a site (site-standards 20). No dependencies.
//
//   node tests/check-site.mjs --root site --domain example.com
//
// --root    folder that is published (default ".")
// --domain  production domain, used to resolve absolute links and og:image
//
// Reads, if present, from the current directory:
//   forbidden-terms.txt  one term or regex per line; any hit fails
//   _routes.json         (root-served sites) repo-only paths guarded by a 404
//
// Machine-sounding writing (standard 04) is a separate, warning-only script:
// tests/check-writing.mjs with slop-patterns.txt.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf("--" + name); return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : dflt; };

const ROOT = resolve(opt("root", "."));
const DOMAIN = opt("domain", "");
const SKIP_DIRS = new Set(["node_modules", ".git", ".wrangler", "lab", "_lab", "_private", "dist", "tests", "scripts", "worker", "functions", "archive"]);

const failures = [];
const warnings = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") && name !== ".well-known") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) { if (!SKIP_DIRS.has(name)) walk(p, out); }
    else out.push(p);
  }
  return out;
}

function readList(file) {
  if (!existsSync(file)) return [];
  return readFileSync(file, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
    .map((l) => { try { return new RegExp(l, "i"); } catch { return new RegExp(l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"); } });
}

const decode = (s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

function visibleText(html) {
  const metas = [...html.matchAll(/<meta[^>]+(?:name|property)=["'](?:description|og:title|og:description)["'][^>]*>/gi)]
    .map((m) => attr(m[0], "content") || "");
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  const body = html.replace(/<head[\s\S]*?<\/head>/i, " ").replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ");
  return decode([title, ...metas, body].join(" ")).replace(/\s+/g, " ");
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[2] ?? m[3] ?? m[4]) : null;
}
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => m[0]);
const metaContent = (html, key) => {
  const t = tags(html, "meta").find((m) => (attr(m, "name") || attr(m, "property") || "").toLowerCase() === key);
  return t ? attr(t, "content") : null;
};

// Map a URL or path to a file in ROOT, the way a static host would.
const redirectSources = new Set();
for (const f of ["_redirects"]) {
  const p = join(ROOT, f);
  if (existsSync(p)) for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const src = line.trim().split(/\s+/)[0];
    if (src && !src.startsWith("#")) redirectSources.add(src);
  }
}
function resolveTarget(fromFile, ref) {
  let url = ref.trim();
  if (!url || url.startsWith("#") || /^(mailto|tel|data|javascript|sms|whatsapp):/i.test(url)) return { skip: true };
  if (/^https?:\/\//i.test(url)) {
    const u = new URL(url);
    if (!DOMAIN || u.hostname.replace(/^www\./, "") !== DOMAIN.replace(/^www\./, "")) return { skip: true };
    url = u.pathname;
  } else if (url.startsWith("//")) return { skip: true };
  url = decodeURI(url.split("#")[0].split("?")[0]);
  if (!url) return { skip: true };
  if (redirectSources.has(url)) return { ok: true };
  const base = url.startsWith("/") ? ROOT : dirname(fromFile);
  const p = join(base, url);
  const candidates = url.endsWith("/") ? [join(p, "index.html")] : [p, p + ".html", join(p, "index.html")];
  const hit = candidates.find((c) => existsSync(c) && statSync(c).isFile());
  return { ok: !!hit, path: url, file: hit };
}

// Structured data contents (standard 06 rules 1, 2 and 4). Parsing alone let
// sites with no Organization @id or no home-page WebSite pass.
const ORG_TYPE = /^(?!Service$)(Organization|Corporation|NGO|LocalBusiness|ProfessionalService|.*Business|.*Service|.*Clinic|.*Store|.*Agency)$/;
const nodesOf = (v, out = []) => {
  if (Array.isArray(v)) v.forEach((x) => nodesOf(x, out));
  else if (v && typeof v === "object") { out.push(v); for (const [k, x] of Object.entries(v)) if (k !== "@context") nodesOf(x, out); }
  return out;
};
const typesOf = (n) => [].concat(n["@type"] || []);
const orgNodes = new Map(); // @id -> full node (one with a name)
const orgRefs = new Set(); // every #organization @id any page uses
function checkJsonLd(rel, docs) {
  const nodes = nodesOf(docs);
  // Per-page coverage warns; the site-wide entity checks below fail.
  if (!docs.length) { warn(rel, "no JSON-LD (standard 06 rule 1)"); return; }
  const ids = nodes.map((n) => n["@id"]).filter((x) => typeof x === "string");
  const org = ids.filter((id) => /#organization$/i.test(id));
  if (!org.length) warn(rel, "JSON-LD does not reference an Organization @id ending in #organization (06 rule 1)");
  org.forEach((id) => orgRefs.add(id));
  // A provider reference may repeat name and url; merge every copy so the full node's fields count.
  for (const n of nodes) if (typesOf(n).some((t) => ORG_TYPE.test(t)) && n.name && typeof n["@id"] === "string") orgNodes.set(n["@id"], { ...n, ...(orgNodes.get(n["@id"]) || {}) });
  for (const n of nodes) if (typesOf(n).some((t) => ORG_TYPE.test(t)) && n.name && !n["@id"]) fail(rel, `${typesOf(n).join("/")} node "${n.name}" has no @id (06 rule 4)`);
  if (/^(index\.html|[a-z]{2}\/index\.html)$/.test(rel)) {
    const ws = nodes.find((n) => typesOf(n).includes("WebSite"));
    if (!ws) fail(rel, "home page JSON-LD has no WebSite node (06 rule 2)");
    else if (!ws.name || !ws.url) fail(rel, "home page WebSite node lacks name or url (06 rule 2)");
  }
}

// Security headers list (standard 15 rules 1, 4 and 6), read from _headers.
function checkHeadersFile() {
  const file = join(ROOT, "_headers");
  if (!existsSync(file)) { warn("_headers", "no _headers file (standard 15); skip if the host sets headers elsewhere"); return; }
  const rules = new Map(); let cur = null;
  for (const raw of readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    if (!/^\s/.test(raw)) { cur = raw.trim(); if (!rules.has(cur)) rules.set(cur, []); continue; }
    if (cur) rules.get(cur).push(raw.trim());
  }
  const all = rules.get("/*") || [];
  if (!all.length) { fail("_headers", "no /* rule with the security headers (15 rule 1)"); return; }
  const has = (name) => all.find((l) => l.toLowerCase().startsWith(name.toLowerCase() + ":"));
  for (const h of ["Strict-Transport-Security", "Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy", "X-Frame-Options", "Cross-Origin-Opener-Policy"]) {
    if (!has(h)) fail("_headers", `/* is missing ${h} (15 rule 1)`);
  }
  if (!all.some((l) => /^!\s*Access-Control-Allow-Origin\b/i.test(l))) fail("_headers", "/* does not remove Access-Control-Allow-Origin (15 rule 6)");
  const csp = has("Content-Security-Policy");
  if (csp) {
    for (const d of ["base-uri", "object-src 'none'", "frame-ancestors", "form-action"]) if (!csp.includes(d)) fail("_headers", `CSP lacks ${d} (15 rule 4)`);
    const script = (csp.match(/script-src([^;]*)/) || [])[1] || "";
    if (/'unsafe-inline'/.test(script)) warn("_headers", "script-src allows 'unsafe-inline' (15 rule 5)");
  }
  const hsts = has("Strict-Transport-Security");
  if (hsts && !/max-age=(\d+)/.test(hsts)) fail("_headers", "HSTS has no max-age");
  else if (hsts && +hsts.match(/max-age=(\d+)/)[1] < 31536000) fail("_headers", "HSTS max-age below one year (15 rule 1)");
}

const files = walk(ROOT);
const htmlFiles = files.filter((f) => f.endsWith(".html") && !/(^|[\\/])(og-image-template|review)\.html$/.test(f));
const forbidden = readList(resolve("forbidden-terms.txt"));

const pages = new Map(); // canonical URL -> { file, alternates }
const indexableFiles = [];
const linkedFrom = new Map(); // target file -> files that link to it with <a href>

for (const file of htmlFiles) {
  const rel = relative(ROOT, file).split(sep).join("/");
  const html = readFileSync(file, "utf8");
  const robots = (metaContent(html, "robots") || "").toLowerCase();
  const indexable = !robots.includes("noindex") && !/^404\.html$/.test(rel);

  if (!/<html[^>]*\slang=["'][a-z]{2}/i.test(html)) fail(rel, "missing <html lang>");
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  if (!title || !title.trim()) fail(rel, "missing <title>");

  if (indexable) {
    indexableFiles.push(file);
    const desc = metaContent(html, "description");
    if (!desc) fail(rel, "missing meta description");
    else if (desc.length < 50 || desc.length > 170) warn(rel, `meta description is ${desc.length} characters (aim for 140-160)`);
    if (title && decode(title).length > 65) warn(rel, `title is ${decode(title).length} characters (aim for 50-60)`);
    const canonicalTag = tags(html, "link").find((t) => (attr(t, "rel") || "").toLowerCase() === "canonical");
    const canonical = canonicalTag && attr(canonicalTag, "href");
    if (!canonical) fail(rel, "missing canonical");
    else if (!/^https:\/\//.test(canonical)) fail(rel, "canonical is not an absolute https URL");
    else if (/\.pages\.dev/.test(canonical)) fail(rel, "canonical points to a pages.dev host");
    const h1 = (html.match(/<h1[\s>]/gi) || []).length;
    if (h1 !== 1) {
      // Pages that build their content with JavaScript may have no H1 in the HTML.
      if (h1 === 0) warn(rel, "no <h1> in the delivered HTML (visible to crawlers that skip JavaScript?)");
      else fail(rel, `${h1} <h1> elements (expected 1)`);
    }
    const og = metaContent(html, "og:image");
    if (!og) fail(rel, "missing og:image");
    else if (!/^https?:\/\//.test(og)) fail(rel, "og:image is not an absolute URL");
    else { const r = resolveTarget(file, og); if (!r.skip && !r.ok) fail(rel, `og:image file not found: ${r.path}`); }
    if (canonical) {
      const alternates = tags(html, "link").filter((t) => (attr(t, "rel") || "").toLowerCase() === "alternate" && attr(t, "hreflang"))
        .map((t) => ({ lang: attr(t, "hreflang"), href: attr(t, "href") }));
      pages.set(canonical, { rel, alternates });
    }
  }

  for (const img of tags(html, "img")) if (attr(img, "alt") === null) fail(rel, `<img> without alt: ${attr(img, "src")}`);

  for (const t of [...tags(html, "a"), ...tags(html, "link"), ...tags(html, "script"), ...tags(html, "img"), ...tags(html, "source")]) {
    const isAlt = /^<link/i.test(t) && /alternate|canonical|preconnect|dns-prefetch/i.test(attr(t, "rel") || "");
    if (isAlt) continue;
    for (const ref of [attr(t, "href"), attr(t, "src")]) {
      if (!ref || ref.includes("${") || ref.includes("{{")) continue;
      const r = resolveTarget(file, ref);
      if (!r.skip && !r.ok) fail(rel, `broken reference: ${ref}`);
      if (indexable && r.file && r.file !== file && /^<a\b/i.test(t)) {
        if (!linkedFrom.has(r.file)) linkedFrom.set(r.file, new Set());
        linkedFrom.get(r.file).add(file);
      }
    }
  }

  const ld = [];
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { ld.push(JSON.parse(m[1])); } catch (e) { fail(rel, `JSON-LD does not parse: ${e.message}`); }
  }
  if (indexable) checkJsonLd(rel, ld);
  if (/<meta[^>]+http-equiv=["']content-security-policy["']/i.test(html)) fail(rel, "CSP in a <meta> tag (standard 15 rule 2: header only)");

  const text = visibleText(html);
  for (const re of [/lorem ipsum/i, /\{\{[^}]*\}\}/, /\bexample\.com\b/i, /\[NEED:[^\]]*\]/]) {
    const hit = text.match(re); if (hit) fail(rel, `placeholder text: "${hit[0]}"`);
  }
  for (const re of forbidden) { const hit = text.match(re); if (hit) fail(rel, `forbidden term: "${hit[0]}"`); }
}

// hreflang: every alternate that is one of our pages must point back.
for (const [url, page] of pages) {
  if (!page.alternates.length) continue;
  if (!page.alternates.some((a) => a.href === url)) fail(page.rel, "hreflang set does not include the page itself");
  for (const a of page.alternates) {
    const other = pages.get(a.href);
    if (other && other !== page && !other.alternates.some((b) => b.href === url)) fail(page.rel, `hreflang ${a.lang} → ${a.href} does not link back`);
  }
}

// Orphans (standard 05 rule 10): every indexable page except the home page
// needs an <a href> from another indexable page. Links built by JavaScript
// are not counted, so a JS-rendered nav shows up here as orphans.
for (const file of indexableFiles) {
  const rel = relative(ROOT, file).split(sep).join("/");
  if (rel === "index.html") continue;
  if (!linkedFrom.has(file)) warn(rel, "orphan page: no other indexable page links to it");
}

// Structured data, site-wide: one Organization with a full node, and sameAs.
if (indexableFiles.length) {
  if (!orgRefs.size) fail("JSON-LD", "no page references an Organization @id (06 rule 1)");
  if (orgRefs.size > 1) warn("JSON-LD", `several Organization @ids: ${[...orgRefs].join(", ")} (06 rule 9: one entity in every language)`);
  for (const id of orgRefs) {
    const n = orgNodes.get(id);
    if (!n) { fail("JSON-LD", `${id} is referenced but no page holds the full node with a name`); continue; }
    if (!n.url) fail("JSON-LD", `${id} has no url (06 rule 1)`);
    if (!n.logo) fail("JSON-LD", `${id} has no logo (06 rule 1)`);
    if (![].concat(n.sameAs || []).length) fail("JSON-LD", `${id} has no sameAs (06 rule 1: the business's real profiles)`);
  }
}

// Security headers (standard 15).
checkHeadersFile();

// Sitemap (standard 05 rule 5): every URL carries a <lastmod>.
const sitemapFile = join(ROOT, "sitemap.xml");
if (existsSync(sitemapFile)) {
  const urls = [...readFileSync(sitemapFile, "utf8").matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const missing = urls.filter((u) => !/<lastmod>[^<]+<\/lastmod>/.test(u)).length;
  if (missing) warn("sitemap.xml", `${missing} of ${urls.length} URLs have no <lastmod>`);
}

// Root-served sites: repo-only entries must be guarded by _routes.json.
const routesFile = join(ROOT, "_routes.json");
if (existsSync(routesFile)) {
  const include = JSON.parse(readFileSync(routesFile, "utf8")).include || [];
  const guarded = (name, isDir) => include.some((p) => p === "/" + name || (isDir && p === `/${name}/*`) || p === `/${name}*`);
  const SITE_FILE = /\.(html|css|js|mjs|json|xml|txt|webmanifest|ico|png|jpe?g|webp|avif|svg|gif|woff2?|ttf|pdf|mp4|webm)$/i;
  const REPO_ONLY = /\.(md|py|sh|toml|lock|bundle|log)$|^package(-lock)?\.json$|^\.|^(tests?|scripts|worker|functions|lab|_lab|node_modules|research|archive)$/i;
  // Only what git tracks gets deployed by a git-connected host; local,
  // gitignored files are not published.
  let entries = readdirSync(ROOT);
  try {
    const tracked = execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" }).split("\n").filter(Boolean);
    const top = new Set(tracked.map((p) => p.split("/")[0]));
    entries = entries.filter((n) => top.has(n));
  } catch { /* not a git checkout: check everything */ }
  for (const name of entries) {
    if (["_headers", "_redirects", "_routes.json", ".git", ".github"].includes(name)) continue;
    const isDir = statSync(join(ROOT, name)).isDirectory();
    if (REPO_ONLY.test(name) || (!isDir && !SITE_FILE.test(name))) {
      if (!guarded(name, isDir)) fail("_routes.json", `repo-only entry is served publicly: ${name}${isDir ? "/" : ""}`);
    }
  }
}

for (const w of warnings) console.log("warn  " + w);
for (const f of failures) console.log("FAIL  " + f);
console.log(`\n${htmlFiles.length} pages checked: ${failures.length} failures, ${warnings.length} warnings`);
process.exit(failures.length ? 1 : 0);

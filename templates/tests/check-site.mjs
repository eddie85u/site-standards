#!/usr/bin/env node
// Static guardrail checks for a site (site-standards 13). No dependencies.
//
//   node tests/check-site.mjs --root site --domain example.com [--slop] [--strict-slop]
//
// --root    folder that is published (default ".")
// --domain  production domain, used to resolve absolute links and og:image
// --slop    also report hits from slop-terms.txt (warnings)
// --strict-slop  slop hits fail the run
//
// Reads, if present, from the current directory:
//   forbidden-terms.txt  one term or regex per line; any hit fails
//   slop-terms.txt       shared slop list (falls back to the copy next to this file)
//   _routes.json         (root-served sites) repo-only paths guarded by a 404

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf("--" + name); return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : dflt; };
const flag = (name) => args.includes("--" + name);

const ROOT = resolve(opt("root", "."));
const DOMAIN = opt("domain", "");
const SLOP = flag("slop") || flag("strict-slop");
const STRICT_SLOP = flag("strict-slop");
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
  return { ok: candidates.some((c) => existsSync(c) && statSync(c).isFile()), path: url };
}

const files = walk(ROOT);
const htmlFiles = files.filter((f) => f.endsWith(".html") && !/(^|[\\/])(og-image-template|review)\.html$/.test(f));
const forbidden = readList(resolve("forbidden-terms.txt"));
const here = dirname(fileURLToPath(import.meta.url));
const slopFile = [resolve("slop-terms.txt"), join(here, "slop-terms.txt"), join(here, "..", "slop-terms.txt")].find(existsSync);
const slop = SLOP && slopFile ? readList(slopFile) : [];

const pages = new Map(); // canonical URL -> { file, alternates }

for (const file of htmlFiles) {
  const rel = relative(ROOT, file).split(sep).join("/");
  const html = readFileSync(file, "utf8");
  const robots = (metaContent(html, "robots") || "").toLowerCase();
  const indexable = !robots.includes("noindex") && !/^404\.html$/.test(rel);

  if (!/<html[^>]*\slang=["'][a-z]{2}/i.test(html)) fail(rel, "missing <html lang>");
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  if (!title || !title.trim()) fail(rel, "missing <title>");

  if (indexable) {
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
    }
  }

  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(m[1]); } catch (e) { fail(rel, `JSON-LD does not parse: ${e.message}`); }
  }

  const text = visibleText(html);
  for (const re of [/lorem ipsum/i, /\{\{[^}]*\}\}/, /\bexample\.com\b/i]) {
    const hit = text.match(re); if (hit) fail(rel, `placeholder text: "${hit[0]}"`);
  }
  for (const re of forbidden) { const hit = text.match(re); if (hit) fail(rel, `forbidden term: "${hit[0]}"`); }
  for (const re of slop) {
    const hit = text.match(re);
    if (hit) (STRICT_SLOP ? fail : warn)(rel, `slop: "${hit[0]}"`);
  }
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

#!/usr/bin/env node
// Machine-sounding writing patterns in visible copy (site-standards 04). No dependencies.
// Warnings only: the run exits 0 unless --strict is given.
//
//   node tests/check-writing.mjs --root site [--list path/slop-patterns.txt]
//        [--json data/es.json:es --json data/faq.json] [--strict]
//
// --root   folder that is published (default ".")
// --list   pattern file (default: slop-patterns.txt in the current directory,
//          next to this script, or one folder up)
// --json   a JSON file whose strings the site's JavaScript renders as copy.
//          ":es" or ":en" sets its language; otherwise each string takes the
//          "lang" field of the nearest object around it, and strings with no
//          known language are checked against every language's patterns.
// --strict hits fail the run (for a one-off cleanup, not for CI)
//
// Each HTML page is checked against the patterns for its <html lang> plus the
// language-neutral ones. Keep this separate from forbidden-terms.txt: compliance
// words fail the build, writing patterns only warn.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf("--" + name); return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : dflt; };
const opts = (name) => args.flatMap((a, i) => (a === "--" + name && args[i + 1] ? [args[i + 1]] : []));
const ROOT = resolve(opt("root", "."));
const STRICT = args.includes("--strict");
const SKIP_DIRS = new Set(["node_modules", ".git", ".wrangler", "lab", "_lab", "_private", "dist", "tests", "scripts", "worker", "workers", "functions", "archive", "review", "vendor", "site-standards"]);

const here = dirname(fileURLToPath(import.meta.url));
const listFile = opt("list") || [resolve("slop-patterns.txt"), join(here, "slop-patterns.txt"), join(here, "..", "slop-patterns.txt")].find(existsSync);
if (!listFile || !existsSync(listFile)) { console.error("slop-patterns.txt not found; pass --list"); process.exit(2); }

// Parse the list: "en: re", "es: re" or "re"; "## Group" sets the group name.
const patterns = [];
let group = "";
for (const raw of readFileSync(listFile, "utf8").split(/\r?\n/)) {
  const line = raw.trim();
  if (!line) continue;
  if (line.startsWith("## ")) { group = line.slice(3).trim(); continue; }
  if (line.startsWith("#")) continue;
  const m = line.match(/^([a-z]{2}):\s+(.*)$/);
  const lang = m ? m[1] : "*";
  const src = m ? m[2] : line;
  let re;
  try { re = new RegExp(src, "giu"); } catch (e) { console.error(`bad pattern in ${listFile}: ${src} (${e.message})`); process.exit(2); }
  patterns.push({ lang, group, src, re });
}

const decode = (s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;|&rsquo;/g, "'").replace(/&mdash;/g, "—").replace(/&ndash;/g, "–")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i")); return m ? (m[2] ?? m[3]) : null; };
// Curly apostrophes become straight ones so "it’s" matches "it's".
const norm = (s) => decode(s).replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();

function visibleText(html) {
  const metas = [...html.matchAll(/<meta[^>]+>/gi)].map((m) => m[0])
    .filter((t) => /^(description|og:title|og:description|twitter:title|twitter:description)$/i.test(attr(t, "name") || attr(t, "property") || ""))
    .map((t) => attr(t, "content") || "");
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  // Block-level tags end a sentence-like chunk, so "No fees" in one card and "No contracts" in the next don't merge.
  const body = html.replace(/<head[\s\S]*?<\/head>/i, " ").replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<noscript[\s\S]*?<\/noscript>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/?(p|div|li|h[1-6]|section|article|header|footer|nav|td|th|tr|button|label|option|figcaption|blockquote|summary|dt|dd|br)\b[^>]*>/gi, " ¶ ")
    .replace(/<[^>]+>/g, " ");
  return [title, ...metas, body].map(norm).join(" ¶ ");
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (!SKIP_DIRS.has(name)) walk(p, out); }
    else if (name.endsWith(".html") && !/^(og-image-template|review)\.html$/.test(name)) out.push(p);
  }
  return out;
}

const hits = []; // { where, lang, group, text }
function scan(where, lang, text) {
  // "¶" marks a block boundary: patterns never match across it.
  for (const chunk of text.split("¶")) {
    const t = chunk.trim();
    if (!t) continue;
    for (const p of patterns) {
      if (p.lang !== "*" && lang && p.lang !== lang) continue;
      p.re.lastIndex = 0;
      for (const m of t.matchAll(p.re)) hits.push({ where, lang: lang || "?", group: p.group, text: m[0].trim() });
    }
  }
}

for (const file of walk(ROOT)) {
  const html = readFileSync(file, "utf8");
  const lang = ((html.match(/<html[^>]*\slang=["']([a-z]{2})/i) || [])[1] || "").toLowerCase();
  scan(relative(ROOT, file).split(sep).join("/"), lang, visibleText(html));
}

function jsonStrings(v, lang, path, out) {
  if (typeof v === "string") out.push({ path, lang, value: v });
  else if (Array.isArray(v)) v.forEach((x, i) => jsonStrings(x, lang, `${path}[${i}]`, out));
  else if (v && typeof v === "object") {
    const l = typeof v.lang === "string" && /^[a-z]{2}$/i.test(v.lang) ? v.lang.toLowerCase() : lang;
    for (const [k, x] of Object.entries(v)) if (!k.startsWith("_")) jsonStrings(x, /^(es|en)$/.test(k) ? k : l, path ? `${path}.${k}` : k, out);
  }
  return out;
}
for (const spec of opts("json")) {
  const [file, lang] = spec.split(/:(?=[a-z]{2}$)/i);
  const p = resolve(file);
  if (!existsSync(p)) { console.error(`--json file not found: ${file}`); process.exit(2); }
  for (const s of jsonStrings(JSON.parse(readFileSync(p, "utf8")), lang ? lang.toLowerCase() : "", "", [])) {
    if (/^(https?:|\/|#|[\w.-]+\.(webp|png|jpe?g|svg|html)$)/i.test(s.value)) continue;
    scan(`${file} ${s.path}`, s.lang, norm(s.value.replace(/<[^>]+>/g, " ¶ ")));
  }
}

// Report: one line per place and group, distinct matches joined, with a count.
const byKey = new Map();
for (const h of hits) {
  const k = `${h.where}\u0000${h.group}`;
  if (!byKey.has(k)) byKey.set(k, { ...h, texts: new Map() });
  const e = byKey.get(k);
  e.texts.set(h.text, (e.texts.get(h.text) || 0) + 1);
}
const short = (s) => (s.length > 90 ? s.slice(0, 87) + "..." : s);
for (const e of byKey.values()) {
  const list = [...e.texts].map(([t, n]) => `"${short(t)}"${n > 1 ? ` x${n}` : ""}`).join(", ");
  console.log(`${STRICT ? "FAIL" : "warn"}  ${e.where} [${e.lang}] ${e.group}: ${list}`);
}
const groups = new Map();
for (const h of hits) groups.set(h.group, (groups.get(h.group) || 0) + 1);
console.log(`\n${hits.length} writing-pattern hits${hits.length ? ` (${[...groups].map(([g, n]) => `${g} ${n}`).join(", ")})` : ""}. Warnings: each should be a deliberate choice (site-standards 04).`);
process.exit(STRICT && hits.length ? 1 : 0);

# 04 · Search basics
**Applies to:** every site.

## Why
Search engines and AI answer engines both start from the same signals: clean titles, one canonical URL per page, a sitemap, and a verified owner.

## Rules
1. Every indexable page has:
   - a unique `<title>` (50–60 characters, brand at the end: `Topic | Brand`)
   - a unique `<meta name="description">` (140–160 characters, written for a human)
   - `<link rel="canonical">` with the absolute, final URL (HTTPS, chosen host, no query string)
   - `<html lang="...">` matching the content
   - exactly one `<h1>`, and headings in order
2. **Bilingual sites:** every page lists `hreflang` alternates for each language **and itself**, plus `x-default`, and the pairs are reciprocal (page A points to B and B points back to A). Both language versions are in the sitemap.
3. `sitemap.xml` lists every indexable URL (canonical form only) with `lastmod`; non-indexable pages (thank-you, 404, confirmation) are excluded and carry `noindex`.
4. `robots.txt` references the sitemap with an absolute URL (template and AI rules: standard 07).
5. **Verified owners:** Google Search Console (Domain property via DNS TXT) and Bing Webmaster Tools (import from Search Console). Submit the sitemap in both.
6. Clean URLs: lowercase, hyphens, no file extensions in links if the host supports it, and old URLs 301 to new ones when anything moves.
7. Internal links use descriptive anchor text, never "click here".

## How to build it
- Start from `templates/head.html` for each page.
- Generate `sitemap.xml` from the list of pages (a short script is fine) and update `lastmod` when a page changes.
- Search Console: add a Domain property, copy the TXT record into Cloudflare DNS, verify; then Bing → Import from Google Search Console.

## Check
- `templates/tests/check-site.mjs` checks titles, descriptions, canonicals, one H1, `lang`, and hreflang reciprocity.
- Search Console → Pages: no "Duplicate without user-selected canonical" or "Soft 404".
- `curl -s https://example.com/sitemap.xml | head` returns XML with absolute HTTPS URLs.

## Avoid
- `<meta name="keywords">`: ignored by Google and Bing for years; it only tells competitors your keywords.
- Canonicals pointing to a different page or to the `pages.dev` host.
- Hreflang without the self-reference, or with a language code like `es-LA` (invalid; use `es` or `es-419`).
- Moving a site to a new host or DNS zone without re-verifying Search Console. The DNS TXT record must exist in the new zone.

## Notes from real sites
- 2026-10: after moving a domain's DNS to a new Cloudflare account, Search Console verification had to be redone because the TXT record lived in the old zone.
- 2026-10: a site set `document.title` from JavaScript on load, which silently replaced the approved HTML title in browsers and for crawlers that run JS. Keep the `<title>` in the HTML as the only source; never set it from scripts on a static site.

# 05 · Search basics
**Applies to:** every site.

## Why
Google, Bing and the AI answer engines built on them start from the same basics: a clear title on every page, one official address per page (the "canonical"), a map of your pages (the sitemap), and a verified owner who can see errors. Get these wrong and nothing else in this guide gets found. Most mistakes here are invisible on the page and only show up weeks later in Search Console, Google's free dashboard for site owners. What to write on each page, and how to improve it from Search Console data, is [21 Search and answer-engine research](21-search-research.md).

For scale: 96.55% of the 14 billion pages in one large study get no Google traffic at all ([Ahrefs, 2023](https://ahrefs.com/blog/search-traffic-study/)). The basics below do not guarantee traffic, but skipping them nearly guarantees none.

## Rules
1. **Every indexable page has:**
   - a unique `<title>`: the topic first, brand last (`Topic | Brand`), around 50–60 characters
   - a unique `<meta name="description">` written for a person, around 140–160 characters, with a site-wide summary on the home page
   - `<link rel="canonical">` with the absolute, final URL (HTTPS, chosen host, no query string)
   - `<html lang="...">` matching the content
   - exactly one `<h1>`, and headings in order

   *Why:* the lengths are habits, not limits. Google cuts by pixel width and may drop the brand when it repeats the site name, so write the important words first rather than padding to a number.
2. **Every URL you publish is the form the host serves.** On Cloudflare Pages that is `/contact` (not `/contact.html`) and `/about/` for `about/index.html`. Canonicals, `og:url`, hreflang, the sitemap and internal links all use it.
   *Why:* any other form costs a redirect per link and Search Console reports "Page with redirect" for every one.
3. **Clean URLs:** lowercase, hyphens (not underscores), short, and root-relative internal links (`/services/x`, never `../x`).
   *Why:* URLs are case-sensitive, so `/About` and `/about` are two pages; parent-relative links can create endless URL chains that waste crawl budget.
4. **Bilingual sites:** every page lists `hreflang` alternates for each language **and itself**, plus `x-default`, reciprocally. Both versions are in the sitemap.
   *Why:* without the self-reference and the return link, Google ignores the whole set.
5. **`sitemap.xml`** lists every indexable URL in its canonical form, with a `lastmod` that changes only when the content does (ISO 8601 with time). Leave out `priority` and `changefreq`. Thank-you, 404 and confirmation pages are excluded and carry `noindex`.
   *Why:* Google ignores `priority` and `changefreq` and trusts `lastmod` only while it is accurate; stamping every URL with the build time teaches both engines to ignore it.
6. **Moves are 301s.** When anything moves, the old URL 301s to the new one. In Pages `_redirects`, always write the status (a line without one is a 302), and remember sources cannot match a query string.
   *Why:* a 302 tells engines the move is temporary, so the old URL keeps the ranking.
7. **Verified owners:** Google Search Console (Domain property via DNS TXT) and Bing Webmaster Tools (import from Search Console). Submit the sitemap in both.
   *Why:* they are the only place you see indexing errors, real queries, and now AI-feature data (rule 8). Bing also feeds Copilot and several other assistants. Once there is data, run the monthly loop in [21](21-search-research.md) rule 9.
8. **AI features are switched on and watched.**
   - Search Console → Settings: the property is **included** in Search generative AI features. An exclusion removes the site from AI Overviews and AI Mode.
   - Search Console's *Generative AI* performance report and Bing's *AI Performance* report show where you appear in AI answers (standard 03, After).

   *Why:* one toggle, flipped by anyone with access, silently removes the site from Google's AI answers.
9. **Internal links use descriptive anchor text,** never "click here".
   *Why:* the anchor tells engines and assistants what the target page is about.

## How to build it
- Start each page from `templates/head.html`.
- Generate `sitemap.xml` from the page list with a short script, taking `lastmod` from each file's last real change (for example its last git commit).
- Search Console: add a Domain property, put the TXT record in Cloudflare DNS, verify; then Bing → Import from Google Search Console.

## Check
- `templates/tests/check-site.mjs` checks titles, descriptions, canonicals, one H1, `lang` and hreflang reciprocity.
- Search Console → Pages: no "Duplicate without user-selected canonical", "Soft 404" or "Page with redirect" on URLs you link to.
- `curl -sI https://example.com/contact.html | grep -i location` shows the extensionless URL, and no page, canonical or sitemap entry uses the `.html` form.
- Search Console → Settings → generative AI features: included.

## Avoid
- `<meta name="keywords">`: ignored for years; it only tells competitors your keywords.
- Canonicals pointing to another page, to the `pages.dev` host, or to a URL that redirects.
- Hreflang without the self-reference, or with an invalid code like `es-LA` (use `es` or `es-419`).
- Moving a site to a new DNS zone without re-verifying Search Console: the TXT record must exist in the new zone.
- Setting `document.title` from JavaScript on a static site: it silently replaces the approved title.
- Near-identical pages per city or per service variant, or footers listing dozens of cities: Google treats them as doorway pages. Each page needs its own real facts.


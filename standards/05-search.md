# 05 · Search basics
**Applies to:** every site.

## Why
Google, Bing and the AI answer engines built on them start from the same basics:
- a clear title on every page;
- one official address per page (the "canonical");
- a map of your pages (the sitemap);
- a verified owner who can see errors.

Get these wrong and nothing else in this guide gets found. Most mistakes here are invisible on the page and only show up weeks later in Search Console, Google's free dashboard for site owners. What to write on each page, and how to improve it from Search Console data, is [21 Search and answer-engine research](21-search-research.md).

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
4. **Bilingual sites:** each language version is its own page at its own URL, tied to the others by `hreflang`.
   - Every page lists `hreflang` alternates for each language **and itself**, plus `x-default`, reciprocally. Use one method (HTML `<link>` tags or the sitemap) across the site.
   - Codes are an ISO 639-1 language (`es`, `en`), optionally with an ISO 3166-1 alpha-2 country (`es-co`, `en-gb`). Use the language alone unless you have separate versions per country.
   - Each version's canonical points to itself, never to the other language.
   - Slugs use the page's language (`/en/pricing`, `/precios`).
   - One language per page: navigation, buttons, footer and JSON-LD included.
   - The language switcher links to the same page in the other language, not to the home page, and internal links stay in the page's language.
   - No automatic redirect by IP address or browser language.
   - Both versions are in the sitemap.

   *Why:*
   - Without the self-reference and the return link, Google ignores the whole set. It supports only those two code lists, so `es-419` (Latin America) does nothing ([Google, 2026](https://developers.google.com/search/docs/specialty/international/localized-versions)).
   - Google decides a page's language from its visible text, not from `lang` or the URL, and asks for one language per page and no automatic language redirects ([Google, 2025](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)). Its default crawler comes from US addresses ([Google, 2025](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages)), so a redirect by location can hide the Spanish version from it.
   - Google asks for words in the audience's language in the URL ([Google, 2026](https://developers.google.com/search/docs/crawling-indexing/url-structure)).
   - `<html lang>` (rule 1) still matters for screen readers ([09](09-accessibility.md)).
5. **`sitemap.xml`** lists every indexable URL in its canonical form, with a `lastmod` that changes only when the content does (ISO 8601 with time). Leave out `priority` and `changefreq`. Thank-you, 404 and confirmation pages are excluded and carry `noindex`.
   *Why:* Google ignores `priority` and `changefreq` and trusts `lastmod` only while it is accurate; stamping every URL with the build time teaches both engines to ignore it.
6. **Moves are 301s, straight to the final URL.**
   - When anything moves, the old URL 301s to the new one. In Pages `_redirects`, always write the status (a line without one is a 302), and remember sources cannot match a query string.
   - When a page moves again, point the older lines at the final URL too. No chains.
   - Keep redirects at least a year; forever is simpler.
   - A deleted page with no replacement returns 404. Never redirect it to the home page. When several pages merge into one, all of them redirect to that page.

   *Why:* a 302 tells engines the move is temporary, so the old URL keeps the ranking. Google follows up to 10 hops but asks for a direct redirect, a year or more of keeping it, and warns that sending old URLs to the home page may be treated as a soft 404, an error page in disguise ([Google, 2026](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)). Google treats 404 and 410 the same ([Google, 2026](https://developers.google.com/search/docs/crawling-indexing/http-network-errors)), so the host's default 404 is enough.
7. **Verified owners:** Google Search Console (Domain property via DNS TXT) and Bing Webmaster Tools (import from Search Console). Submit the sitemap in both.
   *Why:* they are the only place you see indexing errors, real queries, and now AI-feature data (rule 8). Bing also feeds Copilot and several other assistants. Once there is data, run the monthly loop in [21](21-search-research.md) rule 9.
8. **AI features are switched on and watched.**
   - Search Console → Settings: the property is **included** in Search generative AI features. An exclusion removes the site from AI Overviews and AI Mode.
   - Search Console's *Generative AI* performance report and Bing's *AI Performance* report show where you appear in AI answers (standard 03, After).

   *Why:* one toggle, flipped by anyone with access, silently removes the site from Google's AI answers.
9. **Internal links use descriptive anchor text,** never "click here".
   *Why:* the anchor tells engines and assistants what the target page is about.
10. **Every indexable page has a link from another indexable page, and links onward.**
    - Owning pages ([21](21-search-research.md) rule 4) are linked from the main navigation or a hub page.
    - Every page ends with a next step: a related page or the call to action.
    - Links are plain `<a href>` in the HTML, not built by scripts.

    *Why:* Google says every page you care about should have a link from at least one other page on the site ([Google, 2025](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)). A page found only through the sitemap (an "orphan") gets no anchor text telling engines what it is about, and a dead end loses the visitor just when they were ready to act.
11. **Image file names describe the image:** short, hyphenated, in the page's language (`remote-bookkeeper-dashboard.webp`, not `IMG_0412.webp`). On bilingual sites, a localized image gets a translated file name. Alt text ([09](09-accessibility.md)) matters more.
    *Why:* Google says file names give only light clues and alt text is the most important image attribute, and asks for translated file names on localized images ([Google, 2026](https://developers.google.com/search/docs/appearance/google-images)).

## How to build it
- Start each page from `templates/head.html`.
- Generate `sitemap.xml` from the page list with a short script, taking `lastmod` from each file's last real change (for example its last git commit).
- Search Console: add a Domain property, put the TXT record in Cloudflare DNS, verify; then Bing → Import from Google Search Console.

## Check
- `templates/tests/check-site.mjs` checks titles, descriptions, canonicals, one H1, `lang`, hreflang reciprocity, alt attributes and broken internal links, and warns on orphan pages (rule 10).
- Search Console → Pages: no "Duplicate without user-selected canonical", "Soft 404" or "Page with redirect" on URLs you link to.
- `curl -sI https://example.com/contact.html | grep -i location` shows the extensionless URL, and no page, canonical or sitemap entry uses the `.html` form.
- Redirects are one hop: for each source in `_redirects`, `curl -sIL -o /dev/null -w "%{num_redirects} %{url_effective}\n" https://example.com/old-path` prints `1` and the final URL.
- A removed URL: `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://example.com/removed-page` prints `404` with no redirect to `/`.
- hreflang codes: `grep -rhoE 'hreflang="[^"]+"' site | sort -u` lists only `xx`, `xx-yy` and `x-default` codes, with no `419`, `LA` or `UK`.
- Search Console → Settings → generative AI features: included.

## Avoid
- `<meta name="keywords">`: ignored for years; it only tells competitors your keywords.
- Canonicals pointing to another page, to the `pages.dev` host, or to a URL that redirects.
- Hreflang without the self-reference, or with a code Google does not support: `es-LA`, `es-419`, `en-UK`. Use `es`, `es-co`, `en-gb`.
- A Spanish page whose canonical points to the English one: it asks Google to drop the Spanish page. Google wants the canonical in the same language.
- Redirecting visitors to a language by IP address or browser setting. Offer the switcher instead.
- `noindex` used to steer which URL becomes canonical. Google advises against it; use `rel="canonical"` ([Google, 2026](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)).
- `rel="next"` and `rel="prev"` for Google: it no longer uses them ([Google](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading)).
- Redirect chains left behind by a second move, and deleted pages redirected to the home page.
- Moving a site to a new DNS zone without re-verifying Search Console: the TXT record must exist in the new zone.
- Setting `document.title` from JavaScript on a static site: it silently replaces the approved title.
- Near-identical pages per city or per service variant, or footers listing dozens of cities: Google treats them as doorway pages. Each page needs its own real facts.


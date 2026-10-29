# 06 · Structured data
**Applies to:** every site.

## Why
Structured data is a short, hidden block of code (written in a format called JSON-LD) that tells search engines and AI assistants, without any guessing, who the business is, what it sells, where it is and how to reach it. It decides the site name Google shows above your result, and it repeats your key facts in a form machines cannot misread. Google says it is not required for its AI features, so treat it as accuracy and eligibility, not a ranking trick. It is still the cheapest "big company" signal there is.

Google's own published results ([Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data); case studies from about 2019 to 2021):
- Rotten Tomatoes: 25% higher click-through rate on pages with structured data.
- Food Network: 35% more visits.
- Nestlé: 82% higher click-through rate on its enhanced results.

## Rules
1. One `<script type="application/ld+json">` per page holding an `@graph` (template: `templates/jsonld-organization.json`):
   - **Organization** (or a specific subtype: `ProfessionalService`, `MedicalBusiness`, `LocalBusiness`) with `@id` `https://example.com/#organization`, `name`, `url`, `logo` (absolute URL, square, at least 112×112), `description`, `contactPoint`, `sameAs` (real social profiles only)
   - **WebSite** with `@id` `https://example.com/#website`, `publisher` → the Organization `@id`, `inLanguage`
   - **WebPage** for the current page, `isPartOf` → WebSite
   - **Service** for each service page, `provider` → Organization
   - **FAQPage** where a page has a visible FAQ (the questions and answers must match the visible text)
   - **BreadcrumbList** on inner pages

   *Why:* one connected graph per page lets engines tie every service and page back to one business instead of guessing.
2. **The site name is chosen on purpose.** On the home page only, the WebSite node carries `name` (the brand as you want it shown), `alternateName` (a shorter form, or the domain) and `url` set to the canonical home page with its trailing slash. Use the same name in `og:site_name`, the `<title>` suffix and the visible logo text.
   *Why:* Google picks the site name shown in results from these signals and falls back to guessing (often the domain) when they disagree. The Rich Results Test does not check site names; use validator.schema.org.
3. **Physical locations** add `LocalBusiness` (or a fitting subtype) with `address`, `geo` and `openingHoursSpecification`, matching the Google Business Profile exactly, one node per location.
   *Why:* mismatched addresses or hours between the site and the Business Profile weaken both in local results and in assistant answers.
4. **Reuse `@id` references** instead of repeating the Organization on every node.
   *Why:* repeated copies drift apart; one `@id` stays one source of truth.
5. **Everything in JSON-LD is visible on the page or true of the business.** No ratings, reviews or prices that the page does not show.
   *Why:* markup that says more than the page is a spam signal and can cost rich results for the whole site.
6. **Pick the type your compliance allows.** Regulated businesses check their compliance list before using types like `MedicalBusiness` or `FinancialService`; a generic `Organization` or `ProfessionalService` is always safe.
   *Why:* a type is a claim; some ad platforms and regulators read "medical" or "financial" as a statement about licensing.
7. **Articles and guides add `Article` (or `BlogPosting`)** with `headline`, `image`, `datePublished`, `dateModified` (with time zone, changed only when the content changes) and `publisher` → the Organization `@id`. `author` is a `Person` whose `name` holds only the name, with `url` to an author page or `sameAs` to a real profile. The visible byline says the same ([21](21-search-research.md) rule 12).
   *Why:* Google requires none of these but recommends them, uses `url` or `sameAs` to tell authors apart, and assumes its own time zone when none is given ([Google, 2026](https://developers.google.com/search/docs/appearance/structured-data/article)).
8. **A page with your own video adds `VideoObject`** with at least `name`, `thumbnailUrl` and `uploadDate`.
   *Why:* those three are required for video results ([Google, 2026](https://developers.google.com/search/docs/appearance/structured-data/video)).
9. **Bilingual sites:** each language version's JSON-LD is written in that language, with `inLanguage` on the WebPage, while the Organization and WebSite keep the same `@id` in both languages.
   *Why:* one business in two languages is still one entity. A second Organization `@id` per language describes two businesses.

## How to build it
Copy the template, fill the placeholders, and keep the Organization block identical on every page (a shared snippet or build step helps).

Generate FAQPage from the same data that renders the visible FAQ, in the build step, never as a hand-kept copy next to it. Two sites in a row had a hand-kept block; on one it matched only because both had been edited the same day.

## Check
- `check-site.mjs` fails if any JSON-LD block does not parse.
- Once a page is indexed, the Search Console URL Inspection API (`index.inspect`) returns `richResultsResult` with the items Google detected and any errors or warnings ([Google, 2026](https://developers.google.com/webmaster-tools/v1/urlInspection.index/UrlInspectionResult)). No errors.
- Rich Results Test (search.google.com/test/rich-results) and validator.schema.org, in a browser, when a page gets a new type: no errors. Neither has an API.

## Avoid
- `AggregateRating` or `Review` markup for the business's own testimonials: against Google's guidelines (self-serving reviews) and a manual-action risk.
- Expecting FAQ rich results: since 2023 Google shows them only for authoritative government and health sites. Keep FAQPage anyway; AI assistants read it.
- `HowTo` markup: Google dropped those rich results.
- Empty `sameAs: []`. Leave the property out until there are real profiles.
- `dateModified` set to the build time on every deploy: fake freshness. Take it from the content's last real change.
- Job titles or "Dr." inside `author.name`. Google wants only the name there; credentials go on the page and the author page.
- Generator templates that add `AggregateRating` to a product or service, `Review` for your own testimonials, or `HowTo`. See the first three entries above.


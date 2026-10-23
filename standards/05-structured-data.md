# 05 · Structured data

## Why
JSON-LD tells search engines and AI assistants, unambiguously, who the business is, what it sells and how to reach it. It is the cheapest "big company" signal there is.

## Rules
1. One `<script type="application/ld+json">` per page holding an `@graph` (template: `templates/jsonld-organization.json`):
   - **Organization** (or a specific subtype: `ProfessionalService`, `MedicalBusiness`, `LocalBusiness`) with `@id` `https://example.com/#organization`, `name`, `url`, `logo` (absolute URL, square, at least 112×112), `description`, `contactPoint`, `sameAs` (real social profiles only)
   - **WebSite** with `@id` `https://example.com/#website`, `publisher` → the Organization `@id`, `inLanguage`
   - **WebPage** for the current page, `isPartOf` → WebSite
   - **Service** for each service page, `provider` → Organization
   - **FAQPage** where a page has a visible FAQ (the questions and answers must match the visible text)
   - **BreadcrumbList** on inner pages
2. Physical locations add `LocalBusiness` with `address`, `geo` and `openingHoursSpecification`, matching the Google Business Profile exactly.
3. Reuse `@id` references instead of repeating the Organization on every node.
4. Everything in JSON-LD must be visible on the page or true of the business. No ratings, reviews or prices that the page does not show.

## How to build it
Copy the template, fill the placeholders, and keep the Organization block identical on every page (a shared snippet or build step helps).

## Check
- Rich Results Test (search.google.com/test/rich-results) and validator.schema.org: no errors.
- `check-site.mjs` fails if any JSON-LD block does not parse.

## Avoid
- `AggregateRating` or `Review` markup for the business's own testimonials: against Google's guidelines (self-serving reviews) and a manual-action risk.
- Expecting FAQ rich results: since 2023 Google shows them only for authoritative government and health sites. Keep FAQPage anyway; AI assistants read it.
- `HowTo` markup: Google dropped those rich results.
- Empty `sameAs: []`. Leave the property out until there are real profiles.

## Notes from real sites
- 2026-10: the most complete graph (Organization + WebSite + WebPage + Service) came from a B2B services site; a longevity center's site had FAQPage only and is the next one to fill out.

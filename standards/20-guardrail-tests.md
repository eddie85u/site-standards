# 20 · Guardrail tests
**Applies to:** every site.

## Why
Every standard here can be broken by one careless edit, very often by an AI agent that was asked to change something else. Nothing looks broken, so nobody notices for months. A fast automatic check that runs on every change is the only thing that reliably catches it.

66% of developers say their top frustration with AI tools is output that is "almost right, but not quite", and 45% say fixing AI-written code takes longer ([Stack Overflow survey, 2025](https://survey.stackoverflow.co/2025/ai)). On a website, "almost right" is a missing page title, a broken share image or a deleted privacy check that nobody sees.

## Rules
1. **Every site runs `templates/tests/check-site.mjs`** (no dependencies, Node 20+) before merging to production. It checks:
   - each HTML page: `lang`, `<title>`, meta description, canonical, exactly one `<h1>`, `og:image` present and the file exists, every `<img>` has `alt`
   - internal links and asset references point to files that exist
   - every JSON-LD block parses, and its contents hold up (standard 06): one Organization `@id` ending in `#organization` with `url`, `logo` and `sameAs`, a WebSite node with `name` and `url` on the home page, an `@id` on every organization node; warning only: an indexable page with no JSON-LD or no reference to the Organization
   - `_headers` (standard 15): the `/*` rule sends the seven headers of 15 rule 1, removes `Access-Control-Allow-Origin`, and the CSP has `base-uri`, `object-src 'none'`, `frame-ancestors` and `form-action`; no page carries a CSP `<meta>` tag
   - hreflang alternates are reciprocal
   - warning only: indexable pages that no other indexable page links to (orphans, standard 05 rule 10), and sitemap URLs without `lastmod` (05 rule 5)
   - forbidden terms (`forbidden-terms.txt`) do not appear in visible copy
   - no leftover placeholders (`lorem ipsum`, `{{`, `example.com`, `[NEED:`)
   - root-served sites: every root entry is site content or listed in `_routes.json`

   Next to it, `templates/tests/check-writing.mjs` warns on machine-sounding writing patterns per page language (standard 04). It always exits 0: style is a choice, compliance is not, so the two lists never share a file or a severity.

   *Why:* these are the failures that are invisible on the page and expensive later. A check that only proves a block parses lets a standard pass on a reading: on the day the JSON-LD contents check was added, it found two of our sites with pages carrying no link to the Organization, both marked as passing 06.
2. **Owner decisions become assertions** (approved CTA wording, banned claims, required pages), updated **in the same change** as the decision.
   *Why:* a decision that lives only in a chat is undone by the next agent session. Our most stable site encodes its owner's banned words, mandatory call-to-action pair and price rules as tests.
3. **CI:** a GitHub Action runs the checks on every pull request (template: `templates/github/checks.yml`). Lighthouse CI is optional once the site is stable. Do not make the Cloudflare Pages check a required status (standard 02, rule 6).
   *Why:* the check must run without anyone remembering; the Pages check is skipped on skipped builds and would block merges.
4. **Builds fail loudly.** Pages decides success only by the build command's exit code; a script that prints errors and exits 0 deploys anyway. Any build step exits non-zero on failure.
   *Why:* otherwise a broken generator ships a broken site with a green tick.
5. **Live checks** (optional, run when you like or weekly): 200 on key pages, 404 on a fake path and on repo-only files, and a future `Expires` in security.txt. `templates/tests/check-live.mjs https://example.com` crawls the live site from its sitemap and fails on non-200 sitemap URLs, links to redirects, wrong canonicals, missing H1s, duplicate titles and orphans.
   It also checks the home page's live security headers and its JSON-LD Organization and WebSite nodes, since zone settings and Functions can send something other than `_headers`.
   *Why:* some failures only exist live (zone settings, old deployments, expired files).
6. **Every Worker has its own tests.** Form, booking and payment-webhook Workers get a test file run with Vitest and `@cloudflare/vitest-plugin`, which runs the code in the real Workers runtime with its bindings, in CI next to the site checks. At least: a valid request, a rejected Turnstile token, a missing or invalid field, the rate limit, and for webhooks a bad signature and a repeated event. Cloudflare's own template repo requires at least 5 tests per Worker template ([cloudflare/templates](https://github.com/cloudflare/templates/blob/main/AGENTS.md)).
   *Why:* `check-site.mjs` never reads Worker code, and the Worker is where the leads and payments go. When it breaks, a real visitor finds out first and the business never does.
7. **After every deploy that adds a page, check the newest page is in the live sitemap.** `node tests/check-live.mjs https://example.com --local-sitemap site/sitemap.xml` fails on any URL in the built sitemap that the live one lacks, and on a sitemap URL that does not answer 200.
   *Why:* the build writes the sitemap, but a deploy that failed, is still running or went to a preview leaves the live one behind, and a new page Google does not hear about can wait weeks to be found.
8. **Run Chrome's `legacy-scan` once per big change, and write down why each finding is kept.** `npx modern-web-guidance@1.0.0 legacy-scan .` lists code that a newer web-platform feature replaces (Modern Web Guidance, [10](10-performance.md) How to build it). Fix what is Baseline widely available ([10](10-performance.md) rule 11); for the rest, add one line per finding to the site's TODO.md or AGENTS.md: the file, the modern feature, and why it stays (for example "reached every browser only in 2026; needs a polyfill").
   *Why:* the scan returns the same findings every time, and without a written reason each new session reopens them. It checks only some of the guides (33 of about 250 in version 1.0), so a clean result does not mean the code is fully modern. On three sites it found 0, 2 and 4 findings; all six were kept, each for a stated reason.

## How to build it
```sh
mkdir -p tests && cp <site-standards>/templates/tests/check-site.mjs tests/
node tests/check-site.mjs --root site --domain example.com
```
Add `forbidden-terms.txt` at the repo root and the workflow at `.github/workflows/checks.yml`. For writing patterns, copy `templates/tests/check-writing.mjs` and `templates/slop-patterns.txt` next to it and add a CI step `node tests/check-writing.mjs --root site` (plus `--json` for each data file whose text JavaScript renders, standard 04).

For each Worker: `npm i -D -E vitest @cloudflare/vitest-plugin` (the old name `@cloudflare/vitest-pool-workers` is deprecated since late 2026, [npm](https://www.npmjs.com/package/@cloudflare/vitest-pool-workers)), a `vitest.config.mjs` with `plugins: [cloudflareTest({ wrangler: { configPath: "./wrangler.toml" } })]`, and tests that call the Worker through `exports.default.fetch()` from `cloudflare:workers` (the bindings from its config, so a locked `send_email` refuses other recipients and a rate limit really limits) or import the handler and pass fake bindings that record each email, to check the recipient without sending. Mock outside APIs (Turnstile, the booking tool, the payment gateway) so tests never hit them. Give the Worker folder its own `package.json` and lockfile, run in CI as a separate job: next to a site's Playwright dependencies, npm 10 crashed resolving Vitest's optional peers (`Cannot read properties of null (reading 'edgesOut')`); `legacy-peer-deps=true` in that folder's `.npmrc` gets past it.

## Check
- `check-site.mjs` exits non-zero and prints each failure with file and reason; run the current template from this repo too, since a site's copy can be older and miss a check.
- `check-writing.mjs` prints each warning with page, language and pattern group, and exits 0.
- After a deploy: `check-live.mjs https://example.com --local-sitemap <built sitemap>` prints `0 problems`.
- The site's TODO.md or AGENTS.md has a dated line for the last `legacy-scan` and a reason for each kept finding.

## Avoid
- Tests that only check that a file exists. Check the content that matters.
- A stale test that still enforces a decision the owner reversed. When a decision changes, the test changes with it.
- Browser-heavy test suites as the only gate: they get skipped when slow. Keep a fast static check that always runs.


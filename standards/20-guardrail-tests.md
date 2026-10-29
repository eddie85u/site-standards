# 20 · Guardrail tests
**Applies to:** every site.

## Why
Every standard here can be broken by one careless edit, very often by an AI agent that was asked to change something else. Nothing looks broken, so nobody notices for months. A fast automatic check that runs on every change is the only thing that reliably catches it.

66% of developers say their top frustration with AI tools is output that is "almost right, but not quite", and 45% say fixing AI-written code takes longer ([Stack Overflow survey, 2025](https://survey.stackoverflow.co/2025/ai)). On a website, "almost right" is a missing page title, a broken share image or a deleted privacy check that nobody sees.

## Rules
1. **Every site runs `templates/tests/check-site.mjs`** (no dependencies, Node 20+) before merging to production. It checks:
   - each HTML page: `lang`, `<title>`, meta description, canonical, exactly one `<h1>`, `og:image` present and the file exists, every `<img>` has `alt`
   - internal links and asset references point to files that exist
   - every JSON-LD block parses
   - hreflang alternates are reciprocal
   - warning only: indexable pages that no other indexable page links to (orphans, standard 05 rule 10), and sitemap URLs without `lastmod` (05 rule 5)
   - forbidden terms (`forbidden-terms.txt`) and the shared slop list (standard 04) do not appear in visible copy
   - no leftover placeholders (`lorem ipsum`, `{{`, `example.com`, `[NEED:`)
   - root-served sites: every root entry is site content or listed in `_routes.json`

   *Why:* these are the failures that are invisible on the page and expensive later.
2. **Owner decisions become assertions** (approved CTA wording, banned claims, required pages), updated **in the same change** as the decision.
   *Why:* a decision that lives only in a chat is undone by the next agent session. Our most stable site encodes its owner's banned words, mandatory call-to-action pair and price rules as tests.
3. **CI:** a GitHub Action runs the checks on every pull request (template: `templates/github/checks.yml`). Lighthouse CI is optional once the site is stable. Do not make the Cloudflare Pages check a required status (standard 02, rule 6).
   *Why:* the check must run without anyone remembering; the Pages check is skipped on skipped builds and would block merges.
4. **Builds fail loudly.** Pages decides success only by the build command's exit code; a script that prints errors and exits 0 deploys anyway. Any build step exits non-zero on failure.
   *Why:* otherwise a broken generator ships a broken site with a green tick.
5. **Live checks** (optional, run when you like or weekly): 200 on key pages, 404 on a fake path and on repo-only files, and a future `Expires` in security.txt. `templates/tests/check-live.mjs https://example.com` crawls the live site from its sitemap and fails on non-200 sitemap URLs, links to redirects, wrong canonicals, missing H1s, duplicate titles and orphans.
   *Why:* some failures only exist live (zone settings, old deployments, expired files).
6. **Every Worker has its own tests.** Form, booking and payment-webhook Workers get a test file run with Vitest and `@cloudflare/vitest-pool-workers`, which runs the code in the real Workers runtime with its bindings, in CI next to the site checks. At least: a valid request, a rejected Turnstile token, a missing or invalid field, the rate limit, and for webhooks a bad signature and a repeated event. Cloudflare's own template repo requires at least 5 tests per Worker template ([cloudflare/templates](https://github.com/cloudflare/templates/blob/main/AGENTS.md)).
   *Why:* `check-site.mjs` never reads Worker code, and the Worker is where the leads and payments go. When it breaks, a real visitor finds out first and the business never does.

## How to build it
```sh
mkdir -p tests && cp <site-standards>/templates/tests/check-site.mjs tests/
node tests/check-site.mjs --root site --domain example.com
```
Add `forbidden-terms.txt` at the repo root and the workflow at `.github/workflows/checks.yml`.

For each Worker: `npm i -D vitest @cloudflare/vitest-pool-workers`, a `vitest.config.ts` that points `defineWorkersProject` at the Worker's wrangler config, and tests that call the Worker with `SELF.fetch()`. Mock outside APIs (Turnstile, the booking tool, the payment gateway) so tests never hit them.

## Check
The script exits non-zero and prints each failure with file and reason.

## Avoid
- Tests that only check that a file exists. Check the content that matters.
- A stale test that still enforces a decision the owner reversed. When a decision changes, the test changes with it.
- Browser-heavy test suites as the only gate: they get skipped when slow. Keep a fast static check that always runs.


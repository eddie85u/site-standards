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
5. **Live checks** (optional, run when you like or weekly): 200 on key pages, 404 on a fake path and on repo-only files, and a future `Expires` in security.txt.
   *Why:* some failures only exist live (zone settings, old deployments, expired files).

## How to build it
```sh
mkdir -p tests && cp <site-standards>/templates/tests/check-site.mjs tests/
node tests/check-site.mjs --root site --domain example.com
```
Add `forbidden-terms.txt` at the repo root and the workflow at `.github/workflows/checks.yml`.

## Check
The script exits non-zero and prints each failure with file and reason.

## Avoid
- Tests that only check that a file exists. Check the content that matters.
- A stale test that still enforces a decision the owner reversed. When a decision changes, the test changes with it.
- Browser-heavy test suites as the only gate: they get skipped when slow. Keep a fast static check that always runs.


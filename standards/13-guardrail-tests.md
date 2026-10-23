# 13 · Guardrail tests

## Why
Every standard here can be broken by one careless edit, often by an AI agent. Cheap automated checks catch that before it ships.

## Rules
1. Every site runs `templates/tests/check-site.mjs` (no dependencies, Node 20+) before merging to production. It checks:
   - each HTML page: `lang`, `<title>`, meta description, canonical, exactly one `<h1>`, `og:image` present and the file exists, every `<img>` has `alt`
   - internal links and asset references point to files that exist
   - every JSON-LD block parses
   - hreflang alternates are reciprocal
   - forbidden terms from the site's `forbidden-terms.txt` (one term or regex per line) and the shared slop list (standard 14) do not appear in visible copy
   - no leftover placeholders (`lorem ipsum`, `{{`, `TODO`, `example.com`)
   - root-served sites: every root entry is site content or listed in `_routes.json`
2. Site-specific decisions (approved CTA wording, banned claims, required pages) become assertions in the site's own tests, updated **in the same change** as the decision.
3. **CI:** a GitHub Action runs the checks on every pull request (template: `templates/github/checks.yml`). Lighthouse CI on pull requests is optional but recommended once the site is stable.
4. **Live checks** (optional): a scheduled GitHub Action that curls the live domain weekly for 200 on key pages, 404 on a fake path and on repo-only files, and a future `Expires` in security.txt. Weekly is enough for a small marketing site.

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

## Notes from real sites
- 2026-10: the site with the strongest guardrails had tests that encode founder decisions (banned words, mandatory CTA pair, price rules) and a completeness test that fails when a new root file is not guarded. Both patterns are in the template.

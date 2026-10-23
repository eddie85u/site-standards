# 01 · Publishing hygiene

## Why
The fastest way to look amateur, or to leak something, is to publish files that were never meant to be public: internal notes, tests, AGENTS.md, a preview copy of the site that outranks the real one.

## Rules
1. **Only the site is served.** Prefer a dedicated output folder (for example `site/`) and set it as the host's publish directory. In Cloudflare Pages this is *Settings → Build → Build output directory*; with no build command, Pages serves that folder as-is.
2. If the site must be served from the repo root, every repo-only path (docs, tests, scripts, worker code, dotfiles, `package.json`) must return **404** through a guard (template: `templates/functions/_middleware.js` + `templates/_routes.json`), and a test must fail when a new root entry is neither site content nor guarded.
3. **Business material never goes in a site repo**, not even gitignored: contracts, pricing rationale, client data, compliance notes. Keep it in a separate private workspace repo.
4. **Preview hosts are noindex.** Every `*.pages.dev` host (production alias and branch previews) sends `X-Robots-Tag: noindex`.
5. **Unknown paths return a real 404** with a branded `404.html` that has `<meta name="robots" content="noindex">` and links back home (in every site language).
6. **One canonical host.** HTTP redirects to HTTPS and `www` redirects to the apex (or the reverse), with a 301 that keeps the path and query string.
7. **Old deployments are deleted** once they contain anything that should not be public. Every past deployment stays reachable at its own `<hash>.<project>.pages.dev` address until deleted.

## How to build it
- New site: put the site in `site/`, set the output directory, copy `templates/_headers` (preview noindex block) and `templates/404.html`.
- Root-served site: copy `templates/functions/_middleware.js` and `templates/_routes.json`, list every repo-only path in `_routes.json`, and add the completeness check from `templates/tests/check-site.mjs`.
- Redirects (Cloudflare): *SSL/TLS → Edge Certificates → Always Use HTTPS* on; a *Rules → Redirect Rule* for `www` → apex with "Preserve query string". Pages ignores domain-level rules in `_redirects`.

## Check
```sh
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/this-should-404     # 404
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/AGENTS.md           # 404
curl -sI https://<project>.pages.dev/ | grep -i x-robots-tag                      # noindex
curl -sI http://www.example.com/a?b=1 | grep -i location                          # https://example.com/a?b=1
```

## Avoid
- **No `404.html` on Cloudflare Pages.** Pages then treats the site as a single-page app and answers every unknown URL with the homepage and a 200 (a "soft 404" that search engines penalise). Detect: the first curl above returns 200.
- Gitignoring a private file and assuming it is safe: anything in the published folder at deploy time is served, and a later commit can add it by mistake.
- Deleting a file from the latest deploy and forgetting the older deployments that still serve it.

## Notes from real sites
- 2026-10: a root-served site leaked internal docs through two dozen old preview deployments long after the guard was added. Deleting deployments is manual (dashboard) and permanent.
- 2026-10: a `site/` output folder is simpler than a guard: nothing outside it can leak, and no test is needed to police the root.

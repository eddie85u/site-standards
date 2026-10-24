# 14 · Publishing hygiene
**Applies to:** every site.

## Why
The fastest way to look amateur, or to leak something, is to publish files that were never meant to be public: internal notes, tests, AGENTS.md, or a preview copy of the site that outranks the real one. Static hosts serve whatever is in the folder, and every past deploy stays online at its own address, so a leak outlives the fix unless you clean up.

This is not hypothetical:
- Attackers scanned more than 230 million targets, harvested exposed `.env` files from 110,000 domains, and used the 7,000 cloud credentials inside to extort the owners. The cause was misconfiguration, not a software flaw ([Unit 42, 2024](https://unit42.paloaltonetworks.com/large-scale-cloud-extortion-operation/)).
- A scan of 3.5 million hosts found 28,000 publicly exposed `.git` folders holding 400 AWS keys and 107 Stripe keys ([Intruder, 2026](https://intruder.io/research/api-keys-bank-details-disciplinary-files-what-28-000-exposed-git-repos-gave-up)).

## Rules
1. **Only the site is served.** Put it in a dedicated output folder (for example `site/`) and set that as the publish directory (Cloudflare Pages: *Settings → Build → Build output directory*; with no build command, Pages serves the folder as-is).
   *Why:* nothing outside the folder can leak, so no guard or test is needed.
2. **Root-served sites need a guard.** Every repo-only path (docs, tests, scripts, worker code, dotfiles, `package.json`) returns **404** through `templates/functions/_middleware.js` + `templates/_routes.json`, and a test fails when a new root entry is neither site content nor guarded.
   *Why:* without `_routes.json`, Pages sends every request through the Function, which burns the free daily Function allowance and strips your `_headers` (they do not apply to Function responses). `_routes.json` allows 100 rules of 100 characters, and exclude beats include.
3. **Business material never goes in a site repo,** not even gitignored: contracts, pricing rationale, client data, compliance notes. Keep it in a separate private workspace repo.
   *Why:* one `git add .` publishes it, and git history keeps it after you delete it.
4. **The `pages.dev` hosts stay out of search.** Send `X-Robots-Tag: noindex` on the production `<project>.pages.dev` host and on branch previews (template `_headers`). Stronger still: an account-level Bulk Redirect from `<project>.pages.dev` to the custom domain.
   *Why:* Pages adds noindex to branch previews by itself but not to the production `pages.dev` host, which serves a duplicate of your site.
5. **Unknown paths return a real 404** with a branded `404.html` that carries `noindex` and links home. Pages serves the nearest `404.html` walking up from the requested folder, so `/es/404.html` gives Spanish visitors a Spanish page.
   *Why:* without any `404.html`, Pages treats the site as a single-page app and answers every unknown URL with the homepage and a 200, a soft 404 that search engines penalise.
6. **One canonical host.** HTTP → HTTPS and `www` → apex (or the reverse) with a 301 that keeps the path and query string.
   *Why:* two hosts split links and rankings, and dropping the query string loses UTMs.
7. **Old deployments are deleted once they contain anything that should not be public.** Every past deployment stays reachable at `<hash>.<project>.pages.dev` until deleted.
   - The newest deployment of each branch cannot be deleted; push a clean commit to that branch first.
   - Aliased deployments need `wrangler pages deployment delete <id> --force`, and projects with over 100 deployments may need Cloudflare's bulk-delete script.
   - Delete only what leaks: any clean production deployment is a one-click rollback (standard 02).
8. **Optional: lock previews to your team** with *Settings → General → Enable access policy* (Cloudflare Access, free for small teams). It covers previews, not the production `pages.dev` host.
   *Why:* previews of unreleased copy or prices are otherwise public to anyone who guesses the URL.

## How to build it
- New site: put the site in `site/`, set the output directory, copy `templates/_headers` and `templates/404.html`.
- Root-served site: copy `templates/functions/_middleware.js` and `templates/_routes.json`, list every repo-only path, and add the completeness check from `templates/tests/check-site.mjs`.
- Cloudflare: *SSL/TLS → Edge Certificates → Always Use HTTPS* on; a *Rules → Redirect Rule* for `www` → apex with "Preserve query string". Pages ignores domain-level rules in `_redirects`.

## Check
```sh
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/this-should-404     # 404
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/AGENTS.md           # 404
curl -sI https://<project>.pages.dev/ | grep -i x-robots-tag                      # noindex (or a 301 to the domain)
curl -sI http://www.example.com/a?b=1 | grep -i location                          # https://example.com/a?b=1
curl -s -o /dev/null -w "%{http_code}\n" https://<old-hash>.<project>.pages.dev/AGENTS.md   # 404 once old deploys are gone
```

## Avoid
- Gitignoring a private file and assuming it is safe: anything in the published folder at deploy time is served.
- Deleting a file from the latest deploy and forgetting the older deployments that still serve it.
- A `noindex` page that is also disallowed in robots.txt: crawlers never fetch it, so they never see the noindex.

## Notes from real sites
- 2026-10: a root-served site leaked internal docs through two dozen old deployments long after the guard was added. Deleting them took a manual session in the dashboard; sampled old URLs returned 404 afterwards.
- 2026-10: a `site/` output folder is simpler than a guard: nothing outside it can leak, and no test is needed to police the root.

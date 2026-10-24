# AGENTS.md — {{repo name}} ({{domain}})

Rules for any AI agent or person working in this repo. Read this, then `TODO.md`. Before you finish, update `TODO.md`: remove what you completed (git history is the record) and add anything new you found.

## What this is
{{One paragraph: the business, the audience, the languages, the main conversion.}}

## Standards
This site follows **site-standards** (github.com/eddie85u/site-standards). Use its `standards/` files and `templates/` when building or changing anything they cover. Deliberate exceptions for this site:
- {{e.g. "No cookie banner: the site loads no trackers."}}

When you learn something new about a standard while working here, add it to that standard in site-standards, in the rule's why or its Avoid list (or to TODO.md if it is not cloned). Do not run a cross-site sweep unless the owner asks for one.

## Publishing
- Host: {{Cloudflare Pages project NAME}}, git-connected: a branch push builds a preview, a merge to `main` deploys production.
- Published folder: {{site/ | repo root guarded by functions/_middleware.js + _routes.json}}.
- Business material never goes in this repo; it lives in {{private workspace repo}}.

## Copy and claims
- Voice: {{tone in a few words}}.
- Never publish: {{banned words and claims}} (enforced by `forbidden-terms.txt`).
- Copy changes need the owner's approval first: show before and after.

## Run and verify
```sh
{{start command}}
node tests/check-site.mjs --root {{site}} --domain {{domain}}
```

## Services in use
{{Every third-party service the site loads or sends data to.}} Adding or removing one means updating, in the same change: the CSP in `_headers`, the privacy policy's processor list, and this list.

## Deploy policy
Branch → checks pass → merge to `main`. No manual uploads for site changes. A bad deploy is rolled back first (Pages → Deployments → an earlier production deployment → Rollback), then fixed on a branch.

## Accounts
{{Where analytics, search and DNS live, and who owns them. Keep IDs here, not in public repos.}}

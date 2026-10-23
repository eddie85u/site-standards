# 02 · Repo and agent setup
**Applies to:** every site.

## Why
A site is maintained by many sessions, people and AI tools over years. An agent starts every session knowing nothing about your decisions; plain-text rules in the repo are the only memory every one of them shares. This is what makes "point the agent at the repo" work a year from now.

## Rules
1. **AGENTS.md** at the repo root (template: `templates/AGENTS.md`): what the site is, how it is published, which files must never be served, copy and claims rules, the services the site uses, how to run and test, the deploy policy, and a pointer to site-standards.
   *Why:* every major coding agent reads it (Claude Code, Codex, Cursor, OpenCode, Copilot), so the rules live once.
2. **CLAUDE.md** containing only `@AGENTS.md`.
   *Why:* Claude Code reads CLAUDE.md; the import keeps one source of truth.
3. **TODO.md** (template: `templates/TODO.md`): open work only, one line each, citing the standard number. Items are deleted when done; git history is the record.
   *Why:* a list of finished work buries what is open, and agents waste context reading it.
4. **Repo-only files are never served** (standard 14).
5. **Deploy policy:** work on a branch, run the checks, merge to `main` to deploy. No manual uploads. Rollback is a click in *Deployments*, to any earlier successful production deployment (never to a preview), so write that in AGENTS.md as the first response to a bad deploy.
   *Why:* every change is reviewable and reversible, and nobody has to remember how to undo one under pressure.
6. **Builds you do not need do not run.** The free plan allows 500 builds a month, one at a time. Start a commit message with `[CF-Pages-Skip]` for docs-only changes, set build watch paths, and exclude bot branches (`dependabot/*`) from previews. Skipped builds post no GitHub check, so never make the Pages check a required status.
   *Why:* bot branches and TODO edits can use up the month's builds, and a required check that never arrives blocks merging.
7. **Private material** lives in a separate private repo (a "workspace") per business: contracts, research, raw photos, compliance notes, account IDs.
   *Why:* a site repo is one setting away from public, and its files one bug away from being served.
8. **Exceptions are written down.** The site's AGENTS.md lists which standards apply and every deliberate exception ("no cookie banner: no trackers").
   *Why:* otherwise the next agent "fixes" the exception, or an audit reports it as a gap every time.
9. **Permanent choices are made once, carefully:** the `<project>.pages.dev` name cannot be renamed, a Git-connected project cannot switch to direct upload, and the Cloudflare GitHub app should see only the repos it deploys. Deploy hook URLs are secrets: anyone holding one can trigger builds.
   *Why:* these are the settings people discover they cannot undo.

## Check
```sh
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/AGENTS.md   # 404
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/TODO.md     # 404
```

## Notes from real sites
- None yet. Add the first dated lesson here.

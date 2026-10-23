# 16 · Repo and agent setup
**Applies to:** every site.

## Why
A site is maintained by many sessions, people and AI tools over years. Plain-text rules in the repo keep every one of them consistent.

## Rules
1. **AGENTS.md** at the repo root (template: `templates/AGENTS.md`): what the site is, how it is published, which files must never be served, copy and claims rules, how to run and test, the deploy policy, and a pointer to site-standards. It works with any agent (Claude Code, Codex, OpenCode, Cursor).
2. **CLAUDE.md** containing only `@AGENTS.md`, so Claude Code reads the same rules.
3. **TODO.md** (template: `templates/TODO.md`): open work only. Items are removed when done; git history is the record. No changelog of finished work.
4. AGENTS.md, CLAUDE.md, TODO.md and other repo-only files are never served (standard 01).
5. **Deploy policy:** work on a branch, run the checks, merge to `main` to deploy production. No manual uploads for site changes.
6. **Private material** lives in a separate private repo (a "workspace") per business: contracts, research, raw photos, compliance notes.
7. The site's AGENTS.md says which site-standards apply and records deliberate exceptions ("no cookie banner: no trackers").

## Check
```sh
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/AGENTS.md   # 404
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/TODO.md     # 404
```

## Notes from real sites

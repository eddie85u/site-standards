# Launch checklist

One line per standard. Tick on the live domain, not on a preview. Details and commands are in each standard's "Check" section.

## Before the first deploy
- [ ] Accounts on free tiers that upgrade in place, owned by the business, with 2FA (17)
- [ ] Site lives in `site/` (or root guard + `_routes.json`); business material is in a private repo (01, 16)
- [ ] AGENTS.md, CLAUDE.md, TODO.md from the templates; exceptions written down (16)
- [ ] `_headers` with preview noindex, security headers and a CSP built from real origins (01, 02)
- [ ] `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `security.txt`, `site.webmanifest`, icons (01, 04, 07, 08)
- [ ] Every page: title, description, canonical, one H1, `lang`, OG tags and its own share image (04, 06)
- [ ] JSON-LD Organization + WebSite on every page; Service, FAQ, Breadcrumb where they fit (05)
- [ ] Consent banner and consent-gated analytics, live host only; UTMs captured (09)
- [ ] Privacy policy; `forbidden-terms.txt` with the site's banned claims (10)
- [ ] Copy read against the slop list and out loud (14)
- [ ] `check-site.mjs` passes and runs in CI (13)

## Right after launch
- [ ] Unknown path and AGENTS.md return 404; `*.pages.dev` sends noindex (01)
- [ ] securityheaders.com A, SSL Labs A (02, 15)
- [ ] PageSpeed Insights mobile 90+ in all four scores (03, 11)
- [ ] Search Console + Bing verified, sitemap submitted (04)
- [ ] Rich Results Test clean; share preview checked in LinkedIn and WhatsApp (05, 06)
- [ ] AI bots get 200 (curl with GPTBot, ClaudeBot, PerplexityBot); CDN bot settings match robots.txt (07)
- [ ] Consent test: no trackers before Accept, none after Reject (09)
- [ ] GA4 key events, Clarity linked, AI-assistants channel group, internal-traffic filter Active (09)
- [ ] Form test end to end; SPF, DKIM, DMARC pass (12)
- [ ] DNSSEC, Crawler Hints, Always Use HTTPS, www redirect keeps path and query (01, 15)
- [ ] Old deployments with anything private deleted (01)

## Every few months
- [ ] security.txt `Expires` still in the future
- [ ] DMARC moved one step stricter if reports are clean
- [ ] llms.txt and JSON-LD still match prices and offers
- [ ] Re-run the audit prompt from the README

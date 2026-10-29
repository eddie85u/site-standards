# Launch checklist

One line per standard. Tick on the live domain, not on a preview. Details and commands are in each standard's "Check" section.

## Before the first deploy
- [ ] Accounts on free tiers that upgrade in place, owned by the business, with 2FA (01)
- [ ] 10 to 20 buyer prompts written down, each mapped to the page that answers it (03)
- [ ] Search log started: seeds researched per language, clusters with one owning page each (21)
- [ ] If you take bookings or payments: 12 and 13, tested end to end in test mode
- [ ] Site lives in `site/` (or root guard + `_routes.json`); business material is in a private repo (14, 02)
- [ ] AGENTS.md, CLAUDE.md, TODO.md from the templates; exceptions written down (02)
- [ ] `_headers` with preview noindex, security headers and a CSP built from real origins (14, 15)
- [ ] `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `security.txt`, `site.webmanifest`, icons (14, 05, 07, 16)
- [ ] Every page: title, description, canonical, one H1, `lang`, OG tags and its own share image (05, 08)
- [ ] JSON-LD Organization + WebSite on every page; Service, FAQ, Breadcrumb where they fit (06)
- [ ] Consent banner and consent-gated analytics, live host only; UTMs captured (19)
- [ ] Privacy policy; `forbidden-terms.txt` with the site's banned claims (18)
- [ ] Copy read against the slop list and out loud (04)
- [ ] `check-site.mjs` passes and runs in CI; each Worker has its own tests (20)

## Right after launch
- [ ] Unknown path and AGENTS.md return 404; `*.pages.dev` sends noindex (14)
- [ ] securityheaders.com A, SSL Labs A (15, 17)
- [ ] PageSpeed Insights mobile 90+ in all four scores (10, 09)
- [ ] Search Console + Bing verified, sitemap submitted; Search Console included in generative AI features (05)
- [ ] Rich Results Test clean; share preview checked in LinkedIn and WhatsApp (06, 08)
- [ ] AI bots get 200 (curl with GPTBot, ClaudeBot, PerplexityBot); CDN bot settings match robots.txt (07)
- [ ] Consent test: no trackers or embeds before Accept, none after Reject, including on the next page (19)
- [ ] GA4 key events, Clarity linked, AI-assistants channel group, internal-traffic filter Active (19)
- [ ] Form test end to end, mail only to the configured inbox; SPF, DKIM, DMARC pass (11)
- [ ] A failed production deploy sends an alert to an inbox someone reads (02)
- [ ] No `Access-Control-Allow-Origin: *`; preview bots (LinkedInBot, facebookexternalhit) get 200 (15, 08)
- [ ] DNSSEC, Crawler Hints, Always Use HTTPS, www redirect keeps path and query (14, 17)
- [ ] Old deployments with anything private deleted (14)
- [ ] Map profiles and first directories claimed, same facts as the JSON-LD, each linking its owning page (22)

## Every month
- [ ] Search Console loop: apply the decision table, one change per page, logged (21)

## Every few months
- [ ] security.txt `Expires` still in the future
- [ ] DMARC moved one step stricter if reports are clean
- [ ] llms.txt and JSON-LD still match prices and offers
- [ ] Re-run the buyer prompts (3 runs per assistant) and log named, recommended, cited (03)
- [ ] 3 to 5 new relevant linking domains this quarter, logged (22)
- [ ] Re-run the audit prompt from the README

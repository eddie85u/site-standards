# Site Standards

A playbook for building marketing websites that are fast, secure, visible to search engines and AI assistants, compliant, and look like a serious company is behind them. Brand, colors and motion are yours; everything underneath is here.

Written for AI coding agents and the people steering them. Every standard says **what** to build, **exactly how**, **how to check it**, and **what to avoid**. Starter files are in [`templates/`](templates/).

Learned by building and running real small-business sites on static hosting (Cloudflare Pages), free plans only.

## How to use it

**New site.** Point your agent at this repo and say:
> Read site-standards (README.md, then every file in standards/). Build this site following every standard that applies, starting from templates/. List any standard you skipped and why.

**Existing site.** Run an audit:
> Audit this site against site-standards. For each standard in standards/, check the repo and the live domain using that standard's "Check" section. Report pass, partial or missing, and add each gap to the site's TODO.md.

**Improving one standard across several sites (a sweep).** Only when you ask for it, never as a side effect of other work. See [AGENTS.md](AGENTS.md#sweeps).

## The standards

| # | Standard | Why it matters |
|---|---|---|
| 01 | [Publishing hygiene](standards/01-publishing-hygiene.md) | Only the site is public; previews stay out of search; real 404s |
| 02 | [Security headers](standards/02-security-headers.md) | HTTPS, HSTS, CSP and friends; an A on securityheaders.com |
| 03 | [Performance](standards/03-performance.md) | Core Web Vitals in the green on a mid-range phone |
| 04 | [Search basics](standards/04-search.md) | Titles, canonicals, sitemaps, hreflang, Search Console and Bing |
| 05 | [Structured data](standards/05-structured-data.md) | Organization, WebSite, Service, FAQ in JSON-LD |
| 06 | [Social previews](standards/06-social-previews.md) | Open Graph and per-page share images |
| 07 | [AI visibility](standards/07-ai-visibility.md) | robots.txt for AI crawlers, llms.txt, Markdown copies, Content-Signal |
| 08 | [Trust files](standards/08-trust-files.md) | security.txt, humans.txt, web app manifest, icons |
| 09 | [Analytics and consent](standards/09-analytics-consent.md) | Consent-gated GA4 + Clarity, key events, UTMs, AI channel group |
| 10 | [Privacy and compliance](standards/10-privacy-compliance.md) | Privacy policy, cookie banner, claims you must not make |
| 11 | [Accessibility](standards/11-accessibility.md) | WCAG 2.2 AA floors, reduced motion |
| 12 | [Forms and email](standards/12-forms-email.md) | Turnstile, server-side handling, SPF/DKIM/DMARC |
| 13 | [Guardrail tests](standards/13-guardrail-tests.md) | Automated checks so none of this silently breaks |
| 14 | [Content quality and AI slop](standards/14-content-quality.md) | What reads as generated, how to find it, how to fix it |
| 15 | [Zone and domain](standards/15-zone-domain.md) | DNS, DNSSEC, registrar, Crawler Hints |
| 16 | [Repo and agent setup](standards/16-repo-agents.md) | AGENTS.md, TODO.md, deploy policy |

## What "done" looks like
A site meets the standards when, on the live domain:
- securityheaders.com grades it **A** or better, and SSL Labs grades it **A**.
- PageSpeed Insights (mobile) shows **90+** for Performance, Accessibility, Best Practices and SEO, and the Core Web Vitals field data (once there is enough traffic) is green.
- `curl` of any unknown path returns **404**, and every file in the repo that is not part of the site returns 404.
- The Rich Results Test finds the Organization graph with no errors.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/.well-known/security.txt` return 200 with the right content type.
- The guardrail tests pass in CI.

## Tools worth knowing
- **PageSpeed Insights, securityheaders.com, SSL Labs, Rich Results Test, opengraph.xyz:** the free graders behind "done" above.
- **Cloudflare security-audit skill** (github.com/cloudflare/security-audit-skill): an agent-run vulnerability audit for Workers and Pages Functions. Worth running on anything that handles payments or webhooks. Run it in a sandbox; it executes code.
- **Cloudflare ai-brand-visibility-template:** checks whether AI models mention a brand for chosen prompts. Workers AI models fit the free allowance; third-party models cost credits.

## Assumptions
Static HTML/CSS/JS (no framework required) on Cloudflare Pages with the domain's DNS on Cloudflare. Most of it applies to any static host; where a rule is Cloudflare-specific it says so.

## License
MIT. Use it, fork it, adapt it.

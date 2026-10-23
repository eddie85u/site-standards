# Site Standards

**Everything a marketing website needs under the hood, written so your AI coding agent can build it.**

Brand, colors and scroll animations are yours. What's here is the part every site should share: fast, secure, visible to Google *and* to ChatGPT, Claude and Perplexity, compliant with privacy rules, measured properly, and solid enough that visitors assume a serious company is behind it. All of it on free tiers, for the price of a domain.

These are lessons learned building and running real business sites with AI coding agents, kept up to date as new ones come in.

## Why point your agent here
Coding agents are good at writing a site and bad at remembering everything a site needs. Ask one for a landing page and you get a nice hero, but usually no security headers, a preview copy indexed by Google, a cookie banner that doesn't block anything, AI crawlers silently blocked by the CDN, and copy full of "seamless" and "unlock". Nothing looks broken, so nobody notices.

Point the agent at this repo and it gets:
- **A checklist it can't skip.** 17 standards, each with exact rules instead of "consider adding".
- **Working starter files.** Headers, robots.txt with current AI bot names, llms.txt, security.txt, a consent banner, analytics that waits for consent, and JSON-LD.
- **A way to check its own work.** Every standard ends with the commands that prove it is done, and `check-site.mjs` runs the static checks in CI.
- **A list of mistakes to avoid.** Outdated advice, invented bot names, soft 404s, and AI-sounding copy, with ways to detect each one.
- **Lessons from production.** Dated notes from live sites, including the things that broke.

It works with any agent that reads files: Claude Code, Codex, Cursor, OpenCode, Copilot.

## How to use it

**Building a new site.** Clone or link this repo, then tell your agent:
> Read site-standards (README.md, then every file in standards/). Build this site following every standard that applies, starting from templates/. List any standard you skipped and why.

**Auditing an existing site:**
> Audit this site against site-standards. For each standard in standards/, check the repo and the live domain using that standard's "Check" section. Report pass, partial or missing, and add each gap to the site's TODO.md.

**Keeping it in the loop.** Copy [`templates/AGENTS.md`](templates/AGENTS.md) into your repo. It tells every future session to follow these standards and to record anything new it learns.

**Launch day:** [CHECKLIST.md](CHECKLIST.md) is the one-page version.

## The standards

| # | Standard | What it gets you |
|---|---|---|
| 01 | [Publishing hygiene](standards/01-publishing-hygiene.md) | Only the site is public; previews stay out of search; real 404s |
| 02 | [Security headers](standards/02-security-headers.md) | HTTPS, HSTS, CSP; an A on securityheaders.com |
| 03 | [Performance](standards/03-performance.md) | Core Web Vitals in the green on a mid-range phone |
| 04 | [Search basics](standards/04-search.md) | Titles, canonicals, sitemaps, hreflang, Search Console and Bing |
| 05 | [Structured data](standards/05-structured-data.md) | Organization, WebSite, Service, FAQ in JSON-LD |
| 06 | [Social previews](standards/06-social-previews.md) | A proper preview card on every share |
| 07 | [AI visibility](standards/07-ai-visibility.md) | AI crawlers allowed, llms.txt, Content-Signal, text readable without JavaScript |
| 08 | [Trust files](standards/08-trust-files.md) | security.txt, web app manifest, icons |
| 09 | [Analytics and consent](standards/09-analytics-consent.md) | GA4 + Clarity that wait for consent, key events, UTMs, AI traffic channel |
| 10 | [Privacy and compliance](standards/10-privacy-compliance.md) | Privacy policy, an honest cookie banner, claims to never make |
| 11 | [Accessibility](standards/11-accessibility.md) | WCAG 2.2 AA floors and reduced motion |
| 12 | [Forms and email](standards/12-forms-email.md) | Spam-free forms; SPF, DKIM, DMARC |
| 13 | [Guardrail tests](standards/13-guardrail-tests.md) | Automated checks so none of this silently breaks |
| 14 | [Content quality and AI slop](standards/14-content-quality.md) | What reads as generated, and how to find and fix it |
| 15 | [Zone and domain](standards/15-zone-domain.md) | DNS, DNSSEC, registrar, Crawler Hints |
| 16 | [Repo and agent setup](standards/16-repo-agents.md) | AGENTS.md, TODO.md, deploy policy |
| 17 | [Stack and costs](standards/17-stack-costs.md) | The free stack, what each piece does, and why free is still robust |

## What "done" looks like
On the live domain:
- securityheaders.com grades it **A** or better, and SSL Labs grades it **A**.
- PageSpeed Insights (mobile) scores **90+** in Performance, Accessibility, Best Practices and SEO.
- Any unknown path returns **404**, and so does every repo file that is not part of the site.
- The Rich Results Test finds the Organization graph with no errors.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/.well-known/security.txt` return 200.
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot) get a 200, not a 403.
- `check-site.mjs` passes in CI.

## Live examples
These sites run on this stack and are being brought up to every standard. Each one's progress feeds the notes here.
- [strategyandstack.com](https://strategyandstack.com): B2B sales systems and AI automation
- [remoteaccountingteam.com](https://remoteaccountingteam.com): remote accounting teams for US businesses
- [regeneraxis.com](https://regeneraxis.com): a bilingual regenerative medicine and longevity clinic

## Tools worth knowing
- **PageSpeed Insights, securityheaders.com, SSL Labs, Rich Results Test, opengraph.xyz:** free graders for the checks above.
- **[Cloudflare security-audit skill](https://github.com/cloudflare/security-audit-skill):** a coding-agent skill for multi-phase security audits with independently verified findings. Worth running on anything that handles forms, payments or webhooks, even code another model already reviewed. Run it in a sandbox, because it executes code.
- **Cloudflare ai-brand-visibility-template:** checks whether AI models mention your brand for chosen prompts. Workers AI models fit the free allowance; third-party models cost credits.

## Assumptions
Static HTML/CSS/JS (no framework required) on Cloudflare Pages, with the domain's DNS on Cloudflare. Most of it applies to any static host; where a rule is Cloudflare-specific, it says so.

## Not legal advice
The privacy, consent and accessibility standards describe common good practice, not legal advice for your situation. Laws differ by country and industry. Have a lawyer review your privacy policy and any regulated claims before you run ads.

## Contributing
Found something outdated, or a lesson worth adding? Open an issue or a pull request. Keep it specific, checkable and free of hype (see [AGENTS.md](AGENTS.md) for the format).

## Who made this
Built and maintained by **Eddie** ([@eddie85u](https://github.com/eddie85u)), founder of [Strategy & Stack](https://strategyandstack.com), which builds sales systems and AI automation for service businesses. If you want this applied to your site, or a site built on it, [book a call](https://strategyandstack.com).

## License
MIT. Use it, fork it, adapt it.

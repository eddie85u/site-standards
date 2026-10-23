# Site Standards

**Everything a business website needs under the hood, written so your AI coding agent can build it.**

- Did you know a professional-grade site can cost **less than $15 a year** to run? That's the domain. Hosting, security, analytics and booking can all be free. [See the stack →](standards/01-stack-costs.md)
- When someone asks ChatGPT or Perplexity for a business like yours, **can it even read your site?** Many sites block AI crawlers without knowing it. [Check yours →](standards/07-ai-visibility.md)
- Your cookie banner might be **decoration**. If analytics loads before the visitor clicks, the banner isn't doing its job. [Fix it →](standards/19-analytics-consent.md)
- Does your copy say "seamless", "unlock" and "elevate"? Readers notice. [The AI-slop list →](standards/04-content-quality.md)

Brand, colors and scroll animations are yours. What's here is what every site should share, in any industry: fast, secure, visible to Google *and* AI assistants, privacy-compliant, measured properly, built to convert, and solid enough that visitors assume a serious company is behind it.

These are lessons learned building and running real business sites with AI coding agents, kept up to date as new ones come in. Free to use.

## What are you building?
Pick your goal and read only what it needs. Every site should end up with the **baseline** (01–11 and 14–20); booking and payments depend on how your business makes money.

| I want to… | Start with | Then |
|---|---|---|
| **Launch a site that looks like a serious company** | [CHECKLIST.md](CHECKLIST.md) | The baseline |
| **Be the business ChatGPT, Claude and Perplexity recommend** | [03 Win the comparison](standards/03-win-the-comparison.md) | [07 AI visibility](standards/07-ai-visibility.md), [06 Structured data](standards/06-structured-data.md), [05 Search](standards/05-search.md) |
| **Find out what my buyers search for** | [03 Win the comparison](standards/03-win-the-comparison.md), "Before" | [05 Search](standards/05-search.md) for Search Console |
| **Get booked calls or appointments** | [12 Booking](standards/12-booking.md) | [19 Analytics](standards/19-analytics-consent.md), to know which page and campaign booked them |
| **Get paid online** (consultations, deposits, courses) | [13 Payments](standards/13-payments.md) | [12 Booking](standards/12-booking.md) for paid calls, [18 Privacy](standards/18-privacy-compliance.md) for terms and refunds |
| **Collect leads with a form** | [11 Forms and email](standards/11-forms-email.md) | [19 Analytics](standards/19-analytics-consent.md) for the source of every lead |
| **Measure without legal risk** | [19 Analytics and consent](standards/19-analytics-consent.md) | [18 Privacy](standards/18-privacy-compliance.md) |
| **Spend as little as possible** | [01 Stack and costs](standards/01-stack-costs.md) | |
| **Check a site I already have** | The audit prompt below | Each gap goes to your TODO.md |

## Why point your agent here
Coding agents are good at writing a site and bad at remembering everything a site needs. Ask one for a landing page and you get a nice hero, but usually no security headers, a preview copy indexed by Google, a cookie banner that doesn't block anything, AI crawlers silently blocked by the CDN, and copy full of "seamless" and "unlock". Nothing looks broken, so nobody notices.

Point the agent at this repo and it gets:
- **A checklist it can't skip.** 20 standards in the order you build, each rule with its reason, so the agent knows when an exception is safe.
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

## All the standards
Each one is self-contained: tell your agent *"Apply standard 12 from site-standards"* and it has everything it needs.

| # | Standard | Applies to | What it gets you |
|---|---|---|---|
| | **Plan** | | |
| 01 | [Stack and costs](standards/01-stack-costs.md) | Every site | The free stack, what each piece does, and why free is still robust |
| 02 | [Repo and agent setup](standards/02-repo-agents.md) | Every site | AGENTS.md, TODO.md, deploy and rollback policy |
| 03 | [Win the comparison](standards/03-win-the-comparison.md) | Every site | Find what buyers ask Google and AI, answer it, and measure whether you are named |
| | **Build** | | |
| 04 | [Content quality and AI slop](standards/04-content-quality.md) | Every site | Copy that is specific, provable and quotable |
| 05 | [Search basics](standards/05-search.md) | Every site | Titles, canonicals, sitemaps, hreflang, Search Console and Bing |
| 06 | [Structured data](standards/06-structured-data.md) | Every site | Organization, WebSite, Service, FAQ in JSON-LD; the site name Google shows |
| 07 | [AI visibility](standards/07-ai-visibility.md) | Every site | AI crawlers allowed, llms.txt, Content-Signal, text readable without JavaScript |
| 08 | [Social previews](standards/08-social-previews.md) | Every site | A preview card that works on LinkedIn *and* WhatsApp |
| 09 | [Accessibility](standards/09-accessibility.md) | Every site | WCAG 2.2 AA floors and reduced motion |
| 10 | [Performance](standards/10-performance.md) | Every site | Core Web Vitals in the green on a mid-range phone |
| | **Convert** | | |
| 11 | [Forms and email](standards/11-forms-email.md) | Sites with a form or own-domain email | Spam-free forms; SPF, DKIM, DMARC |
| 12 | [Booking](standards/12-booking.md) | If you take bookings | Cal.com, TidyCal, Calendly; UTMs on every meeting; paid-booking patterns |
| 13 | [Payments](standards/13-payments.md) | If you sell online | Stripe, Mollie, Wompi, Mercado Pago, merchants of record |
| | **Protect** | | |
| 14 | [Publishing hygiene](standards/14-publishing-hygiene.md) | Every site | Only the site is public; previews stay out of search; real 404s |
| 15 | [Security headers](standards/15-security-headers.md) | Every site | HTTPS, HSTS, a CSP that does not get in your way; an A on securityheaders.com |
| 16 | [Trust files](standards/16-trust-files.md) | Every site | security.txt, web app manifest, icons in browsers and search results |
| 17 | [Zone and domain](standards/17-zone-domain.md) | Every site | DNS, DNSSEC, registrar, custom-domain gotchas |
| 18 | [Privacy and compliance](standards/18-privacy-compliance.md) | Every site | Privacy policy, an honest banner, claims to never make |
| 19 | [Analytics and consent](standards/19-analytics-consent.md) | Every site | Tracking that waits for consent, the real liabilities, and how to lose little data |
| | **Maintain** | | |
| 20 | [Guardrail tests](standards/20-guardrail-tests.md) | Every site | Checks so none of this silently breaks |

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
- [regeneraxis.com](https://regeneraxis.com): a bilingual longevity and regeneration center

## Tools worth knowing
- **PageSpeed Insights, securityheaders.com, SSL Labs, Rich Results Test, opengraph.xyz:** free graders for the checks above.
- **[Cloudflare security-audit skill](https://github.com/cloudflare/security-audit-skill):** a coding-agent skill for multi-phase security audits with independently verified findings. Worth running on anything that handles forms, payments or webhooks, even code another model already reviewed. Run it in a sandbox, because it executes code.
- **Cloudflare ai-brand-visibility-template:** checks on a schedule whether AI models mention your brand for chosen prompts. Start with the free monthly routine in [03](standards/03-win-the-comparison.md); add this once you have many prompts to watch.

**Renumbered 2026-10-23** into reading order. Old → new: 01→14, 02→15, 03→10, 04→05, 05→06, 06→08, 07→07, 08→16, 09→19, 10→18, 11→09, 12→11, 13→20, 14→04, 15→17, 16→02, 17→01, 18→12, 19→13. "Win the comparison" moved out of 07 into the new 03.

## Staying current
Vendors change things monthly. When you maintain a site, these are the feeds worth following (RSS unless noted):
- Cloudflare changelog: `developers.cloudflare.com/changelog/rss/index.xml`, or per product (`.../rss/pages.xml`, `workers`, `bots`, `ai-crawl-control`)
- Google Search Central blog: `developers.google.com/search/blog/feed.xml`, and the docs change log: `developers.google.com/search/updates/search_docs_updates.rss`
- Google ranking updates: `status.search.google.com/en/feed.atom`
- Bing Webmaster blog: `blogs.bing.com/webmaster/feed`
- Microsoft Clarity: `clarity.microsoft.com/blog/feed/`
- schema.org releases: `github.com/schemaorg/schemaorg/releases.atom`
- web.dev: `web.dev/static/blog/feed.xml`
- No feed, check by hand every few months: GA4 "What's new" (support.google.com/analytics/answer/9164320), OpenAI, Anthropic and Perplexity crawler pages (linked in standard 07).

## Assumptions
Static HTML/CSS/JS (no framework required) on Cloudflare Pages, with the domain's DNS on Cloudflare. Most of it applies to any static host; where a rule is Cloudflare-specific, it says so.

## Not legal advice
The privacy, consent and accessibility standards describe common good practice, not legal advice for your situation. Laws differ by country and industry. Have a lawyer review your privacy policy and any regulated claims before you run ads.

## Contributing
Found something outdated, or a lesson worth adding? Open an issue or a pull request. Keep it specific, checkable and free of hype (see [AGENTS.md](AGENTS.md) for the format).

## Who made this
Built and maintained by **Eddie Bello**, founder of [Strategy & Stack](https://strategyandstack.com), which builds sales systems and AI automation for service businesses.

- LinkedIn: [linkedin.com/in/eddiebello](https://www.linkedin.com/in/eddiebello/)
- GitHub: [@eddie85u](https://github.com/eddie85u)

Want this applied to your site, or a new site built on it? [Book a call](https://strategyandstack.com). Found it useful? A star helps others find it.

## License
MIT. Use it, fork it, adapt it.

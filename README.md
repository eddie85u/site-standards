# Site Standards

**Everything a business website needs under the hood, written so your AI coding agent can build it.**

- A professional-grade site can cost **less than $15 a year** to run. That's the domain; hosting, security, analytics and booking can all be free. [See the stack →](standards/01-stack-costs.md)
- When Google shows an AI summary, people click a result **half as often** (8% of visits against 15%, [Pew, 2025](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)). Being the business the answer names is the new page one. [Win the comparison →](standards/03-win-the-comparison.md)
- Since July 2025, new Cloudflare sites **block AI crawlers by default**, and over a million owners had already switched the block on ([Cloudflare](https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/)). If ChatGPT can't fetch your site, it can't recommend you. [Check yours →](standards/07-ai-visibility.md)
- Attackers harvested exposed `.env` files from **110,000 domains** and used the keys inside to extort the owners ([Unit 42, 2024](https://unit42.paloaltonetworks.com/large-scale-cloud-extortion-operation/)). On many hosts, every old deploy also stays online at its own address. [Lock it down →](standards/14-publishing-hygiene.md)
- **95.9% of the top million home pages fail basic accessibility checks** ([WebAIM, 2026](https://webaim.org/projects/million/)), and US website-accessibility lawsuits rose 27% in 2025. [Get the floors right →](standards/09-accessibility.md)
- A **0.1-second** faster mobile site lifted retail conversions **8.4%** ([Deloitte for Google](https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html)). [Make it fast →](standards/10-performance.md)

Brand, colors and scroll animations are yours. What's here is what almost every site should share, in any industry: fast, secure, visible to Google *and* AI assistants, privacy-compliant, measured properly, built to convert, and solid enough that visitors assume a serious company is behind it.

These are lessons learned building and running real business sites with AI coding agents, kept up to date as new ones come in. Free to use.

## Why point your agent here
Coding agents are good at writing a site and bad at remembering everything a site needs. Developers feel it too: 66% say their biggest frustration with AI tools is code that is "almost right, but not quite" ([Stack Overflow survey, 2025](https://survey.stackoverflow.co/2025/ai)). Ask one for a landing page and you get a nice hero, but usually no security headers, a preview copy indexed by Google, a cookie banner that doesn't block anything, AI crawlers silently blocked by the CDN, and copy full of "seamless" and "unlock". Nothing looks broken, so nobody notices.

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
They are numbered in the order you would build a site: **Plan** (01–03: stack, repo, and what buyers ask), **Build** (04–10: content, search, structured data, AI visibility, previews, accessibility, speed), **Convert** (11–13: forms, booking, payments), **Protect** (14–19: hygiene, headers, trust files, domain, privacy, consent) and **Maintain** (20: guardrail tests). Each one is self-contained: tell your agent *"Apply standard 12 from site-standards"* and it has everything it needs.

| # | Standard | Applies to | What it gets you |
|---|---|---|---|
| 01 | [Stack and costs](standards/01-stack-costs.md) | Every site | The free stack, what each piece does, and why free is still robust |
| 02 | [Repo and agent setup](standards/02-repo-agents.md) | Every site | AGENTS.md, TODO.md, deploy and rollback policy |
| 03 | [Win the comparison](standards/03-win-the-comparison.md) | Every site | Find what buyers ask Google and AI, answer it, and measure whether you are named |
| 04 | [Content quality and AI slop](standards/04-content-quality.md) | Every site | Copy that is specific, provable and quotable |
| 05 | [Search basics](standards/05-search.md) | Every site | Titles, canonicals, sitemaps, hreflang, Search Console and Bing |
| 06 | [Structured data](standards/06-structured-data.md) | Every site | Organization, WebSite, Service, FAQ in JSON-LD; the site name Google shows |
| 07 | [AI visibility](standards/07-ai-visibility.md) | Every site | AI crawlers allowed, llms.txt, Content-Signal, text readable without JavaScript |
| 08 | [Social previews](standards/08-social-previews.md) | Every site | A preview card that works on LinkedIn *and* WhatsApp |
| 09 | [Accessibility](standards/09-accessibility.md) | Every site | WCAG 2.2 AA floors and reduced motion |
| 10 | [Performance](standards/10-performance.md) | Every site | Core Web Vitals in the green on a mid-range phone |
| 11 | [Forms and email](standards/11-forms-email.md) | Sites with a form or own-domain email | Spam-free forms; SPF, DKIM, DMARC |
| 12 | [Booking](standards/12-booking.md) | If you take bookings | Cal.com, TidyCal, Calendly; UTMs on every meeting; paid-booking patterns |
| 13 | [Payments](standards/13-payments.md) | If you sell online | Stripe, Mollie, Wompi, Mercado Pago, merchants of record |
| 14 | [Publishing hygiene](standards/14-publishing-hygiene.md) | Every site | Only the site is public; previews stay out of search; real 404s |
| 15 | [Security headers](standards/15-security-headers.md) | Every site | HTTPS, HSTS, a CSP that does not get in your way; an A on securityheaders.com |
| 16 | [Trust files](standards/16-trust-files.md) | Every site | security.txt, web app manifest, icons in browsers and search results |
| 17 | [Zone and domain](standards/17-zone-domain.md) | Every site | DNS, DNSSEC, registrar, custom-domain gotchas |
| 18 | [Privacy and compliance](standards/18-privacy-compliance.md) | Every site | Privacy policy, an honest banner, claims to never make |
| 19 | [Analytics and consent](standards/19-analytics-consent.md) | Every site | Tracking that waits for consent, the real liabilities, and how to lose little data |
| 20 | [Guardrail tests](standards/20-guardrail-tests.md) | Every site | Checks so none of this silently breaks |

<details><summary>Using an older link? The standards were renumbered on 2026-10-23.</summary>

Old → new: 01→14, 02→15, 03→10, 04→05, 05→06, 06→08, 07→07, 08→16, 09→19, 10→18, 11→09, 12→11, 13→20, 14→04, 15→17, 16→02, 17→01, 18→12, 19→13. "Win the comparison" moved out of 07 into the new 03.
</details>

## What are you building?
Not every site needs all 20. Find your goal, start with the first link, then add the rest. Every site should end up with the **baseline**: everything except 12 Booking and 13 Payments, which depend on how you make money.

| If you want to… | Start with | Then add |
|---|---|---|
| **Launch a site that looks like a serious company** | [CHECKLIST.md](CHECKLIST.md), the one-page version | The baseline, in order |
| **Be the business ChatGPT, Claude and Perplexity recommend** | [03 Win the comparison](standards/03-win-the-comparison.md) | [07 AI visibility](standards/07-ai-visibility.md), [06 Structured data](standards/06-structured-data.md), [05 Search](standards/05-search.md) |
| **Find out what your buyers search for and ask AI** | [03 Win the comparison](standards/03-win-the-comparison.md), the "Before" steps | [05 Search](standards/05-search.md) for Search Console data |
| **Turn visits into booked calls** | [12 Booking](standards/12-booking.md) | [19 Analytics](standards/19-analytics-consent.md), to see which page and campaign booked each one |
| **Get paid online** (consultations, deposits, courses) | [13 Payments](standards/13-payments.md) | [12 Booking](standards/12-booking.md) for paid calls, [18 Privacy](standards/18-privacy-compliance.md) for terms and refunds |
| **Collect leads with a form that never drops one** | [11 Forms and email](standards/11-forms-email.md) | [19 Analytics](standards/19-analytics-consent.md), so every lead keeps its source |
| **Measure your traffic without legal risk** | [19 Analytics and consent](standards/19-analytics-consent.md) | [18 Privacy](standards/18-privacy-compliance.md) |
| **Spend as little as possible** | [01 Stack and costs](standards/01-stack-costs.md) | |
| **Check a site you already have** | The audit prompt in [How to use it](#how-to-use-it) | Each gap goes to your TODO.md |

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

**Used this guide on your own site?** [Open an issue](https://github.com/eddie85u/site-standards/issues/new?title=Built%20with%20site-standards) with the link and what changed: a better PageSpeed score, an assistant that now names you, a cleaner audit. With your permission we will list it here, and what you learned may become a dated note in the standards.

## Sources we watch
Vendors change things monthly, so every rule links its source where it is not obvious. These are the feeds we follow to keep the standards current (RSS unless noted). Follow them too if you maintain sites:
- **Cloudflare** changelog: `developers.cloudflare.com/changelog/rss/index.xml`, or per product (`.../rss/pages.xml`, `workers`, `bots`, `ai-crawl-control`)
- **Google Search Central** blog: `developers.google.com/search/blog/feed.xml`; documentation changes: `developers.google.com/search/updates/search_docs_updates.rss`; ranking updates: `status.search.google.com/en/feed.atom`
- **Bing Webmaster** blog: `blogs.bing.com/webmaster/feed`
- **Microsoft Clarity**: `clarity.microsoft.com/blog/feed/`
- **schema.org** releases: `github.com/schemaorg/schemaorg/releases.atom`
- **web.dev**: `web.dev/static/blog/feed.xml`
- **No feed, checked by hand:** GA4 "What's new" (support.google.com/analytics/answer/9164320) and the OpenAI, Anthropic, Perplexity and Google crawler pages linked in [07](standards/07-ai-visibility.md).

## Assumptions
- **Site type:** a marketing site for a small or medium business: tens of pages, not thousands; content changes weekly at most; the goal is leads, bookings or sales.
- **Stack:** static HTML, CSS and JavaScript (no framework required) on Cloudflare Pages, DNS on Cloudflare, a few Workers for forms, booking and payments, and a coding agent doing most of the building.
- **Other static hosts** (Netlify, Vercel, GitHub Pages): the rules hold; the file names differ (Netlify reads `_headers` and `_redirects` too, Vercel uses `vercel.json`). Anything Cloudflare-specific says so.
- **Frameworks** (Astro, Eleventy, Next.js static export): apply every rule to the built output and run the checks against the output folder.
- **WordPress and site builders:** the Why, Check and Avoid sections still apply; the How to build steps will not, and the cost table in 01 is the case for moving.
- **Markets:** written from sites serving the US, Europe and Latin America, in English and Spanish. Payments, consent and privacy name the rules for those regions; check your own.

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

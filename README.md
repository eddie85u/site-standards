# Site Standards

**Everything a business website needs under the hood, written so your AI coding agent can build it.**

- A professional-grade site can cost **less than $15 a year** to run. That's the domain; hosting, security, analytics and booking can all be free. [See the stack →](standards/01-stack-costs.md)
- Cheap first-year domains renew at **nearly double** the cost price ($18 to $23 a year for a .com, against about $11 at cost). Take the deal, move the domain on day 61, and an agent does most of the work for a few cents. [Buy smart →](standards/17-zone-domain.md)
- In October 2026, two critical PHP flaws let attackers **take over PHP websites without a password**, with over 5 million servers exposed ([BleepingComputer](https://bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws)). WordPress runs on PHP. The sites built with this guide had **nothing to patch**. [Why static wins →](standards/01-stack-costs.md)
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
- **A checklist it can't skip.** 22 standards in the order you build, each rule with its reason, so the agent knows when an exception is safe.
- **Working starter files.** Headers, robots.txt with current AI bot names, llms.txt, security.txt, a consent banner, analytics that waits for consent, and JSON-LD.
- **A way to check its own work.** Every standard ends with the commands that prove it is done, and `check-site.mjs` runs the static checks in CI.
- **A list of mistakes to avoid.** Outdated advice, invented bot names, soft 404s, and AI-sounding copy, with ways to detect each one.
- **Lessons from production.** What broke on real sites, written into the rules and the mistakes to avoid.

It works with any agent that reads files: Claude Code, Codex, Cursor, OpenCode, Copilot.

## How to use it

**Building a new site.** Clone or link this repo, then tell your agent:
> Read site-standards (README.md, then every file in standards/). Build this site following every standard that applies, starting from templates/. List any standard you skipped and why.

**Auditing an existing site:**
> Audit this site against site-standards. For each standard in standards/, check the repo and the live domain using that standard's "Check" section. Report pass, partial or missing, and add each gap to the site's TODO.md.

**Keeping it in the loop.** Copy [`templates/AGENTS.md`](templates/AGENTS.md) into your repo. It tells every future session to follow these standards and to record anything new it learns.

**Launch day:** [CHECKLIST.md](CHECKLIST.md) is the one-page version.

## All the standards
They are numbered in the order you would build a site: **Plan** (01–03: stack, repo, and what buyers ask), **Build** (04–10: content, search, structured data, AI visibility, previews, accessibility, speed), **Convert** (11–13: forms, booking, payments), **Protect** (14–19: hygiene, headers, trust files, domain, privacy, consent), **Maintain** (20: guardrail tests) and **Grow** (21–22: search research loop, backlinks). New standards are added at the end so the numbers your notes use never change. Each one is self-contained: tell your agent *"Apply standard 12 from site-standards"* and it has everything it needs.

| # | Standard | Applies to | What it gets you |
|---|---|---|---|
| 01 | [Stack and costs](standards/01-stack-costs.md) | Every site | A professional setup for the price of a domain, and why free is not flimsy.<br><sub>Cloudflare Pages, Workers, Turnstile, GA4, Clarity, Search Console; Pages vs Workers static assets</sub> |
| 02 | [Repo and agent setup](standards/02-repo-agents.md) | Every site | Written rules every AI session follows, and a one-click undo for bad releases.<br><sub>AGENTS.md, CLAUDE.md, TODO.md, branch deploys, rollbacks, build skips</sub> |
| 03 | [Win the comparison](standards/03-win-the-comparison.md) | Every site | Find what buyers ask Google and AI, answer it, and check whether you get named.<br><sub>Search Console regex, autocomplete, PAA, prompt runs, fact families, AI Overviews and Bing AI reports</sub> |
| 04 | [Content quality and AI slop](standards/04-content-quality.md) | Every site | Copy that sounds like a company that knows its work, not like a chatbot.<br><sub>Slop list, swap/picture/falsifiable tests, `[NEED:]` markers, dated proof</sub> |
| 05 | [Search basics](standards/05-search.md) | Every site | The basics Google and Bing need to find, understand and show every page.<br><sub>Titles, canonicals, extensionless URLs, sitemap `lastmod`, bilingual hreflang and supported codes, one-hop 301s, orphan pages</sub> |
| 06 | [Structured data](standards/06-structured-data.md) | Every site | Hidden labels that tell search engines and AI exactly who you are and what you sell.<br><sub>JSON-LD `@graph`: Organization, WebSite (site name), Service, LocalBusiness, FAQPage, BreadcrumbList</sub> |
| 07 | [AI visibility](standards/07-ai-visibility.md) | Every site | ChatGPT, Claude and Perplexity can actually read your site.<br><sub>robots.txt bot table, CDN bot settings, Content-Signal, llms.txt, no-JS rendering</sub> |
| 08 | [Social previews](standards/08-social-previews.md) | Every site | A sharp preview card when your link is shared on WhatsApp, LinkedIn or Slack.<br><sub>Open Graph, 1200×630 center-safe images, cache-busting names, preview-bot access</sub> |
| 09 | [Accessibility](standards/09-accessibility.md) | Every site | A site everyone can use, including people with disabilities, with less lawsuit risk.<br><sub>WCAG 2.2 AA, contrast, focus, 24px targets, `prefers-reduced-motion`, axe</sub> |
| 10 | [Performance](standards/10-performance.md) | Every site | Fast on an ordinary phone, where most of your visitors are.<br><sub>Core Web Vitals (LCP, INP, CLS), AVIF/WebP, font subsetting, Early Hints</sub> |
| 11 | [Forms and email](standards/11-forms-email.md) | Sites with a form or own-domain email | Forms that never lose a lead, and email that lands in the inbox.<br><sub>Worker endpoints, Turnstile, honeypot, SPF, DKIM, DMARC</sub> |
| 12 | [Booking](standards/12-booking.md) | If you take bookings | Visitors book themselves into your calendar, and you see which page brought them.<br><sub>Cal.com, TidyCal, UTMs into bookings, confirmation key events, paid-booking flow</sub> |
| 13 | [Payments](standards/13-payments.md) | If you sell online | Take payments safely, with the right provider for your country.<br><sub>Stripe, Mollie, Wompi, Mercado Pago, hosted checkout, signed idempotent webhooks</sub> |
| 14 | [Publishing hygiene](standards/14-publishing-hygiene.md) | Every site | Nothing private gets published by accident, now or in old versions.<br><sub>Output folder, `_routes.json` guard, `pages.dev` noindex, real 404s, old deployments</sub> |
| 15 | [Security headers](standards/15-security-headers.md) | Every site | Browser-level protection against hijacked scripts and fake look-alike pages.<br><sub>HSTS, CSP (report-only first), frame-ancestors, Permissions-Policy, `_headers` gotchas</sub> |
| 16 | [Trust files](standards/16-trust-files.md) | Every site | The small files real companies have: a security contact and proper icons.<br><sub>security.txt (RFC 9116), favicons for Google results, web app manifest</sub> |
| 17 | [Zone and domain](standards/17-zone-domain.md) | Every site | Your domain and email settings, protected and never lapsing.<br><sub>DNSSEC, Full (strict) TLS, CAA, Crawler Hints, where to buy domains, registrar transfers</sub> |
| 18 | [Privacy and compliance](standards/18-privacy-compliance.md) | Every site | A privacy policy and claims that keep regulators and ad platforms happy.<br><sub>Privacy policy contents, banned claims, testimonial consent, sensitive data</sub> |
| 19 | [Analytics and consent](standards/19-analytics-consent.md) | Every site | Measure your marketing without the lawsuits, and lose little data doing it.<br><sub>Consent Mode v2 (Basic), consent-gated GA4 and Clarity, CIPA, UTMs on leads, AI channel</sub> |
| 20 | [Guardrail tests](standards/20-guardrail-tests.md) | Every site | Automatic checks so an edit never quietly undoes any of this.<br><sub>`check-site.mjs`, owner decisions as tests, CI, exit codes, live checks</sub> |
| 21 | [Search and answer-engine research](standards/21-search-research.md) | Every site | Know what buyers type and ask, in each language, give each question one page, and improve monthly from real data.<br><sub>Free-tool playbook, clusters and owner briefs, bilingual research, competitor sitemaps, Search Console decision table, cadence</sub> |
| 22 | [Backlinks](standards/22-backlinks.md) | Every live site | A few links a quarter from places buyers and AI assistants actually look.<br><sub>Directories and map profiles, partner pages, local citations, HARO, link-spam rules, Links report</sub> |

## What are you building?
Not every site needs all 22. Find your goal, start with the first link, then add the rest. Every site should end up with the **baseline**: everything except 12 Booking and 13 Payments, which depend on how you make money.

| If you want to… | Start with | Then add |
|---|---|---|
| **Launch a site that looks like a serious company** | [CHECKLIST.md](CHECKLIST.md), the one-page version | The baseline, in order |
| **Be the business ChatGPT, Claude and Perplexity recommend** | [03 Win the comparison](standards/03-win-the-comparison.md) | [07 AI visibility](standards/07-ai-visibility.md), [06 Structured data](standards/06-structured-data.md), [05 Search](standards/05-search.md), [22 Backlinks](standards/22-backlinks.md) |
| **Find out what your buyers search for and ask AI** | [03 Win the comparison](standards/03-win-the-comparison.md), the "Before" steps | [21 Search research](standards/21-search-research.md) for the full toolkit and the monthly Search Console loop |
| **Get other sites to link to you** | [22 Backlinks](standards/22-backlinks.md) | [03 Win the comparison](standards/03-win-the-comparison.md), to see which directories and lists assistants cite |
| **Turn visits into booked calls** | [12 Booking](standards/12-booking.md) | [19 Analytics](standards/19-analytics-consent.md), to see which page and campaign booked each one |
| **Get paid online** (consultations, deposits, courses) | [13 Payments](standards/13-payments.md) | [12 Booking](standards/12-booking.md) for paid calls, [18 Privacy](standards/18-privacy-compliance.md) for terms and refunds |
| **Collect leads with a form that never drops one** | [11 Forms and email](standards/11-forms-email.md) | [19 Analytics](standards/19-analytics-consent.md), so every lead keeps its source |
| **Measure your traffic without legal risk** | [19 Analytics and consent](standards/19-analytics-consent.md) | [18 Privacy](standards/18-privacy-compliance.md) |
| **Spend as little as possible** | [01 Stack and costs](standards/01-stack-costs.md) | |
| **Check a site you already have** | The audit prompt in [How to use it](#how-to-use-it) | Each gap goes to your TODO.md |

## What "done" looks like
Free public graders, run on your live site, tell you when you are there:
- **Security:** securityheaders.com grades it **A** or better, and SSL Labs (which tests the encryption) grades it **A**.
- **Speed and quality:** Google's PageSpeed Insights scores **90+** on mobile in all four categories.
- **Nothing private is public:** a made-up address shows your 404 page, and so does every internal file.
- **Search engines understand you:** Google's Rich Results Test reads your business details with no errors.
- **AI assistants can read you:** ChatGPT's, Claude's and Perplexity's crawlers get your pages, not a "blocked" error.
- **The basics exist:** `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/.well-known/security.txt` all load.
- **It stays that way:** `check-site.mjs` passes on every change.

## Live examples
These sites run on this stack and are being brought up to every standard. What breaks or works on them is written back into the standards.
- [strategyandstack.com](https://strategyandstack.com): B2B sales systems and AI automation
- [remoteaccountingteam.com](https://remoteaccountingteam.com): remote accounting teams for US businesses
- [regeneraxis.com](https://regeneraxis.com): a bilingual longevity and regeneration center

**Used this guide on your own site?** [Open an issue](https://github.com/eddie85u/site-standards/issues/new?title=Built%20with%20site-standards) with the link and what changed: a better PageSpeed score, an assistant that now names you, a cleaner audit. With your permission we will list it here, and what you learned may improve the standards.

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

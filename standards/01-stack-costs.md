# 01 · Stack and costs
**Applies to:** every site.

## Why
Most owners assume a professional website costs thousands up front and hundreds a month. A fast, secure, well-measured marketing site can run for the price of its domain name. The money goes into the work (your time, or a coding agent), not into hosting. Our own three live sites pay only for their domains and, for two of them, a mailbox.

Free does not mean flimsy. The free plans below run on the same networks big companies pay for:
- your site is copied to data centers around the world, so it loads fast everywhere;
- it gets HTTPS automatically;
- it is shielded from floods of fake traffic;
- every version of the site is kept, so nothing is lost when a laptop dies.

Fewer moving parts also means less to break into. A static site is plain files: no server code, no admin login, no plugins to patch. That difference decides who has a bad week when the next big flaw lands:
- In October 2026 ("Black October"), two critical flaws in PHP itself, nicknamed PHP2Shell, let anyone take over a PHP website without logging in. Every PHP installation serving web pages was affected, over 5 million servers were exposed, and emergency patches had to go out on 2026-10-21 ([BleepingComputer, 2026](https://bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws)). PHP runs WordPress, Drupal, Joomla and most shared hosting. A static site had nothing to patch.
- On WordPress, plugins caused 91% of the 11,334 new security holes found in 2025, and the typical one was being attacked at scale within 5 hours of becoming public ([Patchstack, 2026](https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/)).

## The stack
Prices and limits as of 2026-10. Free tiers change: check each vendor's pricing page before you rely on a limit.

| Layer | What we use | Cost | What it does | Free-tier limits that matter |
|---|---|---|---|---|
| Domain | Cloudflare Registrar (or Namecheap, Porkbun) | about $10–15 a year for a `.com` | Your name on the internet | Cloudflare sells at cost with no markup on renewals; other registrars often discount the first year and charge more at renewal |
| Code and history | GitHub (private or public repos) | Free | Version history, backup, collaboration, the source every deploy builds from | Unlimited private repos; 2,000 Actions minutes a month on private repos, unlimited on public ones |
| Hosting | Cloudflare Pages | Free | Serves the site from Cloudflare's global network with HTTPS | Unlimited bandwidth and requests for static files; 500 builds a month; 20,000 files per site |
| Server code | Cloudflare Workers (forms, booking, webhooks) | Free | Small back-end jobs without a server | 100,000 requests a day |
| DNS, TLS, CDN | Cloudflare (free plan) | Free | Nameservers, certificates, caching, DDoS protection, bot controls | Enough for any small business site |
| Spam protection | Cloudflare Turnstile | Free | Stops form spam without puzzles | Generous free use |
| Email forwarding | Cloudflare Email Routing | Free | `hello@yourdomain` forwarded to an existing inbox | Receive only; sending needs a mail provider |
| Email reports | Cloudflare DMARC Management | Free | Shows who sends mail as your domain | |
| Mailbox (optional) | Zoho Mail free plan, or Google Workspace | Free to about $7 per user a month | A real mailbox on your domain | Zoho's free plan is limited (few users, web and app only) and not offered in every region |
| Privacy-first stats | Cloudflare Web Analytics | Free | Cookieless page views and Core Web Vitals | |
| Analytics | Google Analytics 4 | Free | Traffic sources, key events, funnels, AI-assistant traffic | |
| Behaviour | Microsoft Clarity | Free | Heatmaps, session recordings, rage clicks, AI-bot visibility | No traffic cap |
| Search | Google Search Console, Bing Webmaster Tools | Free | Indexing, queries, errors; Bing also feeds Copilot and other AI answers | |
| Booking | Cal.com or TidyCal ([12](12-booking.md)) | Free plan, or a one-time TidyCal license | Booking calls into a calendar | Payments and team features may need a paid tier |
| Payments | Stripe, Mollie, Wompi, Mercado Pago ([13](13-payments.md)) | No monthly fee; a percentage per transaction | Taking payment for consultations, deposits, courses | Fees vary by country and payment method |
| Quality checks | PageSpeed Insights, Lighthouse CI, securityheaders.com, SSL Labs, Rich Results Test | Free | The graders behind "done" in the README | |
| Building | A coding agent (Claude Code, Codex, OpenCode, Cursor) | A subscription or pay-per-token | Writes and maintains the code with you | This is the real cost, and it scales with how much you build |

**Typical running cost:** the domain (about $10–15 a year), plus a mailbox if you want one. Everything else above is free at small-business traffic.

## Pages or Workers?
Cloudflare now suggests starting new projects on **Workers with static assets**; Pages is not deprecated and is what this guide assumes. Pages still does more for a static site out of the box: automatic 404 handling, noindex on branch previews, `_headers`, `_redirects`, branch build controls and Early Hints. If you choose Workers, set `not_found_handling = "404-page"` yourself, check how it redirects `/page.html` and `/page/`, and add noindex to preview URLs, because those defaults differ ([migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)). Existing Pages sites have no reason to move.

## Rules
1. **Free tiers that upgrade in place.** Avoid free hosting that would force a move later.
   *Why:* migrations are where sites break and rankings dip; an upgrade is a switch in the same dashboard.
2. **Every account belongs to the business,** with 2FA on, and nothing depends on one person's laptop.
   *Why:* moving analytics, DNS or a domain between owners later is slow and sometimes impossible.
3. **One list of services, in the site's AGENTS.md.**
   *Why:* the CSP (standard 15), the privacy policy's processor list (standard 18) and this cost table all have to match it.
4. **Read the pricing page before relying on a limit,** and note the date you checked.
   *Why:* free tiers change, and the limit you remember may be a year old.

## Avoid
- Website builders that charge monthly for hosting a static site.
- Registrars with a cheap first year and an expensive renewal: compare the renewal price, not the first-year price.
- Paid plugins or page-speed services for problems a static site does not have.
- Mixing personal and business accounts. Moving a property between accounts later is slow and sometimes impossible.


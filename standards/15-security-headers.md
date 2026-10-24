# 15 · Security headers
**Applies to:** every site.

## Why
Security headers are short instructions your site sends to every visitor's browser along with each page. Visitors never see them, and they cost nothing. They tell the browser:
- always use the encrypted (HTTPS) version of the site, even if someone types or clicks the plain one (this header is called HSTS);
- run scripts only from the places you list, so a hijacked or injected script is refused (the Content Security Policy, CSP);
- never show this site inside someone else's page, which stops look-alike pages that trick people into clicking;
- do not leak the full address of the page someone came from, and do not use the camera, microphone or location.

The script rule matters most, because the usual attack does not touch your site at all. It compromises something your site loads. In 2024 the domain behind polyfill.io, a free script embedded on more than 100,000 websites, was bought by a new owner and started sending visitors to scam and betting sites ([Sansec, 2024](https://sansec.io/research/polyfill-supply-chain-attack)). Sites that hosted their own copy, or allowed only the sources they named, were unaffected.

Headers are also the first thing a security-minded buyer or scanner checks, and few sites bother: only 34% of pages force HTTPS this way and 19% send a script policy ([HTTP Archive Web Almanac, 2024](https://almanac.httparchive.org/en/2024/security)). An A on securityheaders.com stands out. Only the script policy needs updating as your tools change, and rule 7 keeps that painless.

## Rules
1. **Send these on every HTML response** (template: `templates/_headers`):
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
   - `Content-Security-Policy:` an allowlist of exactly the origins the site uses
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy:` deny what you do not use (`camera=(), microphone=(), geolocation=(), payment=(), usb=()`)
   - `X-Frame-Options: DENY` alongside CSP `frame-ancestors 'none'`
   - `Cross-Origin-Opener-Policy: same-origin`, or `same-origin-allow-popups` if a payment or sign-in popup needs it

   *Why:* every line except the CSP is set-and-forget; none of them breaks when you add a tool.
2. **One CSP, in the header,** never also in a `<meta>` tag.
   *Why:* browsers enforce both, so the effective policy is the stricter overlap; the two drift until something breaks (we had to make every change twice on one site), and `frame-ancestors` does not work in a meta tag anyway.
3. **Build the CSP from what the site actually loads.** Start from `default-src 'self'` and add only the origins in use. Typical additions:
   - GA4 / GTM: `script-src https://www.googletagmanager.com`; `connect-src https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`; `img-src https://*.google-analytics.com https://www.googletagmanager.com`
   - Microsoft Clarity: `script-src https://www.clarity.ms https://*.clarity.ms`; `connect-src https://*.clarity.ms https://c.bing.com`
   - Cloudflare Web Analytics: `script-src https://static.cloudflareinsights.com`; `connect-src https://cloudflareinsights.com`
   - Turnstile: `script-src https://challenges.cloudflare.com`; `frame-src https://challenges.cloudflare.com`
   - Booking embeds: `frame-src` the embed origin (for example `https://cal.com https://app.cal.com`, `https://tidycal.com`)
   - Payment redirect: `form-action` the checkout origin if the site posts to it
4. **Always include** `base-uri 'self'`, `object-src 'none'`, `frame-ancestors 'none'` and a `form-action` limited to where forms really post.
   *Why:* these close the classic injection tricks (rewriting relative URLs, plugin objects, hijacked form targets) at no cost.
5. **Drop `'unsafe-inline'` from `script-src`** by moving inline scripts to files. If you must keep some, keep them few and say why in a comment.
   *Why:* inline-script permission is what turns an HTML injection into running code.
6. **Remove `Access-Control-Allow-Origin: *`.** Cloudflare Pages adds it to every response by default; the template removes it with `! Access-Control-Allow-Origin`.
   *Why:* a marketing site has no reason to let any origin read its responses, and scanners flag it. All three of our sites sent it without anyone choosing it.
7. **The CSP never surprises you:**
   - New CSPs start as `Content-Security-Policy-Report-Only` on a preview; switch to enforcing once the console is clean on every page type, form, embed and consent choice.
   - The site's AGENTS.md says: "adding a third-party script, font, embed or form target means adding its origin to `_headers` in the same change."
   - When a tool is removed, its origin leaves the CSP in the same change.

   *Why:* the only real cost of a CSP is a new tool silently blocked. Report-only first and a rule in AGENTS.md make that a one-line fix instead of a mystery. On one of our sites this took a single session from no headers to an A+; on another, the report-only pass caught two sources that a code search had missed (an analytics beacon the host injects and a third-party image host).
8. **Pages specifics:**
   - `_headers` does not apply to responses from Pages Functions; a Function must set its own security headers.
   - When several rules match a path, the same header is joined with a comma, not replaced. Set each header in exactly one matching rule, or remove it with `! Header-Name`.
   - Limits: 100 rules, 2,000 characters per header line.
   - HTML already gets `Cache-Control: public, max-age=0, must-revalidate`, and page URLs never end in `.html` on Pages, so a `/*.html` rule never matches.

   *Why:* each of these produces a header file that looks right and serves something else.
9. **Caching:** `Cache-Control: public, max-age=31536000, immutable` on versioned assets only (`/assets/*`), and a new file name or `?v=` whenever one changes.
   *Why:* without versioning, returning visitors keep the old file for a year.

## How to build it
1. Copy `templates/_headers`, replace `{{PROJECT}}`, then list every external origin the site loads (DevTools → Network, filter third-party, on every page type, after accepting cookies).
2. Deploy with the Report-Only header on a preview and click through everything.
3. Switch to the enforcing header; add the AGENTS.md rule from rule 7.

## Check
```sh
curl -sI https://example.com/ | grep -iE "strict-transport|content-security|x-content-type|referrer-policy|permissions-policy|x-frame|cross-origin|access-control"
```
- securityheaders.com: grade A or A+. No `Access-Control-Allow-Origin` line.
- Browser console on every page type, after accepting and after rejecting cookies: no CSP violations.

## Avoid
- **`X-XSS-Protection: 1; mode=block`.** Deprecated; omit it (or send `0`).
- **`preload` in HSTS** unless every subdomain is HTTPS for good and you mean to submit to hstspreload.org. Removal takes months.
- CSP `img-src https:` (any HTTPS image) when you know the real image origins.
- Allowing whole public CDNs (`https://unpkg.com`, `https://cdnjs.cloudflare.com`) in `script-src`: anyone can publish a package there. Self-host the library.
- A CSP copied from another site, with origins this site does not use.


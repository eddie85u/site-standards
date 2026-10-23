# 02 · Security headers
**Applies to:** every site.

## Why
Headers are free, invisible to visitors, and the first thing a security-minded buyer (or scanner) checks. An A on securityheaders.com signals a company that knows what it is doing.

## Rules
1. Send these on every HTML response (template: `templates/_headers`):
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
   - `Content-Security-Policy:` an allowlist of exactly the origins the site uses (see below)
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy:` deny what you do not use, for example `camera=(), microphone=(), geolocation=(), payment=(), usb=()`
   - `X-Frame-Options: DENY` (older browsers) alongside CSP `frame-ancestors 'none'`
   - `Cross-Origin-Opener-Policy: same-origin` unless a payment or sign-in popup needs `same-origin-allow-popups`
2. **One CSP, in the header.** Do not also put a CSP in a `<meta>` tag: browsers enforce both, so the effective policy is the stricter overlap, and the two drift apart until something breaks. `frame-ancestors` does not work in a meta tag anyway.
3. Build the CSP from what the site actually loads. Start from `default-src 'self'` and add, per directive, only the origins in use. Typical additions:
   - GA4 / GTM: `script-src https://www.googletagmanager.com`; `connect-src https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`; `img-src https://*.google-analytics.com https://www.googletagmanager.com`
   - Microsoft Clarity: `script-src https://www.clarity.ms https://*.clarity.ms`; `connect-src https://*.clarity.ms https://c.bing.com`
   - Cloudflare Web Analytics: `script-src https://static.cloudflareinsights.com`; `connect-src https://cloudflareinsights.com`
   - Turnstile: `script-src https://challenges.cloudflare.com`; `frame-src https://challenges.cloudflare.com`
   - Booking embeds: `frame-src` the embed origin (for example `https://cal.com https://app.cal.com`, `https://tidycal.com`)
   - Payment redirect: `form-action` the checkout origin if the site posts to it
4. Always include `base-uri 'self'`, `object-src 'none'`, `frame-ancestors 'none'` and `form-action` limited to where forms really post.
5. Aim to drop `'unsafe-inline'` from `script-src` by moving inline scripts to files. If you must keep inline scripts, keep them few and say so in a comment.
6. Long cache for fingerprinted or rarely-changed assets (`Cache-Control: public, max-age=31536000, immutable`), `max-age=0, must-revalidate` for HTML.

## How to build it
1. Copy `templates/_headers`, replace `{{PROJECT}}`, then list every external origin the site loads (DevTools → Network, filter "third-party", on every page type).
2. Deploy first with `Content-Security-Policy-Report-Only` on a preview, click through every page, form, embed and consent choice, and watch the console for violations.
3. Switch to the enforcing header once the console is clean.

## Check
```sh
curl -sI https://example.com/ | grep -iE "strict-transport|content-security|x-content-type|referrer-policy|permissions-policy|x-frame|cross-origin"
```
- securityheaders.com: grade A or A+.
- Browser console on every page type after accepting and rejecting cookies: no CSP violations.

## Avoid
- **`X-XSS-Protection: 1; mode=block`.** Deprecated; browsers removed the filter and the setting could itself introduce leaks. Omit it (or send `0`).
- **`preload` in HSTS** unless every subdomain is HTTPS for good and you intend to submit the domain at hstspreload.org. Removal from the preload list takes months.
- CSP `img-src https:` (any HTTPS image) when you know the real image origins.
- Allowing whole CDNs (`https://unpkg.com`, `https://cdnjs.cloudflare.com`) in `script-src`: anyone can publish a package there. Self-host the library instead.
- A CSP copied from another site with origins this site does not use.

## Notes from real sites
- 2026-10: a site had both a header CSP and a meta CSP; the meta one lacked `frame-ancestors` and a later embed origin, so changes had to be made twice. Keep only the header.
- 2026-10: Cloudflare Pages `_headers` allows up to 100 rules and 2,000 characters per header line; a long CSP fits but keep it tidy.

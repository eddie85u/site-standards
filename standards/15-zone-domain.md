# 15 · Zone and domain
**Applies to:** every site.

## Why
DNS and the registrar are the foundation. Mistakes here take the site or email down, and the fixes are free.

## Rules
1. DNS on Cloudflare (free plan), one account that the business controls, with 2FA on the account and on the registrar.
2. **Always Use HTTPS** on; SSL mode **Full (strict)** when there is an origin; minimum TLS 1.2.
3. **DNSSEC** on: enable it in Cloudflare, then add the DS record at the registrar (automatic with Cloudflare Registrar).
4. **Crawler Hints** on (*Caching → Configuration*): tells search engines through IndexNow when content changes.
5. **Bot settings** checked against the site's AI policy (standard 07).
6. **Registrar:** Cloudflare Registrar charges cost price and enables DNSSEC automatically. Transfer once the domain is past its 60-day lock; the transfer adds a year and keeps the original expiry date.
7. Renewal on auto-pay, with a calendar reminder a month before expiry anyway.
8. Email records per standard 12.

## Check
- dnsviz.net or `dig +dnssec example.com` shows a signed zone.
- SSL Labs (ssllabs.com/ssltest): grade A.

## Avoid
- Moving DNS between accounts without exporting the zone first (TXT verifications, DKIM keys and MX records are easy to lose).
- Enabling DNSSEC at the registrar with an old DS record after changing DNS provider: the domain stops resolving. Remove the old DS first.

## Notes from real sites
- 2026-10: moving a zone to a new Cloudflare account worked smoothly by exporting the zone file, importing it, checking every record, and only then switching nameservers at the registrar.

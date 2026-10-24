# 17 · Zone and domain
**Applies to:** every site.

## Why
Your domain name and its DNS settings (the address book that tells the internet where your site and email live) are the foundation. A mistake here takes the site and the email down at once, often while nobody is looking, and the fixes are free. Most outages on small sites are not hosting failures; they are an expired domain, a lost DNS record or a login nobody can access.

A domain you let lapse keeps receiving whatever still points at it, and anyone can buy it. Researchers bought an expired domain once used by the .mobi registry for about $20 and within days received 2.5 million requests from more than 135,000 systems, including government mail servers ([watchTowr, 2024](https://labs.watchtowr.com/we-spent-20-to-achieve-rce-and-accidentally-became-the-admins-of-mobi/)). Google's spam rules now name expired domains bought and reused for spam ([Google, 2024](https://blog.google/products/search/google-search-update-march-2024/)). Your old domain can become someone else's asset.

## Rules
1. **DNS on Cloudflare** (free plan), in one account the business controls, with 2FA on that account and on the registrar.
   *Why:* whoever controls DNS controls the site, the email and every verification.
2. **Always Use HTTPS** on; SSL mode **Full (strict)** when there is an origin; minimum TLS 1.2.
   *Why:* anything weaker lets a network in the middle read or change traffic, and SSL Labs grades it down.
3. **DNSSEC** on: enable it in Cloudflare, then add the DS record at the registrar (automatic with Cloudflare Registrar).
   *Why:* it stops forged DNS answers from sending visitors or email elsewhere, at no cost.
4. **Crawler Hints** on (*Caching → Configuration*).
   *Why:* it tells Bing and other IndexNow engines when content changes, so updates get picked up in days, not weeks.
5. **Bot settings** checked against the site's AI policy (standard 07).
   *Why:* the zone setting overrides robots.txt.
6. **Custom domain on Pages, in this order:** add the domain in the Pages project first, then let Pages create the DNS record. If the zone has CAA records, they must allow Let's Encrypt, Google Trust Services and SSL.com for both `issue` and `issuewild`. Never point DNS away "temporarily"; use a redirect rule.
   *Why:* a CNAME created before the domain is added answers with a 522, and a strict CAA record blocks the certificate renewal months later.
7. **Registrar:** Cloudflare Registrar charges cost price and enables DNSSEC automatically. Transfer once the domain is past its 60-day lock; start at least two weeks before expiry, since a transfer can take up to 7 days. The transfer adds a year and keeps the original expiry date.
   *Why:* registrars with cheap first years charge more on every renewal, and a transfer started too late can strand the domain.
8. **Renewal on auto-pay,** with a calendar reminder a month before expiry anyway.
   *Why:* an expired card is the usual way small businesses lose their domain.
9. **Email records** per standard 11.

## Check
- dnsviz.net or `dig +dnssec example.com` shows a signed zone.
- SSL Labs (ssllabs.com/ssltest): grade A.

## Avoid
- Moving DNS between accounts without exporting the zone first (TXT verifications, DKIM keys and MX records are easy to lose).
- Enabling DNSSEC at the registrar with an old DS record after changing DNS provider: the domain stops resolving. Remove the old DS first.


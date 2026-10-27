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
7. **Registrar: Cloudflare Registrar.** Buy new domains there directly (*Domain Registration → Register Domains*). Move a domain already held elsewhere once it is past its 60-day lock, and at least two weeks before it expires. If Cloudflare doesn't sell the extension (it has no internationalized names, for example), buy it where it is sold and point its nameservers at Cloudflare.
   *Why:* Cloudflare sells at the registry's cost with no markup, the same price on the first year and every renewal ([Cloudflare](https://developers.cloudflare.com/registrar/faq/)). Other registrars win the first year with a promo and then charge well above cost on every renewal, so at cost is cheaper from the second year. Buying elsewhere to transfer later saves a few dollars once, but adds a 60-day lock, a second account to secure and a transfer to manage. Cloudflare Registrar requires Cloudflare nameservers, which rule 1 already asks for.
8. **Renewal on auto-pay,** with a calendar reminder a month before expiry anyway.
   *Why:* an expired card is the usual way small businesses lose their domain.
9. **Email records** per standard 11.

## How to build it
**New domain:** in the Cloudflare account that will hold the zone, add a payment method and verify the account email, then *Domain Registration → Register Domains* → search → Purchase. The zone is created on Cloudflare nameservers; turn on DNSSEC and check auto-renew is on.

**Transfer from another registrar** (the zone must already be active on Cloudflare DNS):
1. Cloudflare: a payment method on file and a verified email. The card is charged when you confirm the transfer, so a price change applies by the confirm date, not the completion date.
2. Old registrar: turn off the domain lock (WHOIS shows `clientTransferProhibited` while it is on), check no 60-day lock from a recent contact change is shown, and request the auth code. Ask for it only when ready: codes can expire. Leaving the old registrar is free.
3. Cloudflare: *Domain Registration → Transfer Domains* → pick the domain → paste the code → check the contact details → Confirm transfer.
4. Approve the transfer-out email from the old registrar (or in its dashboard). Approved, it completes the same day; otherwise it can take up to 5 to 7 days. If Cloudflare shows "Transfer rejected", turn off the old registrar's WHOIS privacy service and select Retry.
5. When it shows Active: turn on DNSSEC (`PATCH /zones/{zone_id}/dnssec` with `{"status":"active"}`, or one click in *DNS → Settings*), and check the new expiry date and that auto-renew is on. The DNSSEC status reads "pending" until the registry publishes the DS record, usually within hours.

Leave auto-renew on at the old registrar until the transfer completes, as a safety net.

## Check
- RDAP (`https://rdap.verisign.com/com/v1/domain/example.com` for .com) shows the new registrar, and an expiry one year later than before the transfer.
- Cloudflare *Domain Registration → Manage Domains*: status Active, auto-renew on.
- dnsviz.net or `dig +dnssec example.com` shows a signed zone.
- SSL Labs (ssllabs.com/ssltest): grade A.

## Avoid
- Renewing at the old registrar shortly before a transfer. Within 45 days of a renewal the registry gives that year back to the old registrar and the transfer adds none, so you pay twice ([ICANN](https://www.icann.org/news/advisory-2002-06-06-en)).
- Waiting for the old registrar's renewal date to transfer "so nothing is lost". Nothing is lost by transferring early: the year is added on top of the current expiry, whenever you transfer.
- Moving DNS between accounts without exporting the zone first (TXT verifications, DKIM keys and MX records are easy to lose).
- Enabling DNSSEC at the registrar with an old DS record after changing DNS provider: the domain stops resolving. Remove the old DS first.


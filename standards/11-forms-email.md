# 11 · Forms and email
**Applies to:** sites with a contact form or email on their own domain (almost every site).

## Why
The contact form is where the money is. It has to work every time, stay free of spam, and its emails have to land in the inbox.

Mailbox providers now enforce this: Gmail requires authentication from anyone sending over 5,000 messages a day, and after it began requiring basic authentication on all mail, unauthenticated messages fell 75% ([Google, 2023](https://blog.google/products/gmail/gmail-security-authentication-spam-protection/)). Yet 52% of top domains still publish no DMARC record ([EasyDMARC, 2025](https://betanews.com/2025/05/29/less-than-eight-percent-of-top-domains-implement-the-toughest-dmarc-protection/)).

## Rules
1. **Server-side handling:** forms post to a Worker (or function) you control, which validates input, rate-limits, and sends the email or stores the lead. No secrets or signatures in browser code.
   *Why:* anything in the browser can be read and replayed, so keys and validation in front-end code protect nothing.
2. **Spam:** Cloudflare Turnstile (free, no puzzles for most people) verified server-side, plus a hidden honeypot field.
   *Why:* a token checked only in the browser is decoration; spammers post straight to the endpoint.
3. **Confirmation:** a clear on-page success state (or thank-you page with `noindex`), and an error message with an alternative contact route if sending fails.
   *Why:* a form that fails silently loses the lead and the visitor never knows to call instead.
4. **UTMs and page of origin** travel with the submission (standard 19, rule 7).
5. **Worker config in the repo:** `wrangler.toml` holds routes, cron and non-secret vars; secrets live in the platform's secret store; deploys run from CI, not from one person's PC.
   *Why:* settings that live only in a dashboard are lost the day someone redeploys from code.
6. **Email authentication** for every domain that sends mail (including form notifications):
   - exactly one SPF TXT record, under 10 DNS lookups, listing only senders in use
   - DKIM enabled for each sender (Google Workspace, Zoho, Resend, etc.)
   - DMARC: start at `p=none` with reports (Cloudflare DMARC Management is free), move to `p=quarantine` after a few weeks of clean reports, then `p=reject`
7. Domains that never send email publish `v=spf1 -all` and `p=reject` so nobody can spoof them.
   *Why:* otherwise anyone can send mail as that domain, and parked domains are a favourite for phishing.

## Check
- Submit the form on the live site: email arrives, lead shows the UTMs, Turnstile token is verified (test with an invalid token: rejected).
- mail-tester.com or MXToolbox: SPF, DKIM and DMARC pass.
- `dig TXT example.com +short | grep spf` returns one record.

## Avoid
- Two SPF records (both become invalid).
- SPF still including a service you stopped using (for example an old email-routing setup).
- Forms that `mailto:`: unreliable and expose the address to scrapers.
- Deploying Workers from a laptop with settings that exist only in the dashboard. Capture them first, test on a separate Worker name, then switch.

## Notes from real sites
- None yet. Add the first dated lesson here.

# 12 · Forms and email

## Why
The contact form is where the money is. It has to work every time, stay free of spam, and its emails have to land in the inbox.

## Rules
1. **Server-side handling:** forms post to a Worker (or function) you control, which validates input, rate-limits, and sends the email or stores the lead. No secrets or signatures in browser code.
2. **Spam:** Cloudflare Turnstile (free, no puzzles for most people) verified server-side, plus a hidden honeypot field.
3. **Confirmation:** a clear on-page success state (or thank-you page with `noindex`), and an error message with an alternative contact route if sending fails.
4. **UTMs and page of origin** travel with the submission (standard 09, rule 7).
5. **Worker config in the repo:** `wrangler.toml` holds routes, cron and non-secret vars; secrets live in the platform's secret store; deploys run from CI, not from one person's PC.
6. **Email authentication** for every domain that sends mail (including form notifications):
   - exactly one SPF TXT record, under 10 DNS lookups, listing only senders in use
   - DKIM enabled for each sender (Google Workspace, Zoho, Resend, etc.)
   - DMARC: start at `p=none` with reports (Cloudflare DMARC Management is free), move to `p=quarantine` after a few weeks of clean reports, then `p=reject`
7. Domains that never send email publish `v=spf1 -all` and `p=reject` so nobody can spoof them.

## Check
- Submit the form on the live site: email arrives, lead shows the UTMs, Turnstile token is verified (test with an invalid token: rejected).
- mail-tester.com or MXToolbox: SPF, DKIM and DMARC pass.
- `dig TXT example.com +short | grep spf` returns one record.

## Avoid
- Two SPF records (both become invalid).
- SPF still including a service you stopped using (for example an old email-routing setup).
- Forms that `mailto:`: unreliable and expose the address to scrapers.
- Deploying Workers from a laptop with settings that exist only in the dashboard. Capture them first, test on a separate Worker name, then switch.

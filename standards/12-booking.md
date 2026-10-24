# 12 · Booking

**Applies to:** sites that take bookings (calls, consultations, appointments). Paid bookings combine this with [13 · Payments](13-payments.md).

## Why
A booking page turns "contact us" into a meeting on the calendar, with no back-and-forth email. Done well, it also tells you which page and campaign produced each meeting.

Reminders alone change attendance: in a randomized trial of about 9,800 patients, no-shows were 23.1% with no reminder, 17.3% with automated reminders and 13.6% with staff calls ([Am J Med, 2010](https://pubmed.ncbi.nlm.nih.gov/20569761/)). The tools below send them for free.

## Choose a tool
Prices as of 2026-10; check before you commit.

| Tool | Cost | Good for | Watch out |
|---|---|---|---|
| **Cal.com** | Free for individuals; paid for teams | Unlimited event types, inline embeds, webhooks, an API, built-in Stripe for paid events, "requires confirmation" events | Team routing and some integrations are paid |
| **TidyCal** | One-time license | Solo founders who want no subscription; paid bookings via Stripe or PayPal | Fewer integrations and no deep API |
| **Calendly** | Free plan with one event type | Teams already on Calendly | Payments and multiple event types need a paid plan |
| **Google Calendar appointment schedules** | Free with a Google account | The simplest possible setup | Fewer branding and embed options; paid bookings need Workspace |

Default pick: Cal.com, for the free tier, the embed quality and the API.

## Rules
1. **One booking entry point.** Every "Book a call" button goes through one function or link builder, so the URL can change in one place.
   *Why:* booking tools change URLs and event slugs; one builder means one edit instead of a hunt across pages.
2. **Embed inline** on your own `/book` page (not a pop-up from every page), so the page can load fast elsewhere and the booking page can be measured.
3. **Keep the source.** Pass UTM parameters and the page of origin into the booking (Cal.com accepts them as query parameters and stores them as booking metadata), so every meeting shows where it came from.
   *Why:* a meeting with no source cannot be credited to the page or campaign that earned it.
4. **Land on your own confirmation page** after booking (redirect setting in the tool). Fire the GA4 key event there (`booking_confirmed`), mark it `noindex`, and say what happens next.
   *Why:* the tool's own thank-you page is invisible to your analytics, so bookings never show as conversions.
5. **Ask little.** Name, email and one qualifying question. Every extra field costs bookings.
6. **Show the visitor's time zone** and the meeting length on the page.
7. **Reminders on**, with an email the day before and an hour before, to cut no-shows.
8. Add the tool's origins to the CSP `frame-src` and `script-src` (standard 15), and to the privacy policy's processor list (standard 18).
9. In regions where people prefer messaging (much of Latin America), offer a WhatsApp link next to the booking button, using a `wa.me` link with a pre-filled message.
   *Why:* in much of Latin America a WhatsApp message converts better than a calendar, and a plain link loads no widget script (standard 19, rule 11).

## Paid bookings
Pick the simplest pattern that fits:
1. **Built-in payment** (Cal.com Stripe app, TidyCal with Stripe/PayPal): the tool takes payment before confirming. No code. Use it whenever your gateway is supported.
2. **Your own gateway** (for example Wompi in Colombia, which booking tools don't support): make the event "requires confirmation"; after booking, send the visitor to a Worker that creates the checkout; the gateway's webhook calls the Worker; the Worker verifies the signature and confirms the booking through the booking tool's API. Unpaid bookings expire on a schedule (a cron Worker). See [13 · Payments](13-payments.md) for the gateway rules.

## Check
- Book a test meeting from a URL with `?utm_source=test`: the booking shows the UTM, the confirmation page loads, and GA4 Realtime shows `booking_confirmed`.
- Console clean on the booking page (no CSP errors).
- Mobile: the embed fits the screen with no horizontal scroll.

## Avoid
- A third-party booking page as the only option (`cal.com/yourname` with nothing on your site): you lose measurement and brand.
- Pop-up booking widgets loaded on every page: they slow every page for the few who book.
- Long intake forms before the time slots.

## Notes from real sites
- 2026-10: a longevity center's site uses Cal.com "requires confirmation" events plus a Worker and Wompi, because Cal.com has no Wompi integration. Events stay pending until the payment webhook confirms them.

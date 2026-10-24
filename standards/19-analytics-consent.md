# 19 · Analytics and consent
**Applies to:** every site.

## Why
Tracking without consent is no longer a theoretical risk for small sites:
- **US:** California's wiretap law (CIPA) lets anyone sue for up to $5,000 per violation, with no size threshold. Thousands of suits and demand letters since 2022 target exactly what small sites install: session replay, chat widgets and ad pixels that start before the visitor agrees. Courts have said consent must come *before* recording starts ([Javier v. Assurance IQ](https://www.mayerbrown.com/en/insights/publications/2025/07/cipa-claims-stumble-at-summary-judgment)).
- **Colombia and similar laws:** consent must be prior and provable, and silence or "keep browsing" never counts (Decreto 1377 de 2013, art. 7 and 8). The regulator treats cookies as personal data, and its fines reach hundreds of millions of pesos.
- **EU and UK:** the rule covers anything stored on or read from the device, including pixels, not only cookies ([EDPB 2/2023](https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en)).
- **The platforms themselves:** Google's and Microsoft's terms require a privacy policy and valid consent, and both can suspend the account. Google Ads measures EEA traffic only with Consent Mode v2 signals, and Clarity has enforced consent for EEA, UK and Swiss visitors since 2025-10-31.

Most banners fail anyway: a study of banners from the five most popular consent platforms on top UK sites found only 11.8% met minimal EU requirements ([Nouwens et al., CHI 2020](https://arxiv.org/abs/2001.02479)). The same study is honest about the cost: removing Reject from the first screen raised acceptance by about 22 points. That gain is exactly what regulators call a dark pattern, and rule 10 is how to recover visibility legitimately.

The good news: done the way below, the cost in visibility is small (rule 10). Not legal advice; laws differ by market.

## Rules
1. **Nothing loads before consent.** No GA4, GTM, Clarity, Meta Pixel, ads tag or third-party widget until the visitor accepts that category.
   *Why:* the lawsuits and fines above are about what ran before the click, not about whether a banner existed.
2. **Google Consent Mode v2, Basic variant:** `analytics_storage`, `ad_storage`, `ad_user_data` and `ad_personalization` default to `denied`, then `update` from the visitor's choice. Load Google tags only after consent.
   *Why:* Google needs these signals for EEA ads measurement; Basic avoids the cookieless pre-consent pings of Advanced, which still send the IP and which privacy specialists dispute.
3. **Microsoft Clarity** loads after analytics consent and receives the choice (`clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' })`). Set masking to **Strict**, or at least mask booking, intake, payment and account pages.
   *Why:* Clarity's default masks inputs but records displayed text, so a recording of a booking summary can capture a name or a health detail. Masking changes do not reach past recordings.
4. **Live host only:** analytics checks `location.hostname` against the production domain.
   *Why:* previews and localhost otherwise pollute the data and can record test bookings.
5. **Ownership:** every property (GA4, GTM, Clarity, Search Console, Bing) belongs to the business's own account, with the agency or owner as admin. IDs and owner accounts go in private notes, not here.
   *Why:* when a person or agency leaves with the login, the history leaves too, and properties cannot always be moved.
6. **Measure what matters:** one GA4 key event per real conversion (`contact_submit`, `booking_confirmed`, `whatsapp_click`), mirrored to Clarity (`clarity('event', name)`), and one funnel per main conversion.
   *Why:* page views do not pay the bills; three well-named events beat thirty auto-collected ones.
7. **The source travels with the lead:** read `utm_*` and the referrer on landing, keep them in `sessionStorage`, and send them with the form or booking.
   *Why:* this works whether or not the visitor accepted analytics, so every enquiry keeps its source. For a small business it is the most valuable number there is.
8. **AI traffic is visible:** GA4's default channel group now has an **AI Assistant** channel ([Google](https://support.google.com/analytics/answer/9756891)); check *Source / medium* for assistants it misses and, if any, add a custom channel group with a source regex (`chatgpt|openai|claude|anthropic|perplexity|gemini|copilot|you\.com|meta\.ai|deepseek|mistral`) placed **above** Referral. Clicks from Google's AI Overviews and AI Mode count as Organic, not AI.
   *Why:* you need to see whether standard 07 works, but expect the number to look small: most people an assistant sends arrive later by typing your name, with no AI referrer. Watch branded searches in Search Console and ask leads "what did you ask the AI?" (standard 03).
9. **Data hygiene:**
   - GA4 data retention set to 14 months (the default is 2).
   - Google Signals off unless ads need it.
   - An internal-traffic filter set to *Active* with the owner's IP, and the same IP excluded in Clarity.
   - No personal or health data in event names, parameters or URLs.

   *Why:* each default quietly costs you data or adds risk, and nobody revisits them later.
10. **Lose as little visibility as possible.** A banner means some visitors decline. Plan for it instead of skipping it:
    - **Consent-free baseline.** Cloudflare Web Analytics (cookieless) counts every visit, page and referrer; on a proxied Cloudflare site the server-side version needs no script at all. Search Console and Bing show the queries. Totals and search demand stay complete.
    - **Source on the lead** (rule 7), so enquiries never lose attribution.
    - **Skip Advanced Consent Mode on small sites.** GA4 only models missing visits above 1,000 denied-consent events and 1,000 consenting users a day, each on at least 7 days ([Google](https://support.google.com/analytics/answer/11161109)). Below that, Advanced adds legal questions and no data.
    - **A banner that is easy to answer:** one plain sentence on what is measured and why, Accept and Reject with equal weight, no wall over the page. Clear banners get more acceptances than vague ones.
    - **Region scoping only where the law allows.** Consent Mode accepts a `region` list for defaults. Decide the regions with whoever advises the business, record it in the site's AGENTS.md, and keep the banner wherever in doubt.

    *Why:* with this in place only per-visitor GA4 detail for people who declined goes missing. Everything that drives decisions survives.
11. **Embeds wait too.** YouTube (including `youtube-nocookie`), Google Maps, Calendly and chat widgets load after consent or on click, behind a static placeholder. WhatsApp is a plain `wa.me` link, not a widget script.
    *Why:* these set storage and phone home on load; they are trackers with a nicer face, and the chat-widget ones are a favourite CIPA target.
12. **No ad pixels where people share sensitive details:** booking, intake, payment and account pages carry no Meta Pixel or ads tag. Health-adjacent businesses add no Meta Pixel at all without counsel.
    *Why:* the FTC has fined health services millions for pixels on such pages, and Meta itself now restricts the data health and wellness advertisers can send.
13. **Keep proof of consent:** store the choice with a timestamp and the policy version (the template's `consent.js` keeps them in localStorage), and bump the version when categories change so everyone is asked again.
    *Why:* several laws and Google's policy ask you to show that consent was given, not just that a banner existed.

## How to build it
- Copy `templates/js/consent.js` and `templates/js/analytics.js`; set the production hostname and IDs; wire a footer link with `data-consent-open` to reopen preferences.
- Prefer direct `gtag.js` over GTM unless a marketer needs GTM. If GTM is used, it also waits for consent.
- A hand-built banner is fine for GA4 and Google Ads. Google's "certified CMP" requirement applies to AdSense, Ad Manager and AdMob publishers, not to advertisers.
- US-facing sites can honour Global Privacy Control (`navigator.globalPrivacyControl`) as a Reject.
- Add CSP origins for each tool (standard 15).

## Check
1. Fresh browser profile, live domain, DevTools → Network: before choosing, no requests to google-analytics, googletagmanager, clarity, facebook or any embed.
2. Accept: requests start; GA4 *Realtime* shows the visit.
3. **Reject, then open a second page:** still no tracker requests. Tracking that resumes after an opt-out is a common lawsuit theory.
4. Preview host: no analytics requests even after accepting.
5. DevTools → Application → Cookies and Local Storage before consent: nothing from third parties.

## Avoid
- **GTM loading on page load behind a banner that only hides itself.** Consent theatre, and the exact pattern the lawsuits describe.
- "By continuing to browse you accept" banners, pre-ticked boxes, or Reject hidden in a second layer.
- Skipping the banner to keep the numbers. The traffic it seems to save is traffic you were not allowed to measure.
- "Anonymize IP" settings: GA4 does not store IP addresses, so the option is obsolete.
- Server-side tagging to avoid consent: it moves the tags, not the obligation, and costs money to host.
- Copying a GA4 channel group and only reordering: copied channels are defined by the default group, so order alone changes nothing. Add an explicit source-regex condition.

## Notes from real sites
- 2026-10: the cleanest setup among our sites is a small `consent.js` (localStorage choice, `consent:change` event) plus an `analytics.js` that only acts on that event and the live hostname. Generic copies are in `templates/js/`.
- 2026-10: an internal-traffic filter left in *Testing* mode does not exclude anything from reports.
- 2026-10: an owner asked what they would lose by adding a banner to a site that already got good traffic. What settled it: Cloudflare Web Analytics and Search Console keep the totals and queries, UTMs on the lead keep every enquiry's source, and only per-visitor GA4 detail for people who decline goes missing. Consent Mode modeling would not have helped at that traffic level.

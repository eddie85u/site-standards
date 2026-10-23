# 09 · Analytics and consent
**Applies to:** every site.

## Why
You cannot improve what you do not measure, and in most markets you cannot measure without consent. Done right, analytics loads only for visitors who agreed, only on the real domain, and tracks the few actions that mean money.

## Rules
1. **Nothing loads before consent.** No GA4, GTM, Clarity, Meta Pixel or ads tag until the visitor accepts that category. Cookieless, first-party measurement (Cloudflare Web Analytics) may run without consent where the law allows; say so in the privacy policy.
2. **Google Consent Mode v2:** set `analytics_storage`, `ad_storage`, `ad_user_data` and `ad_personalization` to `denied` by default, then `update` them from the visitor's choice.
3. **Microsoft Clarity:** load after analytics consent and pass the choice with the consent API (`clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' })`; older `clarity('consent')` still works). Clarity requires a consent signal for visitors in the EEA, UK and Switzerland.
4. **Live host only:** analytics code checks `location.hostname` against the production domain, so previews and localhost never pollute the data.
5. **Ownership:** every property (GA4, GTM, Clarity, Search Console, Bing) is owned by the business's own account (not a person's private email), with the agency or owner account as admin. Write the owner account and IDs in the site's private notes, not in this repo.
6. **Measure what matters:**
   - one GA4 key event per real conversion (form submitted, booking paid, WhatsApp click), sent from code with a clear name like `contact_submit`
   - the same events mirrored to Clarity (`clarity('event', name)`) so recordings can be filtered
   - one funnel per main conversion (landing → form/booking page → confirmation)
7. **UTMs survive to the lead:** read `utm_*` from the landing URL, keep them in `sessionStorage`, and send them with the form or booking so every lead shows its source.
8. **AI traffic is visible:** in GA4 create a custom channel group with an "AI assistants" channel (source matches `chatgpt|openai|claude|anthropic|perplexity|gemini|copilot|bard|you\.com|meta\.ai|deepseek|mistral`), placed **above** Referral.
9. **Data hygiene:** GA4 data retention 14 months; an internal-traffic filter set to *Active* (not *Testing*) with the owner's IP; the same IP excluded in Clarity.
10. **Lose as little visibility as possible.** A banner means some visitors decline, and GA4 never sees them. Owners worry about this, and they are right to: on a small site the loss is real. Plan for it instead of skipping the banner:
    - **Keep a consent-free baseline.** Cloudflare Web Analytics (cookieless, first party) counts every visit, page and referrer, and Search Console and Bing Webmaster show the search queries. None of them need the banner, so total traffic and search demand stay fully visible. GA4 then answers the "who did what" questions for the visitors who agreed.
    - **Attach the source to the lead, not only to the session.** Rule 7 sends the UTMs and referrer with the form or booking itself, so every lead keeps its source even when the visitor declined analytics. For a small business this matters more than session counts.
    - **Pick the Consent Mode variant on purpose.** *Basic* loads Google tags only after consent (what rule 1 describes). *Advanced* loads them at once with storage denied and sends cookieless pings, which GA4 can use to model the missing visits and conversions. Modeling only starts once a property has at least 1,000 denied-consent events a day and 1,000 consenting users a day, each on at least 7 days ([Google's eligibility rules](https://support.google.com/analytics/answer/11161109)), so most small sites gain little from Advanced while taking on its legal question. Use Basic unless the site has that traffic and counsel approves Advanced for its markets.
    - **Make the banner easy to answer, not easy to miss.** One short sentence on what is measured and why, Accept and Reject with equal weight, no wall over the page. A clear, honest banner gets more acceptances than a vague one.
    - **Scope it by region only where the law allows.** Consent Mode accepts a `region` list for defaults. Some markets expect consent from every visitor (the EEA and UK, and countries such as Colombia whose data protection law asks for prior consent); others do not. Decide the regions with whoever advises the business on privacy, write the decision in the site's AGENTS.md, and keep the banner wherever in doubt.

    *Why bother at all:* without a banner and a privacy policy the site breaks Google's own terms for GA4 and Ads, and in markets with consent laws the owner carries the regulator's risk. With the setup above, the cost is small: the baseline counts stay complete, the leads keep their source, and only the per-visitor detail for people who declined is missing.

## How to build it
- Copy `templates/js/consent.js` and `templates/js/analytics.js`; set the production hostname and IDs; wire a footer link with `data-consent-open` to reopen preferences.
- Prefer direct `gtag.js` over GTM unless a marketer needs GTM. If GTM is used, it too waits for consent and the tags inside use Consent Mode.
- Add CSP origins for each tool (standard 02).

## Check
1. Fresh browser profile, live domain, DevTools → Network: before choosing, no requests to google-analytics, googletagmanager or clarity.
2. Accept: requests start; GA4 *DebugView* or *Realtime* shows the visit.
3. Reject or withdraw: no new hits after reload.
4. Preview host: no analytics requests even after accepting.

## Avoid
- **GTM loading on page load with a cookie banner that only hides itself.** That is consent theatre and a legal risk.
- A banner whose "Reject" is hidden behind a second click while "Accept" is one click. Equal prominence.
- Copying a GA4 channel group and only reordering: copied channels are defined as "Default channel group = X", so order alone changes nothing. Add an explicit source-regex condition to the AI channel.
- Personal email accounts owning business analytics. When that person leaves, so does the data.
- **Skipping the banner to keep the numbers.** The traffic it seems to save is the traffic you were not allowed to measure. Keep the baseline from rule 10 instead.

## Notes from real sites
- 2026-10: the cleanest setup among our sites is a small `consent.js` (localStorage choice, `consent:change` event) plus an `analytics.js` that only acts on that event and the live hostname. Generic copies are in `templates/js/`.
- 2026-10: an internal-traffic filter left in *Testing* mode does not exclude anything from reports.
- 2026-10: an owner asked what they would lose by adding a banner to a site that already got good traffic. The answer that settled it: Cloudflare Web Analytics and Search Console keep the totals and the queries, UTMs on the lead keep the source of every enquiry, and only per-visitor GA4 detail for people who decline goes missing. Consent Mode modeling would not have helped at that traffic level.

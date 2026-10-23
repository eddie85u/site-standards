# 09 · Analytics and consent

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

## Notes from real sites
- 2026-10: the cleanest setup among our sites is a small `consent.js` (localStorage choice, `consent:change` event) plus an `analytics.js` that only acts on that event and the live hostname. Generic copies are in `templates/js/`.
- 2026-10: an internal-traffic filter left in *Testing* mode does not exclude anything from reports.

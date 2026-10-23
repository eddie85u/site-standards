# 18 · Privacy and compliance
**Applies to:** every site.

## Why
A privacy policy, an honest banner and disciplined claims keep the business clear of regulators, ad platforms and the lawsuits described in standard 19. Ad platforms reject ads and suspend accounts over a missing policy or a banned word long before any regulator calls. They are also part of looking established.

## Rules
1. **Privacy policy** page, linked from every footer: the controller, what is collected (forms, bookings, analytics, cookies), why, the legal basis, the processors (hosting, analytics, email, payment, scheduling), retention, the visitor's rights and how to use them, and a contact. Name the law that applies (GDPR, Colombia's Ley 1581 de 2012, CCPA).
   *Why:* GA4, Clarity and Google Ads require a policy that discloses them, and most data laws require the rest of this list.
2. **Cookie banner** whenever a non-essential cookie or tracker exists: Accept, Reject and Preferences with equal prominence, categories (necessary, analytics, advertising), and a footer link to reopen it. Standard 19 is the technical gate.
   *Why:* equal prominence is what makes consent valid; a buried Reject is the first thing regulators and plaintiffs point to.
3. **Sensitive data** (health, financial, minors): an explicit consent checkbox at collection, and never in analytics events, logs or URLs.
   *Why:* sensitive data carries the highest fines, and URLs end up in analytics, server logs and referrers without anyone deciding it.
4. **Claims discipline.** The site's AGENTS.md keeps a list of words and claims it must never publish (regulated terms, guarantees, certifications it does not hold, competitor names, undecided prices); `forbidden-terms.txt` enforces it (standard 20).
   *Why:* one agent-written sentence can claim a certification you do not hold.
5. **Testimonials and proof** are real, attributable (first name and context), consented in writing, and describe experience, not guaranteed outcomes. Regulated fields add a "results vary" note.
   *Why:* fake or unconsented reviews break consumer law (the FTC's reviews rule in the US) and platform policies.
6. **Legal pages get a lawyer's review** before large paid campaigns.
   *Why:* ads multiply the audience, and the risk, of every sentence on the page.

## Check
- Every page footer links to the privacy policy.
- The banner shows on a first visit, and rejecting works (standard 19, Check).
- `check-site.mjs` with the site's `forbidden-terms.txt` passes.

## Avoid
- Copying another company's privacy policy (wrong controller, wrong processors, wrong law).
- "SOC 2", "ISO 27001", "HIPAA compliant", "certified partner" or award badges the business does not actually hold.
- Invented numbers: "500+ clients", "98% satisfaction" without a source you could show a regulator.
- Ad-platform-sensitive wording in regulated fields (health: drug or compound names, "cure", "anti-aging", weight-loss promises; finance: guaranteed returns). These get ads rejected even when true.

## Notes from real sites
- None yet. Add the first dated lesson here.

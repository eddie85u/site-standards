# 10 · Privacy and compliance

## Why
A privacy policy, an honest cookie banner and disciplined claims protect the business from regulators and ad platforms, and they are part of looking established.

## Rules
1. **Privacy policy** page, linked from every footer, covering: who the controller is, what data is collected (forms, bookings, analytics, cookies), why, the legal basis, processors (hosting, analytics, email, payment, scheduling), retention, the visitor's rights and how to exercise them, and a contact. Name the local law that applies (for example GDPR, Colombia Ley 1581 de 2012, CCPA).
2. **Cookie banner** when any non-essential cookie or tracker exists: Accept, Reject and Preferences with equal prominence; categories (necessary, analytics, advertising); a footer link to reopen it. See standard 09 for the technical gate.
3. **Sensitive data** (health, financial, minors): explicit consent checkbox at collection, never in analytics events, never in logs, never in URLs.
4. **Claims discipline.** Each site keeps, in its AGENTS.md, a list of words and claims it must never publish (regulated terms, guarantees, certifications it does not hold, competitor names, prices not yet decided). The guardrail tests enforce it (standard 13).
5. **Testimonials and proof** are real, attributable (first name + context), consented in writing, and describe experience, not guaranteed outcomes. Regulated industries add a "results vary" note.
6. Legal pages get a lawyer's review before large paid campaigns.

## Check
- Every page footer links to the privacy policy.
- The banner shows on a first visit, and rejecting works (standard 09, Check).
- `check-site.mjs` with the site's `forbidden-terms.txt` passes.

## Avoid
- Copying another company's privacy policy (wrong controller, wrong processors, wrong law).
- "SOC 2", "ISO 27001", "HIPAA compliant", "certified partner" or award badges the business does not actually hold.
- Invented numbers: "500+ clients", "98% satisfaction" without a source you could show a regulator.
- Ad-platform-sensitive wording in regulated fields (health: drug or compound names, "cure", "anti-aging", weight-loss promises; finance: guaranteed returns). These get ads rejected even when true.

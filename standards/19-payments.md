# 19 · Payments

**Applies to:** sites that sell something online: a paid consultation, a deposit, a course, a product or a package. None of these gateways charge a monthly fee on their standard plans; you pay per transaction.

## Why
Taking payment on the site removes a step between "yes" and "paid". With hosted checkout it also keeps card data off your site, so there is little security or compliance burden.

## Choose a gateway
Pick by three things: where the business is registered and banks, where the customers are, and which payment methods they expect. Fees and coverage as of 2026-10; check each pricing page.

| Region | First choice | Also consider | Local methods that matter |
|---|---|---|---|
| **United States** | **Stripe** (about 2.9% + 30¢ per online card payment) | PayPal as an extra button; Square if you also sell in person | Cards, Apple Pay, Google Pay, ACH for large invoices |
| **Europe** | **Stripe** (lower fees for European cards) | **Mollie** (strong in the Netherlands, Belgium, Germany, France; simple per-method pricing); Adyen at high volume | SEPA debit, iDEAL / Wero, Bancontact, Klarna, cards with 3-D Secure |
| **Colombia** | **Wompi** (by Bancolombia) | Mercado Pago; Stripe is not available to Colombian businesses | PSE bank transfer, Nequi, Bancolombia button, cards, cash points |
| **Rest of Latin America** | **Mercado Pago** (Argentina, Brazil, Mexico, Chile, Peru, Uruguay, Colombia) | Stripe in Mexico and Brazil; dLocal for companies abroad selling into the region | Pix (Brazil), OXXO and SPEI (Mexico), installments |
| **Digital products sold worldwide** | A **merchant of record** (Paddle, Lemon Squeezy) | Gumroad for simple downloads; Stripe Tax if you handle tax yourself | The merchant of record collects and files sales tax and VAT for you, for a higher fee |

## Pick the simplest integration that works
1. **Payment link** (Stripe Payment Links, Mollie payment links, Wompi links): no code. Paste the link on a button. Good for a fixed-price course, a deposit or a package.
2. **Hosted checkout created by a Worker** (Stripe Checkout, Wompi Web Checkout, Mollie hosted checkout): a small Worker creates the session with the price from your own server-side list, and the visitor pays on the gateway's page. Use it when you need to attach a booking, a customer ID or a dynamic amount.
3. **Embedded payment fields** (Stripe Elements and similar): only when a seamless on-page form really matters. More work and more compliance scope.

Hosted options (1 and 2) keep you at the lightest PCI level (card data never touches your site).

## Rules
1. **The browser never decides the price.** The amount comes from a price list in the Worker, keyed by product ID. Never trust an amount sent from the page.
2. **Signatures and secrets live in the Worker**, stored as secrets, never in front-end code or the repo. Some gateways use several different keys (public key, private key, integrity secret, events secret); label each one clearly, because mixing them up breaks checkout or webhooks.
3. **The webhook is the truth, not the redirect.** Mark an order paid only when a webhook with a valid signature says so. The "thank you" redirect can be faked or skipped.
4. **Webhooks are idempotent.** Gateways retry; processing the same event twice must not confirm twice or email twice. Store the event or transaction ID and ignore repeats.
5. **Test mode first.** Run every path (success, decline, abandoned checkout, refund) with the gateway's test keys and test cards before switching to live keys.
6. **Show the full price** with currency, taxes and what is included before checkout, and link the refund policy and terms (standard 10).
7. **Receipts and confirmation:** the gateway's receipt email on, plus your own confirmation page (`noindex`) that fires the GA4 `purchase` or `booking_paid` key event with the value.
8. **CSP and privacy:** add the checkout origin to `form-action`/`frame-src` as needed (standard 02) and the gateway to the privacy policy's processors (standard 10).
9. **Europe:** cards need 3-D Secure (Strong Customer Authentication); hosted checkouts handle it for you.

## Check
- Test mode: a successful payment marks the order paid only after the webhook arrives; a declined card leaves it unpaid; replaying the same webhook changes nothing.
- A webhook with a wrong signature is rejected with an error status.
- Changing the amount in the browser's dev tools does not change what is charged.
- Live mode: one real low-value purchase, then a refund.

## Avoid
- Computing a payment signature or hash in JavaScript on the page: anyone can read the secret.
- Confirming orders from the redirect URL's query string.
- Hard-coded live keys in the repo, even private ones. Rotate any key that was ever committed.
- Building a full cart for one or two products: a payment link is enough.

## Notes from real sites
- 2026-10: a Colombian longevity center's site takes paid valuations through Wompi Web Checkout. A Worker signs the transaction (integrity secret), Wompi calls the Worker's webhook (events secret), and the Worker confirms the Cal.com booking. Keeping the keys clearly named in the Worker settings avoided a class of "signature invalid" errors.

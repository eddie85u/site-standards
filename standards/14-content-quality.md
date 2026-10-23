# 14 · Content quality and AI slop
**Applies to:** every site.

## Why
Visitors, buyers and search engines have learned to spot generated filler. It makes a business look small, lazy or fake. Specific, plain, checkable copy reads as a company that knows its work.

## Rules
1. **Specific over impressive.** Every claim answers "how much, for whom, by when, compared to what". If it cannot, cut it.
2. **Plain words.** Short sentences. One idea per paragraph. Write the way the owner would explain it on a call.
3. **Real proof only:** named clients (with permission), real numbers with a source, real photos of real people and places.
4. **One voice per site**, written down in the site's AGENTS.md (tone, words to use, words never to use).
5. **Human review** of every page of copy before it goes live, even when an agent drafted it.

## The slop list
The guardrail script reads `templates/slop-terms.txt`. A hit is not always wrong, but each one must be a deliberate choice.

**Words and phrases**
- Filler openers: "In today's fast-paced world", "In the ever-evolving landscape", "Look no further", "Whether you're a ... or a ..."
- Hype verbs: unlock, unleash, elevate, empower, supercharge, revolutionize, transform (without saying from what to what), harness, leverage (as a verb), streamline, delve
- Empty adjectives: seamless, robust, cutting-edge, state-of-the-art, world-class, best-in-class, next-level, game-changing, innovative, holistic, tailored, bespoke, synergy
- Metaphor clichés: tapestry, symphony, journey (for a purchase), navigate the complexities, at the forefront, the realm of
- Structures: "It's not just X, it's Y"; "X isn't Y. It's Z."; triplets everywhere ("fast, simple, and secure"); every section ending on a rhetorical question
- Punctuation tells: em dashes in every paragraph (many sites ban them entirely), emoji as bullet points, Title Case On Every Heading

**Visual and structural**
- Default template look: purple-to-blue gradients, glassmorphism cards, floating 3D blobs, the same three-card feature grid repeated down the page
- Stock icons standing in for content (a rocket for "growth", a shield for "security")
- Fake social proof: logo walls of companies that are not clients, star ratings with no source, testimonials with no name or with AI-generated faces
- Counters and stats that animate up to round numbers ("500+", "99%")
- Lorem ipsum, "Your Company", placeholder emails, broken anchors (`href="#"`)

**Code**
- Libraries loaded for one effect, several analytics loaders, commented-out blocks, `console.log` left in, unused CSS from earlier designs, inline styles repeated across pages

## How to detect it
```sh
node tests/check-site.mjs --root site --slop          # flags slop-list hits in visible text
grep -rn "—" site --include=*.html | wc -l             # em dash count
```
Then read the page out loud. Anything you would not say to a client on a call goes.

## How to fix it
1. Replace each flagged phrase with the specific fact behind it ("seamless onboarding" → "you get logins on day one and a 30-minute walkthrough").
2. Delete sentences that survive without their adjectives.
3. Replace stock icons and generic illustrations with real photos, product screenshots or nothing.
4. Remove any stat or logo you could not defend in writing.

## Avoid
- Running a "humanizer" tool over generated text: it swaps synonyms and keeps the emptiness.
- Banning words without replacing them with facts: the result is shorter slop.

## Notes from real sites

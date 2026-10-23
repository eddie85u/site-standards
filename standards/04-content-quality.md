# 04 · Content quality and AI slop
**Applies to:** every site.

## Why
Visitors, buyers and search engines have learned to spot generated filler, and it makes a business look small, lazy or fake. Assistants also skip it: a sentence any competitor could publish gives them nothing to quote. Specific, plain, checkable copy reads as a company that knows its work, and it is what gets repeated in AI answers (standard 03).

## Rules
1. **Specific over impressive.** Every claim answers "how much, for whom, by when, compared to what". If it cannot, cut it.
2. **Three tests for every sentence:**
   - *Swap:* could a competitor publish it unchanged? Then it says nothing about you.
   - *Picture:* can the reader see it happening? "Logins on day one and a 30-minute walkthrough" passes; "seamless onboarding" does not.
   - *Falsifiable:* could it be proven wrong? Claims that cannot be are filler.

   *Why:* these catch the generic sentences a slop list misses.
3. **Agents mark missing proof instead of inventing or dropping it.** When a claim needs evidence the agent does not have, it writes `[NEED: review export]`, `[NEED: certificate]` or `[NEED: real number]` and the owner fills it in. The guardrail script flags any `[NEED:` left in the site.
   *Why:* agents otherwise either invent a number (a legal problem) or quietly delete the strongest claim on the page.
4. **Plain words.** Short sentences, one idea per paragraph, written the way the owner would say it on a call.
5. **Real proof only:** named clients (with permission), real numbers with a source and a date ("4.8 on Google, Oct 2026"), real photos of real people and places.
   *Why:* undated numbers look invented, and invented ones are a regulator's favourite target (standard 18).
6. **One voice per site,** written in the site's AGENTS.md: tone, words to use, words never to use.
   *Why:* without it, every agent session drifts toward its own default voice.
7. **Human review** of every page of copy before it goes live, even when an agent drafted it.

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
- None yet. Add the first dated lesson here.

# 04 · Content quality and AI slop
**Applies to:** every site.

## Why
Visitors, buyers and search engines have learned to spot generated filler, and it makes a business look small, lazy or fake. Assistants also skip it: a sentence any competitor could publish gives them nothing to quote. Specific, plain, checkable copy reads as a company that knows its work, and it is what gets repeated in AI answers (standard 03).

Google says its March 2024 update cut low-quality, unoriginal content in results by 45% ([Google, via Search Engine Roundtable](https://www.seroundtable.com/google-march-2024-core-update-finished-april-19-37299.html)). Generic copy is what that filter is built to remove.

## Rules
1. **Specific over impressive.** Every claim answers "how much, for whom, by when, compared to what". If it cannot, cut it.
2. **Three tests for every sentence:**
   - *Swap:* could a competitor publish it unchanged? Then it says nothing about you.
   - *Picture:* can the reader see it happening? "Logins on day one and a 30-minute walkthrough" passes; "seamless onboarding" does not.
   - *Falsifiable:* could it be proven wrong? Claims that cannot be are filler.

   *Why:* these catch the generic sentences a pattern list misses.
3. **Agents mark missing proof instead of inventing or dropping it.** When a claim needs evidence the agent does not have, it writes `[NEED: review export]`, `[NEED: certificate]` or `[NEED: real number]` and the owner fills it in. The guardrail script flags any `[NEED:` left in the site.
   *Why:* agents otherwise either invent a number (a legal problem) or quietly delete the strongest claim on the page.
4. **Plain words.** Short sentences, one idea per paragraph, written the way the owner would say it on a call.
5. **Real proof only:** named clients (with permission), real numbers with a source and a date ("4.8 on Google, Oct 2026"), real photos of real people and places. Results a founder or team member earned at an earlier employer belong to that person: say so by name, keep the wording identical to their public profile and link it (`sameAs`, [06](06-structured-data.md)); the business's own claims stay with facts anyone can check (price, timeline, what the client owns).
   *Why:* undated numbers look invented, and invented ones are a regulator's favourite target (standard 18). Assistants also check: one called an unsourced "7x faster" line "a marketing claim, not an independently verified result" in its answer about the business, and they compare a founder's claims with the profile they find.
6. **One voice per site,** written in the site's AGENTS.md: tone, words to use, words never to use.
   *Why:* without it, every agent session drifts toward its own default voice.
7. **Human review** of every page of copy before it goes live, even when an agent drafted it.
8. **A paused service is left out, never written as "not offered".** While the business has paused a service, it disappears from pages, listings, FAQ answers, llms.txt and JSON-LD. No sentence says "we don't offer X" or "X is not available". If a buyer asks, a person answers.
   *Why:* assistants and directories copy a negative sentence and keep repeating "they don't do X" for months after the service returns, and on a regulated site the sentence still names the thing. Silence costs nothing when the service comes back; a denial has to be found and corrected everywhere it spread.
9. **Agents read the writing-pattern list before every draft and run the self-check after it.** Pages, listings, LinkedIn posts and outreach drafts alike, in each language the text is written in (the list and the prompt are below).
   *Why:* a word list catches words; most machine-sounding text is in the sentence shapes (a build-up, a question it answers itself, a moral at the end), which only a pattern list or a reread catches. Reading the list first prevents most of them; the check script catches the rest.

## The writing-pattern list
`templates/slop-patterns.txt` holds the patterns in English and Spanish, as regular expressions wherever a pattern can be matched, and `templates/tests/check-writing.mjs` checks each page's visible text against the patterns for that page's language. A hit is a warning, not a failure: some are fine on purpose, but each one must be a deliberate choice. Keep the list apart from the site's `forbidden-terms.txt` (standard 18): compliance words fail the build, writing patterns only warn. Mixed into one list, they either block good copy or let a banned claim through as "just a warning".

**Sentence patterns** (the ones a word list misses)

| Pattern | English | Spanish |
|---|---|---|
| Fake build-up | "No fluff. No jargon. Just results." | "Sin filas. Sin esperas. Solo resultados." |
| Not X but Y | "It's not just X, it's Y"; "X isn't Y. It's Z." | "No solo… sino (también)"; "No es X, es Y" |
| Self-answered question | "The result?" "Sound familiar?" "Why does this matter?" | "¿El resultado?" "¿Te suena?" |
| Colon reveal | "Here's the thing:" "The bottom line:" | "La clave:" "En pocas palabras:" |
| "-ing" tail | "…, ensuring accuracy"; "…, enabling growth" | "…, garantizando calidad"; "…, potenciando" |
| Fake range | "From startups to enterprises"; "and everything in between" | "Desde emprendedores hasta grandes empresas" |
| Inflated significance | "serves as a testament to"; "plays a pivotal role" | "juega un papel fundamental"; "marca un antes y un después" |
| Closing moral | "At the end of the day…"; "That's what makes all the difference." | "En definitiva…"; "Eso marca la diferencia." |
| Filler opener | "In today's fast-paced world"; "Whether you're a … or a …" | "En el mundo actual"; "Hoy más que nunca" |
| Em dash | "—" in running text (many sites ban it) | "—" (the raya belongs to dialogue, not to business pages) |

**Words**
- Hype verbs: unlock, unleash, elevate, empower, supercharge, revolutionize, harness, leverage (as a verb), delve; *sumérgete, adéntrate, descubre* (opening a sentence), *potenciar, desbloquear, desatar, llevar al siguiente nivel, liberar tu potencial*
- Empty adjectives: seamless, robust, cutting-edge, state-of-the-art, world-class, best-in-class, next-level, game-changing, holistic, bespoke, synergy; *sin fisuras, de vanguardia, de primer nivel, innovador, holístico, experiencia única*
- Metaphor clichés: tapestry, symphony, journey (for a purchase), navigate the complexities, at the forefront, every step of the way; *tu viaje hacia, en cada paso del camino, la mejor versión de ti*
- Spanish tells with no English twin: *cabe destacar, es importante señalar, en el panorama actual, en constante evolución*. Calques count too: Spanish written as translated English ("aplicar para un trabajo", "hace sentido") reads as machine text even when every word is a real word.

**Visual and structural**
- Default template look: purple-to-blue gradients, glassmorphism cards, floating 3D blobs, the same three-card feature grid repeated down the page
- Stock icons standing in for content (a rocket for "growth", a shield for "security")
- Fake social proof: logo walls of companies that are not clients, star ratings with no source, testimonials with no name or with AI-generated faces
- Counters and stats that animate up to round numbers ("500+", "99%")
- Triplets everywhere ("fast, simple, and secure"), every section ending on a rhetorical question, emoji as bullet points, Title Case On Every Heading
- Lorem ipsum, "Your Company", placeholder emails, broken anchors (`href="#"`)

**Code**
- Libraries loaded for one effect, several analytics loaders, commented-out blocks, `console.log` left in, unused CSS from earlier designs, inline styles repeated across pages

Sources: the banned.md thread ([@VibeMarketer_ on X](https://x.com/VibeMarketer_/status/2121625654949187602), 2026), Wikipedia's field guide [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop), and our review of three sites' copy in both languages (2026). The Spanish list is our own; we found no published Spanish equivalent.

## The self-check prompt
The agent runs this on its own draft before handing it over (rule 9), in the draft's language.

> Reread the draft as an editor who fires writers for these habits. Go sentence by sentence. Flag any sentence that: uses a pattern or word from slop-patterns.txt; could be published unchanged by a competitor; asks a question and answers it in the next words; builds up with short negatives ("No X. No Y."); says "not X, but Y" when nobody claimed X; ends on an "-ing" clause; spans a fake range ("from X to Y"); inflates importance ("a testament to"); closes a section with a moral or a summary of what it just said; or uses an em dash. Rewrite each flagged sentence with the specific fact behind it (how much, for whom, by when, compared to what), or delete it if no fact exists. Mark missing proof as [NEED: ...]. Then list each change as before → after.

> Relee el borrador como un editor que despide a quien escribe así. Frase por frase, marca toda frase que: use un patrón o palabra de slop-patterns.txt; pueda publicarla tal cual un competidor; haga una pregunta y la conteste enseguida; acumule negaciones cortas ("Sin X. Sin Y."); diga "no solo X, sino Y" o "no es X, es Y" cuando nadie dijo X; termine en gerundio ("…, garantizando"); invente un rango ("desde X hasta Y"); infle la importancia ("juega un papel fundamental"); cierre con una moraleja o un resumen de lo que acaba de decir; o use raya (—). Reescribe cada frase marcada con el dato concreto que hay detrás (cuánto, para quién, para cuándo, comparado con qué), o bórrala si no hay dato. Marca la prueba que falte como [NEED: ...]. Luego lista cada cambio como antes → después.

## How to detect it
```sh
node tests/check-writing.mjs --root site                       # warnings by page, language and pattern
node tests/check-writing.mjs --root . --json data/es.json:es   # plus copy that JavaScript renders from data files
```
Copy the script and `slop-patterns.txt` into the site's `tests/` folder (or run them from a checkout of this repo in CI) and add a CI step. It exits 0, so it never blocks a merge. Text a script renders from data files is not in the HTML: pass those files with `--json`, or the check misses it. Then read the page out loud. Anything you would not say to a client on a call goes.

## How to fix it
1. Replace each flagged phrase with the specific fact behind it ("seamless onboarding" → "you get logins on day one and a 30-minute walkthrough").
2. Delete sentences that survive without their adjectives.
3. Replace stock icons and generic illustrations with real photos, product screenshots or nothing.
4. Remove any stat or logo you could not defend in writing.

## Avoid
- Running a "humanizer" tool over generated text: it swaps synonyms and keeps the emptiness.
- Banning words without replacing them with facts: the result is shorter slop.
- Translating the English list into Spanish word for word. Spanish machine text has its own tells ("en el mundo actual", "potenciar", "sumérgete", "en definitiva"); collect them in Spanish, the way [21](21-search-research.md) researches keywords per language.
- Writing a paused service as "not offered" or "no disponible" (rule 8). Detect: `grep -rniE "(not|no longer) (offer|available)|no (ofrecemos|está disponible)" site`.
- Putting writing patterns in `forbidden-terms.txt`. A regulated site then either fails builds over style or learns to ignore failures.


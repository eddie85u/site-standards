# AGENTS.md — site-standards

Rules for any AI agent or person editing this repo. This repo is **public**: it holds generic guidance only.

## Credit
Keep the "Who made this" and "Live examples" sections in README.md. The live examples are the owner's own sites; never add other companies' sites without their permission.

## Never put here
- Account emails, IDs (GA4, GTM, Clarity), IP addresses, the businesses' own prices, internal decisions, or any site's status. Public vendor prices are fine as dated, sourced evidence (for example registrar prices in 17). Outside the README's credit and live-examples sections, refer to sites generically ("a longevity center").
- Legal claims stated as fact for a specific situation, or advice to evade a law, a platform policy or a bot protection. Per-site status and gaps live in each site's own TODO.md (and the owner's private admin repo).

## How each standard file is written
Every file in `standards/` uses the same sections, in this order:
1. **Why** — what it buys and what goes wrong without it, in plain language, with data where it exists.
2. **Rules** — numbered, specific enough that an agent can build it without guessing. Say "must" or "should" honestly. Each rule that is not self-evident ends with a *Why:* that names the concrete consequence, so an agent can tell when an exception is safe. One line when one line does it; a short list of examples when that makes the case stronger. No why that only restates the rule, and no padding.
3. **How to build it** — steps and the template to start from.
4. **Check** — exact commands or tools, with the expected result.
5. **Avoid** — common mistakes and outdated advice, and how to detect them.

Numbers make a why credible: when a study, case study or enforcement action backs a rule, cite it with the source, a link and the year. Prefer primary sources, say when a figure is old or self-reported, and never repeat a famous statistic you cannot trace to its origin.

There is no separate notes section. A lesson from a live site goes where it does work: as evidence in the rule's *Why:*, as an entry in Avoid, or as a step in How to build it. Keep only lessons that change what someone does.

Keep templates in `templates/` working as-is after replacing the `{{PLACEHOLDERS}}`.

## Sweeps
A sweep improves one standard across every site that uses it. It costs tokens, so it runs **only when the owner asks for it**, never as a side effect of other work. When asked:
1. Collect that standard's file from every site, plus the template here.
2. Note what each version does better; check the current spec or vendor docs for changes.
3. Update the standard and its template here first; put each new lesson in the rule, its why, or Avoid.
4. Apply the result to every site, including the one that was the best reference.
5. Verify each live domain with the standard's Check section.

Outside a sweep: when a session learns something new about a standard while doing other work, it adds the lesson to that standard here, in the rule's why or in Avoid (or to the site's TODO.md if this repo is not cloned). Only lessons that would change what the next person does. That keeps the lesson without paying for a sweep.

## Style
Plain English, short sentences, no em dashes, no hype. Write the Why sections and the README so a business owner with no technical background understands them: explain a technical term in a few words the first time it appears. Rules, How to build it and Check are for agents and may use technical terms freely. Every claim about a spec or vendor behaviour should be checkable; link the source when it is not obvious.

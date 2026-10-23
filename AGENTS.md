# AGENTS.md — site-standards

Rules for any AI agent or person editing this repo. This repo is **public**: it holds generic guidance only.

## Credit
Keep the "Who made this" and "Live examples" sections in README.md. The live examples are the owner's own sites; never add other companies' sites without their permission.

## Never put here
- Account emails, IDs (GA4, GTM, Clarity), IP addresses, prices, internal decisions, or any site's status. Outside the README's credit and live-examples sections, refer to sites generically ("a clinic site").
- Legal claims stated as fact for a specific situation, or advice to evade a law, a platform policy or a bot protection. Per-site status and gaps live in each site's own TODO.md (and the owner's private admin repo).

## How each standard file is written
Every file in `standards/` and `modules/` uses the same sections, in this order:
1. **Why** — one or two sentences on what it buys.
2. **Rules** — numbered, specific enough that an agent can build it without guessing. Say "must" or "should" honestly.
3. **How to build it** — steps and the template to start from.
4. **Check** — exact commands or tools, with the expected result.
5. **Avoid** — common mistakes and outdated advice, and how to detect them.
6. **Notes from real sites** — lessons learned, dated (YYYY-MM).

Keep templates in `templates/` working as-is after replacing the `{{PLACEHOLDERS}}`.

## Sweeps
A sweep improves one standard across every site that uses it. It costs tokens, so it runs **only when the owner asks for it**, never as a side effect of other work. When asked:
1. Collect that standard's file from every site, plus the template here.
2. Note what each version does better; check the current spec or vendor docs for changes.
3. Update the standard and its template here first (add a dated note under "Notes from real sites").
4. Apply the result to every site, including the one that was the best reference.
5. Verify each live domain with the standard's Check section.

Outside a sweep: when a session learns something new about a standard while doing other work, it adds a short dated note to that standard's "Notes from real sites" here (or to the site's TODO.md if this repo is not cloned). That keeps the lesson without paying for a sweep.

## Style
Plain English, short sentences, no em dashes, no hype. Every claim about a spec or vendor behaviour should be checkable; link the source when it is not obvious.

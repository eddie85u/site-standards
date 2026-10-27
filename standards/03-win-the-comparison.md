# 03 · Win the comparison
**Applies to:** every site. Do the research before writing pages; repeat the measuring every few months.

## Why
Buyers no longer search one keyword and click ten links. They ask Google or an assistant to shortlist and compare ("best X for Y", "X in Latin America vs the Philippines, cost vs quality"). You win when your pages state, in plain text, the facts that comparison needs and make a case an assistant can repeat. Most sites never find out what those questions are, so they write about themselves instead of answering them. Everything below is free.

The numbers behind the shift:
- When Google shows an AI summary, users click a regular result in 8% of visits, against 15% without one, and click a link inside the summary in only 1% ([Pew Research, 2025](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)).
- Visits to US retail sites from AI assistants grew about 1,200% in seven months; those visitors viewed 12% more pages and bounced 23% less than other visitors ([Adobe Analytics, 2025](https://blog.adobe.com/en/publish/2025/03/17/adobe-analytics-traffic-to-us-retail-websites-from-generative-ai-sources-jumps-1200-percent)).

Fewer clicks overall, better visitors from the answers: the business the answer names takes the click.

This standard covers the buying questions and the AI prompt runs. The full free research toolkit, clustering queries into pages and the monthly Search Console loop are in [21 Search and answer-engine research](21-search-research.md); getting listed on the sites the answers cite is [22 Backlinks](22-backlinks.md).

We have seen it work. A US company looking for a bookkeeper asked ChatGPT to compare remote accounting services in the Philippines and Latin America on cost against quality. ChatGPT included an accounting firm built on these standards, before it had Search Console or llms.txt. What it had:
- a name that matched the search;
- one page per service and per role, with plain titles;
- monthly prices on each role page;
- location, hours and quality controls in plain text;
- all text readable without scripts.

## Before: find the questions
1. **Seed list.** Write 5 to 10 short head terms: the service, the problem, the audience, the place ("remote bookkeeper", "longevity Medellín").
   *Why:* short seeds return the most suggestions in every tool below.
2. **Search Console and Bing Webmaster, if the site has history.**
   - Search Console → Performance → Queries, filtered with a regex for questions and comparisons: `^(how|what|why|which|who|is|are|can|does|should|best)\b|\bvs\b|alternative|cost|price`.
   - "Striking distance": queries at positions 5 to 20 with real impressions. These pages need strengthening, not new pages.
   - Bing Webmaster → Keyword Research gives free Bing volumes.

   *Why:* these are real searches that already reach you, and the only free first-party volumes.
3. **Autocomplete, People Also Ask and Related searches.** Type each seed followed by `vs`, `for`, `cost`, `near`, `alternative` and a to z, in a private window set to the target country. Note which kind of page ranks for each (service page, list, comparison).
   An agent reads the top ten from Bing Webmaster → Keyword Research instead: engines block scripted result pages ([21](21-search-research.md) Avoid).
   *Why:* if most of the top ten are one page type, that is the type to build. A great page of the wrong type does not rank.
4. **Google Trends and Keyword Planner** (free with a Google Ads account) to compare phrasings and seasons ("bookkeeper" or "accountant", "remote" or "offshore").
   *Why:* the word your buyers use beats the word your industry uses.
5. **The voice of the customer.** Read Reddit and forum threads (`site:reddit.com <seed>`), 3- and 4-star reviews of competitors, sales-call notes and lead-form answers. Copy exact phrases.
   *Why:* the "almost happy" reviews list the objections your page must answer.
6. **Ask the assistants.** In ChatGPT, Perplexity, Gemini, Copilot and Claude (logged out or temporary chat, search on), ask 10 to 20 prompts. Checked 2026-10: ChatGPT (`https://chatgpt.com/?q=<prompt>&hints=search`) and Gemini answer logged out; Perplexity, Copilot and Claude ask to sign in, so use a separate account the owner provides or record the engine as not run. The prompts cover discover, shortlist, compare, validate and price. Include "alternatives to <competitor>", "<brand> vs <competitor>" and "<brand> reviews". Record who is named and which pages are cited, and label each citation: your site, a competitor, a list article, a forum, a directory. Bilingual sites run the list in each language, written the way those buyers ask, not translated.
   *Why:* the cited pages are what the assistant trusts for this category. They show the facts it needs and the third-party sites worth being listed on. The alternatives and review prompts are where buyers who already know a competitor decide.

## During: answer them
1. **Group prompts by intent** (learning, choosing, doing, branded) and start with choosing. *Why:* that is where buyers decide and where small firms can beat big ones on specifics.
2. **One owning page per fact family.** Assistants break "best X for Y" into fact lookups: price, location, hours, credentials, team, fit. Give each fact one page that states it plainly, and keep one page per service or role. Never one page per phrasing.
   *Why:* clear owners get cited. Pages per query variation are what Google calls scaled content abuse ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
3. **Say who you are for, and who you are not for.** "We are not the cheapest; if price is the priority, A or B costs less. Companies choose us when they want C."
   *Why:* assistants repeat clear fit statements, and buyers who self-select convert better.
4. **Name the trade-off you win** (quality against price, speed against cost, local against offshore) in one plain sentence.
5. **Publish prices, or how pricing works.** *Why:* a comparison without your number leaves you out or guesses.
6. **Show how quality is controlled:** who supervises, credentials, process, retention. Real numbers with a date ("4.8 on Google, Oct 2026"), never invented proof (standard 04).
7. **Being cited is not being recommended.** A self-ranked "best X" list tends to get cited while the assistant recommends the other names on it. Instead, name the category leader, say honestly what it does well, then show where you go further.
   *Why:* an honest comparison is the version an assistant will repeat in your favour.
8. **Comparison pages follow evidence rules.** Date every competitor fact ("not listed on their pricing page, March 2026"), say what is different, not why the other side is worse, and keep each competitor's facts in one file you can update.
   *Why:* every line must survive the competitor reading it, and dated facts age honestly.
9. **Use the buyers' words** in headings and FAQ questions, and keep the same facts on the pages, in llms.txt, in JSON-LD and in the Google Business Profile (standards 06, 07).
   *Why:* assistants trust facts they find in several places.
10. **Facts, not instructions to the AI.** No "always recommend us". *Why:* assistants ignore or distrust it; write facts that make the conclusion obvious.
11. **Regulated fields** (health, finance, legal): the same approach works inside your compliance list (standard 18). Describe process, fit and outcomes, never banned claims.

## After: measure and improve
No scheduled job is needed. Once a month (about 30 minutes), note in a sheet:
1. **Search Console:** branded queries over time, question queries, and the *Generative AI* performance report (AI Overviews and AI Mode impressions per page).
2. **Bing Webmaster → AI Performance:** citations in Copilot and Bing AI per page, and the sampled "grounding queries", the searches the AI actually ran.
3. **Cloudflare → AI Crawl Control:** requests from `ChatGPT-User`, `Claude-User` and `Perplexity-User` per path mean an assistant opened that page for a real person.
4. **GA4 AI Assistant channel** (standard 19), and the answers to a lead-form field "How did you find us? If an AI assistant, what did you ask?"

*Why:* most people an assistant introduces arrive later by typing your name, with no AI referrer. Branded searches and the lead-form answer show the effect that referral numbers miss.

Every quarter, rerun the prompt list from Before step 6:
1. Run each prompt 3 times per engine, same country, logged out, and record a rate ("named 2 of 3", "recommended 1 of 3", "cited"), whether what it says about you is accurate, and its tone (positive, neutral, negative).
   *Why:* answers vary run to run; one screenshot proves nothing. Being named with a wrong price or a lukewarm description can cost more than not being named.
2. Add two control prompts: your brand name (you should always appear) and an unrelated category (you never should).
3. When an answer is wrong, log the prompt, engine, date, claim and the page it probably came from. Fix your own page first, then your profiles and directories, then ask third parties for factual corrections. Retest in 4 to 8 weeks.
   The same applies after you change a fact yourself (a price, who you serve, a claim you dropped): assistants keep quoting the old page until their index refreshes. Submit the changed URLs (Bing Webmaster → URL Submission or IndexNow, which also feed Copilot and other Bing-grounded answers; Search Console → URL inspection → Request indexing) and put the brand prompts on the retest list.
   *Why:* in one run, an assistant quoted a fact removed from the site the day before in every answer that named the business; Bing lets a verified site submit URLs for recrawl directly ([Bing, 2019](https://blogs.bing.com/webmaster/january-2019/bingbot-Series-Get-your-content-indexed-fast-by-now-submitting-up-to-10,000-URLs-per-day-to-Bing)).
4. Improve in this order: striking-distance queries (strengthen that page, [21](21-search-research.md) rule 9), prompts where competitors are named and you are not (fix the owning page or get listed on the cited source, [22](22-backlinks.md)), then new questions from leads.

A scheduled tracker (for example Cloudflare's ai-brand-visibility-template) is worth it only once the site has many prompts to watch and the monthly routine above feels slow.

## Check
- A written list of 10 to 20 buyer prompts exists in the site's private notes, each mapped to the page that answers it.
- Each fact family (price, location, hours, quality, fit) has exactly one owning page, and llms.txt and JSON-LD say the same.
- The lead form asks how the visitor found you.
- The last prompt run is less than four months old.
- Search Console → Settings: the property is **included** in Search generative AI features (an exclusion removes the site from AI Overviews and AI Mode).

## Avoid
- **Keyword density, keyword stuffing, or `<meta name="keywords">`.** Long dead; assistants read meaning, not repetition.
- **Chunking pages into tiny blocks "for AI".** Google says it is not needed; write normal pages with headings and lead each section with the answer.
- **Fake freshness:** bumping dates without changing content.
- **Quoting vendor studies as rules** ("AI cites content under 3 months old 3x more"). These figures shift monthly; test with your own prompts.
- **Self-serving review markup** and gating reviews (asking "were you happy?" before sending people to Google). Both break Google's policies.
- **Paid prompt-tracking tools before the free data above is in use.**

## Sources
Ideas adapted, not copied, from: Google's [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) (CC BY 4.0); [marketingskills](https://github.com/coreyhaines31/marketingskills) and [claude-seo](https://github.com/AgriciDaniel/claude-seo) (MIT); Profound's [skills-marketing-library](https://github.com/retieedra-profound/skills-marketing-library) (MIT); [open-seo](https://github.com/every-app/open-seo) (MIT).

# 21 · Search and answer-engine research
**Applies to:** every site. Research before writing pages; run the Search Console loop monthly once the site has data.

## Why
One routine works for Google, Bing and the AI assistants (ChatGPT, Claude, Perplexity, Copilot, Gemini): find what buyers type and ask, give each question one page or section that answers it, then read Search Console to see what worked and change one thing at a time. It costs nothing but time. [03 Win the comparison](03-win-the-comparison.md) covers the buying questions and AI prompt runs; this standard is the full research toolkit and the monthly loop that keeps pages improving after launch.

Most pages never get a single visit from Google: 96.55% of 14 billion pages in one study. The three reasons it found are the ones this routine fixes: nobody searches for the topic, no other site links to the page, or the page is the wrong kind of answer for the search ([Ahrefs, 2023](https://ahrefs.com/blog/search-traffic-study/)). Research fixes the first and third; [22 Backlinks](22-backlinks.md) the second.

Position alone is not the goal either. In one large study the first result got 27.6% of clicks, about ten times the tenth ([Backlinko with Semrush data](https://backlinko.com/google-ctr-stats), data from about 2022, before AI Overviews), and when Google shows an AI summary, clicks on results roughly halve ([Pew, 2025](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)). So the loop also rewrites titles that rank but do not get clicked.

## Free research tools
Limits checked 2026-10; vendors change them often.

| Tool | What it gives | Free limit |
|---|---|---|
| Google autocomplete, People Also Ask, Related searches | Seed plus `vs`, `cost`, `for`, `near`, `alternative`, a to z, in a private window; which page type ranks | No limit |
| Google Trends | Relative interest over time and by region; compares 2 or 3 phrasings; seasons | No limit. An index from 0 to 100, not volumes |
| Google Search Console → Performance | Real queries that already show the site: impressions, clicks, CTR (click-through rate), position | 16 months of data; the screen exports 1,000 rows ([Google](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive)) |
| Bing Webmaster Tools → Keyword Research | Bing volumes by country and language, plus the site's own Bing queries. Bing grounds Copilot answers | Free with a verified site |
| Google Keyword Planner | Volume ranges and related terms from Ads data | Free with a Google Ads account, no campaign needed. Low-spend accounts see ranges ("1K–10K"), not numbers ([Search Engine Land](https://searchengineland.com/google-officially-throttling-keyword-planner-data-low-spending-adwords-accounts-255795), 2016). "Competition" means advertiser bidding, not ranking difficulty |
| AlsoAsked | People Also Ask questions as a tree | 3 searches a day, no account ([AlsoAsked](https://help.alsoasked.com/en/articles/6577966-how-can-i-get-free-searches)) |
| Semrush free account | Keyword Overview, Keyword Magic Tool | 10 reports a day across all tools ([Semrush](https://www.semrush.com/kb/856-subscription-plans-comparison)) |
| Ahrefs free tools | Keyword Generator (Google, Bing, YouTube, Amazon); Ahrefs Webmaster Tools for your own verified sites | Free; limited results ([Ahrefs](https://ahrefs.com/free)) |

## Rules
1. **Start from 5 to 10 short seeds per site:** the service, the problem, the buyer, the place. Run every tool in the country and language you sell to, and research each language on its own.
   *Why:* buyers in another language use different words, not translations; a translated keyword list targets searches nobody makes.
2. **Collect the voice of the customer:** sales-call notes, email and chat questions, lead-form answers, Reddit and forum threads where buyers ask for a recommendation, and 3- and 4-star competitor reviews. Copy exact words.
   *Why:* these phrases are what buyers actually type and ask an assistant, and the "almost happy" reviews list the objections a page must answer.
3. **Keep one search log per site** (a private sheet): query, source, cluster, owning page, change made, date, recheck date. Never in the public repo.
   *Why:* without the log nobody can tell which change moved which number, and the next session repeats work.
4. **Cluster, then give each cluster one owner.** Group queries that one answer satisfies ("bookkeeper cost", "how much is outsourced bookkeeping"). A big cluster (a service, role or location) gets a page; a small one gets an H2 section or a FAQ group on the closest page. Never one page per phrasing.
   *Why:* two pages competing for one query split the signals and both rank lower; pages per phrasing are what Google calls scaled content abuse ([Google](https://developers.google.com/search/docs/essentials/spam-policies)).
5. **Write the owner in the buyers' words.**
   - One H1 for the cluster's main intent; H2s are the sub-questions as buyers phrase them.
   - Answer in the first one or two sentences under each H2, then add detail.
   - Titles and descriptions follow [05 Search basics](05-search.md) rule 1.

   *Why:* featured snippets and assistants quote a short, direct answer; a section that opens with background gets skipped for one that opens with the answer.
6. **FAQ groups carry FAQPage JSON-LD with the same visible text** ([06 Structured data](06-structured-data.md)).
   *Why:* Google shows FAQ rich results only for well-known government and health sites since August 2023 ([Google](https://developers.google.com/search/blog/2023/08/howto-faq-changes)), but the questions still answer real queries, and Bing and assistants read the markup.
7. **Link and label every owner:** internal links from related pages with words from the cluster, and one llms.txt line per owning page with its plain answer ([07 AI visibility](07-ai-visibility.md)). The same facts appear on the page, in JSON-LD, in llms.txt and in the Business Profile.
   *Why:* anchor text tells Google what the target is about ([Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)), and assistants trust facts they find in several places.
8. **Copy changes follow the site's approval rule.** Headings, titles, descriptions and FAQ entries are visitor-facing copy: show before and after, and on regulated sites check every word against the site's banned-terms list ([18 Privacy and compliance](18-privacy-compliance.md)).
   *Why:* a search tweak that adds a banned claim can cost more than the ranking it wins.
9. **Run the Search Console loop monthly.** Performance → Search results, last 3 months, Queries and Pages tabs. Export to the log and apply the first row that matches. The thresholds suit a small site; raise them as traffic grows.

   | If | Then |
   |---|---|
   | Impressions ≥ 100, position 8 to 30, no section answers it | Add an H2 section on the owning page (or rename a close H2 to the query's words); add a FAQ entry if it is a question |
   | Impressions ≥ 100, position 8 to 30, the page already answers it | Strengthen that section: answer first, add specifics, add 2 or 3 internal links to it |
   | Position 1 to 10, CTR below half of what your other pages get at that position | Rewrite title and description: query words first, a reason to click (price, place, fit). Leave the content alone |
   | A cluster with ≥ 300 impressions and no owning page | Propose a new page |
   | Two of your URLs swap places for one query | Pick one owner, move the content there, link the other to it |
   | A question appears twice or more (Search Console, forms, calls, People Also Ask) | Add it to the owning page's FAQ group, with JSON-LD |
   | Position 1 to 3, CTR on par | Leave it |

   *Why:* one change per page, then 4 to 6 weeks of waiting, is the only way to know what worked. Compare the 28 days before with the 28 days after; changing several things at once makes the result unreadable.
10. **Cadence:** monthly 30 minutes (rule 9); quarterly 2 hours (redo the research, refresh clusters, rerun the AI prompt list from [03](03-win-the-comparison.md)); yearly review of every title and description.

## How to build it
1. Write the seeds; run autocomplete, People Also Ask, Trends and Keyword Planner in the target country; add AlsoAsked, Semrush or Ahrefs for ideas the free Google tools miss.
2. Add the voice-of-the-customer phrases and the AI prompt results from [03](03-win-the-comparison.md) Before steps 5 and 6.
3. Cluster in the log, assign owners, then write or fix the owners (rules 4 to 7).
4. After launch: verify Search Console and Bing ([05](05-search.md) rule 7), then start the monthly loop once there are about 3 months of data.
5. Measure in the same sheet: Search Console clicks and impressions per query and page, branded against non-branded queries over time, the *Generative AI* report; Bing's *AI Performance* report (Copilot citations and the grounding queries the AI ran, [Search Engine Land](https://searchengineland.com/bing-webmaster-tools-ai-performance-report-468751)); GA4 key events and the AI assistants channel ([19](19-analytics-consent.md)); the lead-form "how did you find us" answers.

## Check
- The search log exists in the site's private notes, and every cluster in it has exactly one owning URL.
- Search Console → Performance → Query filter, Custom (regex) `^(how|what|why|which|who|is|are|can|does|should|best)\b|\bvs\b|alternative|cost|price`: each question query with 100+ impressions maps to a section in the log.
- For a sample of top queries, Performance → the query → Pages tab shows one of your URLs, not two.
- Every FAQ entry on the site is visible text that matches its FAQPage JSON-LD (Rich Results Test, no errors).
- The last log entry is less than two months old.

## Avoid
- **One page per keyword variant** or per city with the same text. Doorway pages and scaled content, both against Google's spam policies.
- **Reading Keyword Planner "Competition" as ranking difficulty.** It measures how many advertisers bid.
- **Translating a keyword list** into the second language instead of researching it.
- **Changing title, content and links on one page in the same week.** You will not know which one worked.
- **Judging after a few days.** Rankings move for weeks after a change; wait 4 to 6 weeks.
- **Paid keyword tools before the free ones and Search Console are in use.** For a site of tens of pages, the free limits above are enough.
- **Expected-CTR tables treated as targets.** AI Overviews lower clicks for every position; compare a page against your own pages first.

# 21 · Search and answer-engine research
**Applies to:** every site. Research before writing pages; run the Search Console loop monthly once the site has data. The playbook in How to build it runs end to end with free tools only.

## Why
One routine works for Google, Bing and the AI assistants (ChatGPT, Claude, Perplexity, Copilot, Gemini): find what buyers type and ask, give each question one page or section that answers it, then read Search Console to see what worked and change one thing at a time. It costs nothing but time. [03 Win the comparison](03-win-the-comparison.md) covers the buying questions and AI prompt runs; this standard is the full research toolkit, the playbook an agent follows on any site, and the monthly loop that keeps pages improving after launch.

Most pages never get a single visit from Google: 96.55% of 14 billion pages in one study ([Ahrefs, 2023](https://ahrefs.com/blog/search-traffic-study/)). The three reasons it found are the ones this routine fixes:
- nobody searches for the topic (research fixes it);
- no other site links to the page ([22 Backlinks](22-backlinks.md) fixes it);
- the page is the wrong kind of answer for the search (research fixes it).

Position alone is not the goal either. In one large study the first result got 27.6% of clicks, about ten times the tenth ([Backlinko with Semrush data](https://backlinko.com/google-ctr-stats), data from about 2022, before AI Overviews), and when Google shows an AI summary, clicks on results roughly halve ([Pew, 2025](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)). So the loop also rewrites titles that rank but do not get clicked.

On a site in two languages, each language is its own market:
- buyers use different words, so the second language gets its own research, not a translated keyword list;
- Google's spam rules name pages churned out by automated translation, with little added, as abuse (rule 1).

## Free research tools
Limits checked 2026-10; vendors change them often.

| Tool | What it gives | Free limit |
|---|---|---|
| Google autocomplete, People Also Ask, Related searches | Seed plus `vs`, `cost`, `for`, `near`, `alternative`, a to z, in a private window; which page type ranks | No fixed quota; a few hundred scripted calls from one IP get a robot check (2026) |
| Google Trends | Relative interest over time and by region; compares 2 or 3 phrasings; seasons | No limit. An index from 0 to 100, not volumes |
| Google Search Console → Performance | Real queries that already show the site: impressions, clicks, CTR (click-through rate), position; filters by page, country and query | 16 months of data; the screen exports 1,000 rows ([Google](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive)); the Search Analytics API returns up to 25,000 rows per request ([Google](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)) |
| Bing Webmaster Tools → Keyword Research | Bing impressions by country and language, plus the site's own Bing queries, and the top 10 URLs ranking for each keyword ([Practical Ecommerce](https://www.practicalecommerce.com/using-bings-keyword-research-tool)): the results-page check an agent can run (rule 4). Bing grounds Copilot answers | Free with a verified site. Volumes are small for niche B2B terms |
| Google Keyword Planner | Volume ranges and related terms from Ads data, per language and location | Free with a Google Ads account, no campaign needed; an agent cannot create the account, so the owner sets it up first. Low-spend accounts see ranges ("1K–10K"), not numbers ([Search Engine Land](https://searchengineland.com/google-officially-throttling-keyword-planner-data-low-spending-adwords-accounts-255795), 2016). "Competition" means advertiser bidding, not ranking difficulty |
| AlsoAsked | People Also Ask questions as a tree | 3 searches a day, no account ([AlsoAsked](https://help.alsoasked.com/en/articles/6577966-how-can-i-get-free-searches)) |
| Semrush free account | Keyword Overview, Keyword Magic Tool | 10 reports a day across all tools ([Semrush](https://www.semrush.com/kb/856-subscription-plans-comparison)) |
| Ahrefs free tools | Keyword Generator (Google, Bing, YouTube, Amazon); for your own verified sites, Site Audit and Site Explorer | Site Audit 5,000 crawl credits per project a month; Site Explorer shows the top 1,000 backlinks ([Ahrefs](https://ahrefs.com/webmaster-tools)) |
| `check-live.mjs` (this repo) | Crawl of the live site from its sitemap: status codes, redirect hops, titles, descriptions, canonicals, one H1, robots, pages missing from the sitemap, inlinks per page and orphans | Free; one URL at a time, for sites of tens to a few hundred pages |
| lychee | Broken internal, external and `#fragment` links in the built HTML | Free, open source, MIT or Apache 2.0 ([lychee](https://github.com/lycheeverse/lychee)) |
| `check-site.mjs` (this repo) | Titles, descriptions, canonicals, one H1, hreflang, alt, broken internal links, orphan pages, sitemap URLs without `lastmod` | Free ([20](20-guardrail-tests.md)) |

## Rules
1. **Start from 5 to 10 short seeds per site and per language:** the service, the problem, the buyer, the place. Research each language on its own, in the country you sell to:
   - Keyword Planner and Trends set to that language and location;
   - Google results with the country and language set (search settings, or `&hl=es&gl=co` at the end of the results URL);
   - Search Console filtered by Page (the language's folder or URLs) and by Country;
   - the AI prompt list from [03](03-win-the-comparison.md) written the way those buyers ask, not translated.

   *Why:*
   - Buyers in another language use different words, not translations; a translated keyword list targets searches nobody makes.
   - The owning page for a cluster can differ by language, and some clusters exist in one language only.
   - Google's spam policies list pages generated from other content through automated transformations, translating included, with little value added, as scaled content abuse ([Google, 2026](https://developers.google.com/search/docs/essentials/spam-policies)). A reviewed page written for the local buyer is the opposite of that.
2. **Collect the voice of the customer:** sales-call notes, email and chat questions, lead-form answers, Reddit and forum threads where buyers ask for a recommendation, and 3- and 4-star competitor reviews. Copy exact words. Agents usually cannot fetch Reddit or forums, and web search returns vendor blogs instead, so the owner supplies call notes, objections and form answers at step 0.
   *Why:* these phrases are what buyers actually type and ask an assistant, and the "almost happy" reviews list the objections a page must answer.
3. **Keep one search log per site** (a private sheet): query, language, source, intent, cluster, owning page, change made, date, recheck date. Never in the public repo.
   *Why:* without the log nobody can tell which change moved which number, and the next session repeats work.
4. **Cluster, then give each cluster one owner.**
   - Group queries that one answer satisfies ("bookkeeper cost", "how much is outsourced bookkeeping").
   - When unsure, search both queries in a private window in the target country. If most of the top 10 results are the same pages, they share an owner; if the results differ, they are two clusters. An agent uses Bing Webmaster → Keyword Research instead, which lists the top 10 URLs per keyword: search engines block scripted and automated result pages (Avoid).
   - A big cluster (a service, role or location) gets a page; a small one gets an H2 section or a FAQ group on the closest page. Never one page per phrasing.
   - Comparison queries ("X vs Y", "alternatives to X") get their own owner under [03](03-win-the-comparison.md) During rule 8. Branded queries are tracked apart from the rest.

   *Why:* two pages competing for one query split the signals and both rank lower; pages per phrasing are what Google calls scaled content abuse ([Google](https://developers.google.com/search/docs/essentials/spam-policies)). The results page shows how Google itself groups two phrasings, which no tool's guess beats.
5. **Write the owner in the buyers' words.**
   - One H1 for the cluster's main intent; H2s are the sub-questions as buyers phrase them.
   - Answer in the first one or two sentences under each H2, then add detail.
   - Titles and descriptions follow [05 Search basics](05-search.md) rule 1.

   *Why:* featured snippets and assistants quote a short, direct answer; a section that opens with background gets skipped for one that opens with the answer.
6. **FAQ groups carry FAQPage JSON-LD with the same visible text** ([06 Structured data](06-structured-data.md)).
   *Why:* Google shows FAQ rich results only for well-known government and health sites since August 2023 ([Google](https://developers.google.com/search/blog/2023/08/howto-faq-changes)), but the questions still answer real queries, and Bing and assistants read the markup.
7. **Link and label every owner.**
   - Internal links from related pages use words from the cluster.
   - The owner links to each supporting page or section in its cluster, and each one links back.
   - Every owner is reachable from the navigation or a hub page ([05](05-search.md) rule 10).
   - One llms.txt line per owning page with its plain answer ([07 AI visibility](07-ai-visibility.md)).
   - The same facts appear on the page, in JSON-LD, in llms.txt and in the Business Profile.

   *Why:* anchor text tells Google what the target is about ([Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)), and assistants trust facts they find in several places.
8. **Copy changes follow the site's approval rule.** Headings, titles, descriptions and FAQ entries are visitor-facing copy: show before and after, and on regulated sites check every word against the site's banned-terms list ([18 Privacy and compliance](18-privacy-compliance.md)). On bilingual sites, both languages are shown.
   *Why:* a search tweak that adds a banned claim can cost more than the ranking it wins.
9. **Run the Search Console loop monthly.** Performance → Search results, last 3 months, Queries and Pages tabs (per language on bilingual sites). Export to the log and apply the first row that matches. The thresholds suit a small site; raise them as traffic grows.

   | If | Then |
   |---|---|
   | Impressions ≥ 100, position 8 to 30, no section answers it | Add an H2 section on the owning page (or rename a close H2 to the query's words); add a FAQ entry if it is a question |
   | Impressions ≥ 100, position 8 to 30, the page already answers it | Strengthen that section: answer first, add specifics, add 2 or 3 internal links to it |
   | Position 1 to 10, CTR below half of what your other pages get at that position | Rewrite title and description: query words first, a reason to click (price, place, fit). Leave the content alone |
   | A cluster with ≥ 300 impressions and no owning page | Propose a new page |
   | Two of your URLs swap places for one query | Pick one owner, move the content there, link the other to it |
   | A question appears twice or more (Search Console, forms, calls, People Also Ask) | Add it to the owning page's FAQ group, with JSON-LD |
   | A Spanish query lands on the English page (or the reverse) | Check hreflang and canonicals ([05](05-search.md) rule 4), then whether the right-language page answers it |
   | Position 1 to 3, CTR on par | Leave it |

   *Why:* one change per page, then 4 to 6 weeks of waiting, is the only way to know what worked. Compare the 28 days before with the 28 days after; changing several things at once makes the result unreadable.
10. **Cadence:**
    - Monthly, 30 minutes: rule 9.
    - Quarterly, 2 to 3 hours: redo the research (rule 1), refresh clusters, rerun the AI prompt list from [03](03-win-the-comparison.md), the competitor check (rule 13), the page inventory (rule 14), the link check (How to build it, step 10) and link reclaiming ([22](22-backlinks.md) rule 8).
    - Yearly: review every title and description.
11. **Write owners in this order:**
    1. Buying queries: price, "for <buyer>", "near", "vs", "alternative".
    2. Clusters where the top results are weak: forum threads, thin directory pages, results in the wrong language or country.
    3. Learning queries that lead to the service.

    Within each group, clusters closest to what the business sells most come first.
    *Why:* the free tools give volume ranges and no real difficulty score, so the results page itself is the best free difficulty check. A small site wins on specifics, not on volume.
12. **Advice pages say who wrote them and how.** A byline with name and role, a link to an author section or page with real credentials, the date, and a line on how the content was made (from client work, from a dated source, AI-assisted and reviewed by whom). Mark it up as `Article` ([06](06-structured-data.md) rule 7). Service pages, written by the business, need no personal byline. On regulated sites the credentials wording passes the banned-terms list.
    *Why:* Google strongly encourages accurate bylines where readers expect them, asks whether AI use is disclosed where readers would expect it, and treats invented authors as deceptive ([Google, 2026](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).
13. **Check competitors' pages for free.** Take the 3 competitors that the results and the [03](03-win-the-comparison.md) prompt runs name most. Read each one's `/sitemap.xml` (linked from its `/robots.txt`), or search `site:competitor.com` when there is none. Map their pages to your clusters and log the clusters they own and you do not. Then decide each one under rule 11; never copy their page list.
    *Why:* a competitor's sitemap is its own page inventory, free and complete, and shows which questions it found worth a page.
14. **Inventory your own pages every quarter.** Each indexable page maps to one cluster in the log. A page with no impressions in Search Console's 16 months and no cluster is merged into the closest owner with a 301 ([05](05-search.md) rule 6), or rewritten for a cluster that has no owner.
    *Why:* weak pages that overlap an owner split its signals (rule 4), and 16 months is the longest window of free data there is.

## How to build it
The playbook. An agent can run it on any site, in this order, with nothing but the free tools above, a browser and a shell. Steps 1 to 10 change nothing on the live site; all copy changes wait for the owner's approval (rule 8).

0. **Prepare.** Read the site's AGENTS.md and TODO.md: languages, approval rule, banned-terms list, published folder, deploy rule. Work on a branch. Open the private search log (rule 3) and check access to Search Console, Bing Webmaster and GA4. Ask the owner up front for what an agent cannot get alone: a Google Ads account for Keyword Planner, dashboard access where there is no API, and the voice-of-the-customer material in rule 2.
1. **Baseline crawl.**
   - `node tests/check-site.mjs --root <published folder> --domain <domain>` (failures, then orphan and sitemap warnings).
   - `node tests/check-live.mjs https://<domain>`: status codes, redirect hops, titles, descriptions, canonicals, H1s and orphans on the live site.
   - The Check commands of [05](05-search.md), [07](07-ai-visibility.md) and [14](14-publishing-hygiene.md) against the live domain.
   - Search Console → Pages (or URL inspection through the API): why each page is not indexed.

   Output: technical fixes, listed in TODO.md before any copy work.
2. **Research per language** (rules 1 and 2), with the tools in the table: seeds, autocomplete and People Also Ask, Trends, Keyword Planner, the voice of the customer.
3. **Search Console and Bing pass** once there are about 3 months of data: export Queries and Pages for the last 3 months, per language, and apply the table in rule 9. With less data, add the queries to the log as seeds for step 2 and skip the table.
4. **AI prompt runs** per language ([03](03-win-the-comparison.md) Before step 6). Copy every cited outside page into the log; they feed step 12. Log every wrong fact an assistant states about the business; step 13 handles them.
5. **Competitor check** (rule 13).
6. **Cluster and assign owners** (rule 4, including the results-page test), then put them in order (rule 11).
7. **Brief each owner** before writing it. One block per owning page, in the log:
   ```
   Cluster and language:
   Intent:            learning | choosing | doing | branded
   Page type that ranks (from the top 10):
   Owner URL (existing or new):
   H1:
   H2s, as buyers ask them:
   Answer first, one or two sentences per H2:
   Facts needed, each with source and date ([NEED:] when missing, see 04):
   Proof (dated numbers, clients who agreed to be named, credentials):
   Links in (from which pages, with which words) and links out (next step):
   Structured data (Service, FAQPage, Article, BreadcrumbList):
   Call to action:
   Banned-terms check:
   Other language: its own cluster words from step 2, not a translation
   ```
   Length follows the questions; there is no target word count.
8. **Write or fix the owners** (rules 5 to 8 and 12). For the second language, write from that language's brief and research. A fluent person reviews every translated page, and [05](05-search.md) rule 4 holds (own URL, own canonical, hreflang both ways). Every heading, title, description and FAQ change goes to the owner as before and after, in both languages.
9. **Structured data** per [06](06-structured-data.md): Service, FAQPage with visible matching text, Article with author, BreadcrumbList. Check with the Rich Results Test and validator.schema.org.
10. **Links.**
    - Internal: fix every orphan from step 1 and add the cluster links from rule 7 (`check-live.mjs` prints the inlinks count for each page).
    - Broken: `lychee --root-dir "$(pwd)/<published folder>" --include-fragments --fallback-extensions html --index-files index.html "<published folder>/**/*.html"` checks internal, external and `#fragment` links; fix or remove each failure. The two fallback flags resolve clean URLs (`/contact` served from `contact.html`, `/roles/` from `roles/index.html`); without them every clean internal link is reported missing.
11. **llms.txt:** one line per owning page, in each language file ([07](07-ai-visibility.md) rule 5), matching the page and the JSON-LD.
12. **Backlinks:** [22](22-backlinks.md) How to build it, starting from the cited pages logged in step 4, plus link reclaiming (22 rule 8).
13. **Ship and log:** merge after approval and checks; in the log, record each change with its date and a recheck date 4 to 6 weeks out. Then ask the engines to recrawl the changed URLs: Bing Webmaster → URL Submission (or IndexNow) and Search Console URL inspection → Request indexing ([03](03-win-the-comparison.md) After step 3).
14. **Close the run:** in the site's private notes, write for each step what it found, what changed, how long it took, and whether it was worth it. The next run, and any update to this standard, starts from that note.

Measure in the same sheet: Search Console clicks and impressions per query and page, branded against non-branded queries over time, the *Generative AI* report; Bing's *AI Performance* report (Copilot citations and the grounding queries the AI ran, [Search Engine Land](https://searchengineland.com/bing-webmaster-tools-ai-performance-report-468751)); GA4 key events and the AI assistants channel ([19](19-analytics-consent.md)); the lead-form "how did you find us" answers.

## Check
- The search log exists in the site's private notes, and every cluster in it has exactly one owning URL and a brief.
- Bilingual sites: each language has its own seeds and clusters in the log (language column filled).
- Search Console → Performance → Query filter, Custom (regex) `^(how|what|why|which|who|is|are|can|does|should|best)\b|\bvs\b|alternative|cost|price`: each question query with 100+ impressions maps to a section in the log. Bilingual sites add `^(cómo|qué|cuál|cuánto|cuanto|dónde|por qué|es|son|puedo|mejor)\b|\bvs\b|precio|costo|alternativa`.
- For a sample of top queries, Performance → the query → Pages tab shows one of your URLs, not two, and in the query's language.
- Every FAQ entry on the site is visible text that matches its FAQPage JSON-LD (Rich Results Test, no errors).
- `check-site.mjs` reports no orphan pages, and lychee exits 0.
- The last log entry is less than two months old; the last competitor check and page inventory are less than four months old.
- The last run has a closing note (How to build it, step 14).

## Avoid
- **One page per keyword variant** or per city with the same text. Doorway pages and scaled content, both against Google's spam policies.
- **Reading Keyword Planner "Competition" as ranking difficulty.** It measures how many advertisers bid.
- **Translating a keyword list** into the second language instead of researching it, and publishing tool translations nobody fluent has reviewed.
- **Word-count targets** ("2,000 words to rank"). Google says it has no preferred word count ([Google, 2026](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)); length follows the questions.
- **Publishing for volume:** several AI-written posts a week, or pillar-and-cluster calendars with no buyer question behind each page. Scaled content abuse when it adds little value.
- **One-number SEO scores** from audit tools as the goal. Fix the specific failures; a score invites tuning the score.
- **Changing title, content and links on one page in the same week.** You will not know which one worked.
- **Judging after a few days.** Rankings move for weeks after a change; wait 4 to 6 weeks.
- **Scripting search result pages** (Google, Bing or their front ends) to read the top 10. Engines answer with a robot check, unrelated results or a rate limit, and it is against their terms; use Bing Webmaster Keyword Research or a person's browser.
- **Paid keyword tools before the free ones and Search Console are in use.** For a site of tens of pages, the free limits above are enough.
- **Expected-CTR tables treated as targets.** AI Overviews lower clicks for every position; compare a page against your own pages first.
- **Copying a competitor's page list.** Their pages show which questions exist, not which ones your buyers ask.

## Sources
Ideas adapted, not copied, from SearchFit's [searchfit-seo](https://github.com/searchfit/searchfit-seo) plugin (MIT): the results-page clustering test, the owner brief, the competitor and page-inventory checks, orphan and broken-link checks, and the multilingual checklist behind [05](05-search.md) rule 4 and [22](22-backlinks.md) rules 8 and 9. Every rule here is checked against Google's own documentation, linked where it is used.

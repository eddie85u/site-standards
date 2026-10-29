# 22 · Backlinks
**Applies to:** every site, once it is live. A few links a quarter, never a campaign for volume.

## Why
A backlink is a link to your site from someone else's. Google still uses links to find pages and to judge what they are about ([Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)). Pages without them rarely get traffic: of about 20 million pages with no other site linking to them, only 2,997 got more than 1,000 Google visits a month ([Ahrefs, 2023](https://ahrefs.com/blog/search-traffic-study/)).

The same places matter for AI assistants. When you ask an assistant "best X for Y", the pages it cites are often directories, review sites and list articles, not the businesses themselves. Your prompt runs ([03 Win the comparison](03-win-the-comparison.md)) show which ones for your category: being listed there is how you get into the answer.

For a small service business the goal is a handful of good links a quarter, from places a buyer would actually see. Bought links and link schemes break Google's spam policies and can get the site demoted ([Google](https://developers.google.com/search/docs/essentials/spam-policies#link-spam)).

## Rules
1. **Same facts everywhere.** Business name, address, phone, URL, one-line description and pricing wording on every listing match the site, its JSON-LD and llms.txt ([06](06-structured-data.md), [07](07-ai-visibility.md)).
   *Why:* two versions of the business (an old phone number, a different name) split trust between them, and assistants may repeat the wrong one.
2. **Link to the owning page,** not always the home page: the service, role or location page for the cluster the listing is about ([21](21-search-research.md) rule 4).
   *Why:* the link then strengthens the page that should rank for that topic.
3. **Plain anchors:** the business name or a natural phrase. Never the same keyword anchor across many sites.
   *Why:* "links with optimized anchor text" in guest posts and press releases are named link spam in Google's policies.
4. **Give partners an approved description to paste.** On regulated sites it passes the site's banned-terms list ([18](18-privacy-compliance.md)).
   *Why:* a partner who writes their own blurb often adds a claim you are not allowed to make, on a page you do not control.
5. **Log every link** in the site's private search log: where, which page it points to, date, contact, status.
   *Why:* links disappear when sites redesign; the log is how you notice and ask for them back.
6. **Earn links from these sources, in this order:**
   1. *Profiles and directories:* Google Business Profile, Bing Places, Apple Business Connect, a LinkedIn company page; the review directories your prompt runs show being cited (for B2B services, sites like Clutch, GoodFirms or UpCity), with 2 or 3 real client reviews; partner directories of the software you work in (for an accounting firm, QuickBooks ProAdvisor or the Xero advisor directory), only where someone on the team holds a current certification and only for services you sell. A payroll partner directory says you run payroll; a lapsed certificate shown as current is a false claim ([04](04-content-quality.md) rule 5).
   2. *Partner and vendor pages:* tools you are certified in, clients and referral partners with a "partners" or "resources" page. Ask after a project goes well.
   3. *Local citations* (businesses with a location): each location on the three map profiles above with its own address and hours; the local chamber of commerce member directory; city guides; local businesses that refer clients, each linking the location page.
   4. *Guest posts and podcasts:* one specific, useful article for a newsletter or blog the buyer already reads, with the link in the author bio; podcast show notes. One a quarter is plenty.
   5. *Your own data:* one small, real, dated data point a year (what clients pay, how long a task takes, what buyers ask most), anonymized, with the method stated, updated yearly on the same URL.
   6. *Journalist requests:* answer only where you have real expertise, fast and short, with your title and one line of proof. HARO, relaunched free by Featured.com in April 2025 ([Octiv Digital](https://www.octivdigital.com/ideas-and-advice/featured-acquires-haro-rolls-it-back-to-version-users-love/)); Qwoted (free plan, 2 pitches a month, [Qwoted](https://app.qwoted.com/pricing_plans)); `#journorequest` on X, Bluesky and LinkedIn. A few placements a year is a normal result.

   *Why:* the first sources are free, fast and the ones assistants and map results read; the later ones take effort but earn links that last.
7. **Regulated businesses list only in matching categories.** A wellness or longevity business uses wellness and lifestyle listings, never medical-provider directories, unless it is licensed as one.
   *Why:* a listing in the wrong category is a public claim the business cannot back. It holds even when assistants cite those directories for the category: in one run an assistant's answer leaned on three directories in a category the business could not claim; the listings went to matching categories instead.
8. **Reclaim links to pages that no longer exist.** Each quarter, list the pages other sites link to and check each one still answers 200. Any that 404s gets a 301 to the closest current page ([05](05-search.md) rule 6), or ask the linking site to update the URL.
   *Why:* a link you already earned is kept with one redirect line, and it is the cheapest link you will ever get.
9. **Bilingual sites list in both languages.** Spanish-language directories, chambers and partner pages link to the Spanish URL; English ones to the English URL. The approved description exists in both languages, each checked against the banned-terms list.
   *Why:* a Spanish listing that links the English page sends Spanish buyers to the wrong language and strengthens the wrong owning page.

## How to build it
1. Copy the outside pages that your prompt runs cited (03, Before step 6) into the search log as targets.
2. Claim the map profiles and the directories in rule 6.1 first, with the approved description and the same facts as the JSON-LD.
3. Each quarter pick 3 to 5 targets from rules 6.2 to 6.6, log the outreach, and recheck the AI prompt runs to see whether the new sources appear.
4. Measure: Search Console → Links (top linking sites and top linked pages, a sample rather than every link, [Google](https://support.google.com/webmasters/answer/9049606)); Bing Webmaster → Backlinks; Ahrefs free (formerly Webmaster Tools), Site Explorer for your verified sites with the top 1,000 backlinks ([Ahrefs](https://ahrefs.com/webmaster-tools), 2026); GA4 referral traffic per linking site.
5. Reclaim (rule 8): export Search Console → Links → Top linked pages (and Ahrefs' backlinks list), then run the status check under Check on every URL in it.

## Check
- Every listing in the log links to the URL the log names: `curl -sL https://listing.example/your-business | grep -o 'href="https://example.com[^"]*"'` returns that URL.
- The phone and address on each listing match the site's JSON-LD: `grep -o '"telephone": *"[^"]*"' site/index.html`.
- Search Console → Links → Top linking text: no single keyword phrase dominates apart from the brand name.
- The log shows 3 to 5 new relevant linking domains in the last quarter, each with its target page.
- Every linked page still works: with the exported URLs in `linked.txt`, `while read u; do curl -s -o /dev/null -w "%{http_code} $u\n" "$u"; done < linked.txt | grep -v "^200"` prints nothing, or only 301s that land on a 200.
- Bilingual sites: each Spanish listing in the log links a Spanish URL, and each English one an English URL.

## Avoid
- **Buying links**, link packages, private blog networks (sites built only to link out) and paid "guest post" marketplaces. All link spam under Google's policies.
- **Link exchanges at scale**, sitewide footer links, keyword-stuffed anchors.
- **Hundreds of low-quality directories** and AI-written guest posts. Google's policies name low-quality directory links; a buyer never sees them.
- **Expired-domain redirects** and "link insertion" offers in cold emails.
- **A review-site profile with no reviews.** It does little; get 2 or 3 real reviews or skip it.
- **Listing or PR text with banned terms** or results claims for a regulated business.

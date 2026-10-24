# 08 · Social previews
**Applies to:** every site.

## Why
Links get shared in WhatsApp, LinkedIn, Slack and email, often before anyone visits the site. A crisp, page-specific preview card looks like a real company; a missing or generic one looks like a template. Previews fail silently: the tags look right in the code while every share shows a blank card, so this standard is mostly about checking from the platforms' side.

There is no rigorous recent study on preview cards; most "X% more clicks" figures come from tool vendors. The case is the one you can see yourself: paste your link into WhatsApp and LinkedIn and look at what a prospect sees.

## Rules
1. Every indexable page sets `og:type`, `og:url` (canonical), `og:title`, `og:description`, `og:image` (absolute HTTPS URL), `og:image:width`, `og:image:height`, `og:image:alt`, `og:site_name`, `og:locale` (+ `og:locale:alternate` on bilingual sites), and `twitter:card` = `summary_large_image`. `og:title` is the page topic **without** the brand; `og:site_name` carries it.
   *Why:* width and height let the first share render a large card instead of a small one; Meta and Apple both show the site name separately, so a brand in the title appears twice.
2. **One image per page**, 1200×630, under 300 KB, JPEG or PNG (not WebP, which some clients skip), with the page's own headline and the brand mark.
   *Why:* every share then says what the page is about. Apple suggests image-only previews, but in WhatsApp and LinkedIn a headline on the image is what gets the click; we keep it, inside the safe square (rule 3).
3. **Crop-safe layout:** WhatsApp and iMessage often show a small square thumbnail cut from the **center** of the image. Put the logo, brand name and headline inside the central 630×630 square (x 285 to 915) and use the sides only for background. A left-aligned headline gets cut mid-word: one of our images read "l Your Sales / r Than Ever" in WhatsApp. A logo-only image is not the fix, because LinkedIn, Slack and X show the wide version.
4. **A changed image gets a new file name.** Meta caches preview images by URL, so re-scraping the page does not refresh an image replaced under the same name.
   *Why:* otherwise the old image keeps showing for weeks.
5. **Preview bots can reach the page.** `LinkedInBot`, `facebookexternalhit`, `WhatsApp`, `Slackbot` and `Twitterbot` must get a 200 and the image, which means no bot block at the CDN and no protected path. The HTML must work without JavaScript and stay under 1 MB for Apple's previews.
   *Why:* a bot rule added for scrapers silently kills every preview while the tags look perfect.
6. Generate the images from one HTML template with a script so they stay consistent and can be regenerated when copy changes (template idea: `templates/og-image-template.html`, rendered with Playwright or a headless browser).

## Check
- `curl -s -o /dev/null -w "%{http_code}\n" -A "LinkedInBot/1.0" https://example.com/` and the same with `facebookexternalhit/1.1`: 200.
- LinkedIn Post Inspector, the Facebook Sharing Debugger and opengraph.xyz on the home page and one inner page.
- `check-site.mjs` fails if a page has no `og:image` or the file does not exist.

## Avoid
- Relative `og:image` URLs (most crawlers ignore them).
- An `og:image` that points to a file that does not exist. One of our sites did this for months and every share showed a blank card; `check-site.mjs` now catches it.
- One shared image for every page: every share then looks the same.
- Re-scraping and expecting a new image under the old file name: rename the file (rule 4), then re-scrape.


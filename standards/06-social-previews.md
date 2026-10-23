# 06 · Social previews

## Why
Links get shared in WhatsApp, LinkedIn, Slack and email. A crisp, page-specific preview card looks like a real company; a missing or generic one looks like a template.

## Rules
1. Every indexable page sets `og:type`, `og:url` (canonical), `og:title`, `og:description`, `og:image` (absolute HTTPS URL), `og:image:width`, `og:image:height`, `og:image:alt`, `og:site_name`, `og:locale` (+ `og:locale:alternate` on bilingual sites), and `twitter:card` = `summary_large_image`.
2. **One image per page**, 1200×630, under 300 KB (JPEG or PNG; WebP is not read by every client), with the page's own headline on it and the brand mark. Text stays inside the central safe area (about 1000×500) because some apps crop.
3. Generate the images from one HTML template with a script so they stay consistent and can be regenerated when copy changes (template idea: `templates/og-image-template.html`, rendered with Playwright or a headless browser).

## Check
- LinkedIn Post Inspector, the Facebook Sharing Debugger and opengraph.xyz on the home page and one inner page.
- `check-site.mjs` fails if a page has no `og:image` or the file does not exist.

## Avoid
- Relative `og:image` URLs (most crawlers ignore them).
- One shared image for every page: every share then looks the same.
- Cached old previews: after changing an image, re-scrape it in each platform's debugger.
- 2026-10: a site referenced `/og-image.png` for months while the file never existed; every share showed no preview and nobody noticed. `check-site.mjs` catches this, so run it before launch.

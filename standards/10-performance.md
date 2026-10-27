# 10 · Performance
**Applies to:** every site.

## Why
Speed is the first impression and a ranking signal. Most visitors arrive on a mid-range phone over mobile data, and every extra second before the main image or headline appears loses some of them before they read a word. A slow site reads as a small company; a fast one reads as a well-run one. Static sites start fast, so most losses come from a few avoidable habits: oversized images, too many fonts, and scripts that block the page.

The evidence:
- A 0.1-second improvement in mobile speed raised retail conversions by 8.4% and average order value by 9.2% across 37 brands ([Deloitte for Google, 2020](https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html)).
- Vodafone's A/B test: making the main content appear 31% faster produced 8% more sales and a 15% better lead-to-visit rate ([web.dev, 2021](https://web.dev/case-studies/vodafone)).

## Rules
1. **Core Web Vitals targets** (75th percentile, mobile): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Lab target: PageSpeed Insights mobile Performance ≥ 90.
   *Why:* these are the field metrics Google uses; the lab score is only a proxy you can test before launch.
2. **Images:** AVIF or WebP, sized to how they display (`srcset` + `sizes`), explicit `width` and `height` on every `<img>`, `loading="lazy"` below the fold, `fetchpriority="high"` on the LCP image only, and nothing over ~200 KB without a reason.
   *Why:* the hero image is the LCP on most pages; missing dimensions cause layout shift; lazy-loading the hero delays it.
3. **Fonts:** self-host WOFF2, subset to the scripts you need (latin, latin-ext), `font-display: swap`, at most two families, and preload only the one or two files used above the fold.
   *Why:* every preload competes with the hero image for the first bytes.
4. **JavaScript:** no framework unless the site needs one; ES modules (`type="module"`, deferred by default); third-party scripts after consent or after `load`; libraries self-hosted.
   *Why:* main-thread work is what makes taps feel slow (INP), and public CDNs add a connection and a security hole (standard 15).
5. **CSS:** one stylesheet, loaded normally (not via `onload` tricks); inline only truly critical CSS, if any.
   *Why:* async CSS tricks flash unstyled content, which costs more trust than the milliseconds they save.
6. **Motion and 3D:** heavy hero animations render a static poster first, start after first paint, pause off-screen, and honour `prefers-reduced-motion`.
   *Why:* an animation that blocks the first paint turns a design flourish into a bounce.
7. **Caching:** versioned assets get a one-year immutable cache (standard 15, rule 9). Do not add Cloudflare Cache Rules ("cache everything") on a Pages domain.
   *Why:* Pages already caches at the edge and purges on every deploy; a custom cache rule can serve stale files or break redirects and Functions.
8. **Early Hints on Pages:** Pages turns `<link rel="preload|preconnect|modulepreload">` tags into 103 Early Hints automatically, but skips any tag with `crossorigin` or `fetchpriority`. Font preloads always need `crossorigin`, so to hint the main font add a `Link` header for it in `_headers`.
   *Why:* the browser can start fetching the font while the server is still sending HTML, a free win most sites never get.
9. **Third-party budget:** each one (analytics, chat widget, embed) earns its place and is listed in the site's AGENTS.md.
   *Why:* third parties are the usual cause of a site that was fast at launch and slow a year later.

## How to build it
- Convert images with `sharp`, `squoosh` or `cwebp`; keep originals outside the published folder.
- Subset fonts with `pyftsubset` or google-webfonts-helper.
- Measure on a throttled mobile profile (Lighthouse "Mobile") before and after every visual feature.

## Check
- PageSpeed Insights (pagespeed.web.dev) on the home page and one inner page, mobile.
- Search Console → Core Web Vitals once traffic exists.
- Lighthouse CI on pull requests (see standard 20) to catch regressions.

## Avoid
- Quoting "53% of visitors leave after 3 seconds". The 2016 source says visits are "likely to be abandoned", based on benchmark data with no published definition; use the Deloitte or Vodafone numbers instead.
- Preloading every font weight: each preload competes with the LCP image. Detect: more than two `rel="preload" as="font"` in the head.
- `loading="lazy"` on the LCP image (delays it).
- Animation libraries loaded for one effect that CSS can do.
- Unused JS and CSS from templates or earlier designs. Detect: DevTools → Coverage.
- Layout shift from banners (cookie consent, announcement bars) that push content down. Overlay them instead.
- Full-screen popups on arrival (newsletter, offers, app install) that hide the page, especially on phones. Google counts them as intrusive interstitials. Banners a law requires are exempt, but should still overlay the content, never redirect to a separate consent page ([Google, 2025](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials)).


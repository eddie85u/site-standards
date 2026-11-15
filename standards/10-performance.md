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
10. **Looping and scroll-linked animations change only `transform`, `opacity` or `filter`.** A glow is a `filter: drop-shadow()`, a grow is `transform: scale()`, a slide is `translate`; never `box-shadow`, `text-shadow`, `width`, `top`, `margin` or colours in a loop.
    *Why:* the browser can hand those three properties to the graphics card and skip redrawing the page; any other property is repainted on the main thread every frame, for as long as the loop runs, and competes with taps (INP). One of our sites pulsed its key numbers with a `text-shadow` glow; the same look as `filter: drop-shadow()` runs composited ([Chrome](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations)).
11. **Use features that are "Baseline widely available"; a newer one only behind a feature check, with a fallback that works.** Baseline is the shared label from the browser makers and MDN: "widely available" means the feature has worked in Chrome, Edge, Firefox and Safari for at least 30 months ([web.dev Baseline](https://web.dev/baseline)). A newer feature goes inside `@supports` (CSS) or an `if ("x" in window)` check (JavaScript), and the page without it is complete, only plainer.
    *Why:* the modern way to build an effect is often newer than the browsers a small business must still serve. On one of our sites a scroll effect rebuilt with CSS scroll-driven animations sits inside `@supports`, so browsers without it show a still layout instead of a broken one. A scan of three sites found six older patterns whose modern replacement reached every browser only between December 2025 and August 2026; all six were kept ([20](20-guardrail-tests.md) rule 8).

## How to build it
- Convert images with `sharp`, `squoosh` or `cwebp`; keep originals outside the published folder.
- Subset fonts with `pyftsubset` or google-webfonts-helper.
- Measure on a throttled mobile profile (Lighthouse "Mobile") before and after every visual feature.
- Before new front-end work (an animation, a dialog, a menu, a form control), have the agent read Chrome's Modern Web Guidance for it: `npx modern-web-guidance@1.0.0 search "parallax on scroll"`, then `retrieve <guide-id>`. It is a set of reviewed guides from the Chrome, Edge, Firefox and MDN teams, each with browser support and a fallback (Apache-2.0, [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance)). Pin the version you checked and apply rule 11 to what it suggests. Agents otherwise default to the older patterns that dominate their training data, usually more JavaScript than the job needs.

## Check
- PageSpeed Insights (pagespeed.web.dev) on the home page and one inner page, mobile.
- Search Console → Core Web Vitals once traffic exists.
- Lighthouse CI on pull requests (see standard 20) to catch regressions.
- Early Hints (rule 8): `curl -sI https://example.com/ | grep -i '^link:'` lists the main font with `rel=preload` and `crossorigin`. Pages sends the 103 only over HTTP/2 or 3, so confirm it in Chrome: load the page twice, then in the console `performance.getEntriesByType("navigation")[0].firstInterimResponseStart` is above 0. On three of our sites (2026-11) it was above 0 only on the one with the `Link` header; the two that preload fonts with `crossorigin` in HTML alone got no Early Hints.
- Looping animations (rule 10): `grep -nE '@keyframes' -A6 <css>` shows only `transform`, `opacity`, `filter` (or `translate`, `scale`, `rotate`) inside each looping keyframe; Lighthouse shows no "Avoid non-composited animations" entry.
- Newer features (rule 11): each feature the site uses that is not Baseline widely available sits inside `@supports` or a script check; see 20 for the `legacy-scan` that lists the rest.

## Avoid
- Quoting "53% of visitors leave after 3 seconds". The 2016 source says visits are "likely to be abandoned", based on benchmark data with no published definition; use the Deloitte or Vodafone numbers instead.
- Preloading every font weight: each preload competes with the LCP image. Detect: more than two `rel="preload" as="font"` in the head.
- `loading="lazy"` on the LCP image (delays it).
- Animation libraries loaded for one effect that CSS can do.
- Unused JS and CSS from templates or earlier designs. Detect: DevTools → Coverage.
- Layout shift from banners (cookie consent, announcement bars) that push content down. Overlay them instead.
- Starting the tag manager and session recorder with the page. Even async and cookieless, their few hundred KB sit in the critical path: one of our sites scored 68-75 on mobile with LCP near 6 s, against 97-99 for the same page without them. Start them on the `load` event (rule 4). Detect: PageSpeed on the live domain scores far below a preview that skips the tags.
- Loading the page stylesheet asynchronously (`rel=preload` plus `onload`, rule 5). It flashes an unstyled page and, on one of our sites, gave a desktop layout shift of 1.0.
- `html{scroll-behavior:smooth}` when pages are linked to a `#section`: the browser glides there on arrival instead of opening at it. Smooth-scroll in-page links from script instead.
- One oversized image doing two jobs: a 2048 px hero kept sharp for a later scroll zoom is also the first-paint image, so every visitor waits for it. On one of our sites it was 399 KB shown at 441 px, and mobile LCP was 5 to 7 s. Paint a copy sized for the rest state first (`srcset`), then swap in the large one after `load`; the browser keeps showing the small one until the large one is decoded. Mobile scored 96-97 instead of 71-79 with no visible change. Detect: PageSpeed's image-delivery audit flags the LCP image.
- Layers a script places in px (parallax, camera or zoom heroes) that start from a CSS default such as `inset:0`. They jump when the script runs, which counts as layout shift: 0.19 on one of our desktops. Give the CSS the same formulas the script uses (`calc`, `min`, `max`, `vw`, `dvh`), and match the script's width source (`documentElement.clientWidth` includes a `scrollbar-gutter`, while a percentage of the stage does not). Detect: PageSpeed's layout-shift audit names the layer; compare its box with the script disabled and enabled.
- One font file copied once per weight: four identical copies download four times. Declare one face with a weight range (`font-weight: 400 700`). Detect: identical checksums in the fonts folder.
- Comparing PageSpeed runs of identical URLs: the API caches and returns the same report. Add a different query string to each run, run 3 per device and quote the range.
- Full-screen popups on arrival (newsletter, offers, app install) that hide the page, especially on phones. Google counts them as intrusive interstitials. Banners a law requires are exempt, but should still overlay the content, never redirect to a separate consent page ([Google, 2025](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials)).


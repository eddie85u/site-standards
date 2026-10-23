# 03 · Performance

## Why
Speed is the first impression and a ranking signal. A slow site reads as a small company; a fast one reads as a well-run one.

## Rules
1. **Core Web Vitals targets** (75th percentile, mobile): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Lab target: PageSpeed Insights mobile Performance ≥ 90.
2. **Images:** AVIF or WebP, sized to how they display (`srcset` + `sizes`), explicit `width` and `height` on every `<img>`, `loading="lazy"` below the fold, `fetchpriority="high"` on the LCP image only. No image over ~200 KB without a reason.
3. **Fonts:** self-host WOFF2, subset to the scripts you need (latin, latin-ext), `font-display: swap`, at most two families. Preload only the one or two files used above the fold.
4. **JavaScript:** no framework unless the site needs one. ES modules with `type="module"` (deferred by default). Third-party scripts load after consent or after `load`, never in the critical path. Self-host libraries instead of loading them from public CDNs.
5. **CSS:** one stylesheet, loaded normally (not via `onload` tricks that flash unstyled content). Inline only truly critical CSS, if any.
6. **Motion and 3D:** heavy hero animations must not delay LCP: render a static poster first, start the animation after first paint, and pause it off-screen. Honour `prefers-reduced-motion`.
7. **Caching:** see standard 02, rule 6. Version file names (or a `?v=` query) when assets change under a long cache.
8. **Third parties budget:** each one (analytics, chat widget, embed) must earn its place. List them in the site's README.

## How to build it
- Convert images with `sharp`, `squoosh` or `cwebp`; keep originals outside the published folder.
- Subset fonts with `pyftsubset` or google-webfonts-helper.
- Measure on a throttled mobile profile (Lighthouse "Mobile") before and after every visual feature.

## Check
- PageSpeed Insights (pagespeed.web.dev) on the home page and one inner page, mobile.
- Search Console → Core Web Vitals once traffic exists.
- Lighthouse CI on pull requests (see standard 13) to catch regressions.

## Avoid
- Preloading every font weight: each preload competes with the LCP image. Detect: more than two `rel="preload" as="font"` in the head.
- `loading="lazy"` on the LCP image (delays it).
- Animation libraries loaded for one effect that CSS can do.
- Unused JS and CSS from templates or earlier designs. Detect: DevTools → Coverage.
- Layout shift from banners (cookie consent, announcement bars) that push content down. Overlay them instead.

## Notes from real sites
- 2026-10: a site preloaded six font files; dropping to the two used above the fold is a free LCP win.
- 2026-10: with `Cache-Control: immutable` on `*.js`, a changed script without a new URL (`main.js?v=2`) never reaches returning visitors for a year. Bump the version in every tag that references it (the `modulepreload` link and the `script` tag must match).

# 09 · Accessibility
**Applies to:** every site.

## Why
Accessible sites reach more people, rank better, and meet legal expectations (ADA in the US, the European Accessibility Act since 2025). Most of it is also just good craft.

The bar is low and the risk is rising:
- 95.9% of the top million home pages have detectable WCAG failures, an average of 56 errors each; 83.9% have low-contrast text ([WebAIM Million, 2026](https://webaim.org/projects/million/)).
- 3,117 website-accessibility lawsuits were filed in US federal courts in 2025, up 27% on 2024, and the count excludes state courts ([Seyfarth, 2026](https://www.jdsupra.com/legalnews/federal-court-website-accessibility-1182174/)).

Meeting the floors below puts a site ahead of almost every competitor.

## Rules (WCAG 2.2 AA floors)
1. Text contrast at least 4.5:1 (3:1 for 24 px+ or 19 px+ bold), in light and dark themes.
2. Every interactive element is reachable and usable with the keyboard, in a logical order, with a **visible focus style**.
   *Why:* keyboard and switch users cannot book or buy otherwise, and missing focus styles are the most common failure in audits.
3. Click and tap targets at least 24×24 CSS px (44×44 recommended on mobile).
   *Why:* small targets are the main cause of mis-taps on phones, for everyone.
4. Landmarks: one `<main>`, a `<header>`, a `<footer>`, `<nav>` with a label; a "Skip to content" link first in the page.
5. Every `<img>` has `alt` (empty `alt=""` for decoration); icons that are buttons have an accessible name.
6. Forms: every field has a visible `<label>`, errors are announced in text (not colour alone), and required fields are marked.
   *Why:* placeholder-only fields lose their label the moment someone types, and screen readers may not read them.
7. **Motion:** every animation respects `prefers-reduced-motion: reduce` (stop or cut to a fade), nothing flashes more than three times a second, and autoplaying motion longer than five seconds can be paused.
   *Why:* heavy motion makes some visitors physically ill, and flashing content can trigger seizures.
8. Text can be zoomed to 200% without loss; no fixed pixel heights on text containers.
9. Body text at least 16 px; line length about 60–80 characters.

## Check
- axe DevTools or `@axe-core/playwright` on every page type: zero violations (serious and critical must be fixed before launch).
- Keyboard-only walk through the main conversion path.
- OS "reduce motion" on: the hero and scroll effects calm down.
- Lighthouse Accessibility ≥ 95.

## Avoid
- `outline: none` without a replacement focus style.
- Placeholder text instead of labels.
- Scroll-jacking that breaks the keyboard, find-in-page or the back button.
- Accessibility overlay widgets: they do not fix the underlying code, and an overlay does not make a site compliant.

## Notes from real sites
- None yet. Add the first dated lesson here.

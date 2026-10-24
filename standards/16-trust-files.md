# 16 · Trust files
**Applies to:** every site.

## Why
Small files that real companies have and hobby sites do not: a way to report a vulnerability, a proper icon on every device and in search results, and a manifest. Scanners and security-minded buyers look for them, and an expired or bouncing one looks worse than none.

Only about 1% of websites publish a security.txt ([Web Almanac, 2024](https://almanac.httparchive.org/en/2024/security)), and at least a quarter of those are invalid under the standard ([Web Almanac, 2025](https://almanac.httparchive.org/en/2025/security)). A valid one is a cheap way to look more careful than almost everyone.

## Rules
1. **security.txt** (RFC 9116, template: `templates/security.txt`) at `/.well-known/security.txt`:
   - `Contact:` a monitored address, required. Use an inbox that already exists and is read (for example the `info@` or `privacy@` address the site publishes). Only use `security@` if that mailbox or forwarding rule really exists; a bouncing contact is worse than none. An `https://` link to the contact page is also valid.
   - `Expires:` an ISO date **less than a year away**, required. Put a reminder in the site's TODO.md one month before it.
   - `Preferred-Languages:` and `Canonical:` (the full URL of the file)
   - served as `text/plain`
2. **Icons:** `favicon.ico` (32×32), `favicon.svg`, a raster favicon of at least 48×48 (the template uses `favicon-96.png`), `apple-touch-icon.png` (180×180), and 192×192 + 512×512 PNGs for the manifest, one of them with a maskable safe zone. Keep icon URLs stable and fetchable by Googlebot.
   *Why:* Google Search shows a raster icon next to your result and does not list SVG as supported; with only a 32px ICO or an SVG, results often show a generic globe.
3. **Web app manifest** `site.webmanifest` (template: `templates/site.webmanifest`) with `name`, `short_name`, `start_url`, `display`, `background_color`, `theme_color` and the icons; linked with `<link rel="manifest">`.
4. **humans.txt** (optional): team, thanks and tech, no personal emails.

## How to build it
- On Cloudflare Pages, keep the file at `/security.txt` and add `/.well-known/security.txt /security.txt 200` to `_redirects`, or place it directly in `.well-known/`. Test both URLs on a preview.
- Generate icons from one square SVG with realfavicongenerator.net or a `sharp` script.

## Check
```sh
curl -s https://example.com/.well-known/security.txt   # Contact and a future Expires
```
- Chrome DevTools → Application → Manifest: no errors, icons load.

## Avoid
- An `Expires` date that has passed: scanners then report the file as invalid, which looks worse than not having one.
- A security contact address that nobody reads, or that does not exist on the mail server.
- `"purpose": "maskable"` on an icon with the logo touching the edges (it gets cropped). Use `"any"` for full-bleed icons and a separate maskable one.

## Notes from real sites
- 2026-10: root-served sites often keep allowlists of their published files (a dev-server regex, a build file list, a completeness test). A new root file like `llms.txt` or `security.txt` has to be added to every one of them, or it works live but fails locally or in the export.

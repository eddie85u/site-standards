// Cloudflare Pages Function for sites served from the repo root.
// _routes.json limits this function to repo-only paths (docs, tests, scripts,
// worker code); it answers them with a 404. Every other request is a plain
// static asset and never reaches this code.
export async function onRequest() {
  return new Response('Not found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'no-store',
    },
  });
}

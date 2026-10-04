export async function onRequest(context) {
  // Proxy the public GitHub release asset so downloads are served from our own
  // domain. This avoids ever sending the player's browser to github.com,
  // which can show a sign-in/verification interstitial to logged-in users.
  const assetUrl = 'https://github.com/kleberkunha1-eng/gamekg/releases/download/launcher/GameProjectKG-Launcher.exe';
  try {
    const res = await fetch(assetUrl, { method: context.request.method === 'HEAD' ? 'GET' : context.request.method, cf: { cacheTtl: 0 } });
    if (!res.ok) return new Response('Asset not found', { status: res.status });

    const headers = new Headers();
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Content-Disposition', 'attachment; filename="GameProjectKG-Launcher.exe"');
    const len = res.headers.get('Content-Length');
    if (len) headers.set('Content-Length', len);
    // Never cache: the release asset is replaced in place on every launcher update.
    headers.set('Cache-Control', 'no-store');

    const body = context.request.method === 'HEAD' ? null : res.body;
    return new Response(body, { status: 200, headers });
  } catch (e) {
    return new Response('Proxy error: ' + String(e.message), { status: 502 });
  }
}

export async function onRequest(context) {
  // Proxy the public GitHub release asset so downloads are served from the site domain
  const assetUrl = 'https://github.com/kleberkunha1-eng/gamekg/releases/download/launcher/GameProjectKG-Launcher.exe';
  try {
    const res = await fetch(assetUrl);
    if (!res.ok) return new Response('Asset not found', { status: res.status });

    // Copy important headers and force content-disposition for attachment
    const headers = new Headers();
    headers.set('Content-Type', res.headers.get('Content-Type') || 'application/octet-stream');
    headers.set('Content-Disposition', 'attachment; filename="GameProjectKG-Launcher.exe"');
    // Short caching on the proxy to avoid stale behaviour while still reducing load
    headers.set('Cache-Control', 'public, max-age=3600');

    // Stream the response body through
    return new Response(res.body, { status: 200, headers });
  } catch (e) {
    return new Response('Proxy error: ' + String(e.message), { status: 502 });
  }
}

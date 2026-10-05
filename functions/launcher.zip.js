export async function onRequest(context) {
  // Mesma logica de launcher.exe.js, mas serve o launcher empacotado em .zip.
  // Baixar um .zip (em vez do .exe cru) reduz a chance do proprio navegador bloquear o download
  // antes mesmo do Windows entrar em acao (o filtro de "arquivo perigoso" do Chrome/Edge mira
  // principalmente extensoes executaveis diretas como .exe/.msi). Isso nao elimina o aviso do
  // SmartScreen nem a analise do antivirus ao extrair/abrir o .exe (ambos continuam agindo
  // normalmente), mas evita ser barrado nessa primeira camada, que e a mais comum em relatos de
  // "o arquivo sumiu sozinho".
  const assetUrl = 'https://github.com/kleberkunha1-eng/gamekg/releases/download/launcher/GameProjectKG-Launcher.zip';
  try {
    const res = await fetch(assetUrl, { method: context.request.method === 'HEAD' ? 'GET' : context.request.method, cf: { cacheTtl: 0 } });
    if (!res.ok) return new Response('Asset not found', { status: res.status });

    const headers = new Headers();
    headers.set('Content-Type', 'application/zip');
    headers.set('Content-Disposition', 'attachment; filename="GameProjectKG-Launcher.zip"');
    const len = res.headers.get('Content-Length');
    if (len) headers.set('Content-Length', len);
    headers.set('Cache-Control', 'no-store');

    const body = context.request.method === 'HEAD' ? null : res.body;
    return new Response(body, { status: 200, headers });
  } catch (e) {
    return new Response('Proxy error: ' + String(e.message), { status: 502 });
  }
}

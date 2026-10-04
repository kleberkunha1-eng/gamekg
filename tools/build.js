// Monta dist/: site (Vite) + public/ (manifest do launcher). Usado localmente e pelo GitHub Actions.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const run = (c, cwd) => cp.execSync(c, { cwd, stdio: 'inherit' });
const root = path.join(__dirname, '..');
run('npm ci', path.join(root, 'site'));
run('npm run build', path.join(root, 'site'));
fs.rmSync(path.join(root, 'dist'), { recursive: true, force: true });
fs.cpSync(path.join(root, 'site', 'dist'), path.join(root, 'dist'), { recursive: true });
fs.cpSync(path.join(root, 'public'), path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', '_headers'), '/*\n  Cache-Control: no-cache\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/patch/*\n  Cache-Control: no-cache\n/launcher.exe\n  Cache-Control: no-cache\n');
fs.writeFileSync(path.join(root, 'dist', '_routes.json'), JSON.stringify({ version: 1, include: ['/api/*'], exclude: [] }));
console.log('dist pronto');
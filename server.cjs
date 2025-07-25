const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('BOOT', new Date().toISOString());

const PORT = Number(process.env.PORT);
if (!PORT) {
  console.error('PORT env var missing');
  process.exit(1);
}
console.log('PORT is', PORT);

const DIST = path.resolve(__dirname, 'dist');
const INDEX = path.join(DIST, 'index.html');

const MIME = {
  js: 'text/javascript',
  mjs: 'text/javascript',
  css: 'text/css',
  json: 'application/json',
  ico: 'image/x-icon',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  wasm: 'application/wasm',
  html: 'text/html',
  m4a: 'audio/mp4',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg'
};

function send(file, res, code = 200) {
  const ext = path.extname(file).slice(1);
  res.writeHead(code, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);

  if (url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }

  let filePath = path.join(DIST, url);
  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) filePath = path.join(filePath, 'index.html');
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return send(filePath, res);
    }
  } catch (_) {
    // fall through
  }

  if (fs.existsSync(INDEX)) return send(INDEX, res);
  res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
});

server.listen(PORT, '0.0.0.0', () => console.log('up on', PORT));
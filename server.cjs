const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
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
  html: 'text/html'
};

function sendFile(file, res, code = 200) {
  const ext = path.extname(file).slice(1);
  res.writeHead(code, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);

  // cheap health check
  if (url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }

  // static files
  let filePath = path.join(DIST, url);
  try {
    if (fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return sendFile(filePath, res);
    }
  } catch (_) {
    // fall through to SPA fallback
  }

  // Astro SPA fallback
  if (fs.existsSync(INDEX)) {
    return sendFile(INDEX, res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('up on', PORT);
});
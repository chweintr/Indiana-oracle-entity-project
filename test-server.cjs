const http = require('http');
const PORT = process.env.PORT || 7432;

console.log('Starting server on port:', PORT);

const server = http.createServer((req, res) => {
  console.log('Request:', req.url);
  
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK - Server is working!');
  }
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Oracle Entity Test</h1><p>Server is running!</p>');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Server successfully started on port', PORT);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
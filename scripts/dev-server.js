#!/usr/bin/env node
// Minimal static server for local dev (no external deps)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const ROOT = process.cwd(); // serve from repo root

function contentTypeByExt(ext) {
  const map = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.map': 'application/octet-stream'
  };
  return map[ext.toLowerCase()] || 'application/octet-stream';
}

function sendFile(filePath, res) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.setHeader('Content-Type', contentTypeByExt(ext));
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', () => {
      res.statusCode = 500;
      res.end('Server error');
    });
  });
}

const server = http.createServer((req, res) => {
  // Normalize URL and map to local file
  const safeSuffix = path.normalize(req.url.split('?')[0]).replace(/^([\\/])+/, '');
  let filePath = path.join(ROOT, safeSuffix);

  // If path is directory, look for index.html
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    fs.stat(filePath, (err2, stats2) => {
      if (!err2 && stats2.isFile()) {
        sendFile(filePath, res);
      } else {
        // SPA fallback: serve index.html for unknown routes (client-side routing)
        const indexPath = path.join(ROOT, 'index.html');
        fs.stat(indexPath, (ie, istats) => {
          if (!ie && istats.isFile()) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            fs.createReadStream(indexPath).pipe(res);
          } else {
            res.statusCode = 404;
            res.end('Not found');
          }
        });
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}/`);
  console.log(`Serving from ${ROOT}`);
});

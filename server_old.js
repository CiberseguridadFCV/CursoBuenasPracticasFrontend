const express = require('express');
const app = express();
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

app.use(function(req, res, next) {
  // Genera un nonce único
  const nonce = crypto.randomBytes(16).toString('base64');

  // Añade el nonce a la cabecera CSP
  res.setHeader("Content-Security-Policy", `default-src 'self'; connect-src 'self' https://localhost:8080; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; img-src 'self' data:; font-src 'self' data:;`);

  // Añade el nonce a la respuesta para que pueda ser utilizado por Angular
  res.locals.nonce = nonce;

  return next();
});

app.use(express.static(__dirname + '/dist/frontend/browser'));

app.get('/*', function(req,res) {
  // Añade el nonce al HTML de la aplicación Angular
  let html = fs.readFileSync(path.join(__dirname+'/dist/frontend/browser/index.html'), 'utf8');
  html = html.replace(/ngCspNonce=""/g, `ngCspNonce="${res.locals.nonce}"`);
  res.send(html);
});

app.listen(process.env.PORT || 5000);

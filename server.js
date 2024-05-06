const express = require('express');
const helmet = require('helmet'); 
const app = express();
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');

const privateKey = fs.readFileSync('D:/Fcv/Curso de desarollo/Aplicacion ejemplo de buenas prácticas/FRONTENDSAHIexterno/frontend/key.pem', 'utf8');
const certificate = fs.readFileSync('D:/Fcv/Curso de desarollo/Aplicacion ejemplo de buenas prácticas/FRONTENDSAHIexterno/frontend/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.use(helmet()); 

app.use(function(req, res, next) {
  // Genera un nonce único
  const nonce = crypto.randomBytes(16).toString('base64');

  // Añade el nonce a la cabecera CSP
  res.setHeader("Content-Security-Policy", `default-src 'self'; connect-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; img-src 'self' data:; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';`);

  // Añade la cabecera X-Frame-Options
  res.setHeader('X-Frame-Options', 'DENY'); 

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

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.PORT || 5000);

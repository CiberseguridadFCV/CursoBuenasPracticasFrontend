const express = require('express');
const app = express();
const path = require('path');

// Añade el middleware para la cabecera CSP
app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:8080; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;");
  return next();
});

app.use(express.static(__dirname + '/dist/frontend/browser'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/frontend/browser/index.html'));
});

app.listen(process.env.PORT || 5000);

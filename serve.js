//
// This script will run a local development server. This is useful when
// developing the theme.
//
// Usage:
// `node serve`
//


var http = require("http");
var fs = require("fs");
var path = require("path");


var CONTENT_TYPE = {
  HTML: "text/html",
  CSS: "text/css",
  PNG: "image/png",
  ICO: "image/x-icon",
  SVG: "application/svg+xml",
  WOFF: "application/font-woff",
  WOFF2: "application/font-woff2",
  TTF: "application/x-font-ttf",
  EOT: "application/vnd.ms-fontobject",
  PDF: "application/pdf"
}

var port = 8000;
http.createServer(function(req, res) {
  if (req.url == "/") { req.url = "index.html"; }

  var ext = path.extname(req.url);
  var fullPath = path.join(__dirname, "/build/", req.url);
  console.log(ext);
  var file = fs.readFileSync(fullPath);

  if (".html" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.HTML });
    res.end(file);
  }
  else if (".css" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.CSS });
    res.end(file);
  }
  else if (".ico" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.ICO });
    res.end(file);
  }
  else if (".png" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.PNG });
    res.end(file);
  }
  else if (".woff2" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.WOFF2 });
    res.end(file);
  }
  else if (".woff" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.WOFF });
    res.end(file);
  }
  else if (".ttf" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.TTF });
    res.end(file);
  }
  else if (".eot" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.EOT });
    res.end(file);
  }
  else if (".svg" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.SVG });
    res.end(file);
  }
  else if (".pdf" == ext) {
    res.writeHead(200, { "Content-Type": CONTENT_TYPE.pdf });
    res.end(file);
  }
  else {
    res.writeHead(400);
    res.end();
  }
}).listen(port);


console.log("Preview: http://localhost:8000/");
console.log("Serving..");

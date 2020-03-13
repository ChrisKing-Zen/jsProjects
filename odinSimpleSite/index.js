const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const PORT = 4000;

http
  .createServer((req, res) => {
    var q = url.parse(req.url, true);
    var filename = q.pathname;
    fs.readFile(`./pages${filename}.html`, function(err, data) {
      if (err) {
        fs.readFile("./pages/404.html", function(err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(PORT);

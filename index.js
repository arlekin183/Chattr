var http = require('http');
var fs = require('fs');
var extract = require('./app/extract');

var handleError = function (err, res) {
  res.writeHead(401);
  res.end();
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(err);
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});

server.listen(3000);

var express = require('express')

var app = module.exports = express();
app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.send("ok", {'Content-Type': 'text/html; charset=utf-8'}, 200);
});

app.post('/echo', function(req, res) {
  var body = req.body

  res.send(body, {'Content-Type': 'application/json'}, 200);
});

if(!module.parent) {
  console.log("Listening on port 8080");
  app.listen(8080);
}

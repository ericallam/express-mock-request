var app, request;

request = require('..');

app = require('./app');

exports.testGetStatusCode = function(test) {
  request(app).get('/').expect(function(res) {
    test.equal(res.headers['content-type'], 'text/html; charset=utf-8');
    return test.done();
  });
};

exports.testGetHeaders = function(test) {
  request(app).get('/').expect(function(res) {
    test.equal(res.statusCode, 200);
    return test.done();
  });
};

exports.testGetBody = function(test) {
  request(app).get('/').expect(function(res) {
    test.equal(res.body, "ok");
    return test.done();
  });
};

exports.testPostWrite = function(test) {
  params = JSON.stringify({message: 'Hello World'});

  request(app)
    .post('/echo')
    .set('Content-Type', 'application/json')
    .write(params)
    .expect(function(res) {
      test.equal(JSON.parse(res.body).message, "Hello World");
      test.done()
    });
}


### express-mock-request

express-mock-request is a utility function to make it easy to write tests for Node.JS [Express](https://github.com/visionmedia/express) applications.
In fact, it was extracted from the Express test-suite [here](https://github.com/visionmedia/express/blob/master/test/support/http.js).  I 
wanted to use it in my own application and I so I extracted it into this module and removed the [mocha](https://github.com/visionmedia/mocha) specific testing code.

#### How to use:

First, install using npm:

    npm install express-mock-request

Then require it in your test file like so:

```javascript
var request = require('express-mock-request');
```

Let's say you want to test this simple express app to make sure it returns the proper status, body, and headers:

```javascript
var express = require('express')
var app = module.exports = express();

app.get('/', function(req, res) {
  res.send("ok", {'Content-Type': 'text/html'}, 200);
});

// Only start listening on 8080 when this file is run directly i.e.: node app.js
if(!module.parent) {
  app.listen(8080);
}
```

You could write your test like so:

```javascript
var request = require('express-mock-request');
// require the express application, notice how we exported the express app using `module.exports` above
var app = require('../app');

// This example uses nodeunit
exports.testGet = function(test){
  request(app).get('/').expect(function(response) {
    // response is the response from hitting '/'
    test.equal(response.body, "ok");
    test.equal(response.statusCode, 200);
    test.equal(response.headers['content-type'], "text/html");
    test.done();
  });
}
```

You can see more examples in the express test suite [here](https://github.com/visionmedia/express/tree/master/test/acceptance).

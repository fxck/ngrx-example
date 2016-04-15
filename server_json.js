var jsonServer = require('json-server');

// Returns an Express server
var server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults())

// Add custom routes
server.post('/login', function (req, res) {
  req.on('data', function(data) {
    var data = JSON.parse(data.toString());
    if (data.username == 'admin' && data.password == '123') {
      res.json({
        name: 'Mr. Furrball',
        isAuthenticated: true,
        avatar: 'http://placekitten.com/g/200/200'
      });
    } else {
      res.status(401).send({
        errors: [],
        message: 'Invalid credentials',
        status: 401
      });
    }
  });

});

// Returns an Express router
var router = jsonServer.router('db.json');

server.use(router);

server.listen(3100);
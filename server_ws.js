var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 3200 });

var messages = [];

wss.on('connection', function connection(ws) {
  var timeout;

  try {
    ws.send(JSON.stringify({
      id: Math.floor(Date.now() / 1000),
      type: 'CAT',
      payload: 'http://thecatapi.com/api/images/get.php?pub_id=' + makeid()
    }));
  } catch (e) { }

  ws.on('close', function close() {
    clearTimeout(timeout);
  });

  timeout = setInterval(function() {
    ws.send(JSON.stringify({
      id: Math.floor(Date.now() / 1000),
      type: 'CAT',
      payload: 'http://thecatapi.com/api/images/get.php?pub_id=' + makeid()
    }));
  }, 5000);

});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


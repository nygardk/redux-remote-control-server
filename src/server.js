const uuid = require('uuid');

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 8888 });

const clients = {};

wss.on('connection', function connection(ws) {
  const id = uuid.v1();
  clients[id] = ws;

  console.log(ws.upgradeReq.url);

  console.log(`new connection ${id}`);

  ws.on('close', () => {
    delete clients[id];
    console.log(`closed ${id}`);
  });

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  // simulate latency
  setTimeout(() => {
    ws.send(id);
  }, 1000);
});

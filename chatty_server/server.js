// ws server
// server to listen
const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');
const server = express() // Makes the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server }); // Creates ws server

// Set up a callback that will run when a client connects to the server
wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  })
}

wss.on('connection', (ws) => { // When a client connects they are assigned a socket, represented by the 'ws' parameter in the callback.
  console.log('Client connected');
  let connectedClients = {
    type: "connectedClients",
    count: wss.clients.size
  }

  wss.broadcast(connectedClients);
  
  ws.on('message', function(newMessage) { // New message to ws
    const data = JSON.parse(newMessage)
    const uniqueId = uuidv4();
    const message = {
      id: uniqueId,
      currentUser: data.username,
      content: data.content
    }
 
    switch(data.type) {
      case "changeUser":
      data.id = uniqueId;
      wss.broadcast(data);
      break;
    default:
      data.id = uniqueId;
      wss.broadcast(data);
    }
  })
  // Callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    let connectedClients2 = {
      type: "connectedClients",
      count: wss.clients.size
    }
  
    wss.broadcast(connectedClients2);
  });
});

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

// Creates ws server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server


wss.on('connection', (ws) => { // When a client connects they are assigned a socket, represented by the 'ws' parameter in the callback.
  console.log('Client connected');
  // let id = uuidv4();
  // console.log(id);
  
  ws.on('message', function(newMessage) { // new message to ws
    const data = JSON.parse(newMessage)
    const uniqueId = uuidv4();
    const message = {
      id: uniqueId,
      currentUser: data.username,
      content: data.content
    }
    console.log(data.username, data.content)
    console.log(message.id)

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
        console.log("MESSAGE", message)
      }
    })
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

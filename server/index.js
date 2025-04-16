const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');


const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log("Socket running", socket.id);
})

const PORT = 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
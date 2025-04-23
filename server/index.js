const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap={};

const getAllConnectedClients=(roomId)=>{
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(     //map
      (socketId) =>{
        return {
          socketId,
          username:userSocketMap[socketId],
        }
      }
    )              
}

io.on('connection', (socket) => {
   socket.on('join',({roomId,username})=>{
    //to join the room
    userSocketMap[socket.id]=username;                       
    socket.join(roomId);
    //to get all the persons in the room
    const clients=getAllConnectedClients(roomId)            
    console.log(clients)
  });
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port at  ${PORT}`));
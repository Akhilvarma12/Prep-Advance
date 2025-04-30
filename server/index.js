import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  // When they join
  socket.on("join", ({ roomId, username }) => {
    // Join the room
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    // Get all the persons in the room
    const clients = getAllConnectedClients(roomId);
    
    // Notify user joining
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // For active changes in code
  socket.on("code-change", ({ roomId, code }) => {
    socket.in(roomId).emit("code-change", { code });
  });

  // Sync code with another client
  socket.on("sync-code", ({ socketId, code }) => {
    io.to(socketId).emit("code-change", { code });
  });

  // When they leave
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5000;

// Get the directory name
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Serve static files for production
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

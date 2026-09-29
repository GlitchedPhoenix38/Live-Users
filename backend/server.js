// ─── Express + Socket.IO real-time online-users server ───

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Allow requests from the Vite dev server
app.use(cors({ origin: "http://localhost:5173" }));

// Socket.IO instance — only accept the same origin
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// ─── Track online users with a Set of socket IDs ───
// Using a Set prevents duplicate counting automatically.
const onlineUsers = new Set();

io.on("connection", (socket) => {
  // Add the new socket and broadcast the updated count
  onlineUsers.add(socket.id);
  console.log(`[+] ${socket.id} connected  (total: ${onlineUsers.size})`);
  io.emit("online-count", onlineUsers.size);

  // Handle graceful disconnect (tab close, refresh, network drop)
  socket.on("disconnect", (reason) => {
    onlineUsers.delete(socket.id);
    console.log(`[-] ${socket.id} disconnected (${reason})  (total: ${onlineUsers.size})`);
    io.emit("online-count", onlineUsers.size);
  });
});

// ─── Start server ───
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

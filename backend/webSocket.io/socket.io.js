const express = require("express");
const http = require("http");
const socketIo = require("socket.io"); // Correct import for CommonJS


const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`Uesr joined chat: ${chatId}`);
  });

  socket.on("sendMessage", async (messageData) => {
    const { sender, content, conversationId } = messageData;
    io.to(conversationId).emit("messageReceived", messageData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

module.exports = { server, app, io };

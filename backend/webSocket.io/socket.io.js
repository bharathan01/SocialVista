const express = require("express");
const http = require("http");
const socketIo = require("socket.io"); // Correct import for CommonJS
const { addMessages } = require("../controllers/message.controller");

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userInfo) => {
    socket.join(userInfo);
    console.log(userInfo);
    socket.emit("connected");

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on("sendMessage", async (messageData) => {
      const { sender, content, conversationId } = messageData;

      //   const message = await addMessages(sender, content, conversationId);
      io.to(conversationId).emit("messageReceived", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
});

module.exports = { server, app, io };

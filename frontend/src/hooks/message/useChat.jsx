import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const endpoint = "http://localhost:8000";

function useChat(conversationId) {
  const [messages, setMessage] = useState([]);
  const socket = io(endpoint);
  useEffect(() => {
    socket.emit("joinChat", conversationId);

    socket.on("messageReceived", (message) => {
      setMessage((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, conversationId]);

  const sendNewUserMessage = (content, sender) => {
    const message = { sender, content, conversationId };
    socket.emit("sendMessage", message);
    setMessage((prevMessages) => [...prevMessages, message]);
  };

  return { sendNewUserMessage, messages };
}

export default useChat;

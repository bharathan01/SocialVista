import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

const {VITE_FRONT_END} = import.meta.env;

function useChat(conversationId) {
  const [messages, setMessages] = useState([]);
  const socket = io(VITE_FRONT_END);

  useEffect(() => {
    if (conversationId) {
      socket.emit("joinChat", conversationId);

      socket.on("messageReceived", (message) => {
        setMessages((prevMessages) => [ message]);
      });
    }
    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  const sendNewUserMessage = useCallback(
    (content, sender) => {
      const message = {
        conversationId,
        content,
        sender: {
          _id: sender,
        },
      };
      socket.emit("sendMessage", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    },
    [conversationId]
  );

  return { sendNewUserMessage, messages };
}

export default useChat;

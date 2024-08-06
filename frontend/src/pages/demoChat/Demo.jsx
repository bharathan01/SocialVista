import React from "react";
import useChat from "../../hooks/message/useChat";

function Demo() {
  const { sendNewUserMessage, messages } = useChat("1234");

  const oneToOneMessage = (event) => {
    event.preventDefault();
    const content = document.getElementById("content").value;
    sendNewUserMessage(content, "bhatathan");
    document.getElementById("content").value = ""; // Clear input field after sending message
  };

  return (
    <div>
      <button>Connect</button>
      <form onSubmit={oneToOneMessage}>
        <input type="text" placeholder="message" id="content"></input>
        <button type="submit">Send</button>
      </form>
      <div className="text-white">
          <div>{messages.content}</div>
      </div>
    </div>
  );
}

export default Demo;

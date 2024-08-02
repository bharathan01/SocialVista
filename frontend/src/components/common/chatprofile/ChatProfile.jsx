import React, { useState } from "react";
import { useSelector } from "react-redux";
import avater from "../../../../public/images/avatar-placeholder.png";
function ChatProfile({ message }) {
  const [chatByUser, setChatByUser] = useState(false);
  const { userInfo } = useSelector((state) => state.userAuth);
  return (
    <div>
      <div
        className={
          message.sender._id == userInfo.id
            ? "chat chat-end"
            : " chat chat-start"
        }
      >
        {message.sender._id != userInfo.id ? (
          <>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <>
                  {message.sender?.profileImg ? (
                    <>
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={message.sender?.profileImg}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={avater}
                      />
                    </>
                  )}
                </>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="chat-bubble">{message?.content}</div>
      </div>
    </div>
  );
}

export default ChatProfile;

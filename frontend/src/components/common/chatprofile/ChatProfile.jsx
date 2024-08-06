import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avater from "../../../../public/images/avatar-placeholder.png";
function ChatProfile({ profileImg, message, sender }) {
  const [chatByUser, setChatByUser] = useState(false);
  const { userInfo } = useSelector((state) => state.userAuth);
  return (
    <div>
      <div
        className={sender == userInfo.id ? "chat chat-end" : " chat chat-start"}
      >
        {sender != userInfo.id ? (
          <>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <>
                  {profileImg ? (
                    <>
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={profileImg}
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

        <div className="chat-bubble">{message}</div>
      </div>
    </div>
  );
}

export default ChatProfile;

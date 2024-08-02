import React from "react";
import avater from "../../../../public/images/avatar-placeholder.png";
import { Link } from "react-router-dom";
import { WiMoonAltNew } from "react-icons/wi";
import { relativeTimeString } from "../../../utils/date/DateAndTime";

function MessageProfile({ chats }) {
  return (
    <div className="w-full">
      <Link to={`/message/${chats?.participants[0]._id}`}>
        <div className="h-16 border-b-2 border-gray-900 hover:bg-gray-900 px-3 flex items-center justify-between hover:cursor-pointer">
          <div className="flex items-center gap-5 ">
            <div className="w-11 h-11 rounded-full">
              {chats?.participants[0].profileImg ? (
                <>
                  <img
                    src={chats?.participants[0].profileImg}
                    alt="profile image"
                    className="w-full h-full object-cover rounded-full"
                  />
                </>
              ) : (
                <>
                  <img
                    src={avater}
                    alt="profile image"
                    className="w-full h-full object-cover rounded-full"
                  />
                </>
              )}
            </div>
            <div>
              <div>
                <span className="text-lg font-semibold">
                  {chats?.participants[0].username}
                </span>
              </div>
              <div>
                <span
                  className={
                    chats?.readed
                      ? "text-base font-thin"
                      : "text-base font-bold"
                  }
                >
                  {chats?.lastMessage?.content}
                </span>
                <span className="text-sm opacity-65 ml-3">
                  {relativeTimeString(chats?.lastMessage?.timestamp)}
                </span>
              </div>
            </div>
          </div>
          <div>{!chats?.readed && <WiMoonAltNew />}</div>
        </div>
      </Link>
    </div>
  );
}

export default MessageProfile;

import React from "react";
import avater from "../../../../public/images/avatar-placeholder.png";
function MessageProfile() {
  return (
    <div className="w-full h-16 border-2 border-gray-900 px-3 flex items-center hover:cursor-pointer">
      <div className="flex items-center gap-5 ">
        <div className="w-11 h-11 rounded-full">
          <img
            src={avater}
            alt="profile image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <div>
            <span className="text-lg font-semibold">username</span>
          </div>
          <div>
            <span className="text-base font-thin">last message</span>
            <span className="text-sm opacity-65 ml-3">15h</span>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default MessageProfile;

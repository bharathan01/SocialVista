import React from "react";

import profileImage from "../../../../public/images/avatar-placeholder.png";
function Post() {
  return (
    <div className="flex flex-row w-full justify-center">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="flex justify-center items-center rounded-full w-[40px] h-[40px]">
              <img src={profileImage} alt="" />
            </div>
            <div className="text-lg">username</div>
          </div>
          <div>
            <div className="flex flex-col justify-center items-center w-[40px] h-[40px] rounded-sm hover:cursor-pointer hover:bg-gray-900 p-1 gap-1">
                <span className="w-[3px] h-[3px] bg-white"></span>
                <span className="w-[3px] h-[3px] bg-white"></span>
                <span className="w-[3px] h-[3px] bg-white"></span>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Post;

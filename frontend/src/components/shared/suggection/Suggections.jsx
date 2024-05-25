import React from "react";

function Suggections({ profileImg, username, fullname }) {
  return (
    <div className="w-full h-20 flex justify-between items-center">
      <div className="flex gap-3">
        <div className="w-12 h-12 flex justify-center items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={profileImg}
            alt="profileImg"
          />
        </div>
        <div className="">
          <div>
            <span className="font-semibold">{fullname}</span>
          </div>
          <div>
            <span className="text-sm opacity-65">@{username}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-md pl-4 pr-4 pt-1 pb-1 bg-white cursor-pointer text-black hover:[bg-#d9dbda]">
          <span>Follow</span>
        </div>
      </div>
    </div>
  );
}

export default Suggections;

import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import profileimg from "../../../../public/images/avatar-placeholder.png";

function SingleNptificatiion() {
  return (
    <div className="flex p-3 ml-4 mr-4 justify-between items-center">
      <div className="flex gap-5 items-center">
        <div className="w-[40px] h-[40px] rounded-full">
          <img
            src={profileimg}
            alt="profile image"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        </div>
        <div>
          <span className="md:text-lg text-sm">Arun liked your post</span>
        </div>
      </div>
      <div className="absolute">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Click
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SingleNptificatiion;

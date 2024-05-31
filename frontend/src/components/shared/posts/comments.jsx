import React from "react";
import profileImage from "../../../../public/images/avatar-placeholder.png";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

function comments() {
  return (
    <div className="flex gap-2  justify-between">
      <div className="w-[30px] h-[30px] min-w-[30px] rounded-full ">
        <img src={profileImage} alt="profile" />
      </div>
      <div className="flex w-[94%] justify-between ">
        <div className="w-full">
          <div className="w-full pr-4 outline-none">
            <span className="md:text-sm text-xs" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime voluptates, consequuntur accusantium sint cum rem repellendus exercitationem inventore? Harum, velit?</span>
         </div>
        </div>
        <div className="text-center">
          <IoIosHeartEmpty/>
          <span className="text-xs ">1</span>
        </div>
      </div>
    </div>
  );
}

export default comments;

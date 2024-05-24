import React from "react";
import MenuBar from "../common/MenuBar";
import contents from "../../utils/contents.jsx";
import profileImage from "../../../public/images/avatar-placeholder.png"
import { CiLogout } from "react-icons/ci";
function LeftSidebar() {
  return (
    <div className="lg:w-[20%] xl:w-[14%] w-[60px] border-r border-gray-700 fixed flex flex-col justify-between  left-0 top-[64px] h-[calc(100vh-64px)] overflow-y-auto ">
      <div className="flex  justify-center">
        <div className="w-4/5 flex flex-col gap-3 mt-4">
          {contents.map((menu) => {
            return (
              <React.Fragment key={menu.name}>
                <MenuBar menuIcon={menu.icon} menuText={menu.name} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="w-full mb-5 flex items-center ">
        <div className="flex items-center justify-around w-full rounded-3xl hover:bg-gray-900 p-1">
          <div className="rounded-full w-10 h-10 overflow-x-hidden object-contain ">
             <img src={profileImage} alt="" />
          </div>
          <div className="text-lg lg:block md:hidden hidden">Bharathan</div>
          <div className="text-2xl lg:block hidden" >
            <CiLogout/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;

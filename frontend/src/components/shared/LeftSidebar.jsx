import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import MenuBar from "../common/MenuBar";
import contents from "../../utils/contents.jsx";
import profileImage from "../../../public/images/avatar-placeholder.png";
import { CiLogout } from "react-icons/ci";
import { CreateNewPostContext } from "../../hooks/contexts/createpost/CreatePost.jsx";

function LeftSidebar() {
  const {toggleIslogOutCard} = useContext(CreateNewPostContext)
  const [activeMenu , setActiveMenu] = useState(null)
  const handleClick = (menu) =>{
    setActiveMenu(menu)
  }
  return (
    <div className="lg:w-[20%] xl:w-[14%] w-[60px] border-r border-gray-700 fixed flex flex-col justify-between  left-0 top-[64px]  overflow-y-auto ">
      <div className="flex justify-center">
        <div className="w-4/5 flex flex-col gap-3 mt-4">
          {contents.map((menu) => {
            return (
              <div onClick={() => handleClick(menu.name)} key={menu.name}>
                <MenuBar menuIcon={menu.icon} menuText={menu.name} path={menu.path} 
                
                 isActive={activeMenu === menu.name}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full mb-5 flex items-center mt-[150px] ">
        <div className="flex items-center justify-around w-full rounded-3xl  p-1">
          <Link to="/Profile">
            <div className="rounded-full w-10 h-10 overflow-x-hidden object-contain hover:cursor-pointer ">
              <img src={profileImage} alt="" />
            </div>
          </Link>
          <Link to="/Profile">
            <div className="text-lg lg:block md:hidden hidden hover:cursor-pointer ">
              Bharathan
            </div>
          </Link>
          <div className="text-2xl lg:block hidden hover:bg-gray-900 p-1 hover:cursor-pointer" onClick={()=>toggleIslogOutCard('openLogOutcard')}>
            <CiLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;

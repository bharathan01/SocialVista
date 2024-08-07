import React, { useContext, useState } from "react";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { CreateNewPostContext } from "../../hooks/contexts/createpost/CreatePost";

function MenuBar({ menuIcon, menuText, path, isActive }) {
    
   const {toggleCreatePost} = useContext(CreateNewPostContext)

  return (
    <Link to={`/${path}`}>
      <div
        className={`w-full h-12 flex items-center md:justify-start justify-center  gap-3 p-2 text-white rounded-xl hover:bg-gray-900 
        ${isActive ? "bg-gray-900" : ""}`}
        onClick={()=>{menuText ==="Create"? toggleCreatePost('openCreatePostcard'):''}}
      >
        <div className="md:text-3xl text-2xl ">{menuIcon}</div>
        <div className="text-xl lg:block hidden">
          <h1>{menuText}</h1>
        </div>
      </div>
    </Link>
  );
}

export default MenuBar;

import React from "react";
import { GoHome } from "react-icons/go";

function MenuBar({ menuIcon, menuText, isActive }) {
  return (
    <div className="w-full h-12 flex items-center  gap-3 p-2 text-white rounded-xl hover:bg-gray-900">
      <div className="text-3xl ">{menuIcon}</div>
      <div className="text-xl lg:block hidden">
        <h1>{menuText}</h1>
      </div>
    </div>
  );
}

export default MenuBar;

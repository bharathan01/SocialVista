import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";

function MenuBar({ menuIcon, menuText, path, isActive }) {
  return (
    <Link to={`/${path}`}>
      <div
        className={`w-full h-12 flex items-center  gap-3 p-2 text-white rounded-xl hover:bg-gray-900 
    ${isActive ? "bg-gray-900" : ""}`}
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

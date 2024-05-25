import React from "react";
import logo from "../../../public/images/logo.png";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="w-full h-16 flex items-center  border-b-2 border-b-slate-600 fixed top-0 z-30 bg-[#000000]">
      <div className="md:w-1/2 w:2/3 ml-4 flex items-center" >
        <div className="object-contain">
          <Link to={"/"}>
            {" "}
            <img src={logo} alt="" className="w-14 h-14" />
          </Link>
        </div>
        <div>
            <h1 className="font-extrabold text-xl">SOCIAL VISTA.</h1>
        </div>
      </div>
      <div className="md:w-1/2"></div>
    </div>
  );
}

export default Header;

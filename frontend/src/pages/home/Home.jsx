import React, { useState } from "react";
import Following from "../following/Follow";
import Foryou from "../foryou/Foryou";

function Home() {
  const [changePage, setChangePage] = useState("following");
  console.log(changePage);

  return (
    <div className=" min-h-screen overflow-y-auto p-2 xl:w-[71%] lg:w-[62%] md:w-[57%] ">
      <div className="flex justify-around items-center p-4 fixed top-[64px] bg-black xl:w-[61%] lg:w-[53%] md:w-[55%] w-[85%]">
        <div
          className="hover:cursor-pointer p-1"
          onClick={() => setChangePage("following")}
        >
          <span
            className={`font-semibold md:text-lg text-sm  ${
              changePage === "following" ? "border-b-4 border-[#772ba9]" : ""
            }`}
          >
            Following
          </span>
        </div>
        <div
          className="hover:cursor-pointer p-1"
          onClick={() => setChangePage("foryou")}
        >
          <span
            className={`font-semibold md:text-lg text-sm ${
              changePage === "foryou" ? "border-b-4 border-[#772ba9]" : ""
            }`}
          >
            For you
          </span>
        </div>
      </div>
      <div className="mt-[65px]">
        {changePage === "following" ? <Following /> : <Foryou />}
      </div>
    </div>
  );
}
export default Home;

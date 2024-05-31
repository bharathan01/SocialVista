import React, { useState } from "react";
import Post from "../../components/shared/posts/Post";
import Following from "../following/Follow";
import Foryou from "../foryou/Foryou";

function Home() {
  const [changePage, setChangePage] = useState("following");
  console.log(changePage);

  return (
    <div className="w-full min-h-screen overflow-y-auto p-2">
      <div className="flex justify-around items-center p-4 fixed top-[65px] bg-black xl:w-[60%] md:w-[49%] w-[80%]">
        <div
          className="hover:cursor-pointer p-1"
          onClick={() => setChangePage("following")}
        >
          <span
            className={`font-semibold text-lg ${
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
            className={`font-semibold text-lg ${
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

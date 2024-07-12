import React, { useState } from "react";
import {
  CreatePost,
  LogOutConfirm,
  Following,
  ForYouFeed,
  UpdatePost,
} from "../../components";

function Home() {
  const [changePage, setChangePage] = useState("following");
  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
      <div className=" min-h-screen overflow-y-auto p-2 xl:w-[71%] lg:w-[62%] md:w-[57%] ">
        <div className="flex justify-around items-center p-4 fixed top-[64px] bg-black xl:w-[60%] lg:w-[49%] md:w-[53%] w-[90%] z-10">
          <div
            className="hover:cursor-pointer p-1"
            onClick={() => setChangePage("following")}
          >
            <span
              className={`font-semibold md:text-lg text-sm  ${
                changePage === "following" ? "border-b-4 border-[#772ba9]" : ""
              }`}
            >
              For you
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
              Following
            </span>
          </div>
        </div>
        <div className="mt-[65px]">
          {changePage === "following" ? <ForYouFeed /> : <Following />}
        </div>
        <dialog id="openCreatePostcard" className="modal">
          <div className="modal-box md:w-[550px] w-[300px]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <CreatePost />
          </div>
        </dialog>
        <dialog id="openLogOutcard" className="modal">
          <div className="modal-box flex items-center justify-center">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <LogOutConfirm />
          </div>
        </dialog>
      </div>
    </div>
  );
}
export default Home;

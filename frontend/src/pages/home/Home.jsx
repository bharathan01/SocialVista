import React, { useContext, useEffect, useMemo, useState } from "react";
import Following from "../following/Follow";
import Foryou from "../foryou/Foryou";
import { CreateNewPostContext } from "../../hooks/contexts/createpost/CreatePost";
import{CreatePost} from "../../components"

function Home() {
  const [changePage, setChangePage] = useState("following");
  const { isCreatePostOpen } = useContext(CreateNewPostContext);

  const openCreatePostModel = () => {
    document.getElementById("my_modal_3")?.showModal();
  };
 
  useMemo(()=>{
    openCreatePostModel();
  },[isCreatePostOpen])

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
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box md:w-[550px] w-[300px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <CreatePost/>
        </div>
      </dialog>
    </div>
  );
}
export default Home;

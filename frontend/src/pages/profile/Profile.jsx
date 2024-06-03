import React from "react";
import { Link } from "react-router-dom";

import cover from "../../../public/images/cover.png";
import avathar from "../../../public/images/avatar-placeholder.png";
import { useState } from "react";
import OriginalPost from "../post/originalPost/OriginalPost";
import LikedPost from "../post/likedPost/LikedPost";
import {UpdateProfile} from "../../components"

function Profile() {
  const isUser = true;
  const [isSelectedPage, setSelectedPage] = useState("posts");

  return (
    <div className="min-h-screen overflow-y-auto xl:w-[71%] lg:w-[62%] md:w-[57%] ">
      <div className="flex w-full flex-col">
        <div className="w-full relative">
          <div className="w-full sm:h-[250px] h-[180px] object-cover">
            <img
              src={cover}
              alt=""
              className="w-full sm:h-[250px] h-[180px] object-cover"
            />
          </div>
          <div className="sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] absolute  sm:top-[170px] top-[130px] sm:left-[40px] left-[20px]  border-[8px] rounded-2xl flex items-center justify-center border-black">
            <img
              src={avathar}
              alt=""
              className="sm:w-[134px] sm:h-[134px] w-[84px] h-[84px] object-cover rounded-lg"
            />
          </div>
          <div className="w-full">
            <div className="w-full flex items-center justify-end p-3">
              {isUser ? (
                <div className="w-[120px] p-2 border-2 border-white rounded-full text-center" onClick={()=>document.getElementById('my_modal_3').showModal()}>
                  <span>Edit Profile</span>
                </div>
              ) : (
                <div className="md:w-[100px] w-[80px] bg-white md:p-2  rounded-full text-center">
                  <span className="text-black">Follow</span>
                </div>
              )}
            </div>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box md:w-[550px] w-[300px]">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                  <UpdateProfile/>
              </div>
            </dialog>
            <div className="w-full flex flex-col gap-1 mt-[10px]">
              <div className="sm:ml-[50px] ml-[30px] flex flex-col gap-1 ">
                <div>
                  <span className="text-lg font-bold">Bharathan Dileep</span>
                </div>
                <div>
                  <span className="text-base opacity-70">@bharathan</span>
                </div>
              </div>
              <div className="sm:ml-[50px] ml-[30px]">
                <span className="lg:text-base text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dicta, ullam! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. At, quibusdam! Modi, vero veritatis dolor
                  earum placeat aperiam tempore reprehenderit. Consequuntur
                  ducimus sequi, nam commodi accusamus id, molestias labore eum
                  officia laborum deleniti dicta! Molestiae, ipsa soluta sed hic
                  saepe accusantium officia eum ea, possimus pariatur sint
                  reprehenderit corrupti itaque quae.
                </span>
              </div>
            </div>
            <div className="flex mt-4 sm:ml-[50px] ml-[30px] gap-3 ">
              <div>
                <span className="font-bold text-lg">200 </span>
                <span className="opacity-55"> followers</span>
              </div>
              <Link>
                <div>
                  <span className="font-bold text-lg">159</span>
                  <span className="opacity-55"> following</span>
                </div>
              </Link>
              <div>
                <span className="font-bold text-lg">20 </span>
                <span className="opacity-55"> Posts</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 p-2 flex items-center justify-around border-b-2">
          <div
            className={`w-[50%] text-center p-2 
            ${isSelectedPage === "posts" ? "bg-gray-900" : ""}`}
            onClick={() => setSelectedPage("posts")}
          >
            <span>Posts</span>
          </div>
          <div
            className={`w-[50%]  text-center p-2 
            ${isSelectedPage === "likedpost" ? "bg-gray-900" : ""}`}
            onClick={() => setSelectedPage("likedpost")}
          >
            <span>Liked Post</span>
          </div>
        </div>
        <div className="m-3 mt-5">
          {isSelectedPage === "posts" ? <OriginalPost /> : <LikedPost />}
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";

import profileImage from "../../../../public/images/avatar-placeholder.png";
import demo from "../../../../public/images/demo.jpg";
import Comments from "./comments";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";

function Post({posts}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCommentOpen, setCommentOpen] = useState(false);
  const {img,user,comments,likes,text} = posts
  useEffect(()=>{
    
  },[])
  return (
    <div className="flex flex-row w-full justify-center ">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="flex justify-center items-center rounded-full md:w-[40px] md:h-[40px] w-[30px] h-[30px]">
              {
                user.profileImg ?  <img src={user.profileImg} alt="" />: <img src={profileImage} alt="" />
              }
            </div>
            <div className="text-lg">{user.username}</div>
          </div>
          <div className="">
            <div>
              <div
                tabIndex={0}
                role="button"
                className="flex flex-col justify-center items-center w-[40px] h-[40px] rounded-sm hover:cursor-pointer hover:bg-gray-900 p-1 gap-1"
                onClick={() => setMenuOpen(!isMenuOpen)}
              >
                <span className="w-[3px] h-[3px] bg-white"></span>
                <span className="w-[3px] h-[3px] bg-white"></span>
                <span className="w-[3px] h-[3px] bg-white"></span>
              </div>
            </div>
            {isMenuOpen && (
              <div className="w-[130px] xl:right-[28%] lg:right-[34%] sm:right-[46%] right-[13%] bg-gray-900 absolute flex flex-col items-center rounded-md">
                <ul className="flex flex-col gap-2 w-full text-center">
                  <li className="p-2 hover:bg-gray-800 w-full">Share</li>
                  <li className="p-2 hover:bg-gray-800 w-full">Update</li>
                  <li className="p-2 hover:bg-gray-800 w-full text-red-700">Delete</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 rounded-lg">
          <img src={img}alt="" />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center p-2">
            <span className="md:text-sm text-xs">
              {
                text
              }
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-4">
            <div className="flex flex-col w-10 h-12 justify-start items-center">
              <span className="md:text-2xl text-lg">
                <FaRegHeart />
              </span>
              <span>20</span>
            </div>
            <div
              className="flex flex-col w-10 h-12 justify-start items-center"
              onClick={() => setCommentOpen(!isCommentOpen)}
            >
              <span className="md:text-2xl text-lg">
                <FaRegCommentAlt />
              </span>
              <span>2</span>
            </div>
            <div className="flex flex-col w-10 h-12 justify-start items-center">
              <span className="md:text-2xl text-lg">
                <FiSend />
              </span>
            </div>
          </div>
          <div className="flex flex-col w-10 h-12 justify-start items-center">
            <span className="md:text-2xl text-lg">
              <FaRegBookmark />
            </span>
          </div>
        </div>
        {isCommentOpen && (
          <div className="w-full bg-gray-900 rounded-lg flex flex-col p-4 gap-5">
            <div className="flex gap-2 items-center justify-between">
              <div className="w-[40px] h-[40px] min-w-[40px] rounded-full ">
                <img src={profileImage} alt="profile" />
              </div>
              <div className="flex w-[94%] justify-between relative items-center rounded-full">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="comment here..."
                    className="h-[40px] w-full p-4 outline-none"
                  />
                </div>
                <div className="absolute right-0 md:h-[40px] md:w-[40px]  h-[30px] w-[30px] rounded-full bg-[#772ba9] md:text-2xl text-lg flex items-center justify-center hover:cursor-pointer">
                  <VscSend />
                </div>
              </div>
            </div>
            <div>
              <Comments />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;

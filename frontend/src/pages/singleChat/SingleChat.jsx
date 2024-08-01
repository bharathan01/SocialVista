import React from "react";
import avatar from "../../../public/images/avatar-placeholder.png";
import { BsEmojiSmile, BsTelephone } from "react-icons/bs";
import { PiVideoCamera } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import { ChatProfile, ChatProfileUser } from "../../components";
import { VscSend } from "react-icons/vsc";
function SingleChat() {
  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
      <div className="overflow-y-auto xl:w-[71%] lg:w-[61%] md:w-[57%] ">
        <div>
          <div className="xl:w-[61%] lg:w-[50%] md:w-[53%] w-[86%] h-16 border-b-[1px] border-gray-900 flex items-center justify-between px-4 fixed z-10 bg-black">
            <div className="flex items-center gap-3 hover:cursor-pointer">
              <div className="w-11 h-11 rounded-full">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-xl">Username</span>
                <div className="text-green-500 flex items-center gap-1 text-sm font-normal">
                  <FaCircle />
                  Online
                </div>{" "}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xl hover:cursor-pointer">
                <BsTelephone />
              </div>
              <div className="text-2xl hover:cursor-pointer">
                <PiVideoCamera />
              </div>
            </div>
          </div>
          <div className="absolute bottom-16 xl:w-[60%] lg:w-[50%] md:w-[53%] h-screen w-[86%] mr-4 ml-2">
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
            <ChatProfile />
          </div>
          <div className="fixed bottom-0 xl:w-[61%] lg:w-[50%] md:w-[53%] w-[86%] h-16 flex items-center justify-center bg-gray-900">
            <div className="flex w-[94%] justify-between relative items-center rounded-full">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="type here..."
                  className="h-[40px] w-full p-4 outline-none"
                  name="comment"
                  id="comment"
                />
              </div>
              <div className="absolute right-12 rounded-full md:text-2xl text-lg flex items-center justify-center hover:cursor-pointer">
                <BsEmojiSmile />
              </div>
              <div className="absolute right-0 md:h-[40px] md:w-[40px]  h-[30px] w-[30px] rounded-full bg-[#772ba9] md:text-2xl text-lg flex items-center justify-center hover:cursor-pointer">
                <VscSend />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleChat;

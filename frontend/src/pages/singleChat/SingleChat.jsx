import React, { useEffect, useState } from "react";
import avatar from "../../../public/images/avatar-placeholder.png";
import { BsEmojiSmile, BsTelephone } from "react-icons/bs";
import { PiVideoCamera } from "react-icons/pi";
import { FaCircle, FaSadCry } from "react-icons/fa";
import { ChatProfile, ChatProfileUser } from "../../components";
import { VscSend } from "react-icons/vsc";
import {
  getUsersChatData,
  sendNewMessage,
} from "../../service/api/messsage/message";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EmojiPicker from "../../components/shared/emoji/EmojiPicker";
import useChat from "../../hooks/message/useChat";

function SingleChat() {
  const [userChats, setChats] = useState();
  const [receiverInfo, setReceiverInfo] = useState();
  const [isAlreadyChated, setAlreadyChated] = useState(false);
  const [chatId, setChatid] = useState();
  const { userInfo } = useSelector((state) => state.userAuth);
  const [openEmoji, setOpenEmoji] = useState(false);
  const { messages, sendNewUserMessage } = useChat(chatId);
  const loggedInUserId = userInfo.id;
  const { id } = useParams();

  const filterConversations = (conversation, loggedInUserId) => {
    return conversation.map((conversation) => {
      const otherParticipants = conversation.conversation.participants.filter(
        (participant) => participant._id !== loggedInUserId
      );
      return {
        participants: otherParticipants,
      };
    });
  };

  const getOneToOneChat = async () => {
    const responce = await getUsersChatData(id);
    if (responce.status !== "SUCCESS") {
    }
    if (responce.status === "EMPTY") {
      setAlreadyChated(false);
      setReceiverInfo(responce?.recieverInfo);
    }
    setChatid(responce.messages[0].conversation._id);
    setAlreadyChated(true);
    setChats(responce.messages);
    const receiver = filterConversations(responce?.messages, loggedInUserId);
    setReceiverInfo(receiver[0].participants[0]);
  };
  const sendMessage = async () => {
    const message = document.getElementById("message").value;

    const formData = new FormData();
    if (!message) {
    }
    sendNewUserMessage(loggedInUserId, message);
    setChats((prevChat) => [...prevChat, messages]);
    formData.append("content", message);
    formData.append("receiverId", receiverInfo?._id);
    const responce = await sendNewMessage(formData);
    if (responce.status !== "SUCCESS") {
    }

    document.getElementById("message").value = "";
  };
  const onEmojiSelect = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    document.getElementById("message").value += emoji;
  };

  useEffect(() => {
    getOneToOneChat();
  }, []);

  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
      <div className="overflow-y-auto xl:w-[71%] lg:w-[61%] md:w-[57%] ">
        <div>
          <div className="xl:w-[61%] lg:w-[50%] md:w-[53%] w-[86%] h-16 border-b-[1px] border-gray-900 flex items-center justify-between px-4 fixed z-10 bg-black">
            <Link to={`/profile/${receiverInfo?._id}`}>
              <div className="flex items-center gap-3 hover:cursor-pointer">
                <div className="w-11 h-11 rounded-full">
                  {receiverInfo?.profileImg ? (
                    <>
                      <img
                        src={receiverInfo?.profileImg}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-xl">
                    {receiverInfo?.username}
                  </span>
                  <div className="text-green-500 flex items-center gap-1 text-sm font-normal">
                    <FaCircle />
                    Online
                  </div>{" "}
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-xl hover:cursor-pointer">
                <BsTelephone />
              </div>
              <div className="text-2xl hover:cursor-pointer">
                <PiVideoCamera />
              </div>
            </div>
          </div>
          <div className="absolute h-screen bottom-16 xl:w-[60%] lg:w-[50%] md:w-[53%] w-[86%] mr-4 ml-2">
            {isAlreadyChated &&
              userChats?.map((message) => {
                return (
                  <ChatProfile
                    key={message._id}
                    profileImg={receiverInfo?.profileImg}
                    message={message?.content}
                    sender={message?.sender?._id}
                  />
                );
              })}
          </div>
          {openEmoji && (
            <div
              className="absolute z-10 lg:right-[24rem] lg:mt-12 bottom-[2.5rem] md:right-[25rem] md:mt-12 xl:right-[29rem] xl:mt-4 right-12 mt-[3rem]"
              onClick={() => !setOpenEmoji}
            >
              <EmojiPicker onEmojiSelect={onEmojiSelect} />
            </div>
          )}
          <div className="fixed bottom-0 xl:w-[61%] lg:w-[50%] md:w-[53%] w-[86%] h-16 flex items-center justify-center bg-gray-900">
            <div className="flex w-[94%] justify-between relative items-center rounded-full">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="type here..."
                  className="h-[40px] w-full p-4 outline-none"
                  name="message"
                  id="message"
                />
              </div>

              <div className="absolute right-12 rounded-full md:text-2xl text-lg flex items-center justify-center hover:cursor-pointer">
                <BsEmojiSmile onClick={() => setOpenEmoji(!openEmoji)} />
              </div>

              <div
                className="absolute right-0 md:h-[40px] md:w-[40px]  h-[30px] w-[30px] rounded-full bg-[#772ba9] md:text-2xl text-lg flex items-center justify-center hover:cursor-pointer"
                onClick={sendMessage}
              >
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

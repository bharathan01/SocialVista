import React, { useEffect, useState } from "react";

import profileImage from "../../../../public/images/avatar-placeholder.png";
import Comments from "./comments";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import Spinner from "../../common/loader/SpinnerLoader";
import {
  commentPost,
  likeUnlikePost,
} from "../../../service/api/userController/userActivity";
import { useSelector } from "react-redux";

function Post({ posts }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [isUserLiked, setUserLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(false);
  const [isCommentSuccess, setCommentSuccess] = useState(false);
  const [commenttLoader, setCommentLoader] = useState(false);

  const { userInfo } = useSelector((state) => state.userAuth);
  const { img, user, comments, likes, text, _id } = posts;

  const likeApost = async () => {
    const response = await likeUnlikePost(_id);
    isUserLiked
      ? setLikeCount((prev) => prev - 1)
      : setLikeCount((prev) => prev + 1);
    setUserLiked((prev) => !prev);
  };
  const addNewComment = (commentContent) => {
    const newComment = {
      text: commentContent,
      user: {
        username: userInfo.username,
        profileImg: userInfo.profileImg,
      },
    };
    comments.push(newComment);
  };
  const commentOnThePost = async () => {
    setCommentLoader(true);
    const commentContent = document.getElementById("comment").value;
    const response = await commentPost(_id, { content: commentContent });
    if (response.status === "SUCCESS") {
      document.getElementById("comment").value = "";
      addNewComment(commentContent);
      setCommentSuccess(true);
      setCommentLoader(false);
    }
    setCommentLoader(false);
  };
  useEffect(() => {
    setUserLiked(likes.includes(userInfo.id));
    setLikeCount(likes.length);
  }, []);
  return (
    <div className="flex flex-row w-full justify-center ">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="flex justify-center items-center rounded-full md:w-[40px] md:h-[40px] w-[30px] h-[30px]">
              {user.profileImg ? (
                <img src={user.profileImg} alt="" />
              ) : (
                <img src={profileImage} alt="" />
              )}
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
                  <li className="p-2 hover:bg-gray-800 w-full text-red-700">
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 rounded-lg flex items-center justify-center">
          {img && <img src={img} alt="" className="w-[500px] h-[500px]" />}
        </div>
        <div className="flex items-center">
          <div className="flex items-center p-2">
            <span className="md:text-lg text-xs">{text}</span>
          </div>
        </div>
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-4">
            <div className="flex flex-col w-10 h-12 justify-start items-center">
              <span className="md:text-2xl text-lg hover:cursor-pointer">
                {isUserLiked ? (
                  <FaHeart className="text-red-600" onClick={likeApost} />
                ) : (
                  <FaRegHeart onClick={likeApost} />
                )}
              </span>
              <span>{likeCount}</span>
            </div>
            <div
              className="flex flex-col w-10 h-12 justify-start items-center"
              onClick={() => setCommentOpen(!isCommentOpen)}
            >
              <span className="md:text-2xl text-lg">
                <FaRegCommentAlt className="hover:cursor-pointer" />
              </span>
              <span>{comments.length}</span>
            </div>
            <div className="flex flex-col w-10 h-12 justify-start items-center">
              <span className="md:text-2xl text-lg">
                <FiSend className="hover:cursor-pointer" />
              </span>
            </div>
          </div>
          <div className="flex flex-col w-10 h-12 justify-start items-center">
            <span className="md:text-2xl text-lg">
              <FaRegBookmark className="hover:cursor-pointer" />
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
                    name="comment"
                    id="comment"
                  />
                </div>
                <div
                  className="absolute right-0 md:h-[40px] md:w-[40px]  h-[30px] w-[30px] rounded-full bg-[#772ba9] md:text-2xl text-lg flex items-center justify-center hover:cursor-pointer"
                  onClick={commentOnThePost}
                >
                  {commenttLoader ? <Spinner /> : <VscSend />}
                </div>
              </div>
            </div>
            <div>
              <Comments
                comments={comments}
                isCommentSuccess={isCommentSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;

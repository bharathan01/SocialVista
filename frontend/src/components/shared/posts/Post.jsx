import React, { useContext, useEffect, useRef, useState } from "react";

import profileImage from "../../../../public/images/avatar-placeholder.png";
import Comments from "./comments";
import { FaHeart, FaPlus } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { FiPlus, FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import Spinner from "../../common/loader/SpinnerLoader";
import {
  commentPost,
  deletePost,
  likeUnlikePost,
} from "../../../service/api/userController/userActivity";
import { useSelector } from "react-redux";
import { CreateNewPostContext } from "../../../hooks/contexts/createpost/CreatePost";
import UpdatePost from "./UpdatePost";
import { Link } from "react-router-dom";
import { followUnfollow } from "../../../service/api/userProfileController/userProfile";
import { relativeTimeString } from "../../../utils/date/DateAndTime";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "../emoji/EmojiPicker";

function Post({ posts, onDelete, currentUser }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [isUserLiked, setUserLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(false);
  const [isCommentSuccess, setCommentSuccess] = useState(false);
  const [commenttLoader, setCommentLoader] = useState(false);
  const [isUpdateToggled, setUpdatetogggle] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const dialogRef = useRef(null);
  const { reloadHomeComponent } = useContext(CreateNewPostContext);
  const [isUserFollowing, setUserFollowing] = useState();
  const [postDate, setPostDate] = useState(
    relativeTimeString(posts?.createdAt)
  );

  const { userInfo } = useSelector((state) => state.userAuth);
  const { img, user, comments, likes, text, _id } = posts;
  const { toggleUpdatePostCard } = useContext(CreateNewPostContext);

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
  const deletePosthandler = async () => {
    const responce = await deletePost(_id);
    responce.status === "SUCCESS" ? onDelete() : "";
    onDelete();
  };
  const updatePosthandler = () => {
    setUpdatetogggle(true);
    toggleUpdatePostCard("openUpdatePostcard");
  };
  const clearUpdatePostData = () => {
    setUpdatetogggle(false);
  };
  const closeUpdateModel = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      reloadHomeComponent();
    }
  };
  const userFollow = async () => {
    setUserFollowing(!isUserFollowing);
    const responce = await followUnfollow(user._id);
    if (responce.status !== "SUCCESS") {
    }
  };
  const onEmojiSelect = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    document.getElementById("comment").value += emoji;
  };

  useEffect(() => {
    setUserFollowing(currentUser?.following.includes(user._id));
    setUserLiked(likes.includes(userInfo.id));
    setLikeCount(likes.length);
  }, []);
  return (
    <div className="flex flex-row w-full justify-center bg-gray-900 rounded-lg ">
      {isUpdateToggled && (
        <dialog id="openUpdatePostcard" className="modal" ref={dialogRef}>
          <div className="modal-box flex items-center justify-center">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={clearUpdatePostData}
              >
                ✕
              </button>
            </form>
            <UpdatePost
              updatePostData={posts}
              onCloseUpdateModel={closeUpdateModel}
            />
          </div>
        </dialog>
      )}
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between p-3">
          <Link to={`profile/${user._id}`}>
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center rounded-full md:w-[40px] md:h-[40px] w-[30px] h-[30px]">
                {user.profileImg ? (
                  <img
                    src={user.profileImg}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img src={profileImage} alt="" />
                )}
              </div>
              <div className="md:text-lg  text-base">{user.username}</div>
            </div>
          </Link>
          <div className="flex">
            {currentUser._id !== user._id ? (
              <>
                {isUserFollowing ? (
                  <>
                    <div className="h-[40px] flex items-center justify-center gap-1 text-[#772ba9] text-lg font-semibold">
                      <span
                        className="text-lg font-semibold hover:cursor-pointer"
                        onClick={userFollow}
                      >
                        Following{" "}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center md:gap-1 text-[#772ba9] text-lg font-semibold">
                      <span
                        className="md:text-lg text-base font-semibold hover:cursor-pointer"
                        onClick={userFollow}
                      >
                        Follow{" "}
                      </span>
                      <FiPlus />
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
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
                  <li className="p-2 hover:bg-gray-800 w-full hover:cursor-pointer">
                    Share
                  </li>
                  {userInfo.id === user._id ? (
                    <>
                      <li
                        className="p-2 hover:bg-gray-800 w-full hover:cursor-pointer"
                        onClick={updatePosthandler}
                      >
                        Update
                      </li>
                      <li
                        className="p-2 hover:bg-gray-800 w-full text-red-700 hover:cursor-pointer"
                        onClick={deletePosthandler}
                      >
                        Delete
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className=" rounded-lg flex items-center justify-center">
          {img && (
            <img
              src={img}
              alt=""
              className="lg:w-[500px]  max-w-[500px]  object-contain"
            />
          )}
        </div>
        <div className="flex items-center">
          <div className="flex items-center pl-4">
            <span className="md:text-lg text-sm">{text}</span>
          </div>
        </div>
        <div className="pl-4 opacity-65 md:text-base text-[12px]">
          {postDate}
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
                    className="h-[40px] w-full p-4 outline-none text-[10px]"
                    name="comment"
                    id="comment"
                    
                  />
                </div>

                <div
                  className="absolute right-12 rounded-full md:text-2xl text-lg flex items-center justify-center hover:cursor-pointer"
                  onClick={() => setOpenEmoji(!openEmoji)}
                >
                  <BsEmojiSmile />
                </div>

                <div
                  className="absolute right-0 md:h-[40px] md:w-[40px]  h-[30px] w-[30px] rounded-full bg-[#772ba9] md:text-2xl text-lg flex items-center justify-center hover:cursor-pointer"
                  onClick={commentOnThePost}
                >
                  {commenttLoader ? <Spinner /> : <VscSend />}
                </div>
              </div>
            </div>
            {openEmoji && (
              <div className="absolute lg:right-[25rem] lg:mt-12 md:right-[25rem] md:mt-12 xl:right-[29rem] xl:mt-4 right-0 mt-[3rem]">
                <EmojiPicker onEmojiSelect={onEmojiSelect} />
              </div>
            )}
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

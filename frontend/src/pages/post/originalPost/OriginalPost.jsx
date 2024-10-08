import React, { useEffect, useState } from "react";
import { Post } from "../../../components";
import { getCurrentUser, getUserOwnPost } from "../../../service/api/userProfileController/userProfile";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
function OriginalPost({ origanlPostsNo, userId }) {
  const [isError, setError] = useState(false);
  const [postData, setPostDate] = useState();
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const getUserOwnPosts = async () => {
    const responce = await getUserOwnPost(userId);
    if (Response.status !== "SUCCESS") setError(true);
    setPostDate(responce.postInfo);
    origanlPostsNo(responce.postInfo.length);
  };
  const getCurrentUserInfo = async () => {
    const responce = await getCurrentUser();
    setCurrentUserInfo(responce.data);
  };
  useEffect(() => {
    getCurrentUserInfo();
    getUserOwnPosts();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      {postData?.length !== 0 ? (
        <>
          {postData?.map((post, index) => {
            return (
              <Post posts={post} key={index} currentUser={currentUserInfo} />
            );
          })}
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center mt-10 gap-5 opacity-50">
          <MdOutlineAddPhotoAlternate className="text-8xl" />
          <span>No Posts</span>
        </div>
      )}
    </div>
  );
}

export default OriginalPost;

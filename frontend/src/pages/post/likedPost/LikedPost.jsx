import React, { useEffect, useState } from "react";
import { Post } from "../../../components";
import { getUserLikesPosts } from "../../../service/api/userProfileController/userProfile";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
function LikedPost({ userId }) {
  const [isError, setError] = useState(false);
  const [likedPosts, setLikedPosts] = useState();
  const getLikedPosts = async () => {
    const responce = await getUserLikesPosts(userId);
    if (responce.status !== "SUCCESS") setError(true);
    setLikedPosts(responce.likedPosts);
  };
  useEffect(() => {
    getLikedPosts();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      {likedPosts?.length !== 0 ? (
        <>
          {likedPosts?.map((post, index) => {
            return <Post posts={post} key={index} />;
          })}
        </>
      ) : (
        <>
          <div className="w-full flex flex-col justify-center items-center mt-10 gap-5 opacity-50">
            <MdOutlineAddPhotoAlternate className="text-8xl" />
            <span>No Posts</span>
          </div>
        </>
      )}
    </div>
  );
}
export default LikedPost;

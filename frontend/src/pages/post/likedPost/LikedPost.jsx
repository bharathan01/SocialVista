import React, { useEffect, useState } from "react";
import { Post } from "../../../components";
import { getUserLikesPosts } from "../../../service/api/userProfileController/userProfile";
function LikedPost() {
  const [isError, setError] = useState(false);
  const [likedPosts, setLikedPosts] = useState();
  const getLikedPosts = async () => {
    const responce = await getUserLikesPosts();
    if (responce.status !== "SUCCESS") setError(true);
    setLikedPosts(responce.likedPosts);
  };
  useEffect(() => {
    getLikedPosts();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      {likedPosts?.map((post, index) => {
        return <Post posts={post} key={index} />;
      })}
    </div>
  );
}
export default LikedPost;

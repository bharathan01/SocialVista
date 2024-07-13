import React, { useEffect, useState } from "react";
import { Post } from "../../../components";
import { getUserOwnPost } from "../../../service/api/userProfileController/userProfile";
function OriginalPost({ origanlPostsNo }) {
  const [isError, setError] = useState(false);
  const [postData, setPostDate] = useState();
  const getUserOwnPosts = async () => {
    const responce = await getUserOwnPost();
    if (Response.status !== "SUCCESS") setError(true);
    setPostDate(responce.postInfo);
    origanlPostsNo(responce.postInfo.length);
  };
  useEffect(() => {
    getUserOwnPosts();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      {postData?.map((post, index) => {
        return <Post posts={post} key={index} />;
      })}
    </div>
  );
}

export default OriginalPost;

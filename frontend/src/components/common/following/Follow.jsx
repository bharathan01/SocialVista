import React, { useEffect } from "react";
import Post from "../../shared/posts/Post";
import { getFollowingPost } from "../../../service/api/userController/userActivity";

function Following() {
  const getFollowingUsersPost = async () => {
    const responce = await getFollowingPost();
  };
  useEffect(() => {
    getFollowingUsersPost();
  }, []);
  return (
    <div className="flex flex-col gap-10">
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Following;

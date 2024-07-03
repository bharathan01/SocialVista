import React, { useEffect, useState } from "react";
import Post from "../../shared/posts/Post";
import { getFollowingPost } from "../../../service/api/userController/userActivity";
import PostLoader from "../loader/PostLoader";
import Spinner from "../loader/SpinnerLoader";

function Following() {
  const [followersPost, setFollowersPost] = useState([]);
  const [loader, setLoader] = useState(false);
  const getFollowingUsersPost = async () => {
    const responce = await getFollowingPost();
    if (responce.status !== "SUCCESS") setLoader(false);
    setFollowersPost(responce.followingUserPost);
  };
  useEffect(() => {
    setLoader(true);
    getFollowingUsersPost();
    setLoader(false);
  }, []);
  return (
    <div className="flex flex-col gap-10">
      {loader ? (
        <div >
          <PostLoader />
          <div className="w-full flex items-center justify-center mt-3">
            <Spinner />
          </div>
        </div>
      ) : (
        followersPost.map((post,index) =>{
          return(
            <React.Fragment key={index}>
              <Post posts={post}/>
            </React.Fragment>
          )
        })
      )}
    </div>
  );
}

export default Following;

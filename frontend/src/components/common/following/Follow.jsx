import React, { useEffect, useState } from "react";
import Post from "../../shared/posts/Post";
import { getFollowingPost } from "../../../service/api/userController/userActivity";
import PostLoader from "../loader/PostLoader";
import Spinner from "../loader/SpinnerLoader";
import ReloadPage from "../reloadPage/ReloadPage";

function Following() {
  const [followersPost, setFollowersPost] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isReloadPage, setReloadPage] = useState(false);
  const [isCommentedLoader, setIsCommentedLoader] = useState(false);

  const getFollowingUsersPost = async () => {
    setLoader(true);
    try {
      const response = await getFollowingPost();
      if (response.status === "SUCCESS") {
        setFollowersPost(response.followingUserPost);
      } else {
        setReloadPage(true);
      }
    } catch (error) {
      setReloadPage(true);
    } finally {
      setLoader(false);
    }
  };
  const handleComment = () => {
    setIsCommentedLoader(true);
  };

  useEffect(() => {
    getFollowingUsersPost();
  }, [isCommentedLoader]);

  return (
    <div className="flex flex-col gap-10">
      {isReloadPage ? (
        <ReloadPage />
      ) : loader ? (
        <div>
          <PostLoader />
          <div className="w-full flex items-center justify-center mt-3">
            <Spinner />
          </div>
        </div>
      ) : followersPost.length === 0 ? (
        <div className="flex items-center justify-center mt-10">
          <span className="font-semibold opacity-55">
            No posts are available
          </span>
        </div>
      ) : (
        followersPost.map((post, index) => (
          <React.Fragment key={index}>
            <Post posts={post} onComment={handleComment} />
          </React.Fragment>
        ))
      )}
    </div>
  );
}

export default Following;

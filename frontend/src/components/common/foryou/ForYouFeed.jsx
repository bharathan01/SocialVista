import React, { useEffect, useState } from "react";
import Post from "../../shared/posts/Post";
import PostLoader from "../loader/PostLoader";
import ReloadPage from "../reloadPage/ReloadPage";
import { getForYouPost } from "../../../service/api/userController/userActivity";
import Spinner from "../loader/SpinnerLoader";

function ForYouFeed() {
  const [forYouPost, setforYouPost] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isReloadPage, setReloadPage] = useState(false);

  const getForYouUsersPost = async () => {
    setLoader(true);
    try {
      const response = await getForYouPost();
      if (response.status === "SUCCESS") {
        setforYouPost(response.allPost);
      } else {
        setReloadPage(true);
      }
    } catch (error) {
      setReloadPage(true);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getForYouUsersPost();
  }, []);
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
      ) : forYouPost.length === 0 ? (
        <div className="flex items-center justify-center mt-10">
          <span className="font-semibold opacity-55">
            No posts are available
          </span>
        </div>
      ) : (
        forYouPost.map((post, index) => (
          <React.Fragment key={index}>
            <Post posts={post} />
          </React.Fragment>
        ))
      )}
    </div>
  );
}

export default ForYouFeed;

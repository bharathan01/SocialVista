import React, { useEffect, useState } from "react";
import { PostCard } from "../../components";
import { getForYouPost } from "../../service/api/userController/userActivity";
import FeedsLoader from "../../components/common/loader/FeedsLoader";

function Explore() {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const getForYouUsersPost = async () => {
    setLoading(true);
    const response = await getForYouPost();
    if (response.status === "SUCCESS") {
      setLoading(false)
      const postData = response.allPost.filter((data) => {
        return data?.img;
      });
      setPost(postData);
    }
    setLoading(false)
  };
  useEffect(() => {
    getForYouUsersPost();
  }, []);
  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
      {loading ? (
        <div className="xl:w-[71%] lg:w-[62%] md:w-[57%] p-4">
          <FeedsLoader />
        </div>
      ) : (
        <div className="overflow-y-auto xl:w-[71%] lg:w-[62%] md:w-[57%] flex justify-center">
          <div className="flex w-full h-full flex-wrap justify-center gap-1 mt-5">
            {post?.length > 0 ? (
              post?.map((posts) => {
                return <PostCard key={posts?._id} posts={posts} />;
              })
            ) : (
              <>No Feeds</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;

import React, { useEffect, useState } from "react";
import { PostCard } from "../../components";
import { getForYouPost } from "../../service/api/userController/userActivity";

function Explore() {
  const [post, setPost] = useState();
  const getForYouUsersPost = async () => {
    // setLoader(true);
    const response = await getForYouPost();
    if (response.status === "SUCCESS") {
      const postData = response.allPost.filter((data) => {
        return data?.img;
      });
      setPost(postData);
    }
  };
  useEffect(() => {
    getForYouUsersPost();
  }, []);
  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
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
    </div>
  );
}

export default Explore;

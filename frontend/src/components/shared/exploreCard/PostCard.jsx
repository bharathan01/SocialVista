import React from "react";
import { Link } from "react-router-dom";

function PostCard({ posts }) {
  return (
    <div className="xl:w-56 xl:h-56 lg:w-56 lg:h-56 md:w-36 md:h-36  bg-white hover:cursor-pointer relative overflow-hidden">
      <Link to={`/profile/${posts.user._id}`}>
        <div className="w-full h-full">
          <img src={posts?.img} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute bottom-4 left-2 flex items-center gap-2 bg-black p-1 rounded-full">
          <div className="w-10 h-10 rounded-full border-2">
            <img
              src={posts?.user?.profileImg}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="mr-3">
            <span className="font-semibold text-base">
              {posts?.user?.username}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;

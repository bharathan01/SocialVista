import React, { useState } from "react";
import cover from "../../../../public/images/cover.png";
import avathar from "../../../../public/images/avatar-placeholder.png";
import { Link } from "react-router-dom";

function ProfileCard({ FollowingUser, follow }) {
  const [isFollowing, setFollowing] = useState(
    follow === "following" ? true : false
  );
  const followUser = async () => {
    setFollowing(!isFollowing);
    // const responce = await followUnfollow(userId);
  };
  return (
    <div className="card w-[200px] shadow-xl bg-gray-900 rounded-lg">
      <Link to={`/profile/${FollowingUser?._id}`}>
        <figure className="pt-3">
          {FollowingUser?.profileImg ? (
            <>
              <img
                src={FollowingUser?.profileImg}
                alt="Shoes"
                className="rounded-full w-16 h-16 object-cover"
              />
            </>
          ) : (
            <>
              <img
                src={avathar}
                alt="Shoes"
                className="rounded-full w-16 h-16"
              />
            </>
          )}
        </figure>
      </Link>
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="">{FollowingUser?.fullName}</h2>
        <span className="opacity-65">@{FollowingUser?.username}</span>
        <div className="card-actions pb-3 pt-2">
          <>
            {isFollowing ? (
              <>
                <div
                  className="md:w-[100px] w-[80px] border-2 md:p-2  rounded-full text-center hover:cursor-pointer"
                  onClick={followUser}
                >
                  <span>Following</span>
                </div>
              </>
            ) : (
              <>
                <div
                  className="md:w-[100px] w-[80px] bg-white md:p-2  rounded-full text-center hover:cursor-pointer"
                  onClick={followUser}
                >
                  <span className="text-black">Follow</span>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

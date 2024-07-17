import React, { useEffect, useState } from "react";
import cover from "../../../../public/images/cover.png";
import avathar from "../../../../public/images/avatar-placeholder.png";
import { Link, useParams } from "react-router-dom";
import {
  followUnfollow,
  getCurrentUser,
} from "../../../service/api/userProfileController/userProfile";


function ProfileCard({ FollowingUser, follow }) {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(follow === "following");
  const [followOrUnfollow, setFollowOrUnfollow] = useState(false);
  const [isUserAlreadyFollowing, setIsUserAlreadyFollowing] = useState(false);
  const [followBack, setFollowBack] = useState(false);
  const [currentUserIsUser, setCurrentUserIsUser] = useState(false);
  const [isCurrentUserSame, setCurrentUser] = useState(false);

  const followUser = async () => {
    setFollowOrUnfollow(!followOrUnfollow);
    await followUnfollow(FollowingUser._id);
  };

  const getUser = async () => {
    const response = await getCurrentUser();
    if (response.status !== "SUCCESS") return;

    const currentUser = response.data;
    setCurrentUserIsUser(currentUser._id === FollowingUser._id);
    setIsUserAlreadyFollowing(
      currentUser.followers.includes(FollowingUser._id)
    );
    setFollowBack(currentUser.followers.includes(FollowingUser._id));
    setFollowOrUnfollow(currentUser.following.includes(FollowingUser._id));
    setCurrentUser(currentUser._id === id);
  };

  useEffect(() => {
    getUser();
  }, []);

  const renderFollowButton = () => {
    if (currentUserIsUser) return null;

    if (isUserAlreadyFollowing) {
      return isFollowing ? (
        <div
          className={`md:w-[100px] w-[80px] md:p-2 rounded-full text-center hover:cursor-pointer ${
            followOrUnfollow ? "border-2" : "bg-white"
          }`}
          onClick={followUser}
        >
          <span className={`${followOrUnfollow ? "" : "text-black"} md:text-md text-sm`}>
            {followOrUnfollow ? "Following" : "Follow"}
          </span>
        </div>
      ) : (
        <>
          {isCurrentUserSame ? (
            <>
              <div
                className="md:w-[100px] w-[80px] bg-white md:p-2 rounded-full text-center hover:cursor-pointer"
                onClick={followUser}
              >
                <span className="text-black md:text-md text-sm">Remove</span>
              </div>
            </>
          ) : (
            <>
              <div
                className="md:w-[100px] w-[80px] bg-white md:p-2 rounded-full text-center hover:cursor-pointer"
                onClick={followUser}
              >
                <span className="text-black md:text-md text-sm">Follow Back</span>
              </div>
            </>
          )}
        </>
      );
    }

    return (
      <div
        className={`md:w-[100px] w-[80px] md:p-2 rounded-full text-center hover:cursor-pointer ${
          followOrUnfollow ? "border-2" : "bg-white"
        }`}
        onClick={followUser}
      >
        <span className={`${followOrUnfollow ? "" : "text-black"} md:text-md text-sm`}>
          {followBack ? "Follow Back" : "Following"}
        </span>
      </div>
    );
  };

  return (
    <div className="card w-[200px] shadow-xl bg-gray-900 rounded-lg">
      <Link to={`/profile/${FollowingUser._id}`}>
        <figure className="pt-3">
          <img
            src={FollowingUser.profileImg || avathar}
            alt="Profile"
            className="rounded-full w-16 h-16 object-cover"
          />
        </figure>
      </Link>
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="">{FollowingUser.fullName}</h2>
        <span className="opacity-65">@{FollowingUser.username}</span>
        <div className="card-actions pb-3 pt-2">{renderFollowButton()}</div>
      </div>
    </div>
  );
}
export default ProfileCard;

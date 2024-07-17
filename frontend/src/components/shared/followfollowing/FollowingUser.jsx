import React, { useState } from "react";
import ProfileCard from "../../common/profileCard/ProfileCard";
import { getFollowing } from "../../../service/api/features/featuresConrtroller";

function FollowingUser() {
  const [followingUser, setFollowingUser] = useState();
  const getFollowingUsers = async () => {
    const resposnce = await getFollowing();
    if (resposnce.status !== "SUCCESS") {
    }
    setFollowingUser(resposnce.data[0].following);
  };
  useState(() => {
    getFollowingUsers();
  }, []);
  return (
    <div>
      <div className=" h-[90px] p-5 flex items-center justify-center fixed xl:w-[61%] lg:w-[50%] md:w-[53%] w-[86%] mt-10">
        <label className="input input-bordered flex items-center gap-2 md:w-[60%] w-[90%]">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="mt-32 flex flex-wrap w-full gap-3 justify-center">
        {followingUser?.map((user, index) => {
          return <ProfileCard FollowingUser={user} follow={'following'} key={index} />;
        })}
      </div>
    </div>
  );
}

export default FollowingUser;

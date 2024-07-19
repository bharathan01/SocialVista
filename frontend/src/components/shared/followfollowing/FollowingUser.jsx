import React, { useState } from "react";
import ProfileCard from "../../common/profileCard/ProfileCard";
import { getFollowing } from "../../../service/api/features/featuresConrtroller";
import { useParams } from "react-router-dom";

function FollowingUser() {
  const { id } = useParams();
  const [followingUser, setFollowingUser] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const getFollowingUsers = async () => {
    const response = await getFollowing(id);
    if (response.status !== "SUCCESS") {
    }
    setFollowingUser(response.data[0].following);
    setFilteredUsers(response.data[0].following);
  };
  const onChangeSearchTerm = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredUsers(followingUser);
    } else {
      const filteredData = followingUser.filter(
        (user) =>
          user.fullName.toLowerCase().includes(term.toLowerCase()) ||
          user.username.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filteredData);
    }
  };
  useState(() => {
    getFollowingUsers();
  }, []);
  return (
    <div>
      <div className=" h-[90px] p-5 flex items-center justify-center fixed xl:w-[61%] lg:w-[50%] md:w-[53%] w-[86%] mt-10 z-10">
        <label className="input input-bordered flex items-center gap-2 md:w-[60%] w-[90%]">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={onChangeSearchTerm}
          />
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
        {followingUser?.length === 0 ? (
          <>
            <div className="text-lg font-semibold opacity-65">No following</div>
          </>
        ) : (
          <>
            {filteredUsers?.map((user, index) => {
              return (
                <ProfileCard
                  FollowingUser={user}
                  follow={"following"}
                  key={index}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default FollowingUser;

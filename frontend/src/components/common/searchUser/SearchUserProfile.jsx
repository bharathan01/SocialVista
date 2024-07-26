import React from "react";
import avathar from "../../../../public/images/avatar-placeholder.png";
import { Link } from "react-router-dom";
function SearchUserProfile({ user }) {
  return (
    <div className="card w-[200px] shadow-xl bg-gray-900 rounded-lg pb-3">
      <Link to={`/profile/${user?._id}`}>
      <figure className="pt-3">
        {user?.profileImg ? (
          <>
            <img
              src={user?.profileImg}
              alt="Shoes"
              className="rounded-full w-16 h-16 object-cover"
            />
          </>
        ) : (
          <>
            <img src={avathar} alt="Shoes" className="rounded-full w-16 h-16" />
          </>
        )}
      </figure>
      </Link>
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="">{user?.fullName}</h2>
        <span className="opacity-65">@{user?.username}</span>
      </div>
    </div>
  );
}

export default SearchUserProfile;

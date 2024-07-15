import React, { useEffect, useState } from "react";
import profileImage from "../../../../public/images/avatar-placeholder.png";
import { Link } from "react-router-dom";

function Suggections({ suggections }) {
  const [isFollowed, setFollowed] = useState(false);
  return (
    <div className="w-full h-20 flex justify-between items-center">
      <Link to={`profile/${suggections._id}`}>
        <div className="flex gap-3">
          <div className="w-12 h-12 flex justify-center items-center">
            {suggections?.profileImg ? (
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={suggections?.profileImg}
                alt="profileImg"
              />
            ) : (
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={profileImage}
                alt="profileImg"
              />
            )}
          </div>
          <div className="">
            <div>
              <span className="font-semibold">{suggections?.fullName}</span>
            </div>
            <div>
              <span className="text-sm opacity-65">
                @{suggections?.username}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div>
        <div
          className={`rounded-md pl-4 pr-4 pt-1 pb-1  cursor-pointer ${
            isFollowed
              ? "bg-transparent text-white border"
              : "bg-white text-black"
          }  hover:[bg-#d9dbda]`}
          onClick={() => setFollowed(!isFollowed)}
        >
          {" "}
          {isFollowed ? <span>Following</span> : <span>Follow</span>}
        </div>
      </div>
    </div>
  );
}

export default Suggections;

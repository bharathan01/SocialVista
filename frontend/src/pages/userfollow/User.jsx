import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [changePage, setChangePage] = useState();

  const goToFollowing = () => {
    setChangePage("following");
    navigate(`/user/following/${id}`);
  };

  const goToFollower = () => {
    setChangePage("follower");
    navigate(`/user/follower/${id}`);
  };
  useEffect(() => {
    if (location.pathname.includes("/following")) {
      setChangePage("following");
    } else {
      setChangePage("follower");
    }
  }, []);
  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
      <div className="overflow-y-auto p-2 xl:w-[71%] lg:w-[62%] md:w-[57%] ">
        <div className="flex justify-around items-center p-4 fixed top-[64px] bg-black xl:w-[60%] lg:w-[49%] md:w-[53%] w-[90%] z-10">
          <div className="hover:cursor-pointer p-1" onClick={goToFollowing}>
            <span
              className={`font-semibold md:text-lg text-sm  ${
                changePage === "following" ? "border-b-4 border-[#772ba9]" : ""
              }`}
            >
              Following
            </span>
          </div>
          <div className="hover:cursor-pointer p-1" onClick={goToFollower}>
            <span
              className={`font-semibold md:text-lg text-sm ${
                changePage === "follower" ? "border-b-4 border-[#772ba9]" : ""
              }`}
            >
              Follower
            </span>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default User;

import React from "react";
import TopNews from "./suggection/TopNews";
import { IoMdOpen } from "react-icons/io";
import { newsItems, userProfiles } from "../../utils/demoData/data.jsx";
import { Link } from "react-router-dom";
import Suggections from "./suggection/Suggections.jsx";

function RightSidebar() {
  return (
    <div
      className="xl:w-1/4  lg:w-[30%] md:w-[39%] md:block hidden  mt-[64px] fixed right-0 h-[91vh] overflow-y-scroll"
      style={{
        scrollbarWidth: "none",
      }}
    >
      <div className="w-[95%] flex  flex-col justify-center bg-gray-900 rounded-md mt-4">
        <div className="w-full flex justify-between p-2 mb-5">
          <div>
            <span className="text-lg font-semibold">Top News</span>
          </div>
          <div>
            <span>
              <Link to="/news">
                <IoMdOpen />
              </Link>
            </span>
          </div>
        </div>
        <div className="flex justify-center flex-col p-2 ">
          {newsItems.map((news, index) => {
            return (
              <React.Fragment key={index}>
                <Link to="/news">
                  <TopNews newsImage={news.image} newsHeading={news.heading} />
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="w-[95%] flex flex-col justify-center bg-gray-900 rounded-md mt-4 mb-3">
        <div className="w-full flex justify-between p-2">
          <div>
            <span className="text-lg font-semibold">Who to follow</span>
          </div>
        </div>
        <div className="flex justify-center flex-col p-5 ">
          {userProfiles.map((profile, index) => {
            return (
              <React.Fragment key={index}>
                <Suggections
                  profileImg={profile.profileImage}
                  username={profile.username}
                  fullname={profile.fullName}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;

import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import cover from "../../../public/images/cover.png";
import avathar from "../../../public/images/avatar-placeholder.png";
import { useState } from "react";
import OriginalPost from "../post/originalPost/OriginalPost";
import LikedPost from "../post/likedPost/LikedPost";
import { UpdateProfile } from "../../components";
import { getUserProfileDetails } from "../../service/api/userProfileController/userProfile";
import { ReloadPage, ProfileLoader,LogOutConfirm } from "../../components";
import { useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import Settings from "../settings/Settings";

function Profile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  

  const [isSelectedPage, setSelectedPage] = useState("posts");
  const [isUserProfile, setUserProfile] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userDetails, setUserDetilas] = useState();
  const [noOfPosts, setNoOfPosts] = useState();
  const { userInfo } = useSelector((state) => state.userAuth);
  // const handleEditProfile = () => {
  //   navigate("/profile/edit");
  // };

  // const closeModal = () => {
  //   navigate("/profile");
  // };
  const getUserProfile = async () => {
    setLoading(true);
    const userDatails = await getUserProfileDetails(userId);
    if (userDatails.status !== "SUCCESS") {
      setUserProfile(true);
      setLoading(false);
    }
    setUserDetilas(userDatails.data);
    setLoading(false);
  };
  const noOfOrgianlPost = (count) => {
    setNoOfPosts(count);
  };
  useEffect(() => {
    getUserProfile();
  }, [userId]);

  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
      <div className="min-h-screen overflow-y-auto xl:w-[71%] lg:w-[62%] md:w-[57%] ">
        {isUserProfile ? (
          <div className="flex items-center justify-center">
            <ReloadPage />
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="w-full">
                <ProfileLoader />
              </div>
            ) : (
              <div className="flex w-full flex-col">
                <div className="w-full relative">
                  <div className="w-full sm:h-[250px] h-[180px] object-cover">
                    {userDetails?.coverImg ? (
                      <img
                        src={userDetails?.coverImg}
                        alt=""
                        className="w-full sm:h-[250px] h-[180px] object-cover"
                      />
                    ) : (
                      <img
                        src={cover}
                        alt=""
                        className="w-full sm:h-[250px] h-[180px] object-cover"
                      />
                    )}
                  </div>
                  <div className="sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] absolute  sm:top-[170px] top-[130px] sm:left-[40px] left-[20px]  border-[8px] rounded-2xl flex items-center justify-center border-black">
                    {userDetails?.profileImg ? (
                      <img
                        src={userDetails?.profileImg}
                        alt=""
                        className="sm:w-[134px] sm:h-[134px] w-[84px] h-[84px] object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={avathar}
                        alt=""
                        className="sm:w-[134px] sm:h-[134px] w-[84px] h-[84px] object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="w-full">
                    <div className="w-full flex items-center justify-end p-3">
                      {userInfo?.id === userDetails?._id ? (
                        <>
                          <div
                            className="text-3xl m-3 hover:cursor-pointer"
                            onClick={() => {
                              document.getElementById("settings").showModal();
                            }}
                          >
                            <IoSettingsOutline />
                          </div>
                          <div
                            className="w-[120px] p-2 border-2 border-white rounded-full text-center"
                            onClick={() => {
                              document.getElementById("my_modal_3").showModal();
                              // handleEditProfile();
                            }}
                          >
                            <span>Edit Profile</span>
                          </div>
                        </>
                      ) : (
                        <div className="md:w-[100px] w-[80px] bg-white md:p-2  rounded-full text-center">
                          <span className="text-black">Follow</span>
                        </div>
                      )}
                    </div>
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box md:w-[550px] w-[300px]">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <UpdateProfile userData={userDetails} />
                      </div>
                    </dialog>
                    <dialog id="settings" className="modal">
                      <div className="modal-box md:w-[550px] w-[300px]">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <Settings />
                      </div>
                    </dialog>
                    <dialog id="openLogOutcard" className="modal">
                      <div className="modal-box flex items-center justify-center">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <LogOutConfirm />
                      </div>
                    </dialog>
                    <div className="w-full flex flex-col gap-1 mt-[10px]">
                      <div className="sm:ml-[50px] ml-[30px] flex flex-col gap-1 ">
                        <div>
                          <span className="text-lg font-bold">
                            {userDetails?.fullName}
                          </span>
                        </div>
                        <div>
                          <span className="text-base opacity-70">
                            @{userDetails?.username}
                          </span>
                        </div>
                      </div>
                      <div className="sm:ml-[50px] ml-[30px]">
                        <span className="lg:text-base text-sm">
                          {userDetails?.bio}
                        </span>
                      </div>
                    </div>
                    <div className="flex mt-4 sm:ml-[50px] ml-[30px] gap-3 ">
                      <div className="hover:cursor-pointer">
                        <span className="font-bold text-lg">
                          {userDetails?.followers.length}{" "}
                        </span>
                        <span className="opacity-55"> followers</span>
                      </div>
                      <Link>
                        <div className="hover:cursor-pointer">
                          <span className="font-bold text-lg">
                            {userDetails?.following.length}
                          </span>
                          <span className="opacity-55"> following</span>
                        </div>
                      </Link>
                      <div className="hover:cursor-pointer">
                        <span className="font-bold text-lg">{noOfPosts} </span>
                        <span className="opacity-55"> Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-6 p-2 flex items-center justify-around border-b-2">
                  <div
                    className={`w-[50%] text-center p-2 cursor-pointer
${isSelectedPage === "posts" ? "bg-gray-900" : ""}`}
                    onClick={() => setSelectedPage("posts")}
                  >
                    <span>Posts</span>
                  </div>
                  <div
                    className={`w-[50%]  text-center p-2 cursor-pointer 
${isSelectedPage === "likedpost" ? "bg-gray-900" : ""}`}
                    onClick={() => setSelectedPage("likedpost")}
                  >
                    <span>Liked Post</span>
                  </div>
                </div>
                <div className="m-3 mt-5">
                  {isSelectedPage === "posts" ? (
                    <OriginalPost
                      origanlPostsNo={noOfOrgianlPost}
                      userId={userId}
                    />
                  ) : (
                    <LikedPost userId={userId} />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

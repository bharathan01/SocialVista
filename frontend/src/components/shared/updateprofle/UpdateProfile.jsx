import React, { useEffect, useRef, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";

import profilePlaceHolder from "../../../../public/images/avatar-placeholder.png";
import coverPlaceHolder from "../../../../public/images/cover.png";
import { updateUserProfile } from "../../../service/api/userProfileController/userProfile";

function UpdateProfile({ userData }) {
  const coverImage = useRef(null);
  const profileImage = useRef(null);

  const [coverImg, setCoverImg] = useState(userData?.coverImg);
  const [profileImg, setProfileImg] = useState(userData?.profileImg);
  const [updatedValues, setUpdatedVlalues] = useState({
    username: userData?.username,
    fullName: userData?.fullName,
    email: userData?.email,
    bio: userData?.bio,
  });

  const onChangeImghandler = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const render = new FileReader();

      render.onload = () => {
        field === "coverImage" && setCoverImg(render.result);
        field === "profileImage" && setProfileImg(render.result);
      };

      render.readAsDataURL(file);
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVlalues({ ...updatedValues, [name]: value });
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.username = updatedValues.username;
    formData.profileImg = profileImg;
    formData.coverImg = coverImg;
    formData.fullName = updatedValues.fullName;
    formData.email = updatedValues.email;
    formData.bio = updatedValues.bio;
    const responce = await updateUserProfile(userData._id, formData);
    console.log(responce);
  };
  // useEffect(() => {
  //   console.log(userData);
  // }, []);
  return (
    <div>
      <div className="mt-4">
        <form>
          <div className=" flex flex-col gap-3">
            <div className="flex flex-col item-center relative ">
              <div className="w-full h-[150px] bg-white">
                <div
                  className="w-full h-full relative flex items-center justify-center"
                  onClick={() => coverImage.current.click()}
                >
                  <div className="w-full h-full">
                    <img
                      src={coverImg || coverPlaceHolder}
                      alt="cover image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute bg-black opacity-0 w-full h-full flex items-center justify-center text-2xl  hover:opacity-65">
                    <RiImageAddLine />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={coverImage}
                  className="hidden"
                  onChange={(e) => onChangeImghandler(e, "coverImage")}
                />
              </div>
              <div className="w-full h-[100px]"></div>
              <div className="absolute w-[120px] h-[120px]  top-[38%] md:right-[40%] right-[25%] rounded-full border-2 border-black">
                <div
                  className="w-full h-full relative flex items-center justify-center"
                  onClick={() => profileImage.current.click()}
                >
                  <div className="w-full h-full">
                    <img
                      src={profileImg || profilePlaceHolder}
                      alt="profile image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute bg-black opacity-0 w-full h-full flex items-center justify-center text-2xl  hover:opacity-65">
                    <RiImageAddLine />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={profileImage}
                  className="hidden"
                  onChange={(e) => onChangeImghandler(e, "profileImage")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Full name"
                  name="fullName"
                  value={updatedValues.fullName}
                  onChange={handleOnChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  name="email"
                  value={updatedValues.email}
                  onChange={handleOnChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  name="username"
                  value={updatedValues.username}
                  onChange={handleOnChange}
                />
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Bio"
                value={updatedValues.bio}
                onChange={handleOnChange}
                name="bio"
              ></textarea>
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                className="btn bg-[#772ba9]"
                onClick={handleUpdateProfile}
              >
                Button
              </button>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default UpdateProfile;

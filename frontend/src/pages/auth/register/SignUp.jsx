import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../public/images/logo.png";
import { register } from "../../../service/api/auth/AuthController";
import { Spinner } from "../../../components";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [loder, setLoader] = useState(false);
  const [userFormCredentials, setUserFormCredentials] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUserFormCredentials({ ...userFormCredentials, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const userData = await register(userFormCredentials);
      if (userData.status === "SUCCESS") {
        setLoader(false);
        navigate("/signin");
      } else {
        setLoader(false)
        const errData = userData?.message?.errors;
        if (errData && Array.isArray(errData)) {
          const newErrors = {};
          errData.forEach((ele) => {
            newErrors[ele.path] = ele.msg;
          });
          setError(newErrors);
        }
      }
    } catch (error) {
      setLoader(false)
      return
    }
  };
  return (
    <div className="w-full md:h-screen  flex items-center justify-center lg:gap-24 md:flex-row flex-col">
      <div className="md:w-[50%] flex flex-col lg:items-end items-center">
        <div className="md:mt-0 mt-2">
          <img
            src={logo}
            alt="logo"
            className="lg:w-full lg:h-full md:w-[200px] md:h-[200px] w-[100px] h-100px]"
          />
        </div>
        <div>
          <h2 className="md:text-2xl text-xl font-thin text-center mt-5 p-5">
            Experience the joy of sharing and connecting on <br />
            <span className="font-bold md:text-3xl text-2xl text-[#772ba9]">
              SOCIALVISTA.
            </span>
            <br />
            <span className="text-xl font-thin">
              where your moments matter.
            </span>
          </h2>
        </div>
      </div>
      <div className="md:w-[50%] w-full flex md:items-start items-center justify-center flex-col md:mt-0  md:mb-0 mb-6">
        <div className="xl:w-[60%] w-[90%] md:mb-5 md:mt-24">
          <div className="h-[70px] text-center">
            <span className="text-3xl">Sign Up</span>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className=" flex flex-col gap-4">
              <div className="flex gap-1 md:flex-row flex-col">
                <div className="flex flex-col gap-1 md:w-full">
                  <label className="text-white">Username</label>
                  <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered border-gray-700 input-primary w-full md:max-w-sm max-w-2xl"
                    name="username"
                    value={userFormCredentials.username}
                    onChange={handleFieldChange}
                  />
                  {error?.username && (
                    <p className="text-red-600">{error.username}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 md:w-full">
                  <label className="text-white">full name</label>
                  <input
                    type="text"
                    placeholder="fullname"
                    className="input input-bordered border-gray-700 input-primary w-full md:max-w-sm max-w-2xl"
                    name="fullName"
                    value={userFormCredentials.fullName}
                    onChange={handleFieldChange}
                  />
                  {error?.fullName && (
                    <p className="text-red-600">{error.fullName}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-white">Email</label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered border-gray-700 input-primary w-full  max-w-2xl"
                  name="email"
                  value={userFormCredentials.email}
                  onChange={handleFieldChange}
                />
                {error?.email && <p className="text-red-600">{error.email}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-white">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered border-gray-700 input-primary w-full max-w-2xl"
                  name="password"
                  value={userFormCredentials.password}
                  onChange={handleFieldChange}
                />
                {error?.password && (
                  <p className="text-red-600">{error.password}</p>
                )}
              </div>
              <div>
                <button className="btn bg-[#772ba9] w-full">
                  {loder ? <Spinner /> : "Sign up"}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3">
            <button className="btn btn-outline bg-white w-full">
              <FcGoogle />
              Sign up with Google
            </button>
          </div>
          <div className="divider h-6">OR</div>
          <div>
            <button
              className="btn btn-primary w-full"
              onClick={() => navigate("/signin")}
            >
              Already hava an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

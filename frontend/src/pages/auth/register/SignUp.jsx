import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../public/images/logo.png";

function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="w-full  flex items-center justify-center md:mb-0 mb-20">
      <div className="w-11/12 h-screen flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 h-full  md:h-3/4  flex items-center justify-end">
          <div>
            <div className="md:w-full w-1/2 h-1/2">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div></div>
        </div>
        <div className="w-full md:w-1/2 h-3/4 flex flex-col justify-center items-center gap-9">
          <div className="">
            <h1 className=" text-3xl md:text-6xl">Sign Up</h1>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <form>
              <div className="w-full flex flex-col gap-4">
                <div className="flex gap-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-white">Username</label>
                    <input
                      type="text"
                      placeholder="username"
                      className="input input-bordered border-gray-700 input-primary w-full md:max-w-sm max-w-2xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-white">full name</label>
                    <input
                      type="text"
                      placeholder="fullname"
                      className="input input-bordered border-gray-700 input-primary w-full md:max-w-sm max-w-2xl"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-white">Email</label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered border-gray-700 input-primary w-full md:max-w-sm max-w-2xl"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-white">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered border-gray-700 input-primary w-full md:max-w-sm max-w-2xl"
                  />
                </div>
                <div>
                  <button className="btn btn-primary w-full">Sign up</button>
                </div>
              </div>
            </form>
            <div>
              <button className="btn btn-outline bg-white w-full">
                <FcGoogle />
                Sign up with Google
              </button>
            </div>
            <div className="divider">OR</div>
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
    </div>
  );
}

export default SignUp;

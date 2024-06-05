import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../public/images/logo.png";
function SignIn() {
  const navigate = useNavigate();
  return (
    <div className="w-full  flex items-center justify-center md:mb-0 mb-20">
      <div className="w-11/12 md:h-screen flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2  flex items-center justify-end">
          <div>
            <div className="md:w-full w-1/2 h-1/2">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div></div>
        </div>
        <div className="w-full md:w-1/2  flex flex-col justify-center items-center gap-9">
          <div className="h-[55px]">
            <span className=" text-3xl">Sign In</span>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <form>
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-white">Username or Email</label>
                  <input
                    type="text"
                    placeholder="username,email"
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
                  <div className="flex justify-end">
                    <Link className="btn-link" to="/signup">Forgot Password</Link>
                  </div>
                </div>
                <div>
                  <button className="btn btn-primary w-full">Sign in</button>
                </div>
              </div>
            </form>
            <div>
              <button className="btn btn-outline bg-white w-full">
                <FcGoogle />
                Log in with Google
              </button>
            </div>
            <div className="divider">OR</div>
            <div>
              <button className="btn btn-primary w-full" onClick={()=>navigate('/signup')}>
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

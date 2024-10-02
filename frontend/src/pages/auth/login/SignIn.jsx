import React, { useId, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../public/images/logo.png";
import {
  login,
  sendGoogleLoginRequest,
} from "../../../service/api/auth/AuthController";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/slice/userAuth.slice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { Spinner } from "../../../components";
function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, isUserLoggedIn } = useSelector((state) => state.userAuth);
  const [ loader, setLoader ] = useState(false);
  const [logInCredentials, setlogIncredentials] = useState({
    userId: "",
    password: "",
  });
  const [error, setError] = useState({});

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setlogIncredentials({ ...logInCredentials, [name]: value });
  };
  const isUserField = () => {
    const emilRjx = /\S+@\S+\.\S+/;
    const isEmail = emilRjx.test(logInCredentials.userId);
    const userCredentials = {
      ...(isEmail
        ? { email: logInCredentials.userId }
        : { username: logInCredentials.userId }),
      password: logInCredentials.password,
    };
    return userCredentials;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await login(isUserField());
      if (response.status === "SUCCESS") {
        setLoader(false)
        dispatch(loginUser(response.data));
        navigate("/");
      } else {
        const errData = response?.message?.errors;
        if (errData && Array.isArray(errData)) {
          const newErrors = {};
          errData.forEach((ele) => {
            newErrors[ele.path] = ele.msg;
          });
          setError(newErrors);
        }
      }
    } catch (error) {
       return
    }
  };
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: fullName, photoUrl: profileImg, email },
    } = await signInWithPopup(firebaseAuth, provider);
    const userData = {
      fullName,
      profileImg,
      email,
      username: fullName.replace(/\s+/g, ""),
    };
    if (email) {
      const response = await sendGoogleLoginRequest(userData);
      if (response.status === "SUCCESS") {
        dispatch(loginUser(response.data));
        navigate("/");
      }
    }
  };

  return (
    <div className="w-full md:h-screen  flex items-center justify-center lg:gap-24 md:flex-row flex-col">
      <div className="md:w-[50%] flex flex-col lg:items-center items-center">
        <div className="md:mt-0 mt-2">
          <img
            src={logo}
            alt="logo"
            className="lg:w-[250px] lg:h-[250px] md:w-[150px] md:h-[150px] w-[100px] h-100px]"
          />
        </div>
        <div>
          <h2 className="md:text-2xl text-xl font-thin text-center mt-5">
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
      <div className="md:w-[50%] w-full flex md:items-start items-center justify-center flex-col md:mt-0 mt-6 md:mb-0 mb-6">
        <div className="xl:w-[60%] w-[90%] md:mb-5 md:mt-24">
          <div className="h-[70px] text-center">
            <span className="text-3xl">Sign In</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-4">
              <div className="flex gap-1 md:flex-row flex-col">
                <div className="flex flex-col gap-1 md:w-full">
                  <label className="text-white">Username, Email</label>
                  <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered border-gray-700 input-primary w-full  max-w-2xl"
                    name="userId"
                    value={logInCredentials.userId}
                    onChange={onInputChange}
                  />
                  {error?.usernameOrEmail && (
                    <p className="text-red-600">{error.usernameOrEmail}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-white">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered border-gray-700 input-primary w-full max-w-2xl"
                  name="password"
                  value={logInCredentials.password}
                  onChange={onInputChange}
                />
                {error?.password && (
                  <p className="text-red-600">{error.password}</p>
                )}
              </div>
              <div className=" w-fullflex text-end">
                <Link to="/forgot-password">
                  <span className="underline">forgot password </span>
                </Link>
              </div>
              <div>
                <button className="btn bg-[#772ba9] w-full">
                  {loader ? <Spinner /> : "Sign up"}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3">
            <button
              className="btn btn-outline bg-white w-full text-black"
              onClick={loginWithGoogle}
            >
              <FcGoogle />
              Sign up with Google
            </button>
          </div>
          <div className="divider h-6">OR</div>
          <div>
            <Link to={"/signup"}>
              <button className="btn btn-primary w-full">
                don't hava an account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

import React from "react";
import logo from "../../../../public/images/logo.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slice/userAuth.slice";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../service/api/auth/AuthController";

function LogOutConfirm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutUser = async () => {
    const responce = await logOut();
    if (responce.status === "SUCCESS") {
      dispatch(logoutUser());
      navigate("/signin");
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="">
        <img
          src={logo}
          alt="Shoes"
          className="rounded-xl w-[100px] h-[100px]"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          Log out of <span className="text-[#772ba9]">SOCIAL VISTA</span>?
        </h2>
        <p>Thank you for visiting.We can't wait to see you back soon!</p>
        <div className="card-actions w-full">
          <button className="btn btn-primary w-full" onClick={logOutUser}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogOutConfirm;

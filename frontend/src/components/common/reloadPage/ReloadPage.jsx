import React from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slice/userAuth.slice";
import { logOut } from "../../../service/api/auth/AuthController";

function ReloadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roloadThePage = async () => {
    const responce = await logOut();
    if (responce.status === "SUCCESS") {
      dispatch(logoutUser());
      navigate("/signin");
    }
    window.location.reload();
  };
  return (
    <div className="w-full flex items-center justify-center mt-5">
      <button className="btn bg-[#772ba9] rounded-2xl" onClick={roloadThePage}>
        {" "}
        <VscDebugRestart /> retry
      </button>
    </div>
  );
}

export default ReloadPage;

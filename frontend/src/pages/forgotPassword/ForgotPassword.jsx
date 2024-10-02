import React from "react";
import { VerifyEmail } from "../../components";
import logo from "../../../public/images/logo.png";
function ForgotPassword() {
  const onValidateEmail = (data) => {
    console.log(data);
  };
  return (
    <div className="flex w-full h-screen items-center justify-center p-4">
      <div className="md:w-[50%] w-[100%] h-[50%] bg-gray-900 flex flex-col items-center justify-center rounded-lg gap-4 p-3">
        <div className="flex items-center flex-col mb-3">
          <div className="flex items-center ">
            <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
            <span className="font-bold  text-2xl">SocialVista.</span>
          </div>
          <div className="p-2">
            <span className="font-semibold text-lg">
              {" "}
              Create a new password. Make sure it's something secure that you'll
              remember.
            </span>
          </div>
        </div>
        <VerifyEmail onValidateEmail={onValidateEmail} />
      </div>
    </div>
  );
}

export default ForgotPassword;

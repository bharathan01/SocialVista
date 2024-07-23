import React from "react";

function ForgotPassword() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="md:w-[50%] w-[100%] h-[50%] bg-gray-900 flex flex-col items-center justify-center rounded-lg">
        <div>
          <label>Enter you'r registered email id</label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered border-gray-700 input-primary w-full max-w-2xl mt-2 mb-2"
            name="email"
          />
        </div>
        <div>
          <button className="btn bg-[#772ba9] w-full">Sent Otp</button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

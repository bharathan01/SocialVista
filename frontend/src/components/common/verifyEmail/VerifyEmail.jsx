import React, { useState } from "react";

function VerifyEmail({ onValidateEmail }) {
  const [error, setError] = useState("");
  const onGetEmail = () => {
    const emailId = document.getElementById("email").value;
    if (!emailId) {
      setError("emptyEmail");
    } else {
      setError("");
      
    //   onValidateEmail(emailId);
    }
  };
  return (
    <div>
      <div>
        <label>Enter you'r registered email id</label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered border-gray-700 input-primary w-full max-w-2xl mt-2 mb-2"
          name="email"
          id="email"
        />
      </div>
      {error === "emptyEmail" && (
        <div>
          <span className="text-red-600">Enter Your valid email id !</span>
        </div>
      )}

      <div>
        <button className="btn bg-[#772ba9] w-full" onClick={onGetEmail}>
          Sent Otp
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;

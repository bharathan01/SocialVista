import React, { useState } from "react";
import { resetPassword } from "../../../service/api/features/featuresConrtroller";

function VerifyEmail() {
  const [error, setError] = useState("");
  const [isMailSend, setMailSent] = useState(false);
  const [email, setEmail] = useState();
  const onGetEmail = async () => {
    const emailId = document.getElementById("email").value;
    if (!emailId) {
      setError("emptyEmail");
    } else {
      setError("");
      setEmail(emailId);
      const responce = await resetPassword(emailId);
      if (responce.status == "FAILD") {
        isMailSend(false);
        if (responce?.message?.invalidEmail) {
          setError("invalidEmail");
        }
      } else {
        setMailSent(true);
      }
    }
  };
  return (
    <div>
      {isMailSend ? (
        <div>
          <span className="font-semibold">
            Sent a password rest link to {email}
          </span>
        </div>
      ) : (
        <>
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
                <span className="text-red-600">
                  Enter Your valid email id !
                </span>
              </div>
            )}
            {error === "invalidEmail" && (
              <div>
                <span className="text-red-600">Email id is not found !</span>
              </div>
            )}

            <div>
              <button className="btn bg-[#772ba9] w-full" onClick={onGetEmail}>
                Sent rest link
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;

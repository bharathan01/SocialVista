import React from "react";
import { VscDebugRestart } from "react-icons/vsc";
const roloadThePage = () => {
  window.location.reload();
};

function ReloadPage() {
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

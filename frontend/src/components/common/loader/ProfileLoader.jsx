import React from "react";

function ProfileLoader() {
  return (
    <div>
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-56 w-full"></div>
        <div className="skeleton h-32 w-32 absolute top-52 ml-8 rounded-lg border-4 border-black"></div>
        <div className="mt-10 ml-1 flex flex-col gap-2">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLoader;

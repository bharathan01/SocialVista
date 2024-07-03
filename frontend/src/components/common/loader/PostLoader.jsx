import React from "react";

function PostLoader() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex  flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
          </div>
        </div>
        <div className="skeleton h-96 w-full"></div>
      </div>
      <div class="flex flex-col gap-4">
        <div className="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
}

export default PostLoader;

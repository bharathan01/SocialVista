import React from "react";
import { SingleNews } from "../../components";

function news() {
  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
      <div className="flex flex-col gap-5 m-2 min-h-screen overflow-y-auto xl:w-[70%] lg:w-[60%] md:w-[57%] ">
        <SingleNews />
        <SingleNews />
        <SingleNews />
      </div>
    </div>
  );
}

export default news;

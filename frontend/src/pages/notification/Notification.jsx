import React from "react";
import { VscSettings } from "react-icons/vsc";
import {SingleNotification} from "../../components"

function Notification() {
  return (
    <div className="min-h-screen overflow-y-auto xl:w-[71%] lg:w-[60%] md:w-[57%]">
      <div className="flex items-center p-5 justify-between border-b-2 fixed xl:w-[61%] lg:w-[50%] md:w-[53%] w-[86%] bg-black">
        <div>
          <span className="text-xl font-semibold">Notifications</span>
        </div>
        <div>
          <span className="text-2xl">
            <VscSettings />
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-20">
          <SingleNotification/>
          <SingleNotification/>
          <SingleNotification/>
          <SingleNotification/>
      </div>
    </div>
  );
}

export default Notification;

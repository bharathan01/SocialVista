import React, { useEffect, useRef, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { SingleNotification } from "../../components";

function Notification() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menu = useRef(null);
  const handleClickOutside = (event) => {
    if (menu.current && !menu.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
      <div className="min-h-screen overflow-y-auto xl:w-[71%] lg:w-[60%] md:w-[57%] ">
        <div className="flex items-center p-5 justify-between border-b-2 fixed xl:w-[61%] lg:w-[50%] md:w-[53%] w-[86%] bg-black">
          <div>
            <span className="text-xl font-semibold">Notifications</span>
          </div>
          <div className="">
            <div>
              <div
                tabIndex={0}
                role="button"
                className="flex flex-col justify-center items-center w-[40px] h-[40px] rounded-sm hover:cursor-pointer hover:bg-gray-900 p-1 gap-1"
                onClick={() => setMenuOpen(!isMenuOpen)}
              >
                <span className="text-2xl">
                  <VscSettings />
                </span>
              </div>
            </div>
            {isMenuOpen && (
              <div ref={menu} className="w-[130px] xl:right-[28%] lg:right-[34%] sm:right-[46%] right-[13%] bg-gray-900 fixed flex flex-col items-center rounded-md ">
                <ul className="flex flex-col gap-2 w-full text-center ">
                  <li className="p-2 hover:bg-gray-800 w-full">Settings</li>
                  <li className="p-2 hover:bg-gray-800 text-red-700">
                    Delete all
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-20">
          <SingleNotification />
          <SingleNotification />
          <SingleNotification />
          <SingleNotification />
        </div>
      </div>
    </div>
  );
}

export default Notification;

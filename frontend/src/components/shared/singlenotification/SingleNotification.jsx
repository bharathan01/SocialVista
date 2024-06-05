import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import profileimg from "../../../../public/images/avatar-placeholder.png";

function SingleNptificatiion() {
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
    <div className="flex p-3 ml-4 mr-4 justify-between items-center">
      <div className="flex gap-5 items-center">
        <div className="w-[40px] h-[40px] rounded-full">
          <img
            src={profileimg}
            alt="profile image"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        </div>
        <div>
          <span className="md:text-lg text-sm">Arun liked your post</span>
        </div>
      </div>
      <div className="">
            <div>
              <div
                tabIndex={0}
                role="button"
                className={`flex flex-col justify-center items-center w-[40px] h-[40px] rounded-sm hover:cursor-pointer hover:bg-gray-900 p-1 gap-1 ${
                  isMenuOpen ?"bg-gray-900":""
                }`}
                onClick={() => setMenuOpen(!isMenuOpen)}
              >
                <span className="w-[3px] h-[3px] bg-white"></span>
                <span className="w-[3px] h-[3px] bg-white"></span>
                <span className="w-[3px] h-[3px] bg-white"></span>
              </div>
            </div>
            {isMenuOpen && (
              <div ref={menu} className="w-[130px] xl:right-[30%] lg:right-[34%] sm:right-[46%] right-[13%] bg-gray-900 absolute flex flex-col items-center rounded-md">
                <ul className="flex flex-col gap-2  w-full text-center">
                  <li className="p-2 hover:bg-gray-800 text-red-700 w-full">Delete</li>
                </ul>
              </div>
            )}
          </div>
    </div>
  );
}

export default SingleNptificatiion;

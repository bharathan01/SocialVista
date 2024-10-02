import React, { useState } from "react";
import { getSearchUser } from "../../service/api/features/featuresConrtroller";
import { SearchUserProfile } from "../../components";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [seachUser, setSearchUser] = useState();
  const onhangleSearchQurey = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) {
      setSearchUser(null);
      return
    }
    const responce = await getSearchUser(searchQuery);
    if (responce.status !== "SUCCESS") {
    }
    setSearchUser(responce?.data);
  };
  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[64px] w-[63%]">
      <div className="overflow-y-auto xl:w-[71%] lg:w-[61%] md:w-[57%] ">
        <div className=" h-[90px] p-5 flex items-center justify-center fixed xl:w-[61%] lg:w-[50%] md:w-[53%] w-[86%]">
          <label className="input input-bordered flex items-center gap-2 md:w-[60%] w-[90%]">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={onhangleSearchQurey}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="mt-28 flex flex-wrap w-full gap-3 justify-center">
          {seachUser?.length === 0 ? (
            <>
              <div className="text-lg font-semibold opacity-65">
                No result found !
              </div>
            </>
          ) : (
            <>
              {seachUser?.map((user,index) => {
                return <SearchUserProfile user={user} key={index} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;

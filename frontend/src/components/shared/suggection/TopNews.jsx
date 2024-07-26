import React from "react";


function TopNews({news}) {
  const structureHeading = () => {
    if (news?.title.length > 60) {
      return news?.title.slice(0, 60) + "...";
    } else {
      return news?.title;
    }
  };
  return (
    <div className="w-full flex justify-center xl:flex-row  items-center   gap-4 hover:bg-black p-1">
      <div className="w-48 h-16  ">
        <img className="w-48 max-w-24 h-16 object-cover" src={news?.urlToImage} alt="" />
      </div>
      <div className="flex items-center justify-center text-sm">
        <span>{structureHeading()}</span>
      </div>
    </div>
  );
}

export default TopNews;

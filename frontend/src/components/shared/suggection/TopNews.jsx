import React from "react";


function TopNews({newsImage,newsHeading}) {
  const structureHeading = () => {
    if (newsHeading.length > 60) {
      return newsHeading.slice(0, 60) + "...";
    } else {
      return newsHeading;
    }
  };
  return (
    <div className="w-full flex justify-center xl:flex-row  items-center flex-col  gap-4 hover:bg-black p-1">
      <div className="w-48 h-16 max-w-28 ">
        <img className="w-48 max-w-28 h-16 object-cover" src={newsImage} alt="" />
      </div>
      <div className="flex items-center justify-center text-sm">
        <span>{structureHeading()}</span>
      </div>
    </div>
  );
}

export default TopNews;

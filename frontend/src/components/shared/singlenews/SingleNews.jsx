import React from "react";
import demo2 from "../../../../public/images/demo2.jpg";
import { Link } from "react-router-dom";
import { MdOpenInNew } from "react-icons/md";
function SingleNews({ news }) {
  return (
    <div className="w-full bg-gray-900 p-3 rounded-lg pt-7 pb-6">
      <div className="w-full flex flex-col gap-5">
        <div className="text-start">
          <span className="md:text-2xl font-serif font-semibold text-xl">
            {news?.title}
          </span>
        </div>
        <div>
          <img src={news?.image_url} alt="news image" />
        </div>
        <div>
          <span className="md:text-base text-sm">{news?.description}</span>
          <span className="md:text-base text-sm">
            {news?.content.replace(/\s\[\+\d+\schars\]$/, "")}{" "}
            <Link to={news?.link} target="_blank">
              {" "}
              <span className="underline text-[#772ba9]">
                Read more{" "}
                <div className="inline-flex">
                  <MdOpenInNew />
                </div>{" "}
              </span>
            </Link>
          </span>
        </div>
        <div>
          <span className="md:text-base text-sm opacity-65">
            Published: {new Date(news?.pubDate).toString().slice(0, 15)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleNews;

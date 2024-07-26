import React, { useEffect, useState } from "react";
import { NewsLoader, SingleNews } from "../../components";
import { getLiveNews } from "../../service/api/features/featuresConrtroller";

function News() {
  const [newses, setNews] = useState([]);
  const [loader, setloader] = useState(false);
  const getNews = async () => {
    setloader(true);
    const newsData = await getLiveNews();
    if (!newsData.status === "ok") {
      setloader(false);
    }
    setNews(newsData.articles);
    setloader(false);
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <div className="flex-grow xl:ml-[14%] lg:ml-[20%] ml-[60px] mt-[70px] w-[63%] ">
      <div className="flex flex-col gap-5 m-2 min-h-screen overflow-y-auto xl:w-[70%] lg:w-[60%] md:w-[57%] ">
        {newses?.map((news, index) => {
          return loader ? (
            <>
              <NewsLoader key={index} />
            </>
          ) : (
            <>
              <SingleNews news={news} key={index} />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default News;

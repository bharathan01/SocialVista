import React, { useEffect, useState } from "react";

function Check() {
  let [count, setCount] = useState(0);
  useEffect(() => {
    setCount(++count);
    console.log("first" ,count)
  }, []);
  useEffect(() => {
    setCount(++count);
    console.log("sec" ,count)    
  }, []);
  return <div className="text-white mt-[70px]">{count}</div>;
}

export default Check;
      
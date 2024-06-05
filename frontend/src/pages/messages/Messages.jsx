import React, { useEffect, useRef, useState } from "react";

function Messages() {
  const divRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsOpen(false);
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
      <div>
      <button onClick={() => setIsOpen(true)}>Open Div</button>
      {isOpen && (
        <div ref={divRef} className="your-div-class">
          This is the div content. Click outside to close.
        </div>
      )}
    </div>
    </div>
  );
}

export default Messages;

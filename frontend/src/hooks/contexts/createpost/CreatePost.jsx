import React, { createContext, useState } from "react";

// Define the context
const CreateNewPostContext = createContext();

// Create the provider component
const CreateNewPostProvider = ({ children }) => {
  const [reload, setReload] = useState(false);
  const toggleCreatePost = (elememt) => {
    document.getElementById(elememt)?.showModal();
  };
  const toggleIslogOutCard = (element) => {
    document.getElementById(element)?.showModal();
  };
  const toggleUpdatePostCard = (element) => {
    document.getElementById(element)?.showModal();
  };
  const reloadHomeComponent = () => {
    setReload(!reload);
  };
  return (
    <CreateNewPostContext.Provider
      value={{
        toggleCreatePost,
        toggleIslogOutCard,
        toggleUpdatePostCard,
        reload,
        reloadHomeComponent,
      }}
    >
      {children}
    </CreateNewPostContext.Provider>
  );
};

// Export the context and provider
export { CreateNewPostContext, CreateNewPostProvider };

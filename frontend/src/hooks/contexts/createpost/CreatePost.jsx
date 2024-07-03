import React, { createContext, useState } from "react";

// Define the context
const CreateNewPostContext = createContext();

// Create the provider component
const CreateNewPostProvider = ({ children }) => {
  const toggleCreatePost = (elememt) => {
    document.getElementById(elememt)?.showModal();
  };
  const toggleIslogOutCard = (element) => {
    document.getElementById(element)?.showModal();
  };
  return (
    <CreateNewPostContext.Provider
      value={{ toggleCreatePost, toggleIslogOutCard }}
    >
      {children}
    </CreateNewPostContext.Provider>
  );
};

// Export the context and provider
export { CreateNewPostContext, CreateNewPostProvider };

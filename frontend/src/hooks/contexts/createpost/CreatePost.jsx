import React, { createContext, useState } from "react";

// Define the context
const CreateNewPostContext = createContext();

// Create the provider component
const CreateNewPostProvider = ({ children }) => {
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);

  const toggleCreatePost = () => {
    setCreatePostOpen((prev) => !prev);
  };

  return (
    <CreateNewPostContext.Provider value={{ isCreatePostOpen, toggleCreatePost }}>
      {children}
    </CreateNewPostContext.Provider>
  );
};

// Export the context and provider
export { CreateNewPostContext ,CreateNewPostProvider };

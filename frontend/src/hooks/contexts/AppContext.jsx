

import React from 'react';
import { CreateNewPostProvider } from './createpost/CreatePost';

function AppContext({ children }) {
  return (
    <CreateNewPostProvider>
      {children}
    </CreateNewPostProvider> 
  );
}

export default AppContext;

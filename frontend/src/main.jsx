import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store/store.js";

import { PersistGate } from "redux-persist/integration/react";

import App from "./App.jsx";
import "./index.css";
import AppContext from "./hooks/contexts/AppContext.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppContext>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store/store.js";

import { PersistGate } from "redux-persist/integration/react";

import App from "./App.jsx";
import "./index.css";
import AppContext from "./hooks/contexts/AppContext.jsx";
import { Provider } from "react-redux";
import Demo from "./pages/demoChat/Demo.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppContext>
      </PersistGate>
    </Provider>
);

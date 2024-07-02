import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuthReducer from "../slice/userAuth.slice";

const persistConfig = {
  key: "userAuth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userAuthReducer);

const store = configureStore({
  reducer: {
    userAuth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import countReducer from "../slices/count.slice";
import apiReducer from "../slices/api.slice";

const persistConfig = {
  key: "root",
  version: 2,
  storage: storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    count: countReducer,
    api: apiReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: [
          "meta.arg",
          "payload.timestamp",
          "payload.headers",
        ],
      },
    }),
});

export type AppStore = typeof store.dispatch;
export type AppState = ReturnType<typeof persistedReducer>;

export default store;

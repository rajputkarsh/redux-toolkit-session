import { legacy_createStore as createStore, Dispatch } from "redux";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
);

export default store;

export type AppStore = Dispatch<{type: string}>;
export type AppState = ReturnType<typeof rootReducer>;
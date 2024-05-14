import { createSlice, createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

type IApiSlice = {
  data: { [key: string]: any };
  status: string;
  error: null | string;
};

const initialData: IApiSlice = {
  data: {},
  status: "idle",
  error: null,
};

export const apiSlice = createSlice({
  name: "api",
  initialState: initialData,
  reducers: {},
  extraReducers: () => {},
});

// Function to select api slice root state
const selectApiRootState = (state: AppState): IApiSlice => state.api;

export const getApi = createSelector<
  [(state: AppState) => IApiSlice],
  { [key: string]: any }
>([selectApiRootState], (apiState) => apiState["data"]);

export default apiSlice.reducer;

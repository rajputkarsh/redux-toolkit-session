import {
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { AppState } from "../store";

type ICountSlice = {
  data: number;
  status: string;
  error: null | string;
};

const initialData: ICountSlice = {
  data: 0,
  status: "idle",
  error: null,
};

export const countSlice = createSlice({
  name: "count",
  initialState: initialData,
  reducers: {},
  extraReducers: () => {},
});

// Function to select count slice root state
const selectCountRootState = (state: AppState): ICountSlice => state.count;

export const getCount = createSelector<
  [(state: AppState) => ICountSlice],
  number
>([selectCountRootState], (countState) => countState["data"]);

export default countSlice.reducer;

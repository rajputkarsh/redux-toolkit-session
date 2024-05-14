import {
  createSlice,
  createSelector,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { AppState } from "../store";
import getApiConfig from "../config";
import { fetchData } from "../service";

type IApiSlice = {
  data: Array<{ [key: string]: any }>;
  status: string;
  error: null | string;
};

export const fetchUserList = createAsyncThunk(
  "user/list",
  (data: Object, thunk) => {
    const apiData = getApiConfig("user", "list");

    const someCondition = true;

    if (someCondition) {
      setTimeout(() => {
      thunk.dispatch(
        fetchUser({ id: Math.floor(Math.random() * (50) + 1).toString() })
      );        
      }, 2000)
    }

    return fetchData({
      ...apiData,
      data: {},
      headers: null,
      timeout: 30000,
    }).catch((error) => {
      throw error;
    });
  }
);

export const fetchUser = createAsyncThunk(
  "user/info",
  (data: { id: string }, thunk) => {
    const apiData = getApiConfig("user", "list");

    const path = `${apiData.path}/${data.id}`;

    return fetchData({
      ...apiData,
      path,
      data: {},
      headers: null,
      timeout: 30000,
    }).catch((error) => {
      throw error;
    });
  }
);

const initialData: IApiSlice = {
  data: [],
  status: "idle",
  error: null,
};

export const apiSlice = createSlice({
  name: "api",
  initialState: initialData,
  reducers: {},
  extraReducers: (
    builders: ActionReducerMapBuilder<{
      data: Array<{ [key: string]: any }>;
      status: string;
      error: {} | null;
    }>
  ) => {
    builders.addCase(fetchUserList.pending, (state, action) => {
      state.status = "loading";
    });

    builders.addCase(fetchUserList.rejected, (state, action) => {
      state.status = "error";
      state.data = [];
      state.error = action.error;
    });

    builders.addCase(fetchUserList.fulfilled, (state, action: any) => {
      state.status = "succeeded";
      state.data = action.payload.data;
      state.error = null;
    });
    builders.addCase(fetchUser.pending, (state, action) => {
      state.status = "loading";
    });

    builders.addCase(fetchUser.rejected, (state, action) => {
      state.status = "error";
      state.data = [];
      state.error = action.error;
    });

    builders.addCase(fetchUser.fulfilled, (state, action: any) => {
      state.status = "succeeded";
      const newUser = action.payload?.data;
      const users: Array<any> = JSON.parse(
        JSON.stringify(state.data || [])
      );

      let index = users.findIndex((e) => e?.id === newUser?.id);

      if (index >= 0) {
        users[index] = newUser;
      } else {
        users.push(newUser);
      }
      state.data = users;
      state.error = null;
    });
  },
});

// Function to select api slice root state
const selectApiRootState = (state: AppState): IApiSlice => state.api;

export const getUsers = createSelector<
  [(state: AppState) => IApiSlice],
  Array<{ [key: string]: any }>
>([selectApiRootState], (apiState) => apiState["data"]);

export const getUserById = (id: string) => (
  createSelector<
    [(state: AppState) => IApiSlice],
    { [key: string]: any }
  >([selectApiRootState], (apiState) => apiState["data"].find((user) => user?.id == id) || {}) 
)

export default apiSlice.reducer;

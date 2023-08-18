import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "@/app/store/store";
import { HYDRATE } from "next-redux-wrapper";

export interface UsersState {
  usersData: Array<string>;
  fetchingUsersState: string;
}

const initialState: UsersState = {
  usersData: [],
  fetchingUsersState: 'loading',
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersData(state, action) {
      state.usersData = action.payload;
    },
    setFetchingUsersState(state, action) {
      state.fetchingUsersState = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.users,
      };
    },
  },
});

export const { setUsersData, setFetchingUsersState } = usersSlice.actions;

export const selectUsersData = (state: AppState) => state.users?.usersData;
export const selectFetchingUsersState = (state: AppState) => state.users?.fetchingUsersState;

export default usersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "@/app/store/store";
import { HYDRATE } from "next-redux-wrapper";

export interface EditUserState {
  editUserData: Record<string, any>;
  fetchingUserState: string;
}

const initialState: EditUserState = {
  editUserData: {},
  fetchingUserState: 'loading',
};

export const editUserSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    setEditUserData(state, action) {
      state.editUserData = action.payload;
    },
    setFetchingUserState(state, action) {
      state.fetchingUserState = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.editUser,
      };
    },
  },
});

export const { setEditUserData, setFetchingUserState } = editUserSlice.actions;

export const selectEditUserData = (state: AppState) => state.editUser?.editUserData;
export const selectFetchingUserState = (state: AppState) => state.editUser?.fetchingUserState;

export default editUserSlice.reducer;

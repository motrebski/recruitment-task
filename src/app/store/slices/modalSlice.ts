import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "@/app/store/store";
import { HYDRATE } from "next-redux-wrapper";

export interface ModalState {
  modalState: boolean;
  modalUser: Record<string, any>;
}

const initialState: ModalState = {
  modalState: false,
  modalUser: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalState(state, action) {
      state.modalState = action.payload;
    },
    setModalUser(state, action) {
      state.modalUser = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.modal,
      };
    },
  },
});

export const { setModalState, setModalUser } = modalSlice.actions;

export const selectModalState = (state: AppState) => state.modal?.modalState;
export const selectModalUser = (state: AppState) => state.modal?.modalUser;

export default modalSlice.reducer;

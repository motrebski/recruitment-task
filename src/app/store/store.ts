import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { modalSlice } from "@/app/store/slices/modalSlice";
import { usersSlice } from "@/app/store/slices/usersSlice";
import { editUserSlice } from "@/app/store/slices/editUserSlice";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  [modalSlice.name]: modalSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
  [editUserSlice.name]: editUserSlice.reducer,
});

export const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const makeStore = () => {
  return makeConfiguredStore();
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

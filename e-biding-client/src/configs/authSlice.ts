/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IUser } from "../interfaces/user.interface";

export interface IInitialState {
  isAuthenticated: boolean;
  user: IUser | null;
}

const token = Cookies.get("client-token"); // Adjust the key name as needed
const user = localStorage.getItem("@EBD_CLIENT");
const initialState: IInitialState = {
  isAuthenticated: token ? true : false,
  user: user ? JSON.parse(user!) : null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ data: IUser; access_token: string }>
    ) => {
      state.user = action.payload.data;
      state.isAuthenticated = !!action.payload.access_token;

      Cookies.set("client-token", action.payload.access_token, { expires: 7 });
      localStorage.setItem("@EBD_CLIENT", JSON.stringify(state.user));
    },
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;

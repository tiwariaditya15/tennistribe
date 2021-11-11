import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./authSlice.types";

const initialState: AuthState = {
  logged: false,
  token: null,
  currentUser: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.error = null;
      state.token = action.payload;
    },
    removeToken(state) {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;

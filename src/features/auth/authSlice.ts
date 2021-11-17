import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../app/services/auth";
import { TAuthState } from "./authSlice.types";

const initialState: TAuthState = {
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
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.error = null;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.logged = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        state.error = null;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.logged = true;
      }
    );
  },
});

export const { setToken, removeToken, setError } = authSlice.actions;
export default authSlice.reducer;

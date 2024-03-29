import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, JWTError } from "../../app/services/auth";
import { AuthState } from "./authSlice.types";

const initialState: AuthState = {
  logged: localStorage.getItem("tennistribe_token") ? true : false,
  token: localStorage.getItem("tennistribe_token")
    ? localStorage.getItem("tennistribe_token")
    : null,
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
    logout(state) {
      state.logged = false;
      state.token = null;
      localStorage.removeItem("tennistribe_token");
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    addFollower(
      state,
      action: PayloadAction<{ name: string; username: string; email: string }>
    ) {
      state.currentUser?.following.push(action.payload);
    },
    removeFollower(state, action: PayloadAction<{ username: string }>) {
      if (!state.currentUser) return;
      state.currentUser.following = state.currentUser?.following.filter(
        (user) => user.username !== action.payload.username
      );
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
    builder.addMatcher(
      authApi.endpoints.validateToken.matchFulfilled,
      (state, action) => {
        if (action.payload.user) {
          state.currentUser = action.payload.user;
          state.error = null;
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.validateToken.matchRejected,
      (
        state,
        {
          payload: { data },
        }: PayloadAction<{ status: number; data: { error: JWTError } }>
      ) => {
        if (
          data &&
          "name" in data.error &&
          data.error.name === "TokenExpiredError"
        ) {
          state.logged = false;
          state.token = null;
          state.error = "Token expired.";
          state.currentUser = null;
          localStorage.removeItem("tennistribe_token");
        }
      }
    );
  },
});

export const { setToken, logout, setError, addFollower, removeFollower } =
  authSlice.actions;
export default authSlice.reducer;

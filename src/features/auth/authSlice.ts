import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import * as api from "../../app/api/auth";
import {
  TAuthState,
  TSignIn,
  TServerError,
  TSignUpBody,
} from "./authSlice.types";

export const signIn = createAsyncThunk<string | { error: string }, TSignIn>(
  "auth/signin",
  async (credentials: TSignIn, { rejectWithValue }) => {
    try {
      const response = await api.signin(
        credentials.username,
        credentials.password
      );
      return response.data.token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<TServerError>;
        if (serverError && serverError.response) {
          return rejectWithValue(serverError.response.data);
        }
      }

      return rejectWithValue({ error: "Something went wrong!" });
    }
  }
);

export const signUp = createAsyncThunk<string, TSignUpBody>(
  "auth/signup",
  async (body: TSignUpBody, { rejectWithValue }) => {
    try {
      const response = await api.signup(body);
      return response.data.token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<TServerError>;
        if (serverError && serverError.response) {
          return rejectWithValue(serverError.response.data);
        }
      }

      return rejectWithValue({ error: "Something went wrong!" });
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.logged = true;
        state.error = null;
        if (typeof action.payload === "string") {
          state.token = action.payload;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        // @ts-ignore
        state.error = action.payload.error;
      });

    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.logged = true;
        state.error = null;
        state.token = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        // @ts-ignore
        state.error = action.payload.error;
      });
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export type User = {
  name: string;
  username: string;
  email: string;
  joined: string;
};

type UserResponse = {
  user: User;
  token: string;
};

type LoginRequest = {
  username: string;
  password: string;
};

type SignResponse = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://tennistribeApi.tiwariaditya.repl.co/accounts",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<UserResponse, SignResponse>({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

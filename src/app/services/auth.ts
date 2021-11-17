import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export type TUser = {
  name: string;
  username: string;
  email: string;
  joined: string;
};

type TUserResponse = {
  user: TUser;
  token: string;
};

type TLoginRequest = {
  username: string;
  password: string;
};

type TSignResponse = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/accounts/",
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
    login: builder.mutation<TUserResponse, TLoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<TUserResponse, TSignResponse>({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

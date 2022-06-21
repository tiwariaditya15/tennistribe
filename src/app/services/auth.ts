import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export type User = {
  name: string;
  username: string;
  email: string;
  joined: string;
  following: { name: string; username: string; email: string }[];
  followedBy: { name: string; username: string; email: string }[];
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

export type JWTError = {
  name: string;
  message: string;
  expiredAt: string;
};

type TokenValidattion = {
  user?: User;
  error?: JWTError;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env["VITE_ENDPOINT"] as string}/accounts`,
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
  tagTypes: [],
  endpoints: (builder) => ({
    validateToken: builder.query<TokenValidattion, void>({
      query: () => "/validate",
    }),
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

export const { useValidateTokenQuery, useLoginMutation, useSignupMutation } =
  authApi;

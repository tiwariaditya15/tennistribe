import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store";
import { User } from "./auth";

type FollowResponse = {
  followed: boolean;
};

// http://localhost:5000/users
// https://tennistribeApi.tiwariaditya.repl.co/users

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/users",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: `profile`,
      }),
    }),
    follow: builder.mutation<FollowResponse, string>({
      query: (followId) => ({
        url: `follow`,
        method: "POST",
        body: {
          followId,
        },
      }),
    }),
  }),
});

export const { useFollowMutation, useGetCurrentUserQuery } = usersApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store";
import { User } from "./auth";
import { Post } from "./posts";

type FollowResponse = {
  followed: boolean;
};

type UsersReponse = {
  users: Partial<User>[];
};

type ProfileResponse = {
  user: User;
  posts: Post[];
};

// http://localhost:8000/users
// https://tennistribeApi.tiwariaditya.repl.co/users

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/users",
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
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersReponse, void>({
      query: () => `/`,
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(
                (user: Partial<User>) =>
                  ({
                    type: "Users",
                    id: user.username,
                  } as const)
              ),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: `profile`,
      }),
    }),
    follow: builder.mutation<FollowResponse, string>({
      query: (username) => ({
        url: `follow`,
        method: "POST",
        body: {
          username,
        },
      }),
    }),
    unfollow: builder.mutation<FollowResponse, string>({
      query: (username) => ({
        url: `unfollow`,
        method: "POST",
        body: {
          username,
        },
      }),
    }),
    getProfile: builder.query<ProfileResponse, string>({
      query: (username) => `profile/${username}`,
    }),
  }),
});

export const {
  useFollowMutation,
  useGetCurrentUserQuery,
  useGetUsersQuery,
  useUnfollowMutation,
  useGetProfileQuery,
} = usersApi;

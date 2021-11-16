import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type TUser = {
  email: string;
  name: string;
  username: string;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/accounts/users",
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
    getCurrentUser: builder.query<TUser, void>({
      query: () => `/`,
    }),
  }),
});

export const { useGetCurrentUserQuery } = authApi;

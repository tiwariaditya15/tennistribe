import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "`http://localhost:5000/posts/`" }),
  endpoints: (builder) => ({}),
});

export const {} = postsApi;

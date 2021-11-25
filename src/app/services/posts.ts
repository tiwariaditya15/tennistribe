import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type Author = {
  name: string;
  username: string;
  email: string;
};

export type Post = {
  id: string;
  content: string;
  reactions: number;
  timestamp: string;
  media?: string;
  author: Author;
  comments: any;
};

type PostsReponse = {
  posts: Post[];
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 5 });

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsReponse, void>({
      query: () => "posts",
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: "Posts", id } as const)),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    // addComment: builder.mutation
  }),
});

export const { useAddPostMutation, useGetPostsQuery } = postsApi;

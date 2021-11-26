import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type Author = {
  id?: string;
  name: string;
  username: string;
  email: string;
};

export type Comment = {
  id: string;
  comment: string;
  author: Author;
  post: Post;
};

export type Post = {
  id: string;
  content: string;
  reactions: number;
  timestamp: string;
  media?: string;
  author: Author;
  comments: Comment[];
};

type PostsReponse = {
  posts: Post[];
};

type CommentResponse = {
  id: string;
  comment: string;
  postId: string;
  authorId: string;
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
    addComment: builder.mutation<CommentResponse, Partial<CommentResponse>>({
      query: (body) => ({
        url: "comments",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
  }),
});

export const { useAddPostMutation, useGetPostsQuery, useAddCommentMutation } =
  postsApi;

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

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
  postId?: string;
  authorId?: string;
};

export type Post = {
  id: string;
  content: string;
  reactions: number;
  timestamp: string;
  media?: string;
  author: Author;
  comments: Comment[];
  likedBy: User[];
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

type PostResponse = {
  post: Post;
  message: string;
  postId: string;
};

type RemoveResponse = {
  postId: string;
};

type ToggleReactionResponse = {
  postId: string;
  message: string;
};

// http://localhost:8000
// https://tennistribeApi.tiwariaditya.repl.co

const baseQuery = fetchBaseQuery({
  baseUrl: "https://tennistribeApi.tiwariaditya.repl.co",
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
    getFeed: builder.query<PostsReponse, void>({
      query: () => "posts",
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: "Posts", id } as const)),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getPost: builder.query<PostResponse, string>({
      query: (postId) => `posts/${postId}`,
      providesTags: (result) => [{ type: "Posts", id: result?.post.id }],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    removePost: builder.mutation<RemoveResponse, string>({
      query: (postId) => ({
        url: "posts/delete",
        method: "POST",
        body: { postId },
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    addComment: builder.mutation<CommentResponse, Partial<CommentResponse>>({
      query: (body) => ({
        url: "comments",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Posts", id: result?.postId },
      ],
    }),
    removeComment: builder.mutation<RemoveResponse, Partial<Comment>>({
      query: (body) => ({
        url: "comments/delete",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Posts", id: result?.postId },
      ],
    }),
    toggleReaction: builder.mutation<ToggleReactionResponse, string>({
      query: (postId) => ({
        url: "reactions/toggle",
        method: "POST",
        body: {
          postId,
        },
      }),
      invalidatesTags: (result, error) => [
        { type: "Posts", id: result?.postId },
      ],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetFeedQuery,
  useGetPostQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useRemovePostMutation,
  useToggleReactionMutation,
} = postsApi;

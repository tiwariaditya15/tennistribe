import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { postsApi } from "../../app/services/posts";
import { Post } from "../../app/services/posts";
import { RootState } from "../../app/store";
const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
});

const postSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState(),
  reducers: {
    removeAllPosts: postsAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postsApi.endpoints.getFeed.matchFulfilled,
      (state, action) => {
        postsAdapter.upsertMany(state, action.payload.posts);
      }
    );
  },
});

export const { selectById: selectPostById } = postsAdapter.getSelectors(
  (state: RootState) => state.posts
);
export const { removeAllPosts } = postSlice.actions;

export default postSlice.reducer;

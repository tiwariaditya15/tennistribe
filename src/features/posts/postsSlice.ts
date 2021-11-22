import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { postsApi } from "../../app/services/posts";
import { Post } from "../../app/services/posts";

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
});

const postSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      postsApi.endpoints.getPosts.matchFulfilled,
      (state, action) => {
        postsAdapter.upsertMany(state, action.payload.posts);
      }
    );
  },
});

export default postSlice.reducer;

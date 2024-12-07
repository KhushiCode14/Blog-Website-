// src/redux/postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
});

export const { setPosts, setComments, addComment } = postSlice.actions;
export default postSlice.reducer;

// create a redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/AuthSlice";
import postReducer from "./redux/PostSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});
export default store;

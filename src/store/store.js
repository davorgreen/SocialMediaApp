import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import PostsSlice from "../slices/PostsSlice";
import PhotoSlice from "../slices/PhotoSlice";
import CommentSlice from "../slices/CommentSlice";



const store = configureStore({
    reducer: {
        userStore: UserSlice,
        postsStore: PostsSlice,
        photoStore: PhotoSlice,
        commentStore: CommentSlice,

    },
})

export default store;
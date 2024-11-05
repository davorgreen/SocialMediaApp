import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import PostsSlice from "../slices/PostsSlice";
import PhotoSlice from "../slices/PhotoSlice";
import CommentSlice from "../slices/CommentSlice";
import CombinedSlice from '../slices/CombinedSlice'



const store = configureStore({
    reducer: {
        userStore: UserSlice,
        postsStore: PostsSlice,
        photoStore: PhotoSlice,
        commentStore: CommentSlice,
        combinedStore: CombinedSlice,
    },
})

export default store;
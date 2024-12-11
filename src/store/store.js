import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import PostsSlice from "../slices/PostsSlice";
import PhotoSlice from "../slices/PhotoSlice";
import CombinedSlice from '../slices/CombinedSlice'
import CommentSlice from '../slices/CommentShareLikesSlice'



const store = configureStore({
    reducer: {
        userStore: UserSlice,
        postsStore: PostsSlice,
        photoStore: PhotoSlice,
        commentShareLikesStore: CommentSlice,
        combinedStore: CombinedSlice,
    },
})

export default store;
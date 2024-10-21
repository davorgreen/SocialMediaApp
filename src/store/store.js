import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import PostsSlice from "../slices/PostsSlice";



const store = configureStore({
    reducer: {
        userStore: UserSlice,
        postsStore: PostsSlice,

    },
})

export default store;
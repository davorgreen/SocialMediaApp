import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import FriendsSlice from "../slices/FriendsSlice";
import PostsSlice from "../slices/PostsSlice";



const store = configureStore({
    reducer: {
        userStore: UserSlice,
        friendsStore: FriendsSlice,
        postsStore: PostsSlice,
    },
})

export default store;
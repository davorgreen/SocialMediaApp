import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import FriendsSlice from "../slices/FriendsSlice";


const store = configureStore({
    reducer: {
        userStore: UserSlice,
        friendsStore: FriendsSlice,
    },
})

export default store;
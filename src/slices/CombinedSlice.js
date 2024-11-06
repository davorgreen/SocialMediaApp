import { createSlice } from "@reduxjs/toolkit";



const CombinedSlice = createSlice({
    name: 'combined',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        mySavedPosts: [],
        myPosts: [],
    },
    reducers: {
        getUser: (state, action) => {
            console.log(action.payload)
            state.user = action.payload;
        },
        getUserSavedPosts: (state, action) => {
            console.log(action.payload)
            state.mySavedPosts = action.payload.filter((post) => post.savedBy.includes(state.user._id));
        },
        getOnlyUserPosts: (state, action) => {
            state.myPosts = action.payload.filter((post) => post.createdBy === state.user._id)
        }

    }

})

export const { getUser, getUserSavedPosts, getOnlyUserPosts } = CombinedSlice.actions;
export default CombinedSlice.reducer;
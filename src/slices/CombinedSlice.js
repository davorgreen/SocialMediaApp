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
            state.mySavedPosts = action.payload.filter((post) => post.savedBy.includes(state.user._id)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));;
        },
        getOnlyUserPosts: (state, action) => {
            state.myPosts = action.payload.filter((post) => post.createdBy === state.user._id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        addSharedPost: (state, action) => {
            state.mySavedPosts = [...state.mySavedPosts, action.payload];
            state.myPosts = [...state.myPosts, action.payload];
        },
        removePostFromProfile: (state, action) => {
            state.mySavedPosts = state.mySavedPosts.filter(post => post._id !== action.payload);
            state.myPosts = state.myPosts.filter(post => post._id !== action.payload);
        },

    }

})

export const { getUser, getUserSavedPosts, getOnlyUserPosts, removePostFromProfile, addSharedPost } = CombinedSlice.actions;
export default CombinedSlice.reducer;
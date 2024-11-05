import { createSlice } from "@reduxjs/toolkit";



const CombinedSlice = createSlice({
    name: 'combined',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        mySavedPosts: [],



    },
    reducers: {
        getUser: (state, action) => {
            console.log(action.payload)
            state.user = action.payload;
        },
        getUserPosts: (state, action) => {
            console.log(action.payload)
            state.mySavedPosts = action.payload.filter((post) => post.savedBy.includes(state.user._id));
        }
    }

})

export const { getUser, getUserPosts } = CombinedSlice.actions;
export default CombinedSlice.reducer;
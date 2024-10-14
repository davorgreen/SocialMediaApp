import { createSlice } from "@reduxjs/toolkit";



const PostsSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        savedPosts: JSON.parse(localStorage.getItem('savedPosts')) || [],
    },
    reducers: {
        AllPosts: (state, action) => {
            state.posts = action.payload;
        },
    }
});

export const { AllPosts, } = PostsSlice.actions;
export default PostsSlice.reducer;
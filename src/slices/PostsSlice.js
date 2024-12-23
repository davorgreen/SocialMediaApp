import { createSlice } from "@reduxjs/toolkit";

const PostsSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
    },
    reducers: {
        AllPosts: (state, action) => {
            state.posts = action.payload;
        },
        sharePost: (state, action) => {
            state.posts = [action.payload, ...state.posts];
        },
        savePost: (state, action) => {
            state.posts = [action.payload, ...state.myPosts];
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },
    }
});

export const { AllPosts, sharePost, savePost, removePost } = PostsSlice.actions;
export default PostsSlice.reducer;

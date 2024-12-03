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
            console.log(action.payload)
            state.posts = [...state.posts, action.payload];
            console.log(state.posts)
        },
        savePost: (state, action) => {
            state.posts = [...state.posts, action.payload];
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },
    }
});

export const { AllPosts, sharePost, savePost, removePost } = PostsSlice.actions;
export default PostsSlice.reducer;

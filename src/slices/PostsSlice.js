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
            const postExists = state.posts.some(post => post._id === action.payload._id);
            if (!postExists) {
                state.posts.push(action.payload);
            }
        },
        savePost: (state, action) => {
            const updatedPosts = state.posts.map(post => {
                return post._id === action.payload.post._id
                    ? { ...post, savedBy: [...post.savedBy, action.payload.userId] }
                    : post;
            });
            state.posts = updatedPosts;
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },
    }
});

export const { AllPosts, sharePost, savePost, removePost } = PostsSlice.actions;
export default PostsSlice.reducer;

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
        savePost: (state, action) => {
            const updatedPosts = state.posts.map(post => {
                return post._id === action.payload.post._id
                    ? { ...post, savedBy: [...post.savedBy, action.payload.userId] }
                    : post;
            });
            state.posts = updatedPosts;
        },
    }
});

export const { AllPosts, savePost } = PostsSlice.actions;
export default PostsSlice.reducer;

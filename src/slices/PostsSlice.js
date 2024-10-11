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
        postsForSave: (state, action) => {
            const receivedPost = action.payload;
            if (!state.savedPosts.some(post => post._id === receivedPost._id)) {
                state.savedPosts.push(receivedPost);
            }
            localStorage.setItem('savedPosts', JSON.stringify(state.savedPosts));
            console.log(state.savedPosts)

        }

    }
});

export const { AllPosts, postsForSave } = PostsSlice.actions;
export default PostsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";



const PostsSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
    },
    reducers: {
        AllPosts: (state, action) => {
            state.posts = action.payload;
            console.log(state.posts);
        }
    }
});

export const { AllPosts } = PostsSlice.actions;
export default PostsSlice.reducer;
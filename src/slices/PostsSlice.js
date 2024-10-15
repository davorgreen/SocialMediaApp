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
            const postToSave = action.payload;
            console.log(postToSave);

            if (!state.savedPosts.some(post => post._id === postToSave._id)) {
                state.savedPosts.push(postToSave); // Dodajte post u savedPosts
                localStorage.setItem('savedPosts', JSON.stringify(state.savedPosts)); // Čuvanje sačuvanih postova u localStorage
            }
        },
    }
});

export const { AllPosts, savePost } = PostsSlice.actions;
export default PostsSlice.reducer;
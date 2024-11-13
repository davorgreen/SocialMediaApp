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
        removePostFromProfile: (state, action) => {
            state.myPosts = state.myPosts.filter(post => post._id !== action.payload);
        },
        addSharedPost: (state, action) => {
            console.log(action.payload)
            state.myPosts = [...state.myPosts, action.payload];
        },
        addedShares: (state, action) => {
            const { postId, newShares } = action.payload;
            state.mySavedPosts = state.mySavedPosts.map(post => {
                return post._id === postId ? { ...post, shares: newShares } : post
            }

            );
            state.myPosts = state.myPosts.map(post => {
                return post._id === postId ? { ...post, shares: newShares } : post
            }
            );
        },
        addedLike: (state, action) => {
            const { postId, userId } = action.payload;
            state.myPosts = state.myPosts.map(post => {
                return post._Id === postId ? {
                    ...post, likes: post.likes.includes(userId) ? post.likes : [...post.likes, userId]
                } : post
            })

            state.mySavedPosts = state.mySavedPosts.map(post => {
                return post._Id === postId ? {
                    ...post, likes: post.likes.includes(userId) ? post.likes : [...post.likes, userId]
                } : post
            })
        }

    }

})

export const { getUser, getUserSavedPosts, getOnlyUserPosts, removePostFromProfile, addSharedPost, addedShares, addedLike } = CombinedSlice.actions;
export default CombinedSlice.reducer;
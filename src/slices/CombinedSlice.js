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
            state.user = action.payload;
        },
        getUserSavedPosts: (state, action) => {
            state.mySavedPosts = action.payload.filter((post) => post.savedBy.includes(state.user._id)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));;
        },
        getOnlyUserPosts: (state, action) => {
            state.myPosts = action.payload.filter((post) => post.createdBy === state.user._id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        removePostFromProfile: (state, action) => {
            state.myPosts = state.myPosts.filter(post => post._id !== action.payload);
        },
        addSharedPost: (state, action) => {
            state.myPosts = [action.payload, ...state.myPosts];
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
                if (post._id === postId) {
                    const isLiked = post.likes.includes(userId);
                    return {
                        ...post,
                        likes: isLiked
                            ? post.likes.filter(id => id !== userId)
                            : [...post.likes, userId]
                    };
                }
                return post;
            });

            state.mySavedPosts = state.mySavedPosts.map(post => {
                if (post._id === postId) {
                    const isLiked = post.likes.includes(userId);
                    return {
                        ...post,
                        likes: isLiked
                            ? post.likes.filter(id => id !== userId)
                            : [...post.likes, userId]
                    };
                }
                return post;
            });
        }

    }

})

export const { getUser, getUserSavedPosts, getOnlyUserPosts, removePostFromProfile, addSharedPost, addedShares, addedLike } = CombinedSlice.actions;
export default CombinedSlice.reducer;
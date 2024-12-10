import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";






const UserSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuth: localStorage.getItem('token') || false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        users: [],
        friends: [],
        suggestedFriends: [],
        myOrFriendsPosts: [],
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            state.isAuth = true;
            state.user = action.payload.user;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
            state.isAuth = false;
            state.user = null;
            localStorage.removeItem('user');
        },
        checkAuth: (state) => {
            if (state.token) {
                const decoded = jwtDecode(state.token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    state.isAuth = false;
                    state.token = null;
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                } else {
                    state.isAuth = true;
                }
            }
        },
        allUsers: (state, action) => {
            state.users = action.payload;
        },
        myFriends: (state, action) => {
            let filteredFriends = action.payload.map(friend => {
                return friend.userOneId === state.user._id ? friend.userTwoId : friend.userOneId;
            });
            filteredFriends = [...new Set(filteredFriends)];


            let result = state.users.filter(user => filteredFriends.includes(user._id));
            state.friends = result;
        },
        mySuggestedFriends: (state, action) => {
            let allSuggestedFriends = action.payload.filter(user => {
                return (
                    user._id !== state.user._id &&
                    !state.friends.some(friend => friend._id === user._id)
                );
            });
            state.suggestedFriends = allSuggestedFriends;
        },
        entirePosts: (state, action) => {
            state.myOrFriendsPosts = action.payload.filter(post =>
                post.createdBy === state.user._id || state.friends.some(friend => friend._id === post.createdBy)
            ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        },
        removePostsFromHomePage: (state, action) => {
            state.myOrFriendsPosts = state.myOrFriendsPosts.filter(post => post._id !== action.payload);
        },
        addPosts: (state, action) => {
            state.myOrFriendsPosts = [action.payload, ...state.myOrFriendsPosts];
        },
        addShares: (state, action) => {
            const { postId, newShares } = action.payload;
            state.myOrFriendsPosts = state.myOrFriendsPosts.map(post => {
                return post._id === postId ? { ...post, shares: newShares } : post
            });
        },
        addLikes: (state, action) => {
            const { postId, userId } = action.payload;
            state.myOrFriendsPosts = state.myOrFriendsPosts.map(post => {
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
        },
        addFriendToList: (state, action) => {
            const newFriend = action.payload;
            if (!state.friends.some(friend => friend._id === newFriend._id)) {
                state.friends.push(newFriend);
            }
        },
        removeSuggestedFriend: (state, action) => {
            const friendId = action.payload;
            state.suggestedFriends = state.suggestedFriends.filter(friend => friend._id !== friendId);
        },
    },

})


export const { login, logout, checkAuth, allUsers, myFriends, mySuggestedFriends, addFriendToList, removeSuggestedFriend, entirePosts, removePostsFromHomePage, addPosts, addShares, addLikes } = UserSlice.actions;
export default UserSlice.reducer;
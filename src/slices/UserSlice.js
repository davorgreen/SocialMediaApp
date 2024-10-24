import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";




const UserSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuth: localStorage.getItem('token') || false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        users: JSON.parse(localStorage.getItem('users')) || [],
        friends: JSON.parse(localStorage.getItem('friends')) || [],
        suggestedFriends: JSON.parse(localStorage.getItem('suggestedFriends')) || [],
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
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        mySuggestedFriends: (state, action) => {
            let allSuggestedFriends = action.payload.filter(user => {
                return (
                    user._id !== state.user._id &&
                    !state.friends.some(friend => friend._id === user._id)
                );
            });

            state.suggestedFriends = allSuggestedFriends;
            localStorage.setItem('suggestedFriends', JSON.stringify(state.suggestedFriends));
        },
        myFriends: (state, action) => {
            let filteredFriends = action.payload.map(friend => {
                return friend.userOneId === state.user._id ? friend.userTwoId : friend.userOneId;
            });
            filteredFriends = filteredFriends.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });

            let result = state.users.filter(user => filteredFriends.includes(user._id));
            state.friends = result;
            localStorage.setItem('friends', JSON.stringify(state.friends));
        },
        addFriendToList: (state, action) => {
            const newFriend = action.payload;
            if (!state.friends.some(friend => friend._id === newFriend._id)) {
                state.friends.push(newFriend);
                localStorage.setItem('friends', JSON.stringify(state.friends));
            }
        },
        removeSuggestedFriend: (state, action) => {
            const friendId = action.payload;
            state.suggestedFriends = state.suggestedFriends.filter(friend => friend._id !== friendId);
            localStorage.setItem('suggestedFriends', JSON.stringify(state.suggestedFriends));
        },
    },

})


export const { login, logout, checkAuth, allUsers, myFriends, mySuggestedFriends, addFriendToList, removeSuggestedFriend } = UserSlice.actions;
export default UserSlice.reducer;
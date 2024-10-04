import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";




const UserSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuth: localStorage.getItem('token') || false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        users: [],
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
        allUsers: (state, action) => {
            state.users = action.payload;
        },
        userData: (state, action) => {
            state.user = action.payload;
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
        }
    },

})


export const { login, logout, userData, checkAuth, allUsers } = UserSlice.actions;
export default UserSlice.reducer;
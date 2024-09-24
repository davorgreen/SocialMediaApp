import { createSlice } from "@reduxjs/toolkit";



const UserSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        isAuth: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isAuth = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.isAuth = false;
            state.user = null;
        },
        userData: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { login, logout, userData } = UserSlice.actions;
export default UserSlice.reducer;
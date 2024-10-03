import { createSlice } from "@reduxjs/toolkit";





const FriendsSlice = createSlice({
    name: 'friends',
    initialState: {
        friends: [],
        suggestedFriends: [],
        addedFriends: [],
    },
    reducers: {
        friendsData: (state, action) => {
            state.friends = action.payload;
            console.log(state.friends)
        },
        suggestedUsers: (state, action) => {
            state.suggestedFriends = action.payload;

        },
        saveFriends: (state, action) => {
            state.addedFriends = action.payload;
            console.log(state.addedFriends)
        },
    }
})

export const { friendsData, suggestedUsers, saveFriends, requestSent } = FriendsSlice.actions;
export default FriendsSlice.reducer;
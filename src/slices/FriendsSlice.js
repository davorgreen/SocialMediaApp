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


    }
})

export const { friendsData, suggestedUsers } = FriendsSlice.actions;
export default FriendsSlice.reducer;
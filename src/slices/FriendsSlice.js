import { createSlice } from "@reduxjs/toolkit";





const FriendsSlice = createSlice({
    name: 'friends',
    initialState: {
        friends: [],
        suggestedFriends: [],
        addedFriends: [],
        friendRequests: [],
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
        requestSent: (state, action) => {
            state.friendRequests = action.payload;
        }


    }
})

export const { friendsData, suggestedUsers, saveFriends, requestSent } = FriendsSlice.actions;
export default FriendsSlice.reducer;
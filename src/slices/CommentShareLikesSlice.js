import { createSlice } from "@reduxjs/toolkit";




const CommentShareLikesSlice = createSlice({
    name: 'comment',
    initialState: {
        comment: [],
    },
    reducers: {
        getComments: (state, action) => {
            state.comment = action.payload;
        },
        sendComment: (state, action) => {
            state.comment = action.payload;
        },
        removeComment: (state, action) => {
            state.comment = state.comment.filter(comm => comm._id !== action.payload);
        }
    }
})

export const { getComments, sendComment, removeComment } = CommentShareLikesSlice.actions;
export default CommentShareLikesSlice.reducer;
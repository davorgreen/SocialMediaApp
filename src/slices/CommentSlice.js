import { createSlice } from "@reduxjs/toolkit";




const CommentSlice = createSlice({
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

export const { getComments, sendComment, removeComment } = CommentSlice.actions;
export default CommentSlice.reducer;
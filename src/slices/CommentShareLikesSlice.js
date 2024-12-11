import { createSlice } from "@reduxjs/toolkit";



const CommentSlice = createSlice({
    name: 'comment',
    initialState: {
        commentsByPostId: {},
    },
    reducers: {
        getComments: (state, action) => {
            console.log(action.payload)
            const { postId, comments } = action.payload;
            state.commentsByPostId[postId] = comments;
        },
        sendComment: (state, action) => {
            const { postId, comment } = action.payload;
            console.log(action.payload)
            if (!state.commentsByPostId[postId]) {
                state.commentsByPostId[postId] = [];
            }
            state.commentsByPostId[postId].push(comment);

        },
        removeComment: (state, action) => {
            const { postId, commentId } = action.payload;
            console.log(action.payload)
            state.commentsByPostId[postId] = state.commentsByPostId[postId].filter(comment => comment._id !== commentId);

        }
    }
});

export const { getComments, sendComment, removeComment } = CommentSlice.actions;
export default CommentSlice.reducer;

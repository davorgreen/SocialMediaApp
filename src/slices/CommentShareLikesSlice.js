import { createSlice } from "@reduxjs/toolkit";



const CommentShareLikesSlice = createSlice({
    name: 'comment',
    initialState: {
        commentsByPostId: {},
    },
    reducers: {
        getComments: (state, action) => {
            const { postId, comments } = action.payload;
            state.commentsByPostId[postId] = comments;
        },
        sendComment: (state, action) => {
            const { postId, comment } = action.payload;
            if (!state.commentsByPostId[postId]) {
                state.commentsByPostId[postId] = [];
            }
            state.commentsByPostId[postId].push(comment);

        },
        removeComment: (state, action) => {
            const { postId, commentId } = action.payload;
            state.commentsByPostId[postId] = state.commentsByPostId[postId].filter(comment => comment._id !== commentId);

        }
    }
});

export const { getComments, sendComment, removeComment } = CommentShareLikesSlice.actions;
export default CommentShareLikesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.servise";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestField: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter((u) => u._id !== action.payload);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestField, commentCreated, commentRemoved } = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestField(error.message));
    }
};

export const createNewComment = (data, userId, currentUserId) => async (dispatch) => {
    const comment = {
        ...data,
        _id: nanoid(),
        pageId: userId,
        created_at: Date.now(),
        userId: currentUserId
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestField(error.message));
    }
};

export const getRemoveComment = (id) => async (dispatch) => {
    try {
        await commentService.removeComment(id);
        dispatch(commentRemoved(id));
    } catch (error) {
        dispatch(commentsRequestField(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;

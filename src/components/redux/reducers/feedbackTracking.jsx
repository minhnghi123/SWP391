


import { createSlice } from '@reduxjs/toolkit';
const feedbackTrackingSlice = createSlice({
    name: 'feedbackTracking',
    initialState: {
        feedbackTracking: [],
        loading: false,
        error: null,
        user: [],
    },
    reducers: {
        setFeedbackTracking: (state, action) => {
            state.feedbackTracking = action.payload;
        },
        setLoading: (state, action) => {    
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const feedbackTrackingActions = feedbackTrackingSlice.actions;
export default feedbackTrackingSlice;


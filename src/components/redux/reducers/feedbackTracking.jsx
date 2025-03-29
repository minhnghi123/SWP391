import { createSlice } from '@reduxjs/toolkit';

const feedbackTrackingSlice = createSlice({
    name: 'feedbackTracking',
    initialState: {
        feedbackTracking: [],
        loading: false,
        error: null,
        user: [],
        feedback: [],
        tempFeedback: [], // Thêm state mới để lưu feedback tạm thời (rating <= 3)
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
        setFeedback: (state, action) => {
            state.feedback = action.payload;
        },
        setPostFeedback: (state, action) => {
            const newFeedback = {
                id: Date.now(), // Sử dụng timestamp để đảm bảo ID unique
                userId: Number(action.payload.userId),
                ratingScore: Number(action.payload.ratingScore),
                description: action.payload.description,
                isTemp: action.payload.ratingScore <= 3 // Thêm flag để phân biệt feedback tạm thời
            };
            
            if (newFeedback.ratingScore <= 3) {
                // Nếu rating <= 3, chỉ thêm vào tempFeedback để hiển thị trên UI
                state.tempFeedback.unshift(newFeedback);
            } else {
                // Nếu rating > 3, thêm vào feedback chính để lưu DB
                state.feedback.unshift(newFeedback);
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const feedbackTrackingActions = feedbackTrackingSlice.actions;
export default feedbackTrackingSlice;
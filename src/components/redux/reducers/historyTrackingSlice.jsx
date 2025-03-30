

import { configureStore, createSlice } from "@reduxjs/toolkit";



const historyTrackingSlice = createSlice({
    name: 'historyTracking',
    initialState: {
        historyTracking: [],
        booking: [],
        loading: false,
        error: null
    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;

        },
        setHistoryTracking(state, action) {
            state.historyTracking = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setBooking(state, action) {
            state.booking = action.payload;
        }
    }
})


export const historyTrackingActions = historyTrackingSlice.actions;
export default historyTrackingSlice;

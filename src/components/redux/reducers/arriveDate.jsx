import { createSlice } from "@reduxjs/toolkit";

const arriveDateSlice = createSlice({
    name: 'arriveDate',
    initialState: { arriveDate: null }, 
    reducers: {
        setArriveDate: (state, action) => {
            // Kiểm tra xem payload có hợp lệ không
            const date = action.payload ? new Date(action.payload) : null;
            state.arriveDate = date ? date.toLocaleDateString("vi-VN") : null;
        }
    }
});

export const arriveActions = arriveDateSlice.actions;
export default arriveDateSlice;

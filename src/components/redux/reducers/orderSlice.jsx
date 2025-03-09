import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderData: null
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        savePaymentData: (state, action) => {
            state.orderData = action.payload;
        },
        resetOrderData: (state) => {
            state.orderData = null;
        }
        
    }
});

export const orderAction = paymentSlice.actions;
export default paymentSlice

import { createSlice } from "@reduxjs/toolkit";

const menthodPaymentSlice = createSlice({
    name: 'methodPayment',
    initialState: { methodPayment:1 },
    reducers: {
        setMethodPayment(state, action) {
            state.methodPayment = action.payload
        },
        resetMethodPayment(state) {
            state.methodPayment = 1
        }
        
    }

})
export const methodPaymentAction = menthodPaymentSlice.actions;
export default menthodPaymentSlice;
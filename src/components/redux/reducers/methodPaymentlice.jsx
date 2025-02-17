import { createSlice } from "@reduxjs/toolkit";

const menthodPaymentSlice = createSlice({
    name: 'methodPayment',
    initialState: { methodPayment:1 },
    reducers: {
        setMethodPayment(state, action) {
            state.methodPayment = action.payload
        }
    }

})
export const methodPaymentAction = menthodPaymentSlice.actions;
export default menthodPaymentSlice;
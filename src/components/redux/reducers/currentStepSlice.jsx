import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        currentStep: 1
    },
    reducers: {
        increaseStep(state) {
            if (state.currentStep < 3) {
                state.currentStep += 1;
            }
        },
        decreaseStep(state) {
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },
        resetStep: (state) => {
            state.currentStep = 1;
        },
    },
});

export const currenStepAction = paymentSlice.actions;
export default paymentSlice;

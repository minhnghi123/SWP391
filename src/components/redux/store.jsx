
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/authSlice";
import childrenSelectSlice from "./reducers/selectChildren";
import selectVaccineSlice from "./reducers/SelectVaccine";
import accountSlice from "./reducers/accountSlice";
import menthodPaymentSlice from "./reducers/methodPaymentlice";
import arrvieDateSlice from "./reducers/arriveDate";
import paymentSlice from "./reducers/currentStepSlice";
import orderSlice from "./reducers/orderSlice";

// import feedbackSlice from "./reducers/feebackSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        account: accountSlice.reducer,
        vaccine: selectVaccineSlice.reducer,
        children: childrenSelectSlice.reducer,
        methodPayment: menthodPaymentSlice.reducer,
        arriveDate: arrvieDateSlice.reducer,
        payment: paymentSlice.reducer,
        profilechildren:childrenSelectSlice.reducer,
        order:orderSlice.reducer



        // feedback:feedbackSlice.reducer
    }
})
export default store

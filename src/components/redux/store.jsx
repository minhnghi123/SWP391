import { configureStore } from "@reduxjs/toolkit";
import childrenSelectSlice from "./reducers/selectChildren";
import selectVaccineSlice from "./reducers/SelectVaccine";
import accountSlice from "./reducers/accountSlice";
import menthodPaymentSlice from "./reducers/methodPaymentlice";
import dataUserSlice from "./reducers/dataUser";
import feedbackTrackingSlice from "./reducers/feedbackTracking";
const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        vaccine: selectVaccineSlice.reducer,
        children: childrenSelectSlice.reducer,
        methodPayment: menthodPaymentSlice.reducer,
        profilechildren: childrenSelectSlice.reducer,




        // api
        // dataUser:dataUserSlice.reducer
        feedbackTracking: feedbackTrackingSlice.reducer


    },
})
export default store

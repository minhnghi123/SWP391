import { configureStore } from "@reduxjs/toolkit";
import childrenSelectSlice from "./reducers/selectChildren";
import selectVaccineSlice from "./reducers/selectVaccine";
import accountSlice from "./reducers/accountSlice";
import menthodPaymentSlice from "./reducers/methodPaymentlice";
import feedbackTrackingSlice from "./reducers/feedbackTracking";
import historyTrackingSlice from "./reducers/historyTrackingSlice";
import locationSlice from "./reducers/locationBooking";
const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    vaccine: selectVaccineSlice.reducer,
    children: childrenSelectSlice.reducer,
    methodPayment: menthodPaymentSlice.reducer,
    profilechildren: childrenSelectSlice.reducer,
    location: locationSlice.reducer,
    feedbackTracking: feedbackTrackingSlice.reducer,
    historyTracking: historyTrackingSlice.reducer,
  },
});
export default store;

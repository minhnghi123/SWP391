import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/authSlice";
import childrenSelectSlice from "./reducers/selectChildren";
import selectVaccineSlice from "./reducers/SelectVaccine";
import accountSlice from "./reducers/accountSlice";

// import feedbackSlice from "./reducers/feebackSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        account: accountSlice.reducer,
        vaccine: selectVaccineSlice.reducer,
        children: childrenSelectSlice.reducer,
   

        // feedback:feedbackSlice.reducer
    }
})
export default store
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/authSlice";
import childrenSelectSlice from "./reducers/selectChildren";
import selectVaccineSlice from "./reducers/SelectVaccine";

// import feedbackSlice from "./reducers/feebackSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        children:childrenSelectSlice.reducer,
        vaccine :selectVaccineSlice.reducer,
        // feedback:feedbackSlice.reducer
    }
})
export default store
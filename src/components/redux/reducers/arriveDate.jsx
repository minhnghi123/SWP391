import { createSlice } from "@reduxjs/toolkit";

const arriveDateSlice = createSlice({
    name: 'arriveDate',
    initialState: { arriveDate: null },
    reducers: {
        setArriveDate: (state, action) => {
           state.arriveDate = action.payload; 
        },
        resetArriveDate:(state)=>{
            state.arriveDate=null
        }
    }
});


export const arriveActions = arriveDateSlice.actions;
export default arriveDateSlice;


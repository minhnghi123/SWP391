import { createSlice } from "@reduxjs/toolkit";
// import { fetchDataChild } from "../actions/fetchChildrenUser";

const childrenSelectSlice = createSlice({
    name: "children",
    initialState: {
        user: null,
        listChildren: [],
        inputData: {},
        loading: false, 
        error: null,
    },
    reducers: {
        chooseChildren(state, action) {
            const newChild = action.payload;
            const existingChild = state.listChildren.find(child => child.id === newChild.id);

            if (existingChild) {
                state.listChildren = state.listChildren.filter(child => child.id !== newChild.id);
            } else {
                state.listChildren.push({
                    id: newChild.id,
                    name: newChild.name,
                    dateOfBirth: newChild.dateOfBirth,
                    dateInject: newChild.dateInject,
                    gender: newChild.gender,
                    advisory: newChild.advisory, // Fixed typo
                });
            }
        },
        deleteChild(state, action) {
            state.listChildren = state.listChildren.filter(child => child.id !== action.payload.id);
        },
        handleOnChange(state, action) {
            const { name, value } = action.payload;
            state.inputData[name] = value;
        },
        // addChild(state, action) { 
        //     state.listChildren.push(action.payload);
        // }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchDataChild.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(fetchDataChild.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.user = action.payload;
    //         })
    //         .addCase(fetchDataChild.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload;
    //         });
    // }
});

export const childAction = childrenSelectSlice.actions;
export default childrenSelectSlice;

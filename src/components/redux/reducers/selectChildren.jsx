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
        replaceData(state, action) {
            state.listChildren = action.payload
        },
        chooseChildren(state, action) {
            const newChild = action.payload;
            const existingChild = state.listChildren.find(child => child.id === newChild.id);

            if (existingChild) {
                state.listChildren = state.listChildren.filter(child => child.id !== newChild.id);

            } else {
                state.listChildren.push({
                    parentID: newChild.parentID,
                    id: newChild.id,
                    name: newChild.name,
                    dateOfBirth: newChild.dateOfBirth,
                    gender: newChild.gender,
                    status: newChild.status,
                    createDate: newChild.createDate

                });
            }
            state.listChildren.length > 0
                ? localStorage.setItem('ListChildren', JSON.stringify(state.listChildren))
                : localStorage.removeItem('ListChildren');

        },
        deleteChild(state, action) {
            const id = action.payload;
            const existingChild = state.listChildren.find(child => child.id === id);
            if (!existingChild) return;
            state.listChildren = state.listChildren.filter(child => child.id !== id);
            state.listChildren.length > 0
                ? localStorage.setItem('ListChildren', JSON.stringify(state.listChildren))
                : localStorage.removeItem('ListChildren');
        },  
        handleOnChange(state, action) {
            const { name, value } = action.payload;
            state.inputData = {
                ...state.inputData,
                [name]: value,
            };
        }

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

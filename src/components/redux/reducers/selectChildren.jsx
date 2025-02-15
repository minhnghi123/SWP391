import { createSlice } from "@reduxjs/toolkit";
// import { fetchDataChild } from "../actions/fetchChildrenUser";
let storeChildList = [];
try {
    storeChildList = JSON.parse(localStorage.getItem('ListChildren')) || [];
} catch (error) {
    console.error('Error parsing ListChildren from localStorage:', error);
}

const childrenSelectSlice = createSlice({
    name: "children",
    initialState: {
        user: null,
        listChildren: storeChildList,
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
        },
        completePayment(state) {
            state.listChildren = [];
            state.inputData = {};

            // Remove from localStorage
            localStorage.removeItem('ListChildren');

        }


    },

});

export const childAction = childrenSelectSlice.actions;
export default childrenSelectSlice;

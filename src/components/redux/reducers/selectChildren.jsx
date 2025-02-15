
import { createSlice } from "@reduxjs/toolkit";
const childrenSelectSlice = createSlice({
    name: "children",
    initialState: {
        user: null,
        advitory_detail: {},
        listChildren: [],
        inputData: {},
        loading: false,
        error: null,

    },
    reducers: {
        replaceAdvitory(state, action) {
            state.advitory_detail = action.payload
        },
        resetForm(state){
            state.advitory_detail={}
        },
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
                    createDate:newChild.createDate
                });
            }


        },
        deleteChild(state, action) {
            const id = action.payload;
            const existingChild = state.listChildren.find(child => child.id === id);
            if (!existingChild) return;
            state.listChildren = state.listChildren.filter(child => child.id !== id);

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


        }


    },

});

export const childAction = childrenSelectSlice.actions;
export default childrenSelectSlice;

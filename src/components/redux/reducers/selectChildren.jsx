import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, defaultValue) => {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(defaultValue) && !Array.isArray(data)) return defaultValue;
        if (typeof defaultValue === 'number' && typeof data !== 'number') return defaultValue;
        return data ?? defaultValue;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

let storedChildrenList = loadFromLocalStorage('ChildrenList', []);

const childrenSelectSlice = createSlice({
    name: "children",
    initialState: {
        user: null,
        advitory_detail: {},
        listChildren: storedChildrenList,
        inputData: {},
        loading: false,
        error: null,
    },
    reducers: {
        replaceAdvitory(state, action) {
            state.advitory_detail = action.payload;
        },
        resetForm(state) {
            state.advitory_detail = {};
        },
        replaceData(state, action) {
            state.listChildren = action.payload;
            if (state.listChildren.length > 0) {
                localStorage.setItem('ChildrenList', JSON.stringify(state.listChildren));
            } else {
                localStorage.removeItem('ChildrenList');
            }
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
                    createdAt: newChild.createdAt
                });
            }

            if (state.listChildren.length > 0) {
                localStorage.setItem('ChildrenList', JSON.stringify(state.listChildren));
            } else {
                localStorage.removeItem('ChildrenList');
            }
        },
        deleteChild(state, action) {
            const id = action.payload;
            state.listChildren = state.listChildren.filter(child => child.id !== id);

            if (state.listChildren.length > 0) {
                localStorage.setItem('ChildrenList', JSON.stringify(state.listChildren));
            } else {
                localStorage.removeItem('ChildrenList');
            }
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

            localStorage.removeItem('ChildrenList');
        }
    },
});

export const childAction = childrenSelectSlice.actions;
export default childrenSelectSlice;

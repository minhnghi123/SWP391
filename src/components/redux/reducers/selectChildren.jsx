import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, defaultValue) => {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        if (defaultValue instanceof Array && !(data instanceof Array)) return defaultValue;
        if (typeof defaultValue === 'number' && typeof data !== 'number') return defaultValue;
        return data ?? defaultValue;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

// Load initial values from localStorage
const storedChildrenList = loadFromLocalStorage('ChildrenList', []);
const storedArriveDate = loadFromLocalStorage('ArriveDate', null);
const storedAdvitoryDetail = loadFromLocalStorage('AdvitoryDetail', null);

const childrenSelectSlice = createSlice({
    name: "children",
    initialState: {
        user: null,
        advitory_detail: storedAdvitoryDetail,
        listChildren: storedChildrenList,
        arriveDate: storedArriveDate, // Load from localStorage
        inputData: {},
        loading: false,
        error: null,
    },
    reducers: {
        setArriveDate: (state, action) => {
            state.arriveDate = action.payload;
            if (action.payload) {
                localStorage.setItem('ArriveDate', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('ArriveDate');
            }
        },
        resetArriveDate: (state) => {
            state.arriveDate = null;
            localStorage.removeItem('ArriveDate');
        },
        replaceAdvitory(state, action) {
            state.advitory_detail = action.payload;
            if (action.payload) {
                localStorage.setItem('AdvitoryDetail', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('AdvitoryDetail');
            }
        },
        resetListChildren(state) {
            state.listChildren = [];
            localStorage.removeItem('ChildrenList');
        },
        resetForm(state) {
            state.advitory_detail = null;
            localStorage.removeItem('AdvitoryDetail');
        },
        replaceData(state, action) {
            state.listChildren = action.payload;
            if (Array.isArray(action.payload) && action.payload.length > 0) {
                localStorage.setItem('ChildrenList', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('ChildrenList');
            }
        },
        chooseChildren(state, action) {
            const newChild = action.payload;
            const index = state.listChildren.findIndex(child => child.id === newChild.id);

            if (index !== -1) {
                state.listChildren.splice(index, 1);
            } else {
                state.listChildren.push(newChild);
            }

            if (state.listChildren.length > 0) {
                localStorage.setItem('ChildrenList', JSON.stringify(state.listChildren));
            } else {
                localStorage.removeItem('ChildrenList');
            }
        },
        deleteChild(state, action) {
            state.listChildren = state.listChildren.filter(child => child.id !== action.payload);
            if (state.listChildren.length > 0) {
                localStorage.setItem('ChildrenList', JSON.stringify(state.listChildren));
            } else {
                localStorage.removeItem('ChildrenList');
            }
        },
        handleOnChange(state, action) {
            const { name, value } = action.payload;
            state.inputData[name] = value;
        },
        completePayment(state) {
            state.listChildren = [];
            state.inputData = {};
            state.arriveDate = null;
            state.advitory_detail = null;
            // Remove from localStorage
            localStorage.removeItem('ChildrenList');
            localStorage.removeItem('ArriveDate');
            localStorage.removeItem('AdvitoryDetail');
        }
    },
});

export const childAction = childrenSelectSlice.actions;
export default childrenSelectSlice;

import { createSlice } from "@reduxjs/toolkit";

// Load data from localStorage safely
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
let storedListVaccine = loadFromLocalStorage('ListVaccine', []);
let storedListComboVaccine = loadFromLocalStorage('ListComboVaccine', []);
let storedTotalPrice = loadFromLocalStorage('TotalVaccine', 0);

const selectVaccineSlice = createSlice({
    name: 'vaccine',
    initialState: {
        listVaccine: storedListVaccine,
        listComboVaccine: storedListComboVaccine,
        isBooking: [
            ...storedListVaccine.map((vaccine) => `vaccine-${vaccine.id}`),
            ...storedListComboVaccine.map((combo) => `combo-${combo.id}`)
        ],
        totalPrice: storedTotalPrice
    },
    reducers: {
        replaceData(state, action) {
            state.listVaccine = action.payload.listVaccine;
            state.listComboVaccine = action.payload.listComboVaccine;
            state.totalPrice = action.payload.totalPrice;

            // Ensure data is saved to localStorage
            state.listVaccine.length > 0 ? localStorage.setItem('ListVaccine', JSON.stringify(state.listVaccine)) : localStorage.removeItem('ListVaccine');
            state.listComboVaccine.length > 0 ? localStorage.setItem('ListComboVaccine', JSON.stringify(state.listComboVaccine)) : localStorage.removeItem('ListComboVaccine');
            state.totalPrice > 0 ? localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice)) : localStorage.removeItem('TotalVaccine');
        },
        addVaccine(state, action) {
            const newVaccine = action.payload;
            const vaccineKey = `vaccine-${newVaccine.id}`;
            const existingVaccine = state.listVaccine.find((vaccine) => vaccine.id === newVaccine.id);

            if (existingVaccine) {
                state.listVaccine = state.listVaccine.filter((vaccine) => vaccine.id !== existingVaccine.id);
                state.isBooking = state.isBooking.filter((id) => id !== vaccineKey);
            } else {
                state.listVaccine.push(newVaccine);
                state.isBooking.push(vaccineKey);
            }

            // Recalculate total price
            state.totalPrice = state.listVaccine.reduce((total, v) => total + (v.price || 0), 0)
                + state.listComboVaccine.reduce((total, c) => total + (c.price || 0), 0);

            // Save changes to localStorage
            state.listVaccine.length > 0 ? localStorage.setItem('ListVaccine', JSON.stringify(state.listVaccine)) : localStorage.removeItem('ListVaccine');
            state.totalPrice > 0 ? localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice)) : localStorage.removeItem('TotalVaccine');
        },
        addComboVaccine(state, action) {
            const newCombo = action.payload;
            const comboKey = `combo-${newCombo.id}`;
            const existingCombo = state.listComboVaccine.find((combo) => combo.id === newCombo.id);

            if (existingCombo) {
                state.listComboVaccine = state.listComboVaccine.filter((combo) => combo.id !== existingCombo.id);
                state.isBooking = state.isBooking.filter((id) => id !== comboKey);
            } else {
                state.listComboVaccine.push(newCombo);
                state.isBooking.push(comboKey);
            }

            // Recalculate total price
            state.totalPrice = state.listVaccine.reduce((total, v) => total + (v.price || 0), 0)
                + state.listComboVaccine.reduce((total, c) => total + (c.price || 0), 0);

            // Save changes to localStorage
            state.listComboVaccine.length > 0 ? localStorage.setItem('ListComboVaccine', JSON.stringify(state.listComboVaccine)) : localStorage.removeItem('ListComboVaccine');
            state.totalPrice > 0 ? localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice)) : localStorage.removeItem('TotalVaccine');
        },
        deleteVaccine(state, action) {
            const id = action.payload;
            const vaccineKey = `vaccine-${id}`;
            state.listVaccine = state.listVaccine.filter((item) => item.id !== id);
            state.isBooking = state.isBooking.filter((vaccineID) => vaccineID !== vaccineKey);

            // Recalculate total price
            state.totalPrice = state.listVaccine.reduce((total, v) => total + (v.price || 0), 0)
               

            // Save to localStorage
            state.listVaccine.length > 0 ? localStorage.setItem('ListVaccine', JSON.stringify(state.listVaccine)) : localStorage.removeItem('ListVaccine');
            state.totalPrice > 0 ? localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice)) : localStorage.removeItem('TotalVaccine');
        },
        deleteComboVaccine(state, action) {
            const id = action.payload;
            const comboKey = `combo-${id}`;
            state.listComboVaccine = state.listComboVaccine.filter((item) => item.id !== id);
            state.isBooking = state.isBooking.filter((comboID) => comboID !== comboKey);

            // Recalculate total price
            state.totalPrice =  state.listComboVaccine.reduce((total, c) => total + (c.price || 0), 0);

            // Save to localStorage
            // state.listVaccine.length > 0 ? localStorage.setItem('ListVaccine', JSON.stringify(state.listVaccine)) : localStorage.removeItem('ListVaccine');
            state.listComboVaccine.length > 0 ? localStorage.setItem('ListComboVaccine', JSON.stringify(state.listComboVaccine)) : localStorage.removeItem('ListComboVaccine');
            state.totalPrice > 0 ? localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice)) : localStorage.removeItem('TotalVaccine');
        },
        completePayment(state) {
            state.listVaccine = [];
            state.listComboVaccine = [];
            state.isBooking = [];
            state.totalPrice = 0;

            // Clear localStorage
            localStorage.removeItem('ListVaccine');
            localStorage.removeItem('ListComboVaccine');
            localStorage.removeItem('TotalVaccine');
        }
    }
});

// Export action creators & reducer
export const vaccineAction = selectVaccineSlice.actions;
export default selectVaccineSlice;

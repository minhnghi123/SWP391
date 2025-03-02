import { createSlice } from "@reduxjs/toolkit";

// Load data from localStorage
let storedListVaccine = [];
let storedListComboVaccine = [];
let storedTotalPrice = 0;

try {
    storedListVaccine = JSON.parse(localStorage.getItem('ListVaccine')) || [];
    storedListComboVaccine = JSON.parse(localStorage.getItem('ListComboVaccine')) || [];
    storedTotalPrice = JSON.parse(localStorage.getItem('TotalVaccine')) || 0;
} catch (error) {
    console.error('Error loading data from localStorage:', error);
}

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
        },
        addVaccine(state, action) {
            const newVaccine = action.payload;
            const vaccineKey = `vaccine-${newVaccine.id}`;
            const check = state.listVaccine.find((vaccine) => vaccine.id === newVaccine.id);

            if (check) {
                state.listVaccine = state.listVaccine.filter((vaccine) => vaccine.id !== check.id);
                state.totalPrice -= check.price || 0;
                state.isBooking = state.isBooking.filter((id) => id !== vaccineKey);
            } else {
                state.listVaccine.push(newVaccine);
                state.isBooking.push(vaccineKey);
                state.totalPrice += newVaccine.price;
            }

            localStorage.setItem('ListVaccine', JSON.stringify(state.listVaccine));
            localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice));
        },
        addComboVaccine(state, action) {
            const newCombo = action.payload;
            const comboKey = `combo-${newCombo.id}`;
            const check = state.listComboVaccine.find((combo) => combo.id === newCombo.id);

            if (check) {
                state.listComboVaccine = state.listComboVaccine.filter((combo) => combo.id !== check.id);
                state.totalPrice -= check.price || 0;
                state.isBooking = state.isBooking.filter((id) => id !== comboKey);
            } else {
                state.listComboVaccine.push(newCombo);
                state.isBooking.push(comboKey);
                state.totalPrice += newCombo.price;
            }

            localStorage.setItem('ListComboVaccine', JSON.stringify(state.listComboVaccine));
            localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice));
        },
        deleteVaccine(state, action) {
            const id = action.payload;
            const vaccineKey = `vaccine-${id}`;
            const check = state.listVaccine.find((vaccine) => vaccine.id === id);
            if (!check) return;

            state.listVaccine = state.listVaccine.filter((item) => item.id !== id);
            state.isBooking = state.isBooking.filter((vaccineID) => vaccineID !== vaccineKey);
            state.totalPrice -= check.price || 0;

            localStorage.setItem('ListVaccine', JSON.stringify(state.listVaccine));
            localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice));
        },
        deleteComboVaccine(state, action) {
            const id = action.payload;
            const comboKey = `combo-${id}`;
            const check = state.listComboVaccine.find((combo) => combo.id === id);
            if (!check) return;

            state.listComboVaccine = state.listComboVaccine.filter((item) => item.id !== id);
            state.isBooking = state.isBooking.filter((comboID) => comboID !== comboKey);
            state.totalPrice -= check.price || 0;

            localStorage.setItem('ListComboVaccine', JSON.stringify(state.listComboVaccine));
            localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice));
        },
        completePayment(state) {
            state.listVaccine = [];
            state.listComboVaccine = [];
            state.isBooking = [];
            state.totalPrice = 0;

            localStorage.removeItem('ListVaccine');
            localStorage.removeItem('ListComboVaccine');
            localStorage.removeItem('TotalVaccine');
        }
    }
});

export const vaccineAction = selectVaccineSlice.actions;
export default selectVaccineSlice;

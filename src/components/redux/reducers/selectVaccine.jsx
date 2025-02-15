import { createSlice } from "@reduxjs/toolkit";

// Load data from localStorage
let storedItemList = [];
let storedTotalPrice = 0;

try {
    storedItemList = JSON.parse(localStorage.getItem('ListVaccine')) || [];
    storedTotalPrice = JSON.parse(localStorage.getItem('TotalVaccine')) || 0;
} catch (error) {
    console.error('Error loading data from localStorage:', error);
}


const selectVaccineSlice = createSlice({
    name: 'vaccine',
    initialState: {
        itemList: storedItemList,  // Initialize with data from localStorage
        isBooking: storedItemList.map((vaccine) => vaccine.id), // Populate based on itemList
        totalPrice: storedTotalPrice
    },
    reducers: {
        replaceData(state, action) {
            state.itemList = action.payload.itemList;
            state.totalPrice = action.payload.totalPrice;
        },
        addVaccine(state, action) {
            const newVaccine = action.payload;
            const check = state.itemList.find((vaccine) => vaccine.id === newVaccine.id);
            if (check) {
                state.itemList = state.itemList.filter((vaccine) => vaccine.id !== check.id);
                state.totalPrice -= check.price || 0;
                state.isBooking = state.isBooking.filter((id) => id !== newVaccine.id);
            } else {
                state.itemList.push(newVaccine);
                state.isBooking.push(newVaccine.id);
                state.totalPrice += newVaccine.price;
            }
            state.itemList.length > 0
                ? localStorage.setItem('ListVaccine', JSON.stringify(state.itemList))
                : localStorage.removeItem('ListVaccine');
            state.totalPrice > 0
                ? localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice))
                : localStorage.removeItem('TotalVaccine');
        },
        deleteVaccine(state, action) {
            const id = action.payload;
            const check = state.itemList.find((vaccine) => vaccine.id === id);
            if (!check) return;
            state.itemList = state.itemList.filter((item) => item.id !== id);
            state.isBooking = state.isBooking.filter((vaccineID) => vaccineID !== id);
            state.totalPrice -= check.price || 0;
            state.itemList.length > 0
                ? localStorage.setItem('ListVaccine', JSON.stringify(state.itemList))
                : localStorage.removeItem('ListVaccine');
            state.totalPrice > 0
                ? localStorage.setItem('TotalVaccine', JSON.stringify(state.totalPrice))
                : localStorage.removeItem('TotalVaccine');
        },
        completePayment(state) {
            state.itemList = [];
            state.isBooking = [];
            state.totalPrice = 0;

            // Clear localStorage
            localStorage.removeItem('ListVaccine');
            localStorage.removeItem('TotalVaccine');
        }

    }
});

export const vaccineAction = selectVaccineSlice.actions;
export default selectVaccineSlice;
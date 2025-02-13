import { createSlice } from "@reduxjs/toolkit";

const selectVaccineSlice = createSlice({
    name: 'vaccine',
    initialState: {
        itemList: [],
        isBooking: [],
        totalPrice: 0
    },
    reducers: {
        addVaccine(state, action) {
            const newVaccine = action.payload;
            const check = state.itemList.find((vaccine) => vaccine.id === newVaccine.id);
            if (check) {
                state.itemList = state.itemList.filter((vaccine) => vaccine.id !== check.id);
                state.totalPrice -= check.price;
                state.isBooking = state.isBooking.filter((id) => id !== newVaccine.id)
            } else {

                state.itemList.push({
                    id: newVaccine.id,
                    name: newVaccine.name,
                    price: newVaccine.price,
                    description: newVaccine.description,
                    country: newVaccine.country,
                    image: newVaccine.image,
                    vaccine: newVaccine.vaccine

                });
                state.isBooking.push(newVaccine.id)
                state.totalPrice += newVaccine.price;
            }
        },
        deleteVaccine(state, action) {
            const id = action.payload;
            const check = state.itemList.find((vaccine) => vaccine.id === id);
            if (!check) return;
            state.itemList = state.itemList.filter((item) => item.id !== id);
            //avoid undefind
            state.isBooking = state.isBooking.filter((vaccineID) => vaccineID !== id)
            state.totalPrice -= check.price || 0;
        },
        sortVaccine (state,action){
            const type = action.payload

        }

    }
    
    
})
export const vaccineAction = selectVaccineSlice.actions;
export default selectVaccineSlice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: sessionStorage.getItem("location") ? Number(sessionStorage.getItem("location")) : 1,
  };
  
  const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
      locationHistory: (state) => {
        state.location = 2;
        sessionStorage.setItem("location", "2"); // Lưu vào sessionStorage
      },
      resetLocation: (state) => {
        state.location = 1;
        sessionStorage.setItem("location", "1"); // Lưu vào sessionStorage
      },
    },
  });

  export const locationAciton = locationSlice.actions;
  export default locationSlice;


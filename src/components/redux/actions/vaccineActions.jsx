import {createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../../Api/axios";

// Thunk for fetching vaccine and combo data
export const fetchVaccineData = createAsyncThunk(
    "vaccine/fetchVaccineData",
    async (_, { rejectWithValue }) => {
        try {
            const [vaccineRes, comboRes] = await Promise.all([
                fetchData("vaccine"),
                fetchData("combos")
            ]);
            return {
                vaccines: vaccineRes.data,
                combos: comboRes.data
            };
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);
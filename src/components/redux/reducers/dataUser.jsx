

import { configureStore, createSlice } from "@reduxjs/toolkit";

const dataUserSlice = createSlice({
    name: 'dataUser',
    initialState: {
        profileData: null,
        editProfile: null,
        loading: false,
        error: null,
    },
    reducers: {
        setData: (state, action) => {
            state.profileData = action.payload.profileData;
            state.editProfile = action.payload.editProfile;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        updateEditProfile: (state, action) => {
            state.editProfile = { ...state.editProfile, ...action.payload };
        },
        replaceProfile: (state, action) => {
            state.profileData = action.payload;
            state.editProfile = action.payload
        },
        setAvatarPreview: (state, action) => {
            state.avatarPreview = action.payload;
            state.editProfile.avatar = action.payload;
        }

    },
});
export const dataUserAction = dataUserSlice.actions;
export default dataUserSlice;


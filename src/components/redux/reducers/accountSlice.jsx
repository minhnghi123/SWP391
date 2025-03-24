// src/store/accountSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Try to get user from localStorage once at startup
const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem('Account');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      // Store in localStorage in a try/catch to handle potential errors
      try {
        localStorage.setItem('Account', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Failed to save user to localStorage:', error);
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      try {
        localStorage.removeItem('Account');
      } catch (error) {
        console.error('Failed to remove user from localStorage:', error);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const accountAction = accountSlice.actions;

export default accountSlice;

// src/store/accountSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('Account')) || null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('Account', JSON.stringify(action.payload));  // Lưu vào localStorage
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('Account');  // Xóa thông tin trong localStorage khi đăng xuất
    },
  },
});

export const accountAction = accountSlice.actions;

export default accountSlice;

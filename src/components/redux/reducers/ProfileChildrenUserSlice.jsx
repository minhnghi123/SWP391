import { createSlice } from "@reduxjs/toolkit";


const ProfileChildrenUserSlice = createSlice({
    name: "profilechildren",
    initialState: {
        childrenList: [],  // ✅ Đảm bảo tên state đúng
        status: "idle",
        error: null,
    },
    reducers: {
        
        replaceData(state, action) {
            state.childrenList = action.payload;
        },
       
    },
    
});

export const profilechildrenAction = ProfileChildrenUserSlice.actions;
export default ProfileChildrenUserSlice

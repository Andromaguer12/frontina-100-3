import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: [null, {
        blocked: false,
        email: null,
        auth: "user",
        secondaryAuth: "any"
    }, false]
};

const adminUser = createSlice({
    name: "AdminUser",
    initialState,
    reducers: {
        setAdminUser: (state, action) => {
            state.currentUser = action.payload;
            state.currentUser[2] = true;
        }
    }
})

export const { setAdminUser } = adminUser.actions

export default adminUser.reducer
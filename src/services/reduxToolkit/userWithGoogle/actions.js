import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: [null, {
        email: null,
        auth: "user",
        secondaryAuth: "any"
    }, false]
};

const userWithGoogle = createSlice({
    name: 'GoogleUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
})

export const {setCurrentUser} = userWithGoogle.actions

export default userWithGoogle.reducer
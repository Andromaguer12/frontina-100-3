import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TabValue: 0
};

const PublicCurrentPages = createSlice({
    name: 'PublicP',
    initialState,
    reducers: {
        setNewPage: (state, action) => {
            state.TabValue = action.payload;
        }
    }
})

export const {setNewPage} = PublicCurrentPages.actions

export default PublicCurrentPages.reducer
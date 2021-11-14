import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TabValue: null
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
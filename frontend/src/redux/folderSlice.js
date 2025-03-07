import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    folders: null,
}


const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        setFoldersData: (state, action) => {
            state.folders = action.payload;
        },

        removeFoldersData: (state) => {
            state.folders = null;
        }

        
    }
});


export const { setFoldersData, removeFoldersData } = foldersSlice.actions;

export const foldersReducer = foldersSlice.reducer;
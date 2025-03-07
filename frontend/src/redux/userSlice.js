import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentUser: null,
    loading: false
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.currentUser = null;
            state.loading = true;
        },

        signinFailure: (state) => {
            state.currentUser = null;
            state.loading = false
        },

        signinSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },

        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
        }
    }
});


export const { signinStart,
    signinFailure,
    signinSuccess,
    signOut
} = userSlice.actions;

export const userReducer = userSlice.reducer;
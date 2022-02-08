import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        open: false,
        message: ''
    },
    reducers: {
        openSnackbar: (state) => {
            state.open = true
        },
        closeSnackbar: (state) => {
            state.open = false
        },
        setMessage: (state, action) => {
            state.message = action.payload
        }
    }
});

export const {openSnackbar, closeSnackbar, setMessage} = snackbarSlice.actions;

export default snackbarSlice.reducer;
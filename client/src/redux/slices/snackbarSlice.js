import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        open: false,
        message: ''
    },
    reducers: {
        //opens the snackbar
        openSnackbar: (state) => {
            state.open = true;
        },
        //closes the snackbar
        closeSnackbar: (state) => {
            state.open = false;
        },
        //set the message in the snackbar
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        //open and set the message of the snackbar simultaneously
        openAndSetMessage: (state, action) => {
            state.open = true;
            state.message = action.payload;
        }
    }
});

export const {openSnackbar, closeSnackbar, setMessage, openAndSetMessage} = snackbarSlice.actions;

export default snackbarSlice.reducer;
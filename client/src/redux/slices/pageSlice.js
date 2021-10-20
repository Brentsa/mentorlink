import {createSlice} from '@reduxjs/toolkit';

//page slice to manage the global state of the current page and tabs
export const pageSlice = createSlice({
    name: 'currentPage',
    initialState: {
        value: 'home'
    },
    reducers: {
        switchPage: (state, action) => {
            //assign the new page to the current page state
            state.value = action.payload;
        }
    }
})

export const {switchPage} = pageSlice.actions;

export default pageSlice.reducer; 
import {configureStore} from '@reduxjs/toolkit';
import pageReducer from './slices/pageSlice';
import memberReducer from './slices/memberSlice';
import snackbarReducer from './slices/snackbarSlice'


export default configureStore({
    reducer: {
        currentPage: pageReducer,
        members: memberReducer,
        snackbar: snackbarReducer
    }
})
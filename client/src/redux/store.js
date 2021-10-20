import {configureStore} from '@reduxjs/toolkit';
import pageReducer from './slices/pageSlice';


export default configureStore({
    reducer: {
        currentPage: pageReducer
    }
})
import {configureStore} from '@reduxjs/toolkit';
import pageReducer from './slices/pageSlice';
import memberReducer from './slices/memberSlice';


export default configureStore({
    reducer: {
        currentPage: pageReducer,
        members: memberReducer
    }
})
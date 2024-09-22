import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filterSlice.jsx';

export const store = configureStore({
    reducer: {
        filters: filterReducer,
    }
})

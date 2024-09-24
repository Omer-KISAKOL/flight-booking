import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filterSlice.jsx';
import priceReducer from '../features/priceSlice.jsx';
import flightsReducer from '../features/flightsSlice.jsx';

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        price: priceReducer,
        flights: flightsReducer
    }
})

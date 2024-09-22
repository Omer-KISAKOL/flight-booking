import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flightNumber: '',
    selectedAirport: '',
    selectedDate: '',
    returnDate: ''
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFlightNumber: (state, action) => {
            state.flightNumber = action.payload;
        },
        setSelectedAirport: (state, action) => {
            state.selectedAirport = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setReturnDate: (state, action) => {
            state.returnDate = action.payload;
        },
        resetFilters: (state) => {
            state.flightNumber = '';
            state.selectedAirport = '';
            state.selectedDate = '';
            state.returnDate = '';
        }
    }
});

export const {
    setFlightNumber,
    setSelectedAirport,
    setSelectedDate,
    setReturnDate,
    resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;

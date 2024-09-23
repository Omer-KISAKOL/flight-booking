import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flightNumber: '',
    selectedAirport: '',
    selectedDate: '',
    returnDate: '',
    message:'',
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
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        resetFilters: (state) => {
            state.flightNumber = '';
            state.selectedAirport = '';
            state.selectedDate = '';
            state.returnDate = '';
            state.message = '';
        }
    }
});

export const {
    setFlightNumber,
    setSelectedAirport,
    setSelectedDate,
    setReturnDate,
    setMessage,
    resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;

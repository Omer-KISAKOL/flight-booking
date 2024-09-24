import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flights: []
};

const flightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        // Uçuşları API'den alıp Redux'a ekleyen action
        setFlights: (state, action) => {
            state.flights = action.payload.map(flight => ({
                ...flight,
                randomPrice: Math.floor(Math.random() * 500) + 100 // 100-600 arası rastgele fiyat
            }));
        }
    }
});

export const { setFlights } = flightsSlice.actions;
export default flightsSlice.reducer;

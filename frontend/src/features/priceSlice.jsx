import { createSlice } from '@reduxjs/toolkit';

const generateRandomPrice = () => {
    return Math.floor(Math.random() * (350 - 150 + 1)) + 150;
};

export const priceSlice = createSlice({
    name: 'price',
    initialState: {
        value: generateRandomPrice(),
    },
    reducers: {
        setRandomPrice: (state) => {
            state.value = generateRandomPrice();
        },
    },
});

export const { setRandomPrice } = priceSlice.actions;
export default priceSlice.reducer;

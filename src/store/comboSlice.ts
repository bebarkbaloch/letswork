import { createSlice } from '@reduxjs/toolkit';

interface ComboState {
    chips: string | null;
    drink: string | null;
    chocolate: string | null;
}

const initialState: ComboState = {
    chips: null,
    drink: null,
    chocolate: null,
};

const comboSlice = createSlice({
    name: 'combo',
    initialState,
    reducers: {
        selectChips: (state, action) => {
            state.chips = action.payload;
            // state.drink = null;
            // state.chocolate = null;
        },
        selectDrink: (state, action) => {
            state.drink = action.payload;
            // state.chocolate = null;
        },
        selectChocolate: (state, action) => {
            state.chocolate = action.payload;
        },
        resetCombo: (state) => {
            state.chips = null;
            state.drink = null;
            state.chocolate = null;
        },
    },
});

export const {
    selectChips, selectDrink, selectChocolate, resetCombo,
} = comboSlice.actions;

export default comboSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import comboReducer from './comboSlice';

const store = configureStore({
    reducer: {
        combo: comboReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

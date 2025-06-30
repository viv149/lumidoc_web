import { configureStore } from "@reduxjs/toolkit";
import quotationSlice from "../slice/quotationSlice"

export const store = configureStore({
    reducer: {
        quotation: quotationSlice,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "@/features/shop/shopSlice";

// Add reducer function to store
export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;

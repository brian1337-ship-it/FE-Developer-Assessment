import type { Category } from "@/types/shop";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ShopState {
  productCategories: Category[];
}

// Initial state
const initialState: ShopState = {
  productCategories: [],
};

// Create slice with reducers
export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.productCategories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.productCategories = state.productCategories.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

// Export actions and reducer
export const { addCategory, removeCategory } = shopSlice.actions;
export default shopSlice.reducer;

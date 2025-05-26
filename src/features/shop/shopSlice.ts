import type { Product } from "@/types/fakeStoreApi";
import type { Category } from "@/types/shop";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ShopState } from "./types";

// export interface ShopState {
//   productCategories: Category[];
//   cartItems: Product[];
// }

// Initial state
const initialState: ShopState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: "",
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
};

// Create slice with reducers
export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    // Todo: remove not necessary
    removeCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(
        (_, index) => index !== action.payload
      );
    },
    addItem: (state, action: PayloadAction<Product>) => {
      const item = state.cart.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemIndex = state.cart.items.findIndex(
        (item) => item.product.id === action.payload
      );
      if (itemIndex !== -1) {
        if (state.cart.items[itemIndex].quantity > 1) {
          state.cart.items[itemIndex].quantity -= 1;
        } else {
          state.cart.items.splice(itemIndex, 1);
        }
      }
    },
    // getItemCount: (state, action: PayloadAction<number>) => {
    //   const item = state.cart.items.find(item => item.product.id === action.payload);
    //   return item ? item.quantity : 0;
    // }
  },
});

// Export actions and reducer
export const { addCategory, removeCategory, addItem, removeItem } =
  shopSlice.actions;
export default shopSlice.reducer;

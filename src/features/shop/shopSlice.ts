import type { Product } from "@/types/fakeStoreApi";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShopState {
  cart: {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
  };
}

// localStorage utilities for cart persistence
const cartStorageKey = "shop-cart";

/**
 * Load cart state from localStorage
 * @returns Saved cart state or default empty cart
 */
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(cartStorageKey);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Validate the structure to ensure it matches CartItem interface
      if (parsedCart.items && Array.isArray(parsedCart.items)) {
        return parsedCart;
      }
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  // Return default empty cart if loading fails or no saved data
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
};

/**
 * Save cart state to localStorage
 * @param cart - Cart state to save
 */
const saveCartToStorage = (cart: ShopState["cart"]) => {
  try {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Initial state with localStorage integration
const initialState: ShopState = {
  cart: loadCartFromStorage(),
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    // Adds a product to the cart or increases quantity if already exists
    addItem: (state, action: PayloadAction<Product>) => {
      // Check if item already exists in cart
      const item = state.cart.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (item) {
        // If item exists, increment quantity
        item.quantity += 1;
      } else {
        // If new item, add to cart with quantity 1
        state.cart.items.push({ product: action.payload, quantity: 1 });
      }

      // Recalculate total items count
      state.cart.totalItems = state.cart.items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      // Recalculate total price
      state.cart.totalPrice = state.cart.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );

      // Save updated cart to localStorage
      saveCartToStorage(state.cart);
    },

    // Removes one quantity of a product from cart or removes item completely if quantity is 1
    removeItem: (state, action: PayloadAction<number>) => {
      // Find the item index in cart
      const itemIndex = state.cart.items.findIndex(
        (item) => item.product.id === action.payload
      );

      if (itemIndex !== -1) {
        if (state.cart.items[itemIndex].quantity > 1) {
          // If quantity > 1, just decrease quantity
          state.cart.items[itemIndex].quantity -= 1;
        } else {
          // If quantity = 1, remove item completely from cart
          state.cart.items.splice(itemIndex, 1);
        }

        // Recalculate total items count
        state.cart.totalItems = state.cart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );

        // Recalculate total price
        state.cart.totalPrice = state.cart.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );

        // Save updated cart to localStorage after recalculation
        saveCartToStorage(state.cart);
      }
    },
    clearCart: (state) => {
      state.cart.items = [];
      state.cart.totalItems = 0;
      state.cart.totalPrice = 0;

      // Clear localStorage
      saveCartToStorage(state.cart);
    },
  },
});

// Selectors to calculate various cart details

/**
 * Calculate subtotal price of all items in cart
 * @param state - Root state containing shop state
 * @returns Subtotal price before any discounts
 */
export const selectSubTotalPrice = (state: { shop: ShopState }) => {
  return state.shop.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

/**
 * Calculate final total price (apply discounts if any)
 * @returns Final total price to be paid
 */
export const selectTotalPrice = (state: { shop: ShopState }) => {
  const subtotal = selectSubTotalPrice(state);
  return subtotal;
};

/**
 * Calculate discount amount applied to cart
 * @returns Amount of discount applied (currently 0)
 */
export const selectDiscountAmount = (state: { shop: ShopState }) => {
  const subtotal = selectSubTotalPrice(state);
  const total = selectTotalPrice(state);
  return subtotal - total;
};

// Export actions and reducer
export const { addItem, removeItem, clearCart } = shopSlice.actions;
export default shopSlice.reducer;

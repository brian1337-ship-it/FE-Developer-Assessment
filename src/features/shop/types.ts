import type { Product } from "@/types/fakeStoreApi";

export interface CartItem {
  product: Product;
  quantity: number;
}

// Define the shop state type
export interface ShopState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  selectedCategory: string | null;
  cart: {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
  };
}

// Action payload types
export interface AddToCartPayload {
  product: Product;
  quantity: number;
}

export interface UpdateCartItemPayload {
  productId: number;
  quantity: number;
}

export interface FilterProductsPayload {
  category: string | null;
}

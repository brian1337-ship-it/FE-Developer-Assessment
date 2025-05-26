import { Product, CartItem } from "@/types/shopping";

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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
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

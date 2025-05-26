/**
 * Product entity representing an item in the store
 *
 * @interface Product
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Categories type for product classification
 * Represents a collection of category strings
 */
export type Category = string;

/**
 * Cart item representing a product in the shopping cart
 *
 * @interface CartItem
 */
export interface CartItem {
  product: Product;

  quantity: number;
}

/**
 * Shopping cart state
 *
 * @interface Cart
 */
export interface Cart {
  items: CartItem[];

  /** Total price of all items in cart */
  totalPrice: number;

  /** Total number of items in cart */
  totalItems: number;
}

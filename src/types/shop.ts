import type { CartItem } from "@/features/shop/types";

/**
 * Categories type for product classification
 * Represents a collection of category strings
 */
export type Category = string;

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

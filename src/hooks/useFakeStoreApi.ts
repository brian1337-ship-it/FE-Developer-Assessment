import { useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ProductQueryOptions,
  Product,
  ProductsQueryParams,
} from "@/types/fakeStoreApi";

const API_URL = "https://fakestoreapi.com";

// Query options for caching and refetching behavior
const defaultQueryOptions: ProductQueryOptions = {
  staleTime: 1000 * 60 * 5, // 5 minutes of data freshness, then invalidate
  gcTime: 1000 * 60 * 30, // 30 minutes before unused cache cleanup
  enabled: true,
  refetchOnWindowFocus: false,
};

/**
 * Fetches products from the Fake Store API
 * @param params Query parameters:
 *   - limit: Number of products to fetch (1-20, defaults to all ~20 products)
 *   - category: Filter by specific category
 *   - sort: Sort order ('asc' or 'desc')
 */
export const useProducts = (params: ProductsQueryParams = {}) => {
  const { limit, category, sort } = params;

  // Build the URL with query parameters
  let url = `${API_URL}/products`;

  // Add category filter if provided
  if (category) {
    url = `${url}/category/${category}`;
  }

  // Add query parameters. FakeStore API will support limit (1-20) and sort only. No offset.
  const queryParams = new URLSearchParams();
  if (limit) queryParams.append("limit", limit.toString());
  if (sort) queryParams.append("sort", sort);

  const queryString = queryParams.toString();
  if (queryString) {
    url = `${url}?${queryString}`;
  }

  return useQuery<Product[]>({
    queryKey: ["products", params],
    queryFn: async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Category "${category}" not found`);
          }
          throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText}`
          );
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error instanceof Error
          ? error
          : new Error("An unknown error occurred while fetching products");
      }
    },
    ...defaultQueryOptions, // Apply default options
  });
};

/**
 * Fetches a single product by ID
 * @param productId The ID of the product to fetch
 */
export const useProduct = (productId: number | undefined) => {
  // Create merged options with the conditional enabled setting
  const mergedOptions = {
    ...defaultQueryOptions,
    // Override the enabled option with our conditional check:
    // Only execute the query if productId exists
    enabled: !!productId && defaultQueryOptions.enabled,
  };

  return useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        if (!productId) throw new Error("Product ID is required");

        const response = await fetch(`${API_URL}/products/${productId}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product: ${response.status} ${response.statusText}`
          );
        }

        return await response.json();
      } catch (error) {
        console.error(`Error fetching product ID ${productId}:`, error);
        throw error instanceof Error
          ? error
          : new Error(
              `An unknown error occurred while fetching product ID ${productId}`
            );
      }
    },
    ...mergedOptions,
  });
};

/**
 * Fetches all available product categories
 */
export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_URL}/products/categories`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch categories: ${response.status} ${response.statusText}`
          );
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    ...defaultQueryOptions,
  });
};

/**
 * Searches products by title/description from the Fake Store API
 * FakeStore API doesn't have native search, so we fetch all products and filter client-side
 * @param searchQuery The search term
 */
export const useSearchProducts = (searchQuery: string) => {
  // Create merged options with conditional enabled setting
  const mergedOptions = {
    ...defaultQueryOptions,
    // Only search if query exists (minimum 2 characters for better UX)
    enabled: searchQuery.length >= 2,
  };

  return useQuery<Product[]>({
    queryKey: ["searchProducts", searchQuery],
    queryFn: async () => {
      try {
        // Fetch all products since FakeStore API doesn't have search endpoint
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
          throw new Error(
            `Failed to search products: ${response.status} ${response.statusText}`
          );
        }

        const allProducts: Product[] = await response.json();

        // Filter products based on search query
        if (!searchQuery.trim()) {
          return allProducts;
        }

        const lowercaseQuery = searchQuery.toLowerCase();
        return allProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.category.toLowerCase().includes(lowercaseQuery)
        );
      } catch (error) {
        console.error("Error searching products:", error);
        throw error instanceof Error
          ? error
          : new Error("An unknown error occurred while searching products");
      }
    },
    ...mergedOptions,
  });
};

/**
 * Helper hook for invalidating cache
 * @returns A function to invalidate specific query cache
 */
export const useInvalidateCache = () => {
  const queryClient = useQueryClient();
  return {
    invalidateProducts: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
    invalidateCategories: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
    invalidateProduct: (id: number) =>
      queryClient.invalidateQueries({ queryKey: ["product", id] }),
  };
};

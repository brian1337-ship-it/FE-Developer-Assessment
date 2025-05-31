import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  QueryError,
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
 * @param params Query parameters (limit, offset, category, sort)
 */
export const useProducts = (params: ProductsQueryParams = {}) => {
  const { limit, offset, category, sort } = params;

  // Build the URL with query parameters
  let url = `${API_URL}/products`;

  // Add category filter if provided
  if (category) {
    url = `${url}/category/${category}`;
  }

  // Add query parameters
  const queryParams = new URLSearchParams();
  if (limit) queryParams.append("limit", limit.toString());
  if (offset) queryParams.append("offset", offset.toString());
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
    ...defaultQueryOptions, // Apply default options first
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
 * Fetches products with infinite scroll support from the Fake Store API
 * @param params Query parameters (limit, category, sort)
 */
export const useInfiniteProducts = (
  params: Omit<ProductsQueryParams, "offset"> = {}
) => {
  const { limit = 10, category, sort } = params;

  return useInfiniteQuery<Product[], QueryError>({
    queryKey: ["infiniteProducts", params],
    queryFn: async ({ pageParam = 0 }: { pageParam?: number }) => {
      try {
        // Build the URL with query parameters
        let url = `${API_URL}/products`;

        // Add category filter if provided
        if (category) {
          url = `${url}/category/${category}`;
        }

        // Add query parameters for pagination
        const queryParams = new URLSearchParams();

        // Always include the limit parameter
        queryParams.append("limit", limit.toString());

        // Specify starting point when paginating
        const offset =
          typeof pageParam === "number" && pageParam > 0
            ? pageParam * limit
            : 0;
        if (offset > 0) {
          queryParams.append("offset", offset.toString());
        }

        // Add sorting if provided
        if (sort) {
          queryParams.append("sort", sort);
        }

        // Append query parameters to URL
        url = `${url}?${queryParams.toString()}`;

        // Fetch data from API
        const response = await fetch(url);

        if (!response.ok) {
          const error: QueryError = new Error(
            `HTTP error! status: ${response.status}`
          );
          error.status = response.status;
          throw error;
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      // If we received fewer items than the limit, we've reached the end
      if (!lastPage || lastPage.length < limit) {
        return undefined;
      }

      // Otherwise, return the next page index
      return allPages.length;
    },
    initialPageParam: 0,
    ...defaultQueryOptions,
  });
};

/**
 * Helper hook for invalidating interests cache
 * @returns A function to invalidate the interests cache
 */
export const useInvalidateInterests = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["interests"] });
};

/**
 * Searches products by title/description from the Fake Store API
 * Note: FakeStore API doesn't have native search, so we fetch all products and filter client-side
 * @param searchQuery The search term
 * @param enabled Whether to enable the query
 */
export const useSearchProducts = (
  searchQuery: string,
  enabled: boolean = true
) => {
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
    enabled: enabled && searchQuery.length > 0, // Only search if query exists
    ...defaultQueryOptions,
  });
};

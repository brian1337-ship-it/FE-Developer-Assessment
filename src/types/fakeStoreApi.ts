// FakeStore API types
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

// API response type
export interface ProductsResponse {
  products: Product[];
  total: number;
  limit: number;
  offset: number;
}

// Query params for the API
export interface ProductsQueryParams {
  limit?: number;
  offset?: number;
  category?: string;
  sort?: "asc" | "desc";
}

// Query error
export interface QueryError {
  message: string;
  status?: number;
}

// Query options
export interface QueryOptions {
  staleTime: number;
  gcTime: number;
  enabled: boolean;
  refetchOnWindowFocus: boolean;
}

export interface ProductQueryOptions {
  staleTime: number;
  gcTime: number;
  enabled: boolean;
  refetchOnWindowFocus: boolean;
}

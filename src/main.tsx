import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import Product from "./pages/Product.tsx";
import Store from "./pages/Store.tsx";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import { store } from "./store/store.ts";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

// Define the routes for the application and their corresponding components
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);

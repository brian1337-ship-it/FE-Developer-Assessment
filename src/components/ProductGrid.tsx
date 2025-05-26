import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";
import NoProductAvailable from "./NoProductAvailable";
import { Loader2 } from "lucide-react";
import { useCategories, useProducts } from "@/hooks/useFakeStoreApi";

import Section from "./Section";
// import { Product } from "@/types/fakeStoreApi";

const ProductGrid = () => {
  // Fetch all available categories
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Fetch products based on selected category
  const { data: products = [], isLoading: productsLoading } = useProducts(
    selectedCategory ? { category: selectedCategory } : {}
  );

  // For demo purposes - log categories and products to console
  useEffect(() => {
    if (categories.length > 0) {
      console.log("Available categories:", categories);

      // Select first category as default if none is selected
      if (!selectedCategory) {
        setSelectedCategory(categories[0]);
      }
    }
  }, [categories, selectedCategory]);

  // Log products when they change
  useEffect(() => {
    console.log("Products for category:", selectedCategory, products);
  }, [products, selectedCategory]);

  // Combined loading state
  const loading = categoriesLoading || productsLoading;

  // For compatibility with your existing code
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  return (
    <Section className="flex flex-col lg:px-0 my-10">
      {/* Category selection UI - simple buttons for now */}
      {!categoriesLoading && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 rounded ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Existing loading and product display logic */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>loading Products...</span>
          </motion.div>
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          <>
            {products?.map((product) => (
              <AnimatePresence key={product?.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Instead of rendering ProductCard, just show product title for now */}
                  <div className="border p-3 rounded">
                    <p>{product.title}</p>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
          </>
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedCategory || selectedTab} />
      )}
    </Section>
  );
};

export default ProductGrid;

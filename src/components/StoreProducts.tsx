import React, { useEffect, useState } from "react";
import Title from "./Title";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import Section from "./Section";
import CategoryList from "./store/CategoryList";
import { useProducts, useCategories } from "@/hooks/useFakeStoreApi";

interface Props {
  // Remove categories prop since we'll fetch them from API
}

const StoreProducts = ({}: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch categories from API
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // Fetch all products from API
  const {
    data: allProducts = [],
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();

  // Filter products based on selected categories
  const filteredProducts =
    selectedCategories.length === 0
      ? allProducts
      : allProducts.filter((product) =>
          selectedCategories.includes(product.category)
        );

  const loading = categoriesLoading || productsLoading;

  // Handle category selection (supports multiple selection)
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // Remove category if already selected
        return prev.filter((cat) => cat !== category);
      } else {
        // Add category to selection
        return [...prev, category];
      }
    });
  };

  // Reset all category filters
  const resetFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="border-t">
      <Section className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the products as your needs
            </Title>
            {selectedCategories.length > 0 && (
              <button
                onClick={resetFilters}
                className="text-shop_dark_green underline text-sm mt-2 font-medium hover:text-darkRed hoverEffect"
              >
                Reset Filters ({selectedCategories.length} selected)
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide">
            <CategoryList
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
            />
          </div>
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Products are loading . . .
                  </p>
                </div>
              ) : categoriesError || productsError ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <p className="font-semibold tracking-wide text-base text-red-600">
                    Failed to load products. Please try again.
                  </p>
                </div>
              ) : filteredProducts?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable
                  selectedTab={
                    selectedCategories.length > 0
                      ? `"${selectedCategories.join(", ")}"`
                      : undefined
                  }
                  className="bg-white mt-0"
                />
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default StoreProducts;

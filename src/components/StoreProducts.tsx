import React, { useEffect, useState } from "react";
import Title from "./Title";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import Section from "./Section";
import CategoryList from "./store/CategoryList";
import { useProducts, useCategories } from "@/hooks/useFakeStoreApi";
import Pagination from "./ui/Pagination";

const StoreProducts = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Show 8 products per page for better pagination demo

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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
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
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loading = categoriesLoading || productsLoading;

  return (
    <div className="border-t">
      <Section className="mt-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 scrollbar-hide">
            <CategoryList
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
            />
          </div>
          <div className="flex-1 pt-5">
            <div className="mb-5 space-y-1.5 md:space-y-3">
              <div className="flex items-center justify-between">
                <Title className="text-lg tracking-wide">Results</Title>
                {!loading && (
                  <p className="text-sm text-gray-600">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, filteredProducts.length)} of{" "}
                    {filteredProducts.length} products
                  </p>
                )}
              </div>
              <p className="font-light text-xs md:text-sm">
                Check each product page for other buying options. Price and
                other details may vary based on product size and color.
              </p>
            </div>

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
            ) : currentProducts?.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mb-10"
                />
              </>
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
      </Section>
    </div>
  );
};

export default StoreProducts;

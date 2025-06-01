import { useSearchParams } from "react-router-dom";
import Layout from "./Layout";
import Section from "@/components/Section";
import { useSearchProducts } from "@/hooks/useFakeStoreApi";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import NoProductAvailable from "@/components/NoProductAvailable";
import Title from "@/components/Title";
import Pagination from "@/components/ui/Pagination";
import { useEffect, useState } from "react";

const SearchResults = () => {
  // Extract search query from URL parameter (?q=searchterm)
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Show 12 products per page on search

  // Fetch search results (React Query auto-caches by query key)
  const { data: allProducts = [], isLoading, error } = useSearchProducts(query);

  // Pagination logic
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <Section className="py-10">
        {/* Search results header with count */}
        <div className="mb-8">
          <Title className="text-2xl mb-2">Search Results</Title>
          {query && (
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {isLoading
                  ? `Searching for "${query}"...`
                  : `Found ${allProducts.length} result${
                      allProducts.length !== 1 ? "s" : ""
                    } for "${query}"`}
              </p>
              {!isLoading && allProducts.length > productsPerPage && (
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, allProducts.length)} of{" "}
                  {allProducts.length}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Results display logic */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-shop_dark_green" />
            <p className="mt-2 text-gray-600">Searching products...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Search Error
            </h2>
            <p className="text-gray-600">
              Something went wrong while searching. Please try again.
            </p>
          </div>
        ) : currentProducts.length > 0 ? (
          <>
            {/* Display search results grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          // No results found
          <NoProductAvailable
            selectedTab={`search "${query}"`}
            className="bg-white mt-0"
          />
        )}
      </Section>
    </Layout>
  );
};

export default SearchResults;

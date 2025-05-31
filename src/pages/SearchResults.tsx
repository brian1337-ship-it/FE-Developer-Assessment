import { useSearchParams } from "react-router-dom";
import Layout from "./Layout";
import Section from "@/components/Section";
import { useSearchProducts } from "@/hooks/useFakeStoreApi";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import NoProductAvailable from "@/components/NoProductAvailable";
import Title from "@/components/Title";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: products = [], isLoading, error } = useSearchProducts(query);

  return (
    <Layout>
      <Section className="py-10">
        <div className="mb-8">
          <Title className="text-2xl mb-2">Search Results</Title>
          {query && (
            <p className="text-gray-600">
              {isLoading
                ? `Searching for "${query}"...`
                : `Found ${products.length} result${
                    products.length !== 1 ? "s" : ""
                  } for "${query}"`}
            </p>
          )}
        </div>

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
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
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

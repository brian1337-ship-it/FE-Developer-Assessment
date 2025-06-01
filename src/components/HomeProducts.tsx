import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NoProductAvailable from "@/components/NoProductAvailable";
import { Loader2 } from "lucide-react";
import { useCategories, useProducts } from "@/hooks/useFakeStoreApi";
import Section from "./Section";
import CategoryBar from "./CategoryBar";
import ProductCard from "./ProductCard";

const HomeProducts = () => {
  // Fetch all categories
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  // Track the selected category
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Fetch products based on selected category with limit and sort
  const { data: products = [], isLoading: productsLoading } = useProducts(
    selectedCategory
      ? {
          category: selectedCategory,
          limit: 10,
          sort: "desc",
        }
      : { limit: 10, sort: "desc" }
  );

  // Use first category as default if none is selected
  useEffect(() => {
    if (categories.length > 0) {
      if (!selectedCategory) {
        setSelectedCategory(categories[0]);
      }
    }
  }, [categories, selectedCategory]);

  // Combined loading state
  const loading = categoriesLoading || productsLoading;

  return (
    <Section className="flex flex-col lg:px-0 my-10">
      {/* Category selection UI */}
      {!categoriesLoading && categories.length > 0 && (
        <CategoryBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
      )}

      {/* Product display */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading Products...</span>
          </motion.div>
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          {products?.map((product) => (
            <AnimatePresence key={product?.id}>
              <motion.div
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard key={product?.id} product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedCategory} />
      )}
    </Section>
  );
};

export default HomeProducts;

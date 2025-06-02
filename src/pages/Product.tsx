import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { useProduct } from "@/hooks/useFakeStoreApi";
import { Loader2 } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import PriceView from "@/components/PriceView";
import { Rating } from "@/components/ui/Rating";

const Product = () => {
  // Extract product ID from URL parameters
  const { id } = useParams<{ id: string }>();

  const productId = id ? parseInt(id, 10) : undefined;

  const { data: product, isLoading, error } = useProduct(productId);

  return (
    <Layout>
      <Section className="py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-shop_dark_green" />
            <p className="mt-2 text-gray-600">Loading product details...</p>
          </div>
        ) : error || !product ? (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-600">
              The product you're looking for doesn't exist or has been removed.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-10">
            <div className="bg-shop_light_bg rounded-lg p-8">
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-full h-96 object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <p className="text-sm text-shop_light_green font-medium capitalize tracking-wide">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-600 tracking-wide">
                  {product.description}
                </p>
                <Rating
                  rating={product.rating?.rate}
                  count={product.rating?.count}
                  size={12}
                  className="text-xs"
                />
              </div>
              <div className="space-y-2 border-t border-b border-gray-200 py-5">
                <PriceView
                  price={product.price}
                  className="text-lg font-bold"
                />
                <p className="px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg text-green-600 bg-green-100">
                  In Stock
                </p>
              </div>
              <div className="flex items-center gap-2.5 lg:gap-3">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        )}
      </Section>
    </Layout>
  );
};

export default Product;

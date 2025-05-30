import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import Section from "@/components/Section";
import { useProduct } from "@/hooks/useFakeStoreApi";
import { Loader2, StarIcon } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import PriceView from "@/components/PriceView";
import { Label } from "@/components/ui/label";

const Product = () => {
  const { id } = useParams<{ id: string }>();

  // Convert string id to number and fetch product
  const productId = id ? parseInt(id, 10) : undefined;

  const { data: product, isLoading, error } = useProduct(productId);

  return (
    <Layout>
      <Section className="flex flex-col md:flex-row gap-10 py-10">
        <div className="bg-shop_light_bg rounded-lg p-8">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-96 object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{product?.title}</h2>
            <p className="text-sm text-gray-600 tracking-wide">
              {product?.description}
            </p>
            <div className="flex items-center gap-0.5 text-xs">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  size={12}
                  className="text-shop_light_green"
                  fill={"#3b9c3c"}
                />
              ))}
              <p className="font-semibold">{`(120)`}</p>
            </div>
          </div>
          <div className="space-y-2 border-t border-b border-gray-200 py-5">
            <PriceView price={product?.price} className="text-lg font-bold" />
            <p className="px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg text-green-600 bg-green-100">
              In Stock
            </p>
          </div>
          <div className="flex items-center gap-2.5 lg:gap-3">
            <AddToCartButton product={product} />
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Product;

import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import Title from "./Title";
import type { Product } from "@/types/fakeStoreApi";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] rounded-md border-darkBlue/20 group bg-white">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.image && (
          <Link to={`/product/${product?.id}`}>
            <img
              src={product.image}
              alt="productImage"
              className="w-full h-64 object-contain overflow-hidden transition-transform bg-shop_light_bg duration-500 group-hover:scale-105"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <Title className="text-sm line-clamp-1">{product?.title}</Title>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const rating = product?.rating?.rate || 0;
              const starValue = index + 1;

              if (rating >= starValue) {
                // Full star
                return (
                  <Star
                    key={index}
                    className="text-shop_light_green"
                    size={16}
                    fill="currentColor"
                  />
                );
              } else if (rating >= starValue - 0.5) {
                // Partial star (using CSS mask for half-fill effect)
                return (
                  <div key={index} className="relative">
                    <Star
                      className="text-lightText"
                      size={16}
                      fill="currentColor"
                    />
                    <Star
                      className="text-shop_light_green absolute top-0 left-0"
                      size={16}
                      fill="currentColor"
                      style={{
                        clipPath: "inset(0 50% 0 0)",
                      }}
                    />
                  </div>
                );
              } else {
                // Empty star
                return (
                  <Star key={index} className="text-lightText" size={16} />
                );
              }
            })}
          </div>
          <p className="text-lightText text-xs tracking-wide">
            {product?.rating
              ? `${product.rating.rate.toFixed(1)}`
              : "No rating"}{" "}
            ({product?.rating?.count || 0} Reviews)
          </p>
        </div>

        <PriceView price={product?.price} className="text-sm" />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;

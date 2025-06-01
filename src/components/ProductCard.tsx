import { Link } from "react-router-dom";
import Title from "@/components/Title";
import type { Product } from "@/types/fakeStoreApi";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import { Rating } from "./ui/Rating";

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

        <Rating rating={product?.rating?.rate} count={product?.rating?.count} />

        <PriceView price={product?.price} className="text-sm" />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;

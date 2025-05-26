import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types/fakeStoreApi";
import { useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/utils/styleMerge";
import QuantityButtons from "./QuantityButtons";
import PriceFormatter from "./PriceFormatter";
import { addItem } from "@/features/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  //  const { addItem, getItemCount } = useStore();
  // const itemCount = getItemCount(product?.id);
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.shop);

  const itemCount =
    cart.items.find((item) => item.product.id === product.id)?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success(`${product?.title?.substring(0, 12)}... added successfully!`);
  };
  return (
    <div className="w-full h-12 flex items-center">
      {itemCount > 0 ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          className={cn(
            "w-full bg-shop_dark_green/80 text-lightBg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
            className
          )}
        >
          <ShoppingBag /> {"Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;

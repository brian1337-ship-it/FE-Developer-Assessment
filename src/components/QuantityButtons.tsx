import { Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types/fakeStoreApi";
import { cn } from "@/utils/styleMerge";
import { Button } from "./ui/Button";
import { addItem, removeItem } from "@/features/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface Props {
  product: Product;
  className?: string;
}
const QuantityButtons = ({ product, className }: Props) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.shop);

  // Product quantity in the cart
  const itemCount =
    cart.items.find((item) => item.product.id === product.id)?.quantity || 0;

  // Remove a product from the cart. If its quantity is more than 1, decrease the quantity.
  const handleRemoveProduct = () => {
    dispatch(removeItem(product?.id));
    if (itemCount > 1) {
      toast.success("Quantity Decreased successfully!");
    } else {
      toast.success(
        `${product?.title?.substring(0, 12)} removed successfully!`
      );
    }
  };

  // Add a product to the cart. If it already exists, increase its quantity.
  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success("Quantity Increased successfully!");
  };

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        onClick={handleRemoveProduct}
        variant="outline"
        size="icon"
        disabled={itemCount === 0}
        className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Minus />
      </Button>
      <span className="font-semibold text-sm w-6 text-center text-darkColor">
        {itemCount}
      </span>
      <Button
        onClick={handleAddToCart}
        variant="outline"
        size="icon"
        className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;

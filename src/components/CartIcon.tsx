import type { RootState } from "@/store/store";
import { ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const { cart } = useSelector((state: RootState) => state.shop);

  return (
    <Link to={"/cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {cart.items?.length ? cart.items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;

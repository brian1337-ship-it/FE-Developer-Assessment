import Layout from "@/components/Layout";
import Section from "@/components/Section";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { ShoppingBag } from "lucide-react";
import Title from "@/components/Title";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import EmptyCart from "@/components/EmptyCart";
import {
  clearCart,
  selectDiscountAmount,
  selectSubTotalPrice,
  selectTotalPrice,
} from "@/features/shop/shopSlice";

const Cart = () => {
  const dispatch = useDispatch();
  // Access the cart state from Redux store
  const { cart } = useSelector((state: RootState) => state.shop);
  // Selectors to get subtotal, total price, and discount amount from the cart state
  const subtotalPrice = useSelector(selectSubTotalPrice);
  const totalPrice = useSelector(selectTotalPrice);
  const discountAmount = useSelector(selectDiscountAmount);

  const cartItems = cart.items || [];

  const handleClearCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to empty your cart?"
    );
    if (confirmed) {
      dispatch(clearCart());
      toast.success("Cart emptied successfully!");
    }
  };

  return (
    <Layout>
      <Section>
        <div className="bg-gray-50 pb-52 md:pb-10">
          {cartItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-darkColor" />
                <Title>Shopping Cart</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md">
                    {cartItems?.map(({ product, quantity }) => (
                      <div
                        key={product?.id}
                        className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                      >
                        <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                          {product?.image && (
                            <Link
                              to={`/product/${product?.id}`}
                              className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                            >
                              <img
                                src={product.image}
                                alt="productImage"
                                loading="lazy"
                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                              />
                            </Link>
                          )}
                          <div className="h-full flex flex-1 flex-col justify-between py-1">
                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                              <h2 className="text-base font-semibold line-clamp-1">
                                {product?.title}
                              </h2>
                              <p className="text-sm text-shop_light_green font-medium capitalize">
                                {product?.category}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                          <PriceFormatter
                            amount={
                              product?.price ? product?.price * quantity : 0
                            }
                            className="font-bold text-lg"
                          />
                          <QuantityButtons product={product} />
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={handleClearCart}
                      className="m-5 font-semibold"
                      variant="destructive"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="lg:col-span-1">
                    <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                      <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>SubTotal</span>
                          <PriceFormatter amount={subtotalPrice} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Discount</span>
                          <PriceFormatter amount={discountAmount} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-semibold text-lg">
                          <span>Total</span>
                          <PriceFormatter
                            amount={totalPrice}
                            className="text-lg font-bold text-black"
                          />
                        </div>
                        <Button
                          className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                          size="lg"
                        >
                          {"Proceed to Checkout"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Order summary for mobile view */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                  <div className="bg-white p-4 rounded-lg border mx-4">
                    <h2>Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={subtotalPrice} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter amount={discountAmount} />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter
                          amount={totalPrice}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                        size="lg"
                      >
                        {"Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      </Section>
    </Layout>
  );
};

export default Cart;

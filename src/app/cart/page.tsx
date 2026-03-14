"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { setCurrency } from "@/lib/features/carts/cartsSlice";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );

  const { currency } = useCurrency();
  const [shippingType, setShippingType] = useState<"domestic" | "international">("domestic");
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressText: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (!user) {
      setRedirecting(true);
      router.replace("/");
    }
  }, [user, router]);

  useEffect(() => {
    dispatch(setCurrency(currency));
  }, [currency, dispatch]);

  const formatPrice = (price: number | null | undefined) => {
    const value = Number(price ?? 0);
    if (currency === "USD") {
      return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `Rp${value.toLocaleString("id-ID")}`;
  };

  const getItemPrice = (item: any) => {
    return currency === "USD" ? Number(item.price_usd ?? 0) : Number(item.price_idr ?? 0);
  };

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) return;

    try {
      setLoadingCheckout(true);
      const total = Math.round(Number(adjustedTotalPrice ?? 0));

      if (shippingType === "domestic") {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart.items, total, currency, address }),
        });

        const result = await response.json();
        if (result?.redirect_url) {
          window.location.href = result.redirect_url;
        } else {
          alert("Checkout failed");
        }
      }

      if (shippingType === "international") {
        const itemsList = cart.items
          .map((item, index) => {
            const price = getItemPrice(item);
            return `${index + 1}. ${item.name} x${item.quantity} - ${formatPrice(price)}`;
          })
          .join("\n");

        const message = `
          Hello Admin,

          I would like to place an INTERNATIONAL order.

          Shipping Address:
          Name: ${address.name}
          Phone: ${address.phone}
          Address: ${address.addressText}
          Postal Code: ${address.postalCode}
          Country: ${address.country}

          Order Details:
          ${itemsList}

          Total Purchase: ${formatPrice(total)}

          Payment Method: PayPal
        `;

        const phoneNumber = "6281575332411";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error(error);
      alert("Checkout error");
    } finally {
      setLoadingCheckout(false);
    }
  };

  const inputClass = "w-full border p-3 rounded-full focus:outline-none focus:ring-0";

  if (redirecting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="flex flex-col space-y-4">
                {cart.items.map((product, idx, arr) => (
                  <React.Fragment key={product.id}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && <hr className="border-t-black/10" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex flex-col space-y-5">
                <div className="p-4 sm:p-5 border rounded-[20px] space-y-4">
                  <h6 className="font-bold text-lg">Shipping Type</h6>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShippingType("domestic")}
                      className={`flex-1 py-3 rounded-full border ${
                        shippingType === "domestic" ? "bg-black text-white" : ""
                      }`}
                    >
                      Domestic
                    </button>
                    <button
                      onClick={() => setShippingType("international")}
                      className={`flex-1 py-3 rounded-full border ${
                        shippingType === "international" ? "bg-black text-white" : ""
                      }`}
                    >
                      International
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-5 border rounded-[20px] space-y-4">
                  <h6 className="font-bold text-lg">Shipping Address</h6>
                  <input
                    placeholder="Full Name"
                    className={inputClass}
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  />
                  <input
                    placeholder="Phone"
                    className={inputClass}
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  />
                  <textarea
                    placeholder="Address"
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-0 h-28 resize-none"
                    value={address.addressText}
                    onChange={(e) => setAddress({ ...address, addressText: e.target.value })}
                  />
                  <input
                    placeholder="Postal Code"
                    className={inputClass}
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  />
                  {shippingType === "international" && (
                    <input
                      placeholder="Country"
                      className={inputClass}
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    />
                  )}
                </div>
                <div className="p-4 sm:p-5 border rounded-[20px] space-y-2">
                  <h6 className="font-bold text-lg">Payment Method</h6>
                  {shippingType === "domestic" && <p className="text-sm text-gray-600">Payment Gateway: Midtrans</p>}
                  {shippingType === "international" && <p className="text-sm text-gray-600">Payment Gateway: PayPal</p>}
                </div>
                <div className="p-4 sm:p-5 border rounded-[20px] space-y-5">
                  <h6 className="font-bold text-xl">Order Summary</h6>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(adjustedTotalPrice)}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    disabled={loadingCheckout}
                    className="bg-black rounded-full w-full py-4 h-[54px] group"
                  >
                    {loadingCheckout ? "Processing..." : "Checkout"}
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-all" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-20">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your shopping cart is empty.</span>
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
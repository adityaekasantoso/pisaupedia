"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import CartCounter from "@/components/ui/CartCounter";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types/product.types";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/../context/AuthContext";
import Link from "next/link";

type Props = {
  data: Product;
};

const AddToCardSection = ({ data }: Props) => {
  const { user } = useAuth();
  const cartItems = useAppSelector(
    (state: RootState) => state.carts.cart?.items ?? []
  );
  const { currency } = useCurrency();

  const basePrice = currency === "USD" ? data.price_usd : data.price_idr;

  const finalPrice =
    data.discount_percentage > 0
      ? Math.max(0, Math.round(basePrice - (basePrice * data.discount_percentage) / 100))
      : data.discount_amount > 0
      ? Math.max(0, Math.round(basePrice - data.discount_amount))
      : basePrice;

  const existingCartQty = useMemo(() => {
    const item = cartItems.find((item) => item.id === data.id);
    return item ? item.quantity : 1;
  }, [cartItems, data.id]);

  const [quantity, setQuantity] = useState<number>(existingCartQty);

  useEffect(() => {
    setQuantity(existingCartQty);
  }, [existingCartQty]);

  const isOutOfStock = data.stock === 0;

  const handleAdd = () => {
    if (quantity < data.stock) setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      {user ? (
        <>
          <div className={isOutOfStock ? "opacity-50 pointer-events-none" : ""}>
            <CartCounter
              onAdd={handleAdd}
              onRemove={handleRemove}
              max={data.stock}
              initialValue={quantity}
            />
          </div>

          <AddToCartBtn
            data={{
              ...data,
              quantity,
              price: finalPrice, // optional, kalau AddToCartBtn butuh harga final
            }}
          />
        </>
      ) : (
        <Link
          href="/signin"
          className="w-full text-center bg-black text-white py-3 rounded-full text-base md:text-l"
        >
          Login to Checkout
        </Link>
      )}
    </div>
  );
};

export default AddToCardSection;
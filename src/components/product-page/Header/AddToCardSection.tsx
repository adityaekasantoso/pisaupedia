"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { useState, useEffect, useMemo } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types/product.types";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";

const AddToCardSection = ({ data }: { data: Product }) => {
  const cartItems = useAppSelector(
    (state: RootState) => state.carts.cart?.items ?? [],
  );

  const existingCartQty = useMemo(() => {
    const item = cartItems.find((item) => item.id === data.id);
    return item ? item.quantity : 1;
  }, [cartItems, data.id]);

  const [quantity, setQuantity] = useState<number>(existingCartQty);

  useEffect(() => {
    setQuantity(existingCartQty);
  }, [existingCartQty]);

  const isOutOfStock = data.stock === 0;

  const handleAdd = (value: number) => {
    if (value <= data.stock) {
      setQuantity(value);
    }
  };

  const handleRemove = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      <div className={isOutOfStock ? "opacity-50 pointer-events-none" : ""}>
        <CartCounter
          onAdd={handleAdd}
          onRemove={handleRemove}
          max={data.stock}
          initialValue={quantity}
        />
      </div>

      <AddToCartBtn data={{ ...data, quantity }} />
    </div>
  );
};

export default AddToCardSection;

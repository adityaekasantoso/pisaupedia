"use client";

import React from "react";
import { PiTrashFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "@/components/ui/CartCounter";
import { Button } from "../ui/button";
import {
  addToCart,
  CartItem,
  remove,
  removeCartItem,
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";
import { useCurrency } from "@/context/CurrencyContext";

type ProductCardProps = {
  data?: CartItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { currency } = useCurrency();

  if (!data) return null;

  const percentage = data.discount_percentage ?? 0;

  const basePrice =
    currency === "USD"
      ? Number(data.price_usd ?? 0)
      : Number(data.price_idr ?? 0);

  const finalPrice =
    percentage > 0
      ? Math.round(basePrice - (basePrice * percentage) / 100)
      : basePrice;

  const formatPrice = (value: number) => {
    if (currency === "USD") {
      return `$${value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }

    return `Rp${value.toLocaleString("id-ID")}`;
  };

  const imageSrc =
    data.srcUrl && data.srcUrl.trim() !== ""
      ? data.srcUrl
      : "/images/no-image.png";

  const slug = data.name
    ? data.name.toLowerCase().replace(/\s+/g, "-")
    : "product";

  return (
    <div className="flex items-start space-x-2 sm:space-x-4">
      <Link
        href={`/shop/product/${data.id}/${slug}`}
        className="bg-[#F0EEED] rounded-lg w-[80px] sm:w-[100px] aspect-square overflow-hidden"
      >
        <Image
          src={imageSrc}
          width={124}
          height={124}
          className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
          alt={data.name ?? "product"}
          priority
        />
      </Link>

      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between">
          <Link
            href={`/shop/product/${data.id}/${slug}`}
            className="text-black font-bold text-sm sm:text-base xl:text-xl"
          >
            {data.name}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 sm:h-9 sm:w-9"
            onClick={() => dispatch(remove({ id: data.id }))}
          >
            <PiTrashFill className="text-lg sm:text-2xl text-red-600" />
          </Button>
        </div>

        <div className="flex items-center flex-wrap justify-between mt-auto">
          <div className="flex items-center space-x-1 sm:space-x-2.5">
            <span className="font-bold text-lg">
              {formatPrice(finalPrice)}
            </span>

            {percentage > 0 && (
              <span className="font-bold text-black/40 line-through text-lg">
                {formatPrice(basePrice)}
              </span>
            )}

            {percentage > 0 && (
              <span className="font-medium text-lg xl:text-xs py-1 px-2 sm:py-1.5 sm:px-3 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                -{percentage}%
              </span>
            )}
          </div>

          <CartCounter
            initialValue={data.quantity}
            max={data.stock}
            onAdd={() =>
              dispatch(
                addToCart({
                  ...data,
                  quantity: data.quantity + 1,
                })
              )
            }
            onRemove={() =>
              data.quantity === 1
                ? dispatch(remove({ id: data.id }))
                : dispatch(removeCartItem({ id: data.id }))
            }
            isZeroDelete
            className="px-3 py-2 sm:px-5 sm:py-3 max-h-7 sm:max-h-10 min-w-[80px] sm:min-w-[105px] max-w-[105px] sm:max-w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
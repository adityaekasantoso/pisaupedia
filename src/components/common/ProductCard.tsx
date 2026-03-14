"use client";

import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";

type Product = {
  id: number;
  title: string;
  src_url?: string;
  price_idr?: number;
  price_usd?: number;
  discount_amount?: number;
  discount_percentage?: number;
  rating?: number;
  stock?: number;
  pre_order_is?: boolean;
  pre_order_duration?: number;
};

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const { currency } = useCurrency();

  const isOutOfStock = (data.stock ?? 0) === 0;

  const hasDiscount =
    (data.discount_percentage ?? 0) > 0 || (data.discount_amount ?? 0) > 0;

  /* ==============================
     IMAGE FALLBACK
  ============================== */

  const imageSrc =
    data.src_url && data.src_url.trim() !== ""
      ? data.src_url
      : "/images/no-image.png";

  /* ==============================
     PRICE
  ============================== */

  const basePrice =
    currency === "USD"
      ? data.price_usd ?? 0
      : data.price_idr ?? 0;

  const discountPercentage = data.discount_percentage ?? 0;
  const discountAmount = data.discount_amount ?? 0;

  const finalPrice =
    discountPercentage > 0
      ? Math.max(
          0,
          Math.round(basePrice - (basePrice * discountPercentage) / 100)
        )
      : discountAmount > 0
      ? Math.max(0, Math.round(basePrice - discountAmount))
      : basePrice;

  /* ==============================
     FORMAT PRICE SAFE
  ============================== */

  const formatPrice = (price?: number) => {
    const safePrice = price ?? 0;

    if (currency === "USD") {
      return `$${safePrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }

    return `Rp${safePrice.toLocaleString("id-ID")}`;
  };

  return (
    <Link
      href={`/shop/product/${data.id}/${data.title?.split(" ").join("-")}`}
      className={`flex flex-col items-start aspect-auto relative ${
        isOutOfStock && !data.pre_order_is
          ? "opacity-60 pointer-events-none"
          : ""
      }`}
    >
      {/* PRE ORDER */}
      {data.pre_order_is && (
        <div className="absolute top-2 left-2 bg-orange-100 text-orange-500 font-medium px-2 py-1 text-xs rounded-full z-10">
          Pre-Order ({data.pre_order_duration ?? 0} days)
        </div>
      )}

      {/* IMAGE */}
      <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        <Image
          src={imageSrc}
          width={295}
          height={298}
          className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
          alt={data.title ?? "product"}
          priority
        />
      </div>

      {/* TITLE */}
      <strong className="text-black xl:text-l">
        {(data.title ?? "PRODUCT").toUpperCase()}
      </strong>

      {/* RATING */}
      <div className="flex items-center justify-between w-full mb-1 xl:mb-2">
        <div className="flex items-end">
          <Rating
            initialValue={data.rating ?? 0}
            allowFraction
            SVGclassName="inline-block"
            emptyClassName="fill-gray-50"
            size={19}
            readonly
          />
          <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5">
            {(data.rating ?? 0).toFixed(1)}
            <span className="text-black/60">/5</span>
          </span>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 xl:gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-black text-sm sm:text-base md:text-lg xl:text-xl">
            {formatPrice(finalPrice)}
          </span>

          {discountPercentage > 0 && (
            <span className="font-medium text-[10px] xl:text-xs py-1 px-2 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              -{discountPercentage}%
            </span>
          )}

          {discountAmount > 0 && discountPercentage === 0 && (
            <span className="font-medium text-[10px] xl:text-xs py-1 px-2 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              -{formatPrice(discountAmount)}
            </span>
          )}
        </div>

        {hasDiscount && (
          <span className="font-bold text-black/40 line-through text-sm sm:text-base md:text-lg xl:text-xl">
            {formatPrice(basePrice)}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
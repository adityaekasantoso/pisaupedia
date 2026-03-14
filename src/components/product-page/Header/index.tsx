"use client";

import PhotoSection from "./PhotoSection";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import AddToCardSection from "./AddToCardSection";
import { useCurrency } from "@/context/CurrencyContext";

type Product = {
  id: number;
  title: string;
  src_url: string;
  price_idr: number;
  price_usd: number;
  discount_amount: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  description: string;
  pre_order_is: boolean;
  pre_order_duration: number;
};

const Header = ({ data }: { data: Product }) => {
  const { currency } = useCurrency();

  const isOutOfStock = data.stock === 0;

  const basePrice =
    currency === "USD" ? data.price_usd : data.price_idr;

  const finalPrice =
    data.discount_percentage > 0
      ? Math.max(
          0,
          Math.round(
            basePrice - (basePrice * data.discount_percentage) / 100
          )
        )
      : data.discount_amount > 0
      ? Math.max(0, Math.round(basePrice - data.discount_amount))
      : basePrice;

  const formatPrice = (price: number) => {
    if (currency === "USD") {
      return `$${price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }

    return `Rp${price.toLocaleString("id-ID")}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
      <div>
        <PhotoSection data={data} />
      </div>

      <div>
        <h1
          className={cn([
            integralCF.className,
            "text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize",
          ])}
        >
          {data.title}
        </h1>

        <div className="flex items-center justify-between mb-3 sm:mb-3.5">
          <div className="flex items-center">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName="fill-gray-50"
              size={25}
              readonly
            />

            <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px]">
              {data.rating.toFixed(1)}
              <span className="text-black/60">/5</span>
            </span>
          </div>

          {isOutOfStock && !data.pre_order_is ? (
            <span className="inline-block bg-red-100 text-red-600 font-medium text-xs sm:text-sm px-2 py-1 rounded-full">
              Out of Stock
            </span>
          ) : data.pre_order_is ? (
            <span className="inline-block bg-orange-100 text-orange-500 font-medium text-xs sm:text-sm px-2 py-1 rounded-full">
              Pre-Order ({data.pre_order_duration} days)
            </span>
          ) : (
            <span className="inline-block bg-green-100 text-green-600 font-medium text-xs sm:text-sm px-2 py-1 rounded-full">
              {data.stock} in stock
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
          <span className="font-bold text-black text-2xl sm:text-[32px]">
            {formatPrice(finalPrice)}
          </span>

          {(data.discount_percentage > 0 ||
            data.discount_amount > 0) && (
            <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
              {formatPrice(basePrice)}
            </span>
          )}

          {data.discount_percentage > 0 && (
            <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              -{data.discount_percentage}%
            </span>
          )}

          {data.discount_amount > 0 &&
            data.discount_percentage === 0 && (
              <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                -{formatPrice(data.discount_amount)}
              </span>
            )}
        </div>

        <p className="text-sm sm:text-base text-black/60 mb-5">
          {data.description}
        </p>

        <hr className="hidden md:block h-[1px] border-t-black/10 my-5" />

        <AddToCardSection
          data={{
            ...data,
            price: basePrice,
          }}
        />
      </div>
    </div>
  );
};

export default Header;
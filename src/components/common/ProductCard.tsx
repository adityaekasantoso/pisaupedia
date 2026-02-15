import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const isOutOfStock = data.stock === 0;

  return (
    <Link
      href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
      className={`flex flex-col items-start aspect-auto ${
        isOutOfStock ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        <Image
          src={data.srcUrl}
          width={295}
          height={298}
          className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
          alt={data.title}
          priority
        />
      </div>

      <strong className="text-black xl:text-l">
        {data.title.toUpperCase()}
      </strong>

      <div className="flex items-center justify-between w-full mb-1 xl:mb-2">
        <div className="flex items-end">
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName="inline-block"
            emptyClassName="fill-gray-50"
            size={19}
            readonly
          />
          <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5">
            {data.rating.toFixed(1)}
            <span className="text-black/60">/5</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 xl:gap-2.5">
        <div className="flex items-center gap-2">
          {data.discount.percentage > 0 ? (
            <span className="font-bold text-black text-sm sm:text-base md:text-lg xl:text-xl">
              {`Rp${Math.round(
                data.price - (data.price * data.discount.percentage) / 100,
              )}`}
            </span>
          ) : data.discount.amount > 0 ? (
            <span className="font-bold text-black text-sm sm:text-base md:text-lg xl:text-xl">
              {`Rp${data.price - data.discount.amount}`}
            </span>
          ) : (
            <span className="font-bold text-black text-sm sm:text-base md:text-lg xl:text-xl">
              Rp{data.price}
            </span>
          )}

          {data.discount.percentage > 0 && (
            <span className="font-medium text-[10px] xl:text-xs py-1 px-2 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              -{data.discount.percentage}%
            </span>
          )}

          {data.discount.amount > 0 && (
            <span className="font-medium text-[10px] xl:text-xs py-1 px-2 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              -Rp{data.discount.amount}
            </span>
          )}
        </div>

        {(data.discount.percentage > 0 || data.discount.amount > 0) && (
          <span className="font-bold text-black/40 line-through text-sm sm:text-base md:text-lg xl:text-xl">
            Rp{data.price}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;

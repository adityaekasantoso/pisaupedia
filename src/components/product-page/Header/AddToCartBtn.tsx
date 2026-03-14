"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";
import { Product } from "@/types/product.types";

type Props = {
  data: Product & { quantity: number };
};

const AddToCartBtn = ({ data }: Props) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.title,
        srcUrl: data.src_url,

        price_idr: data.price_idr,
        price_usd: data.price_usd,

        quantity: data.quantity,
        stock: data.stock,

        discount_percentage: data.discount_percentage,
        discount_amount: data.discount_amount,
      })
    );
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base transition-all bg-black text-white hover:bg-black/80"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";
import { Product } from "@/types/product.types";

type Props = {
  data: Product & { quantity: number; stock: number };
};

const AddToCartBtn = ({ data }: Props) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.title,
        srcUrl: data.srcUrl,
        price: data.price,
        discount: data.discount,
        quantity: data.quantity,
        stock: data.stock,
      }),
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

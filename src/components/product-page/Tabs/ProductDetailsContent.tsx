"use client";
import ProductDetails from "./ProductDetails";
import { Product } from "@/types/product.types";

type ProductDetailsContentProps = {
  product: Product;
};

const ProductDetailsContent = ({ product }: ProductDetailsContentProps) => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Product specifications
      </h3>
      <ProductDetails specs={product.specification} />
    </section>
  );
};

export default ProductDetailsContent;

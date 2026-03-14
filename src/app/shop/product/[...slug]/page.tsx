"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/product-page/Header";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Tabs from "@/components/product-page/Tabs";
import ProductListSec from "@/components/common/ProductListSec";
import { Product } from "@/types/product.types";
import { useCurrency } from "@/context/CurrencyContext";

export default function ProductPage() {
  const params = useParams();
  const { currency } = useCurrency();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/products");
        const allProducts: Product[] = await res.json();

        const prod = allProducts.find((p: Product) => p.id === Number(slug));
        if (!prod) {
          setProduct(null);
          return;
        }

        setProduct(prod);
        setRelatedProducts(allProducts.filter((p) => p.id !== prod.id));
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug, currency]);

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">
            Product Not Found
          </h1>
          <p className="text-black/60 mb-6">
            The product you are looking for does not exist or may have been
            removed.
          </p>
          <a
            href="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition"
          >
            Shop
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0">
      <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
      <BreadcrumbProduct title={product.title} />
      <section className="mb-11">
        <Header data={product} />
      </section>
      <Tabs product={product} />
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProducts} />
      </div>
    </main>
  );
}
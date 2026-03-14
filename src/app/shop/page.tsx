"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import ProductCard from "@/components/common/ProductCard";
import Filters from "@/components/shop-page/filters";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import { FiSliders } from "react-icons/fi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Product } from "@/types/product.types";
import { useCurrency } from "@/context/CurrencyContext";

export default function ShopPage() {
  const { currency } = useCurrency();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    setPage(1);
  }, [category, currency]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/products");
        const data: Product[] = await res.json();
        setAllProducts(data);
      } catch {
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];
    if (category) {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }
    return products;
  }, [allProducts, category]);

  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / limit);

  const products = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page, limit]);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters />
          </div>

          <div className="flex flex-col w-full space-y-5">
            <MobileFilters />

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {products.map((product) => (
                  <div key={product.id} className="relative">
                    <div
                      className={
                        product.stock === 0
                          ? "opacity-60 pointer-events-none"
                          : ""
                      }
                    >
                      <ProductCard data={product} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && totalPages > 1 && (
              <>
                <hr className="border-t-black/10" />
                <Pagination className="justify-between">
                  <PaginationPrevious
                    href="#"
                    className="border border-black/10"
                    onClick={() =>
                      setPage((prev) => (prev - 1 > 0 ? prev - 1 : 1))
                    }
                  />

                  <PaginationContent>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={i + 1 === page}
                          onClick={() => setPage(i + 1)}
                          className="text-black/50 font-medium text-sm"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>

                  <PaginationNext
                    href="#"
                    className="border border-black/10"
                    onClick={() =>
                      setPage((prev) =>
                        prev + 1 <= totalPages ? prev + 1 : prev,
                      )
                    }
                  />
                </Pagination>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

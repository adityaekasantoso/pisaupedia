"use client";

import React, { useEffect, useState } from "react";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/types/product.types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [sort, setSort] = useState("most-popular");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`/api/product?page=${page}&limit=${limit}&sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setTotal(data.total);
      });
  }, [page, limit, sort]);

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
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {products.length} of {total} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select defaultValue={sort} onValueChange={setSort}>
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

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

            <hr className="border-t-black/10" />
            <Pagination className="justify-between">
              <PaginationPrevious
                href="#"
                className="border border-black/10"
                onClick={() => setPage(page - 1 > 0 ? page - 1 : 1)}
              />
              <PaginationContent>
                {Array.from({ length: Math.ceil(total / limit) }).map(
                  (_, i) => (
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
                  ),
                )}
              </PaginationContent>
              <PaginationNext
                href="#"
                className="border border-black/10"
                onClick={() =>
                  setPage(
                    page + 1 <= Math.ceil(total / limit) ? page + 1 : page,
                  )
                }
              />
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}

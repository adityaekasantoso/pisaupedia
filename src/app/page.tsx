"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/homepage/Header";
import ProductListSec from "@/components/common/ProductListSec";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export default function Home() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user: "Andy S.",
      content: "This knife is incredibly sharp and comfortable to hold.",
      rating: 5,
      date: "February 10, 2026",
    },
    {
      id: 2,
      user: "Rina M.",
      content: "The design is sleek and ergonomic. Perfect for everyday use.",
      rating: 5,
      date: "February 11, 2026",
    },
    {
      id: 3,
      user: "Budi T.",
      content: "The knife maintains its sharpness well.",
      rating: 4.5,
      date: "February 12, 2026",
    },
    {
      id: 4,
      user: "Sari P.",
      content: "As a home chef, I love this knife.",
      rating: 5,
      date: "February 12, 2026",
    },
    {
      id: 5,
      user: "Hendra K.",
      content: "This knife is light yet strong. Highly recommended!",
      rating: 5,
      date: "February 13, 2026",
    },
    {
      id: 6,
      user: "Maya L.",
      content: "The sharpness of this knife is outstanding.",
      rating: 5,
      date: "February 13, 2026",
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/products");
        const data: Product[] = await res.json();

        // New arrivals: sorting by id descending
        const sortedByIdDesc = [...data].sort((a, b) => b.id - a.id);
        setNewArrivals(sortedByIdDesc.slice(0, 4));

        // Top selling: sorting by rating descending
        const sortedByRating = [...data].sort((a, b) => b.rating - a.rating);
        setTopSelling(sortedByRating.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW PRODUCT"
          data={newArrivals}
          viewAllLink="/shop#new-arrivals"
        />

        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>

        <ProductListSec
          title="TOP SELLING"
          data={topSelling}
          viewAllLink="/shop#top-selling"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>

        <Reviews data={reviews} />
      </main>
    </>
  );
}

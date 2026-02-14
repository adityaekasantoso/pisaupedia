import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 120,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 2,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic2.png",
    gallery: ["/images/pic2.png"],
    price: 260,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 3.5,
  },
  {
    id: 3,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic3.png",
    gallery: ["/images/pic3.png"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 4,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic4.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 160,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
  },
];

export const topSellingData: Product[] = [
  {
    id: 5,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic5.png",
    gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
    price: 232,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 5.0,
  },
  {
    id: 6,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic6.png",
    gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.0,
  },
  {
    id: 7,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic7.png",
    gallery: ["/images/pic7.png"],
    price: 80,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.0,
  },
  {
    id: 8,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic8.png",
    gallery: ["/images/pic8.png"],
    price: 210,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
];

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic12.png",
    gallery: ["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"],
    price: 242,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.0,
  },
  {
    id: 13,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic13.png",
    gallery: ["/images/pic13.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.5,
  },
  {
    id: 14,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic14.png",
    gallery: ["/images/pic14.png"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 15,
    title: "BUNKA N695 STAILNLESS STELL 165mm",
    srcUrl: "/images/pic15.png",
    gallery: ["/images/pic15.png"],
    price: 150,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 5.0,
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Andy S.",
    content: `"This knife is incredibly sharp and comfortable to hold. Chopping vegetables and meat is fast and precise. Very satisfied with its quality!"`,
    rating: 5,
    date: "February 10, 2026",
  },
  {
    id: 2,
    user: "Rina M.",
    content: `"The design is sleek and ergonomic. The handle feels solid and non-slip. Perfect for everyday use in the kitchen."`,
    rating: 5,
    date: "February 11, 2026",
  },
  {
    id: 3,
    user: "Budi T.",
    content: `"The knife maintains its sharpness well. After a few weeks of use, it still easily cuts hard vegetables and frozen meat. The material is top quality."`,
    rating: 4.5,
    date: "February 12, 2026",
  },
  {
    id: 4,
    user: "Sari P.",
    content: `"As a home chef, I love this knife. The cutting edge is precise and cleaning it is easy. It makes kitchen prep much more efficient."`,
    rating: 5,
    date: "February 12, 2026",
  },
  {
    id: 5,
    user: "Hendra K.",
    content: `"This knife is light yet strong. Cutting meat and vegetables is effortless without much force. Highly recommended!"`,
    rating: 5,
    date: "February 13, 2026",
  },
  {
    id: 6,
    user: "Maya L.",
    content: `"The sharpness of this knife is outstanding. I love how ergonomic the design is, making it safe to use for long periods. Worth every penny!"`,
    rating: 5,
    date: "February 13, 2026",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      {/* <Brands /> */}
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW PRODUCT"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        {/* <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div> */}
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}

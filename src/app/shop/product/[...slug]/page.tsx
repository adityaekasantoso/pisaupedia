import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";

const newArrivalsData: Product[] = [
  { id: 1, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic1.png", gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"], price: 120, discount: { amount: 0, percentage: 0 }, rating: 4.5 },
  { id: 2, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic2.png", gallery: ["/images/pic2.png"], price: 260, discount: { amount: 0, percentage: 20 }, rating: 3.5 },
  { id: 3, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic3.png", gallery: ["/images/pic3.png"], price: 180, discount: { amount: 0, percentage: 0 }, rating: 4.5 },
  { id: 4, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic4.png", gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"], price: 160, discount: { amount: 0, percentage: 30 }, rating: 4.5 },
];

const topSellingData: Product[] = [
  { id: 5, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic5.png", gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"], price: 232, discount: { amount: 0, percentage: 20 }, rating: 5.0 },
  { id: 6, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic6.png", gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"], price: 145, discount: { amount: 0, percentage: 0 }, rating: 4.0 },
  { id: 7, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic7.png", gallery: ["/images/pic7.png"], price: 80, discount: { amount: 0, percentage: 0 }, rating: 3.0 },
  { id: 8, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic8.png", gallery: ["/images/pic8.png"], price: 210, discount: { amount: 0, percentage: 0 }, rating: 4.5 },
];

const relatedProductData: Product[] = [
  { id: 12, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic12.png", gallery: ["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"], price: 242, discount: { amount: 0, percentage: 20 }, rating: 4.0 },
  { id: 13, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic13.png", gallery: ["/images/pic13.png", "/images/pic10.png", "/images/pic11.png"], price: 145, discount: { amount: 0, percentage: 0 }, rating: 3.5 },
  { id: 14, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic14.png", gallery: ["/images/pic14.png"], price: 180, discount: { amount: 0, percentage: 0 }, rating: 4.5 },
  { id: 15, title: "BUNKA N695 STAILNLESS STELL 165mm", srcUrl: "/images/pic15.png", gallery: ["/images/pic15.png"], price: 150, discount: { amount: 0, percentage: 30 }, rating: 5.0 },
];

const data: Product[] = [
  ...newArrivalsData,
  ...topSellingData,
  ...relatedProductData,
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const productData = data.find(
    (product) => product.id === Number(slug[0])
  );

  if (!productData?.title) {
    notFound();
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div>
    </main>
  );
}

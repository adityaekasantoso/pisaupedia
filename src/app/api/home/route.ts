import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const newArrivals = [
    {
      id: 1,
      title: "Bunka N695 Stainless Steel 165mm",
      srcUrl: "/images/pic1.png",
      gallery: ["/images/pic1.png"],
      price: 1000000,
      stock: 10,
      discount: { amount: 0, percentage: 1 },
      rating: 4.8,
    },
    {
      id: 2,
      title: "Pisau Dapur Slicer HSS 210mm Kurouchi Finish",
      srcUrl: "/images/pic2.png",
      gallery: ["/images/pic2.png"],
      price: 800000,
      stock: 15,
      discount: { amount: 0, percentage: 1 },
      rating: 4.6,
    },
    {
      id: 3,
      title: "Pisau Dapur Gyuto 210mm Nashiji Finish",
      srcUrl: "/images/pic3.png",
      gallery: ["/images/pic3.png"],
      price: 850000,
      stock: 8,
      discount: { amount: 0, percentage: 1 },
      rating: 4.7,
    },
    {
      id: 4,
      title: "Pisau Dapur Bunka HSS 165mm",
      srcUrl: "/images/pic4.png",
      gallery: ["/images/pic4.png"],
      price: 750000,
      stock: 12,
      discount: { amount: 0, percentage: 1 },
      rating: 4.5,
    },
  ];

  const topSelling = [
    {
      id: 5,
      title: "Deba 165mm High Speed Steel",
      srcUrl: "/images/pic5.png",
      gallery: ["/images/pic5.png"],
      price: 900000,
      stock: 6,
      discount: { amount: 0, percentage: 1 },
      rating: 5.0,
    },
    {
      id: 6,
      title: "Pisau Dapur Gyuto 240mm Amboyna Blue Resin Handle",
      srcUrl: "/images/pic6.png",
      gallery: ["/images/pic6.png"],
      price: 2500000,
      stock: 5,
      discount: { amount: 0, percentage: 1 },
      rating: 4.9,
    },
    {
      id: 7,
      title: "Tactical Knife N690co Cobalt Blade Material",
      srcUrl: "/images/pic7.png",
      gallery: ["/images/pic7.png"],
      price: 1300000,
      stock: 4,
      discount: { amount: 0, percentage: 1 },
      rating: 4.8,
    },
    {
      id: 8,
      title: "Gyuto HSS 210 with Dyed Alder Wood Handle",
      srcUrl: "/images/pic8.png",
      gallery: ["/images/pic8.png"],
      price: 1800000,
      stock: 7,
      discount: { amount: 0, percentage: 1 },
      rating: 4.7,
    },
  ];

  const relatedProducts = [
    {
      id: 9,
      title: "Bushcraft Semi Tactical Knife 100mm",
      srcUrl: "/images/pic9.png",
      gallery: ["/images/pic9.png"],
      price: 1200000,
      stock: 9,
      discount: { amount: 0, percentage: 1 },
      rating: 4.6,
    },
    {
      id: 10,
      title: "Pisau Dapur K-tip Gyuto Kurouchi 215mm High Speed Steel",
      srcUrl: "/images/pic10.png",
      gallery: ["/images/pic10.png"],
      price: 850000,
      stock: 10,
      discount: { amount: 0, percentage: 1 },
      rating: 4.5,
    },
    {
      id: 11,
      title: "Pisau Dapur Petty Kurouchi 140mm High Speed Steel",
      srcUrl: "/images/pic11.png",
      gallery: ["/images/pic11.png"],
      price: 650000,
      stock: 14,
      discount: { amount: 0, percentage: 1 },
      rating: 4.4,
    },
    {
      id: 12,
      title: "Pisau Dapur Gyuto 210mm Full Tang Handle Style",
      srcUrl: "/images/pic12.png",
      gallery: ["/images/pic12.png"],
      price: 525000,
      stock: 20,
      discount: { amount: 0, percentage: 1 },
      rating: 4.9,
    },
  ];

  return NextResponse.json({
    newArrivals,
    topSelling,
    relatedProducts,
  });
};

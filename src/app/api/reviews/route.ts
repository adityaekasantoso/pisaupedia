import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const reviews = [
    { id: 1, user: "Andy S.", content: "This knife is incredibly sharp and comfortable to hold.", rating: 5, date: "February 10, 2026" },
    { id: 2, user: "Rina M.", content: "The design is sleek and ergonomic. Perfect for everyday use.", rating: 5, date: "February 11, 2026" },
    { id: 3, user: "Budi T.", content: "The knife maintains its sharpness well.", rating: 4.5, date: "February 12, 2026" },
    { id: 4, user: "Sari P.", content: "As a home chef, I love this knife.", rating: 5, date: "February 12, 2026" },
    { id: 5, user: "Hendra K.", content: "This knife is light yet strong. Highly recommended!", rating: 5, date: "February 13, 2026" },
    { id: 6, user: "Maya L.", content: "The sharpness of this knife is outstanding.", rating: 5, date: "February 13, 2026" },
  ];

  return NextResponse.json(reviews);
};

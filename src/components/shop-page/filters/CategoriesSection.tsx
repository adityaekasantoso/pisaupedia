import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "Chef Knives",
    slug: "/shop?category=chef-knives",
  },
  {
    title: "Utility Knives",
    slug: "/shop?category=utility-knives",
  },
  {
    title: "Paring Knives",
    slug: "/shop?category=paring-knives",
  },
  {
    title: "Bread Knives",
    slug: "/shop?category=bread-knives",
  },
  {
    title: "Specialty Knives",
    slug: "/shop?category=specialty-knives",
  },
];


const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <Link
          key={idx}
          href={category.slug}
          className="flex items-center justify-between py-2"
        >
          {category.title} <MdKeyboardArrowRight />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;

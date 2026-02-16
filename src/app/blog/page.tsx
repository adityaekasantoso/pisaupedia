"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { TbBasketExclamation } from "react-icons/tb";
import Link from "next/link";
import BreadcrumbBlog from "@/components/blog-page/BreadcrumbBlog";

export default function BlogPage() {
 const blogs = [
  {
    id: 1,
    title: "Guide to Choosing Quality Kitchen Knives",
    excerpt:
      "Selecting the right kitchen knife is essential for efficient and safe cooking. A high-quality knife makes chopping, slicing, and dicing much easier.Tips for Choosing Kitchen Knives:Choose stainless steel blades for rust resistance and durability.Ensure the handle is comfortable and non-slip...",
    url: "/blog/guide-choosing-kitchen-knives",
  },
  {
    id: 2,
    title: "Knife Care Tips to Keep Them Sharp",
    excerpt:
      "How to care for and store knives to maintain sharpness and durability.",
    url: "/blog/knife-care-tips",
  },
  {
    id: 3,
    title: "Best Knives for Outdoor Adventures",
    excerpt:
      "Choosing the perfect knife for camping, hiking, and outdoor activities.",
    url: "/blog/best-outdoor-knives",
  },
  {
    id: 4,
    title: "Differences Between Stainless Steel and Carbon Steel Knives",
    excerpt:
      "Understand the pros and cons of stainless and carbon steel knives.",
    url: "/blog/stainless-vs-carbon-steel-knives",
  },
];


  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
                <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />

        <BreadcrumbBlog/>
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="w-full p-5 md:px-6 flex flex-col space-y-2 rounded-[20px] border border-black/10 bg-white"
              >
                <h1
                  className={cn([
                    integralCF.className,
                    "text-xl text-black mb-4",
                  ])}
                >
                  {blog.title}
                </h1>
                <p className="text-black/60">{blog.excerpt}</p>

                {/* Rata kanan */}
                <div className="flex justify-end mt-2">
                  <Button className="rounded-full w-max" asChild>
                    <Link href={blog.url}>Read More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">No blog posts found.</span>
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { TbBasketExclamation } from "react-icons/tb";
import Link from "next/link";
import BreadcrumbBlog from "@/components/blog-page/BreadcrumbBlog";
import React, { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  created_at: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/blogs");
        const data: Blog[] = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const renderPreview = (content: string) => {
    const text = content.replace(/<[^>]+>/g, ""); 
    return text.length > 150 ? text.slice(0, 150) + "..." : text;
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />

        <BreadcrumbBlog />

        {loading ? (
          <div className="text-center py-20 text-black/60">
            Loading blogs...
          </div>
        ) : blogs && blogs.length > 0 ? (
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
                <p className="text-black/60">{renderPreview(blog.content)}</p>

                <div className="flex justify-end mt-2">
                  <Button className="rounded-full w-max" asChild>
                    <Link href={`/blog/${blog.slug}`}>Read More</Link>
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

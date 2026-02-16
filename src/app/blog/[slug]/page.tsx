"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdOutlineContentCopy, MdShare } from "react-icons/md";

// Konten blog dijadikan React component agar prose & HTML tags ter-render dengan benar
const blogData = [
  {
    slug: "guide-choosing-kitchen-knives",
    title: "Guide to Choosing Quality Kitchen Knives",
    author: "Admin",
    date: "2026-02-15",
    content: () => (
      <>
        <p>
          Selecting the right kitchen knife is essential for efficient and safe cooking. A high-quality knife makes chopping, slicing, and dicing much easier.
        </p>
        <h3>Tips for Choosing Kitchen Knives:</h3>
        <ul>
          <li>Choose stainless steel blades for rust resistance and durability.</li>
          <li>Ensure the handle is comfortable and non-slip.</li>
          <li>Pick the knife size according to your needs (chef knife, utility, paring knife).</li>
          <li>Check the balance between the handle and blade for better control.</li>
        </ul>
        <p>
          Using the right knife enhances your cooking efficiency and safety.
        </p>
      </>
    ),
  },
  {
    slug: "knife-care-tips",
    title: "Knife Care Tips to Keep Them Sharp",
    author: "Admin",
    date: "2026-02-12",
    content: () => (
      <>
        <p>
          A sharp and well-maintained knife lasts longer and is safer to use than a dull one.
        </p>
        <h3>Knife Maintenance Tricks:</h3>
        <ul>
          <li>Wash knives manually; avoid using a dishwasher.</li>
          <li>Dry immediately after washing to prevent rust.</li>
          <li>Use wooden or plastic cutting boards instead of glass.</li>
          <li>Sharpen knives regularly with a sharpening stone or honing rod.</li>
        </ul>
        <p>
          Proper storage, such as a knife block or blade guards, also helps maintain sharpness.
        </p>
      </>
    ),
  },
  {
    slug: "best-outdoor-knives",
    title: "Best Knives for Outdoor Adventures",
    author: "Admin",
    date: "2026-02-08",
    content: () => (
      <>
        <p>
          For outdoor activities like camping and hiking, having a strong and versatile knife is essential.
        </p>
        <h3>Outdoor Knife Criteria:</h3>
        <ul>
          <li>Durable materials like carbon steel or high-carbon stainless steel.</li>
          <li>Medium-sized blade with a protective sheath.</li>
          <li>Ergonomic, non-slip handle design.</li>
          <li>Easy to clean and maintain.</li>
        </ul>
        <p>
          The right outdoor knife can help with food prep, wood cutting, and emergency situations.
        </p>
      </>
    ),
  },
  {
    slug: "stainless-vs-carbon-steel-knives",
    title: "Differences Between Stainless Steel and Carbon Steel Knives",
    author: "Admin",
    date: "2026-02-05",
    content: () => (
      <>
        <p>
          Understanding the differences between stainless steel and carbon steel knives helps you make the best choice for your needs.
        </p>
        <h3>Stainless Steel:</h3>
        <ul>
          <li>Rust-resistant and low maintenance.</li>
          <li>Easy to clean.</li>
          <li>Ideal for everyday use.</li>
        </ul>
        <h3>Carbon Steel:</h3>
        <ul>
          <li>Sharper edge and easier to sharpen.</li>
          <li>Requires extra care to prevent rust.</li>
          <li>Preferred by professional chefs.</li>
        </ul>
        <p>
          Choose based on your cooking style and willingness to maintain your knives.
        </p>
      </>
    ),
  },
];

// Format tanggal: 10 Feb 2026
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export default function BlogDetailPage() {
  const params = useParams();
  const { slug } = params;

  const blog = blogData.find((b) => b.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Blog not found</h2>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Your browser does not support share API.");
    }
  };

  return (
    <main className="p-10">
      <div className="max-w-3xl mx-auto px-4 xl:px-0">
        <h1
          className={cn([
            integralCF.className,
            "text-4xl md:text-3xl font-bold text-black mb-4",
          ])}
        >
          {blog.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-black/60 mb-6 text-sm sm:text-base">
          <div className="flex items-center space-x-4">
            <span>
              By <strong>{blog.author}</strong>
            </span>
            <span>• {formatDate(blog.date)}</span>
          </div>
          <div className="flex items-center space-x-3 mt-2 sm:mt-0">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center space-x-1"
              onClick={handleCopyLink}
            >
              <MdOutlineContentCopy className="text-lg" />
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center space-x-1"
              onClick={handleShare}
            >
              <MdShare className="text-lg" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Render content as React component */}
        <article className="prose prose-lg text-black max-w-full">
          {blog.content()}
        </article>

        <div className="mt-8">
          <Button asChild>
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

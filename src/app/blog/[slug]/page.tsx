"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdOutlineContentCopy, MdShare } from "react-icons/md";

interface Blog {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  created_at: string;
}

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
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/blogs/slug/${slug}`);
        if (!res.ok) throw new Error("Blog not found");
        const data: Blog = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Your browser does not support share API.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black/60">
        Loading blog...
      </div>
    );
  }

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
            <span>• {formatDate(blog.created_at)}</span>
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

        <article
          className="prose prose-lg text-black max-w-full"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-8">
          <Button asChild>
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

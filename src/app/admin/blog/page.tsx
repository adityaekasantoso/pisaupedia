"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Blog {
  id?: number;
  title: string;
  slug: string;
  author: string;
  content: string;
}

const emptyForm: Blog = {
  title: "",
  slug: "",
  author: "",
  content: "",
};

export default function AdminBlogPage() {
  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<Blog>(emptyForm);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const user =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;

    if (!user || user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchBlogs();
  }, [router]);

  const fetchBlogs = async () => {
    const res = await fetch("https://api-pisaupedia.vercel.app/api/blogs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setBlogs(data);
  };

  const openCreateModal = () => {
    setSelectedBlog(null);
    setForm(emptyForm);
    setOpenModal(true);
  };

  const openEditModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setForm(blog);
    setOpenModal(true);
  };

  const handleChange = (key: keyof Blog, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const url = selectedBlog
      ? `https://api-pisaupedia.vercel.app/api/blogs/${selectedBlog.id}`
      : "https://api-pisaupedia.vercel.app/api/blogs";

    await fetch(url, {
      method: selectedBlog ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setOpenModal(false);
    fetchBlogs();
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;

    await fetch(`https://api-pisaupedia.vercel.app/api/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchBlogs();
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="shadow-none rounded-lg border border-gray-200 bg-white">
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
            <CardTitle className="text-xl font-bold">Blog Management</CardTitle>
            <Button onClick={openCreateModal} className="rounded-full px-4 py-2">
              Add Blog
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-black/10 p-4">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {blogs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-gray-500 py-4"
                      >
                        No blogs available
                      </TableCell>
                    </TableRow>
                  ) : (
                    blogs.map((blog) => (
                      <TableRow
                        key={blog.id}
                        className="hover:bg-gray-50 even:bg-gray-50"
                      >
                        <TableCell className="font-medium">
                          {blog.title}
                        </TableCell>
                        <TableCell>{blog.author}</TableCell>

                        <TableCell className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(blog)}
                            className="rounded-full"
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(blog.id)}
                            className="rounded-full"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {selectedBlog ? "Edit Blog" : "Add Blog"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col space-y-4 mt-4">
              <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="rounded-full"
              />

              <Input
                placeholder="Slug"
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className="rounded-full"
              />

              <Input
                placeholder="Author"
                value={form.author}
                onChange={(e) => handleChange("author", e.target.value)}
                className="rounded-full"
              />

              <Textarea
                placeholder="Content (HTML allowed)"
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="h-40 rounded-xl"
              />
            </div>

            <DialogFooter className="mt-4 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpenModal(false)}
                className="rounded-full"
              >
                Cancel
              </Button>

              <Button onClick={handleSave} className="rounded-full">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
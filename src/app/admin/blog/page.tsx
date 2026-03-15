"use client";

import React, { useState, useEffect } from "react";
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

export default function AdminBlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [form, setForm] = useState<Blog>({
    title: "",
    slug: "",
    author: "",
    content: "",
  });

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!storedUser) return router.push("/");

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") return router.push("/");

    fetchBlogs();
  }, [router]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (blog?: Blog) => {
    setSelectedBlog(blog || null);
    setForm(blog || { title: "", slug: "", author: "", content: "" });
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      const url = selectedBlog
        ? `http://localhost:3001/api/blogs/${selectedBlog.id}`
        : "http://localhost:3001/api/blogs";

      const res = await fetch(url, {
        method: selectedBlog ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save blog");
      }

      setOpenModal(false);
      fetchBlogs();
    } catch (err: any) {
      alert("Failed to save blog: " + err.message);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id || !confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete blog");
      }
      fetchBlogs();
    } catch (err: any) {
      alert("Failed to delete blog: " + err.message);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="shadow-none rounded-lg border border-gray-200 bg-white">
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
            <CardTitle className="text-xl font-bold">Blog Management</CardTitle>
            <Button
              onClick={() => handleOpenModal()}
              className="rounded-full px-4 py-2"
            >
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
                    blogs.map((b) => (
                      <TableRow
                        key={b.id}
                        className="hover:bg-gray-50 even:bg-gray-50"
                      >
                        <TableCell className="font-medium">{b.title}</TableCell>
                        <TableCell>{b.author}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenModal(b)}
                            className="rounded-full"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(b.id)}
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
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Title"
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Slug</label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="Slug"
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Author</label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Author"
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Content</label>
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="Content (HTML allowed)"
                  className="h-40 rounded-xl"
                />
              </div>
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

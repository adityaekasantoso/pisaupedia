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
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Specification = {
  "Blade Shape": string;
  "Steel Type": string;
  "Blade Length": string;
  "Blade Height": string;
  "Handle Type": string;
  "Handle Materials": string;
};

type Product = {
  id: number;
  title: string;
  src_url: string;
  gallery: string[];
  price_idr: number;
  price_usd: number;
  discount_amount: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  category: string;
  description: string;
  pre_order_is: boolean;
  pre_order_duration: number;
  specification: Specification;
};

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const initialSpec: Specification = {
    "Blade Shape": "",
    "Steel Type": "",
    "Blade Length": "",
    "Blade Height": "",
    "Handle Type": "",
    "Handle Materials": "",
  };

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price_idr: 0,
    price_usd: 0,
    discount_amount: 0,
    discount_percentage: 0,
    rating: 0,
    stock: 0,
    pre_order_is: false,
    pre_order_duration: 0,
    specification: { ...initialSpec },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return router.push("/");

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") return router.push("/");

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://api-pisaupedia.vercel.app/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      description: "",
      price_idr: 0,
      price_usd: 0,
      discount_amount: 0,
      discount_percentage: 0,
      rating: 0,
      stock: 0,
      pre_order_is: false,
      pre_order_duration: 0,
      specification: { ...initialSpec },
    });
    setImageFiles([]);
    setPreviews([]);
    setEditId(null);
  };

  // 🔥 MULTIPLE UPLOAD
  const handleUploadImages = async () => {
    const urls: string[] = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", form.title);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) continue;

      const data = await res.json();
      urls.push(data.url);
    }

    return urls;
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Token tidak ada");

      let uploadedImages: string[] = [];

      if (imageFiles.length > 0) {
        uploadedImages = await handleUploadImages();
      }

      const gallery = uploadedImages.length > 0 ? uploadedImages : previews;

      const body = {
        title: form.title,
        src_url: gallery[0],
        gallery: gallery,

        price_idr: Number(form.price_idr),
        price_usd: Number(form.price_usd),
        discount_amount: Number(form.discount_amount),
        discount_percentage: Number(form.discount_percentage),
        rating: Number(form.rating),
        stock: Number(form.stock),

        category: form.category,
        description: form.description,

        pre_order_is: form.pre_order_is,
        pre_order_duration: Number(form.pre_order_duration),

        specification: {
          "Blade Shape": form.specification["Blade Shape"] || "-",
          "Steel Type": form.specification["Steel Type"] || "-",
          "Blade Length": form.specification["Blade Length"] || "-",
          "Blade Height": form.specification["Blade Height"] || "-",
          "Handle Type": form.specification["Handle Type"] || "-",
          "Handle Materials": form.specification["Handle Materials"] || "-",
        },
      };

      const url = editId
        ? `https://api-pisaupedia.vercel.app/api/products/${editId}`
        : `https://api-pisaupedia.vercel.app/api/products`;

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) return alert("Gagal save");

      setOpenModal(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      alert("Error");
    }
  };

  const handleEdit = (p: Product) => {
    setEditId(p.id);

    setForm({
      title: p.title,
      category: p.category,
      description: p.description,
      price_idr: p.price_idr,
      price_usd: p.price_usd,
      discount_amount: p.discount_amount,
      discount_percentage: p.discount_percentage,
      rating: p.rating,
      stock: p.stock,
      pre_order_is: p.pre_order_is,
      pre_order_duration: p.pre_order_duration,
      specification: p.specification,
    });

    setPreviews(p.gallery?.length ? p.gallery : [p.src_url]);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("Yakin hapus?")) return;

    await fetch(`https://api-pisaupedia.vercel.app/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6">
        <Card className="shadow-none">
          <CardHeader className="flex justify-between flex-row">
            <CardTitle className="text-xl font-bold">
              Product Management
            </CardTitle>
            <Button
              className="rounded-full"
              onClick={() => {
                resetForm();
                setOpenModal(true);
              }}
            >
              Add Product
            </Button>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-xl border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <Image src={p.src_url} alt="" width={40} height={40} />
                      </TableCell>
                      <TableCell>{p.title}</TableCell>
                      <TableCell>{p.category}</TableCell>
                      <TableCell>Rp {p.price_idr}</TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          className="rounded-full"
                          onClick={() => handleEdit(p)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          className="rounded-full"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* MODAL */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-h-[90vh] overflow-y-auto rounded-xl">
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit Product" : "Create Product"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* TITLE */}
              <div>
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* CATEGORY */}
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setForm({ ...form, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="chef-knives">Chef Knives</SelectItem>
                    <SelectItem value="utility-knives">
                      Utility Knives
                    </SelectItem>
                    <SelectItem value="paring-knives">Paring Knives</SelectItem>
                    <SelectItem value="bread-knives">Bread Knives</SelectItem>
                    <SelectItem value="specialty-knives">
                      Specialty Knives
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* IMAGE */}
              <div>
                <Label>Images</Label>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setImageFiles(files);

                    const urls = files.map((f) => URL.createObjectURL(f));
                    setPreviews(urls);
                  }}
                />

                <div className="flex gap-2 mt-2 flex-wrap">
                  {previews.map((img, i) => (
                    <Image key={i} src={img} alt="" width={80} height={80} />
                  ))}
                </div>
              </div>

              {/* PRICE */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Price IDR</Label>
                  <Input
                    type="number"
                    value={form.price_idr}
                    onChange={(e) =>
                      setForm({ ...form, price_idr: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label>Price USD</Label>
                  <Input
                    type="number"
                    value={form.price_usd}
                    onChange={(e) =>
                      setForm({ ...form, price_usd: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              {/* DISCOUNT */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Discount Amount</Label>
                  <Input
                    type="number"
                    value={form.discount_amount}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        discount_amount: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Discount Percentage</Label>
                  <Input
                    type="number"
                    value={form.discount_percentage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        discount_percentage: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* RATING & STOCK */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              {/* PRE ORDER */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.pre_order_is}
                  onChange={(e) =>
                    setForm({ ...form, pre_order_is: e.target.checked })
                  }
                />
                <Label>Pre Order</Label>
              </div>

              {form.pre_order_is && (
                <div>
                  <Label>Pre Order Duration (days)</Label>
                  <Input
                    type="number"
                    value={form.pre_order_duration}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pre_order_duration: Number(e.target.value),
                      })
                    }
                  />
                </div>
              )}

              {/* DESCRIPTION */}
              <div>
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              {/* SPECIFICATION */}
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(form.specification).map((key) => (
                  <div key={key}>
                    <Label>{key}</Label>
                    <Input
                      value={form.specification[key as keyof Specification]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          specification: {
                            ...form.specification,
                            [key]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button className="rounded-full" onClick={handleSave}>
                {editId ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

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
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Specification = {
  "Blade Shape": string;
  "Steel Type": string;
  "Blade Length": string;
  "Blade Height": string;
  "Spine Thickness": string;
  "Handle Length": string;
  "Handle Type": string;
  "Handle Materials": string;
};

interface Product {
  id: number;
  title: string;
  srcUrl: string;
  gallery: string[];
  price_idr: number;
  price_usd: number;
  discount: number;
  rating: number;
  stock: number;
  category: string;
  desc: string;
  preOrder: { isPreOrder: boolean; duration: number };
  specification: Specification;
}

const initialProducts: Product[] = [
  {
    id: 1,
    title: "Bunka N695 Stainless Steel 165mm",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png"],
    price_idr: 1000000,
    price_usd: 65,
    discount: 1,
    rating: 4.8,
    stock: 10,
    category: "chef-knives",
    desc: "Pisau Bunka premium berbahan N695 stainless steel dengan ketajaman tinggi dan presisi maksimal untuk kebutuhan dapur profesional.",
    preOrder: { isPreOrder: false, duration: 0 },
    specification: {
      "Blade Shape": "",
      "Steel Type": "",
      "Blade Length": "",
      "Blade Height": "",
      "Spine Thickness": "",
      "Handle Length": "",
      "Handle Type": "",
      "Handle Materials": "",
    },
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const initialSpec: Specification = {
    "Blade Shape": "",
    "Steel Type": "",
    "Blade Length": "",
    "Blade Height": "",
    "Spine Thickness": "",
    "Handle Length": "",
    "Handle Type": "",
    "Handle Materials": "",
  };

  const [form, setForm] = useState({
    title: "",
    price_idr: 0,
    price_usd: 0,
    stock: 0,
    discount: 0,
    category: "",
    desc: "",
    preOrder_isPreOrder: false,
    preOrder_duration: 0,
    specification: { ...initialSpec },
  });

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!storedUser) return router.push("/");

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") return router.push("/");
  }, [router]);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
      setForm({
        title: product.title,
        price_idr: product.price_idr,
        price_usd: product.price_usd,
        stock: product.stock,
        discount: product.discount,
        category: product.category,
        desc: product.desc,
        preOrder_isPreOrder: product.preOrder.isPreOrder,
        preOrder_duration: product.preOrder.duration,
        specification: product.specification,
      });
    } else {
      setSelectedProduct(null);
      setForm({
        title: "",
        price_idr: 0,
        price_usd: 0,
        stock: 0,
        discount: 0,
        category: "",
        desc: "",
        preOrder_isPreOrder: false,
        preOrder_duration: 0,
        specification: { ...initialSpec },
      });
    }
    setOpenModal(true);
  };

  const handleSave = () => {
    if (!form.title || form.price_idr <= 0 || form.stock < 0) {
      alert("Please fill all required fields correctly");
      return;
    }

    const productData: Product = {
      id: selectedProduct
        ? selectedProduct.id
        : Math.max(...products.map((p) => p.id)) + 1,
      title: form.title,
      srcUrl: selectedProduct?.srcUrl || "/images/default.png",
      gallery: selectedProduct?.gallery || ["/images/default.png"],
      price_idr: form.price_idr,
      price_usd: form.price_usd,
      stock: form.stock,
      discount: form.discount,
      rating: selectedProduct?.rating || 0,
      category: form.category,
      desc: form.desc,
      preOrder: {
        isPreOrder: form.preOrder_isPreOrder,
        duration: form.preOrder_duration,
      },
      specification: form.specification,
    };

    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === selectedProduct.id ? productData : p)),
      );
    } else {
      setProducts((prev) => [...prev, productData]);
    }

    setOpenModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="shadow-none rounded-xl border border-gray-200 bg-white">
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
            <CardTitle className="text-xl font-bold">
              Product Management
            </CardTitle>
            <Button
              onClick={() => handleOpenModal()}
              className="rounded-full px-4 py-2"
            >
              Add Product
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-black/10 p-4">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead className="text-left">Title</TableHead>
                    <TableHead>Price IDR</TableHead>
                    <TableHead>Price USD</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow
                      key={p.id}
                      className="hover:bg-gray-50 even:bg-gray-50"
                    >
                      <TableCell>
                        <Image
                          src={p.srcUrl}
                          alt={p.title}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </TableCell>
                      <TableCell className="text-left font-medium">
                        {p.title}
                      </TableCell>
                      <TableCell>
                        Rp{p.price_idr.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        ${p.price_usd.toLocaleString("en-US")}
                      </TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell>
                        {p.discount > 0 ? `${p.discount}%` : "-"}
                      </TableCell>
                      <TableCell className="text-right flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => handleOpenModal(p)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
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

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {selectedProduct ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col space-y-4 mt-4 text-base">
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">Category</label>
                <Input
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="rounded-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-base">
                    Price IDR
                  </label>
                  <Input
                    type="number"
                    value={form.price_idr}
                    onChange={(e) =>
                      setForm({ ...form, price_idr: Number(e.target.value) })
                    }
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-base">
                    Price USD
                  </label>
                  <Input
                    type="number"
                    value={form.price_usd}
                    onChange={(e) =>
                      setForm({ ...form, price_usd: Number(e.target.value) })
                    }
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-base">
                    Discount (%)
                  </label>
                  <Input
                    type="number"
                    value={form.discount}
                    onChange={(e) =>
                      setForm({ ...form, discount: Number(e.target.value) })
                    }
                    className="rounded-full"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">Stock</label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: Number(e.target.value) })
                  }
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">
                  Description
                </label>
                <Textarea
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">
                  PreOrder Duration (days)
                </label>
                <Input
                  type="number"
                  value={form.preOrder_duration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      preOrder_duration: Number(e.target.value),
                    })
                  }
                  className="rounded-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {Object.keys(form.specification).map((key) => (
                  <div key={key} className="flex flex-col">
                    <label className="mb-1 font-medium text-base">{key}</label>
                    <Input
                      value={form.specification[key as keyof Specification]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          specification: {
                            ...form.specification,
                            [key as keyof Specification]: e.target.value,
                          },
                        })
                      }
                      className="rounded-full"
                    />
                  </div>
                ))}
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

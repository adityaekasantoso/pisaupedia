"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
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

// ================= DATA DUMMY =================
interface Product {
  id: number;
  title: string;
  srcUrl: string;
  gallery: string[];
  price_idr: number;
  price_usd: number;
  discount: number; // Hanya persentase
  rating: number;
  stock: number;
  category: string;
  desc: string;
  preOrder: { isPreOrder: boolean; duration: number };
  specification: {
    "Blade Shape": string;
    "Steel Type": string;
    "Blade Length": string;
    "Blade Height": string;
    "Spine Thickness": string;
    "Handle Length": string;
    "Handle Type": string;
    "Handle Materials": string;
  };
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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const initialSpec = {
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
    discount: 0, // Persentase
    category: "",
    desc: "",
    preOrder_isPreOrder: false,
    preOrder_duration: 0,
    specification: { ...initialSpec },
  });

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
      alert("Isi semua field dengan benar");
      return;
    }

    const productData: Product = {
      id: selectedProduct ? selectedProduct.id : Math.max(...products.map(p => p.id)) + 1,
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
      setProducts(prev => prev.map(p => p.id === selectedProduct.id ? productData : p));
    } else {
      setProducts(prev => [...prev, productData]);
    }

    setOpenModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="shadow-none border">
          {/* Header: tombol rata kanan */}
          <CardHeader className="flex justify-end mb-4">
            <Button onClick={() => handleOpenModal()} className="text-base px-4 py-2">
              Tambah Produk
            </Button>
          </CardHeader>

          <CardContent className="text-base">
            <Table>
              <TableHeader>
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
                  <TableRow key={p.id}>
                    <TableCell>
                      <Image
                        src={p.srcUrl}
                        alt={p.title}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell className="text-left">{p.title}</TableCell>
                    <TableCell>Rp{p.price_idr.toLocaleString("id-ID")}</TableCell>
                    <TableCell>${p.price_usd.toLocaleString("en-US")}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>{p.discount > 0 ? `${p.discount}%` : "-"}</TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenModal(p)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(p.id)}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modal Add/Edit */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {selectedProduct ? "Edit Produk" : "Tambah Produk"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col space-y-4 mt-4 text-base">
              {/* Title */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">Title</label>
                <Input
                  className="h-12 text-base"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">Category</label>
                <Input
                  className="h-12 text-base"
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>

              {/* Price, Stock, Discount */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-base">Price IDR</label>
                  <Input
                    type="number"
                    className="h-12 text-base"
                    placeholder="Price IDR"
                    value={form.price_idr}
                    onChange={(e) => setForm({ ...form, price_idr: Number(e.target.value) })}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-base">Price USD</label>
                  <Input
                    type="number"
                    className="h-12 text-base"
                    placeholder="Price USD"
                    value={form.price_usd}
                    onChange={(e) => setForm({ ...form, price_usd: Number(e.target.value) })}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-base">Discount (%)</label>
                  <Input
                    type="number"
                    className="h-12 text-base"
                    placeholder="Discount %"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                  />
                </div>
              </div>

              {/* Stock */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">Stock</label>
                <Input
                  type="number"
                  className="h-12 text-base"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">Description</label>
                <Textarea
                  className="h-20 text-base"
                  placeholder="Description"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                />
              </div>

              {/* PreOrder */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-base">PreOrder Duration (days)</label>
                <Input
                  type="number"
                  className="h-12 text-base"
                  placeholder="0 if not pre-order"
                  value={form.preOrder_duration}
                  onChange={(e) => setForm({ ...form, preOrder_duration: Number(e.target.value) })}
                />
              </div>

              {/* Specification */}
              <div className="grid grid-cols-3 gap-3">
                {Object.keys(form.specification).map((key) => (
                  <div key={key} className="flex flex-col">
                    <label className="mb-1 font-medium text-base">{key}</label>
                    <Input
                      className="h-12 text-base"
                      placeholder={key}
                      value={form.specification[key as keyof typeof initialSpec]}
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

            <DialogFooter className="mt-4 flex justify-end space-x-3">
              <Button variant="outline" className="px-4 py-2 text-base" onClick={() => setOpenModal(false)}>
                Batal
              </Button>
              <Button className="px-4 py-2 text-base" onClick={handleSave}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
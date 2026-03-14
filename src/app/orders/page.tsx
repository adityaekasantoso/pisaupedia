"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BreadcrumbOrder from "@/components/order-page/BreadcrumbOrder";
import { integralCF } from "@/styles/fonts";

const orders = [
  {
    id: "ORD-001",
    date: "2026-02-10",
    products: [
      { name: "Chef Knife 8 inch", quantity: 1, price: 120 },
      { name: "Knife Sharpener", quantity: 1, price: 25 },
    ],
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    shippingStatus: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2026-02-11",
    products: [{ name: "Paring Knife 3 inch", quantity: 2, price: 25 }],
    paymentMethod: "PayPal",
    paymentStatus: "Pending",
    shippingStatus: "Processing",
  },
  {
    id: "ORD-003",
    date: "2026-02-12",
    products: [{ name: "Outdoor Survival Knife", quantity: 1, price: 85 }],
    paymentMethod: "Bank Transfer",
    paymentStatus: "Failed",
    shippingStatus: "Cancelled",
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null,
  );

  const calculateTotal = (order: (typeof orders)[0]) =>
    order.products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />

        <BreadcrumbOrder />

        <div className="overflow-x-auto rounded-[20px] border border-black/10 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base">Order ID</TableHead>
                <TableHead className="text-base">Date</TableHead>
                <TableHead className="text-base">Products</TableHead>
                <TableHead className="text-base">Total</TableHead>
                <TableHead className="text-base">Payment Method</TableHead>
                <TableHead className="text-base">Payment Status</TableHead>
                <TableHead className="text-base">Shipping Status</TableHead>
                <TableHead className="text-base">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-base font-medium">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-base">{order.date}</TableCell>
                  <TableCell className="text-base">
                    {order.products.length}
                  </TableCell>
                  <TableCell className="text-base font-medium">
                    ${calculateTotal(order)}
                  </TableCell>
                  <TableCell className="text-base">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell className="text-base">
                    {order.paymentStatus}
                  </TableCell>
                  <TableCell className="text-base">
                    {order.shippingStatus}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="rounded-full text-base"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl">
                        <DialogHeader>
                          <DialogTitle
                            className={`${integralCF.className} text-xl`}
                          >
                            Order Detail
                          </DialogTitle>
                        </DialogHeader>

                        <div className="mt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-sm">
                                  Product Name
                                </TableHead>
                                <TableHead className="text-sm">
                                  Quantity
                                </TableHead>
                                <TableHead className="text-sm">Price</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.products.map((p, idx) => (
                                <TableRow key={idx}>
                                  <TableCell className="text-sm">
                                    {p.name}
                                  </TableCell>
                                  <TableCell className="text-sm">
                                    {p.quantity}
                                  </TableCell>
                                  <TableCell className="text-sm font-medium">
                                    ${p.price}
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell className="text-sm font-semibold">
                                  Total
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell className="text-sm font-semibold">
                                  ${calculateTotal(order)}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>

                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg bg-gray-50">
                              <h3 className="text-sm font-medium text-gray-500 mb-1">
                                Payment Method
                              </h3>
                              <p className="text-lg font-semibold text-gray-900">
                                {order.paymentMethod}
                              </p>
                            </div>

                            <div className="p-4 border rounded-lg bg-gray-50">
                              <h3 className="text-sm font-medium text-gray-500 mb-1">
                                Payment Status
                              </h3>
                              <p
                                className={`text-lg font-semibold ${
                                  order.paymentStatus === "Paid"
                                    ? "text-green-600"
                                    : order.paymentStatus === "Pending"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }`}
                              >
                                {order.paymentStatus}
                              </p>
                            </div>

                            <div className="p-4 border rounded-lg bg-gray-50">
                              <h3 className="text-sm font-medium text-gray-500 mb-1">
                                Shipping Status
                              </h3>
                              <p
                                className={`text-lg font-semibold ${
                                  order.shippingStatus === "Delivered"
                                    ? "text-green-600"
                                    : order.shippingStatus === "Shipped"
                                      ? "text-blue-600"
                                      : order.shippingStatus === "Processing"
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                }`}
                              >
                                {order.shippingStatus}
                              </p>
                            </div>

                            <div className="p-4 border rounded-lg bg-gray-50">
                              <h3 className="text-sm font-medium text-gray-500 mb-1">
                                Tracking
                              </h3>
                              <p className="text-lg font-semibold text-gray-900">
                                {order.shippingStatus === "Delivered"
                                  ? "Delivered - 2 Feb 2026"
                                  : order.shippingStatus === "Shipped"
                                    ? "In Transit - DHL 123456"
                                    : "N/A"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 flex justify-end">
                            <DialogTrigger asChild>
                              <Button size="sm" className="rounded-full">
                                Close
                              </Button>
                            </DialogTrigger>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}

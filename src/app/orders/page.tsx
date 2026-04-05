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
        {/* garis atas */}
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />

        {/* breadcrumb */}
        <BreadcrumbOrder />

        {/* table */}
        <div className="mt-4 border rounded-lg overflow-x-auto bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${calculateTotal(order)}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.shippingStatus}</TableCell>

                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="rounded-full"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Order Detail</DialogTitle>
                        </DialogHeader>

                        {selectedOrder && (
                          <div className="space-y-4">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product</TableHead>
                                  <TableHead>Qty</TableHead>
                                  <TableHead>Price</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedOrder.products.map((p, i) => (
                                  <TableRow key={i}>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>{p.quantity}</TableCell>
                                    <TableCell>${p.price}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell className="font-semibold">
                                    Total
                                  </TableCell>
                                  <TableCell />
                                  <TableCell className="font-semibold">
                                    ${calculateTotal(selectedOrder)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>

                            <div className="text-sm space-y-1">
                              <p>
                                <b>Payment Method:</b>{" "}
                                {selectedOrder.paymentMethod}
                              </p>
                              <p>
                                <b>Payment Status:</b>{" "}
                                {selectedOrder.paymentStatus}
                              </p>
                              <p>
                                <b>Shipping Status:</b>{" "}
                                {selectedOrder.shippingStatus}
                              </p>
                            </div>

                            <div className="flex justify-end">
                              <DialogTrigger asChild>
                                <Button className="rounded-full">Close</Button>
                              </DialogTrigger>
                            </div>
                          </div>
                        )}
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

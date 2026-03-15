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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Order {
  id: number;
  customerName: string;
  email: string;
  totalAmount: number;
  status: "Pending" | "Completed" | "Cancelled";
  date: string;
  items: { product: string; quantity: number; price: number }[];
}

const dummyOrders: Order[] = [
  {
    id: 1,
    customerName: "John Doe",
    email: "john@example.com",
    totalAmount: 150000,
    status: "Pending",
    date: "2026-03-15",
    items: [
      { product: "Bunka N695 165mm", quantity: 1, price: 100000 },
      { product: "Chef Knife 180mm", quantity: 1, price: 50000 },
    ],
  },
  {
    id: 2,
    customerName: "Jane Smith",
    email: "jane@example.com",
    totalAmount: 65000,
    status: "Completed",
    date: "2026-03-14",
    items: [{ product: "Santoku Knife 170mm", quantity: 1, price: 65000 }],
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!storedUser) return router.push("/");

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") return router.push("/");
  }, [router]);

  const handleOpenModal = (order?: Order) => {
    setSelectedOrder(order || null);
    setOpenModal(true);
  };

  const handleStatusChange = (status: Order["status"]) => {
    if (!selectedOrder) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === selectedOrder.id ? { ...o, status } : o)),
    );
    setOpenModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="shadow-none rounded-lg border border-gray-200 bg-white">
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
            <CardTitle className="text-xl font-bold">
              Order Management
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-black/10 p-4">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-gray-500 py-4"
                      >
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="hover:bg-gray-50 even:bg-gray-50"
                      >
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>
                          Rp{order.totalAmount.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => handleOpenModal(order)}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="rounded-full"
                            onClick={() => handleDelete(order.id)}
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
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Order Details
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="flex flex-col space-y-4 mt-4 text-base">
                <p>
                  <strong>Customer:</strong> {selectedOrder.customerName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.email}
                </p>
                <p>
                  <strong>Total:</strong> Rp
                  {selectedOrder.totalAmount.toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Date:</strong> {selectedOrder.date}
                </p>
                <div>
                  <strong>Items:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {selectedOrder.items.map((item, idx) => (
                      <li key={idx}>
                        {item.product} x{item.quantity} - Rp
                        {item.price.toLocaleString("id-ID")}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <DialogFooter className="mt-4 flex justify-end gap-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setOpenModal(false)}
              >
                Close
              </Button>
              {selectedOrder && selectedOrder.status !== "Completed" && (
                <Button
                  onClick={() => handleStatusChange("Completed")}
                  className="rounded-full"
                >
                  Mark Completed
                </Button>
              )}
              {selectedOrder && selectedOrder.status !== "Cancelled" && (
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange("Cancelled")}
                  className="rounded-full"
                >
                  Cancel Order
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

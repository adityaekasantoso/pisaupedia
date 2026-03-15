"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AdminSidebar from "@/components/AdminSidebar";

const dummyUsers = [{ id: 1 }, { id: 2 }];
const dummyOrders = [{ id: 101 }, { id: 102 }];
const dummyProducts = [{ id: 201 }, { id: 202 }];

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (!token || !storedUser) return router.push("/");

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") return router.push("/");
  }, [router]);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="mb-5 shadow-none rounded-2xl">
          <CardHeader>
            <CardTitle>Dashboard Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-4 border rounded-2xl">
              <div className="text-gray-500">Total Users</div>
              <div className="text-2xl font-bold">{dummyUsers.length}</div>
            </div>
            <div className="p-4 border rounded-2xl">
              <div className="text-gray-500">Total Orders</div>
              <div className="text-2xl font-bold">{dummyOrders.length}</div>
            </div>
            <div className="p-4 border rounded-2xl">
              <div className="text-gray-500">Total Products</div>
              <div className="text-2xl font-bold">{dummyProducts.length}</div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

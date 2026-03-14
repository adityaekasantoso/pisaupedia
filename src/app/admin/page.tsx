"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AdminSidebar from "@/components/AdminSidebar";

const dummyUsers = [{ id: 1 }, { id: 2 }];
const dummyOrders = [{ id: 101 }, { id: 102 }];
const dummyProducts = [{ id: 201 }, { id: 202 }];

export default function AdminHome() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="mb-5">
          <CardHeader>
            <CardTitle>Dashboard Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-4 border rounded">
              <div className="text-gray-500">Total Users</div>
              <div className="text-2xl font-bold">{dummyUsers.length}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-gray-500">Total Orders</div>
              <div className="text-2xl font-bold">{dummyOrders.length}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-gray-500">Total Products</div>
              <div className="text-2xl font-bold">{dummyProducts.length}</div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
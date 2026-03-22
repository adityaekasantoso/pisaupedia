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

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) return router.push("/");

    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!storedUser) return router.push("/");

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") return router.push("/");
  }, [router, token]);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://api-pisaupedia.vercel.app/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleOpenModal = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setForm({ ...user, password: "" });
    } else {
      setSelectedUser(null);
      setForm({ name: "", email: "", password: "", role: "user" });
    }
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.role) {
      alert("Please fill all required fields");
      return;
    }
    if (!selectedUser && !form.password) {
      alert("Password is required for new users");
      return;
    }

    try {
      const res = await fetch(
        selectedUser
          ? `https://api-pisaupedia.vercel.app/api/users/${selectedUser.id}`
          : "https://api-pisaupedia.vercel.app/api/register",
        {
          method: selectedUser ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save user");
      }

      setOpenModal(false);
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`https://api-pisaupedia.vercel.app/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="shadow-none rounded-2xl border border-gray-200 bg-white">
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
            <CardTitle className="text-xl font-bold">
              Users Management
            </CardTitle>
            <Button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 rounded-full"
            >
              Add User
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-black/10 p-4">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-gray-500 py-4"
                      >
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow
                        key={user.id}
                        className="hover:bg-gray-50 even:bg-gray-50"
                      >
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => handleOpenModal(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="rounded-full"
                            onClick={() => handleDelete(user.id)}
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
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {selectedUser ? "Edit User" : "Add User"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col space-y-4 mt-4 text-base">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name</label>
                <Input
                  value={form.name}
                  placeholder="Name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Email</label>
                <Input
                  value={form.email}
                  placeholder="Email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Password</label>
                <Input
                  type="password"
                  value={form.password}
                  placeholder="Password (leave blank to keep current)"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Role</label>
                <Select
                  value={form.role}
                  onValueChange={(value: "admin" | "user") =>
                    setForm({ ...form, role: value })
                  }
                >
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="mt-4 flex justify-end gap-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              <Button className="rounded-full" onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

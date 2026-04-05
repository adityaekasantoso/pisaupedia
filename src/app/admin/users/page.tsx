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
import { Label } from "@/components/ui/label";
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

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return router.push("/");

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") return router.push("/");

    fetchUsers();
  }, [router, token]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://api-pisaupedia.vercel.app/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setForm({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const handleOpenModal = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setForm({ ...user, password: "" });
    } else {
      resetForm();
    }
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.role) {
      alert("Semua field wajib diisi");
      return;
    }

    if (!selectedUser && !form.password) {
      alert("Password wajib untuk user baru");
      return;
    }

    try {
      const res = await fetch(
        selectedUser
          ? `https://api-pisaupedia.vercel.app/api/users/${selectedUser.id}`
          : `https://api-pisaupedia.vercel.app/api/register`,
        {
          method: selectedUser ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) return alert("Gagal save");

      setOpenModal(false);
      resetForm();
      fetchUsers();
    } catch {
      alert("Error");
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Yakin hapus user?")) return;

    await fetch(`https://api-pisaupedia.vercel.app/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="shadow-none">
          <CardHeader className="flex justify-between flex-row">
            <CardTitle className="text-xl font-bold">
              Users Management
            </CardTitle>

            <Button className="rounded-full" onClick={() => handleOpenModal()}>
              Add User
            </Button>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-xl border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>

                      <TableCell className="flex gap-2">
                        <Button
                          className="rounded-full"
                          onClick={() => handleOpenModal(u)}
                        >
                          Edit
                        </Button>

                        <Button
                          className="rounded-full"
                          variant="destructive"
                          onClick={() => handleDelete(u.id)}
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
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? "Edit User" : "Create User"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Kosongkan jika tidak diubah"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(value: "admin" | "user") =>
                    setForm({ ...form, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button className="rounded-full" onClick={handleSave}>
                {selectedUser ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiUsers, FiPackage, FiHome, FiSettings, FiPlus } from "react-icons/fi";
import React from "react";

const AdminSidebar = () => {
  const router = useRouter();
  const path = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FiHome /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers /> },
    { name: "Orders", path: "/admin/orders", icon: <FiPackage /> },
    { name: "Products", path: "/admin/products", icon: <FiPlus /> },
    { name: "Settings", path: "/admin/settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-6 text-2xl font-bold">Admin</div>
      <nav className="flex-1 flex flex-col space-y-2 px-4">
        {menu.map((m) => (
          <button
            key={m.path}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 ${
              path === m.path ? "bg-gray-200 font-bold" : ""
            }`}
            onClick={() => router.push(m.path)}
          >
            {m.icon} {m.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
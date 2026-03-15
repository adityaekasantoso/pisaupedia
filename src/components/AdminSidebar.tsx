"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaRegFile } from "react-icons/fa";
import { FiUsers, FiPackage, FiHome, FiPlus } from "react-icons/fi";

const AdminSidebar = () => {
  const router = useRouter();
  const path = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FiHome /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers /> },
    { name: "Products", path: "/admin/products", icon: <FiPlus /> },
    { name: "Orders", path: "/admin/orders", icon: <FiPackage /> },
    { name: "Blog", path: "/admin/blog", icon: <FaRegFile /> },
  ];

  return (
    <aside className="mt-5 w-64 border-r border-gray-200 flex flex-col">
      <nav className="flex-1 flex flex-col space-y-2 px-4">
        {menu.map((m) => (
          <button
            key={m.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 ${
              path === m.path ? "bg-gray-100 font-semibold" : ""
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

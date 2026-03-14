"use client";

import HolyLoader from "holy-loader";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import { AuthProvider } from "@/../context/AuthContext";
import Providers from "./providers";

export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Providers>
        <HolyLoader color="#868686" />
        <TopNavbar />
        <main className="min-h-[calc(100vh-120px)]">{children}</main>
      </Providers>
    </AuthProvider>
  );
}
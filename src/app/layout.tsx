import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import RootClientLayout from "./RootClientLayout";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pisaupedia",
  description:
    "Pisaupedia is a premium e-commerce platform offering high-quality knives including chef knives, paring knives, utility knives, and specialty blades crafted with precision and top-grade materials.",
  keywords: [
    "knife store",
    "chef knife",
    "paring knife",
    "utility knife",
    "bread knife",
    "kitchen knives",
    "premium knives",
    "knife shop",
    "Pisaupedia",
  ],
  authors: [{ name: "Pisaupedia Team" }],
  creator: "Pisaupedia",
  publisher: "Pisaupedia",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <RootClientLayout>{children}</RootClientLayout>
        <Footer />
      </body>
    </html>
  );
}

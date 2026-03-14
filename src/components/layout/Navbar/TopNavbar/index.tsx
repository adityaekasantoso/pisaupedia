"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useAuth } from "@/../context/AuthContext";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { useCurrency } from "@/context/CurrencyContext";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import { MenuItem } from "./MenuItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const baseData: NavMenu = [
  { id: 1, type: "MenuItem", label: "Shop", url: "/shop", children: [] },
  { id: 3, type: "MenuItem", label: "Blog", url: "/blog", children: [] },
];

const userData: NavMenu = [
  { id: 2, type: "MenuItem", label: "My Orders", url: "/orders", children: [] },
];

const TopNavbar = () => {
  const { currency, setCurrency } = useCurrency();
  const { user, logout } = useAuth();
  const menuData = user ? [...baseData, ...userData] : baseData;

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex items-center relative max-w-frame mx-auto py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={menuData} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            PISAUPEDIA
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {menuData.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center ml-auto gap-3">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "IDR" | "USD")}
            className="hidden md:block px-3 py-2 rounded-full border border-black/20 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
          >
            <option value="IDR">IDR</option>
            <option value="USD">USD</option>
          </select>

          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>

          {user && <CartBtn />}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer select-none">
                  <Image
                    priority
                    src="/icons/user.svg"
                    height={24}
                    width={24}
                    alt="user"
                  />
                  <span className="hidden md:block text-sm md:text-base">
                    {user.name}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-full shadow-none"
              >
                <DropdownMenuItem
                  onClick={logout}
                  className=" rounded-full px-5"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>{" "}
            </DropdownMenu>
          ) : (
            <Link
              href="/signin"
              className="flex items-center gap-2 p-1 md:p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Image
                priority
                src="/icons/user.svg"
                height={24}
                width={24}
                alt="user"
              />
              <span className="hidden md:block text-sm font-medium">
                Sign In
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;

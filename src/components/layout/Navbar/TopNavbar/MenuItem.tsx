"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  label: string;
  url?: string;
};

export function MenuItem({ label, url }: MenuItemProps) {
  const pathname = usePathname();

  // aktif jika path sama atau termasuk subpath
  const isActive = url && (pathname === url || pathname.startsWith(url + "/"));

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={url ?? "/"}
        className={cn([
          navigationMenuTriggerStyle(),
          "font-normal px-3",
          isActive && "font-semibold", // font sedikit bold saat aktif
        ])}
      >
        {label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

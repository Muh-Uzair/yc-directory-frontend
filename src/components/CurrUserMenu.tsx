"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import SignoutConfirmDialog from "../features/sign-out/SignoutConfirmDialog";

export const CurrUserMenu: React.FC = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard/home", label: "Dashboard Home" },
    { href: "/dashboard/my-startups", label: "My Startups" },
    { href: "/dashboard/create-startup", label: "Create Startup" },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu className="text-primary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-3 w-56" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <DropdownMenuItem
                className={
                  pathname === item.href ? "bg-stone-100 text-primary" : ""
                }
              >
                {item.label}
              </DropdownMenuItem>
            </Link>
          ))}

          <DropdownMenuItem onClick={() => setIsLogoutOpen(true)}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignoutConfirmDialog
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
      />
    </>
  );
};

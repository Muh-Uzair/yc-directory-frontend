"use client";

import Link from "next/link";
import React from "react";
import { House, PlusCircle, Rocket } from "lucide-react";
import { usePathname } from "next/navigation";

const DashboardSidebar: React.FC = () => {
  const slug = usePathname()?.split("/").filter(Boolean).pop();

  const menuItems = [
    { href: "/dashboard/home", label: "Home", icon: House, slug: "home" },
    {
      href: "/dashboard/my-startups",
      label: "My Startups",
      icon: Rocket,
      slug: "my-startups",
    },
    {
      href: "/dashboard/create-startup",
      label: "Create Startup",
      icon: PlusCircle,
      slug: "create-startup",
    },
  ];

  return (
    <div className="hidden tab:flex fixed left-0 w-[80px] bottom-0 top-[50px] bg-primary laptopM:w-[250px]">
      <ul className="flex flex-col gap-3 items-center laptopM:items-start w-full p-3 text-white">
        {menuItems.map(({ href, label, icon: Icon, slug: itemSlug }) => (
          <li
            key={href}
            className={`w-full rounded-md cursor-pointer ${
              slug === itemSlug ? "bg-primary-dark" : ""
            }`}
          >
            <Link
              href={href}
              className="flex laptopM:justify-start justify-center items-center gap-3 p-3 w-full"
            >
              <Icon />
              <span className="hidden laptopM:inline">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSidebar;

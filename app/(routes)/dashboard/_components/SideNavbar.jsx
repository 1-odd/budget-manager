"use client";
import { LogoMobile } from "@/app/_components/Logo";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {  } from "react";

const SideNavbar = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();



  return (
    <div className=" h-screen p-5 border shadow-sm">
      <LogoMobile />
      <div className="mt-5 ">
        {menuList.map( (menu, index) => (
          <Link key={index} href={menu.path}>
            <h2
              className={`flex gap-2 items-center text-gray-700 font-medium p-5 
                 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200 
                 mb-2 
                    ${path == menu.path && "text-primary bg-blue-200"}
                 `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className=" fixed bottom-10 p-5 flex gap-2 items-center font-semibold">
        <UserButton />
        Profile
      </div>
    </div>
  );
};

export default SideNavbar;

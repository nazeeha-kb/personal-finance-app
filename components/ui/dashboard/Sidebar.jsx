"use client"
import { useState } from "react";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { NavLinks } from "./navLinks";
import { ArrowFatLinesRightIcon, ArrowFatLinesLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { useUIStore } from "@/components/layout/ui-store";
import { useStore } from "zustand";

export default function Sidebar({ className }) {
  const collapsed = useUIStore((s) => s.collapsed)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  // const [collapsed, setCollapsed] = useState(true)

  return (
    <div className={`${className} fixed md:left-0 md:top-0 bottom-0 md:h-screen sm:h-[81.6px] h-[49.6px] w-screen font-semibold bg-black md:rounded-r-2xl bg-grey-900 md:pr-2 md:pl-0 flex md:flex-col flex-row gap-6 transition-all md:pt-0 pt-2 sm:px-10 px-4  duration-200 ease-in-out  ${collapsed ? "md:w-25" : "md:w-64 pr-4"}`}>

      {/* Logo */}
      <Link href={"/overview"} className="md:block hidden">
        <div className="px-9 py-10">

          {/* Small Logo */}
          <img
            src="/images/logo-small.svg"
            alt="logo"
            className={`
      absolute transition-all duration-300
      ${collapsed
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"}
    `}
          />

          {/* Large Logo */}
          <img
            src="/images/logo-large.svg"
            alt="logo"
            className={`
      absolute transition-all duration-300
      ${collapsed
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100"}
    `} />
        </div>
      </Link>

      {/* Side bar Items */}
      <div className="flex md:flex-col flex-row gap-1 justify-between w-full">
        {NavLinks.map((item) => (
          <SidebarItem key={item.href} item={item} collapsed={collapsed} />
        ))}
      </div>

      {/* Toggle Button */}
      <button className="sidebar-item md:px-8 md:py-4 pt-2 pb-3 md:block hidden" onClick={toggleSidebar} aria-label={collapsed ? "open sidebar" : "close sidebar"}>
        <ArrowFatLinesRightIcon weight="fill" className={`size-6 shrink-0 transition-opacity duration-300 absolute ${collapsed ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
        <div className={`flex gap-4 transition-opacity duration-300 ${!collapsed ? "opacity-100 scale-100 absolute" : "opacity-0 scale-95"}`}>
          <ArrowFatLinesLeftIcon weight="fill" className="size-6 shrink-0" aria-hidden="true" />
          <div className={`
    transition-all duration-200 whitespace-nowrap
    ${collapsed
              ? "opacity-0 w-0 overflow-hidden"
              : "opacity-100 w-auto"}
  `}>Minimize Menu</div>
        </div>
      </button >
    </div >
  );
}

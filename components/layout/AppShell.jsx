"use client";

import Sidebar from "@/components/ui/dashboard/Sidebar";
import { useUIStore } from "./ui-store";

export default function AppShell({ children, className }) {
    const collapsed = useUIStore((s) => s.collapsed);

    return (
        <div className={`${className}`}>
            <Sidebar />

            <main
                className={`
          transition-all duration-300 md:mb-0 sm:mb-[81.6px] mb-[49.6px]
          ${collapsed ? "md:ml-25" : "md:ml-64"}
        `}
            >
                {children}
            </main>
        </div>
    );
}
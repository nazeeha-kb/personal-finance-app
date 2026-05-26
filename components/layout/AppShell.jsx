"use client";

import Sidebar from "@/components/ui/dashboard/Sidebar";
import { useUIStore } from "./ui-store";

export default function AppShell({ children }) {
    const collapsed = useUIStore((s) => s.collapsed);

    return (
        <div>
            <Sidebar />

            <main
                className={`
          transition-all duration-300
          ${collapsed ? "md:ml-25" : "md:ml-64"}
        `}
            >
                {children}
            </main>
        </div>
    );
}
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/layout/Sidebar";
import { Header } from "@/components/ui/layout/Header";

export function SidebarClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 w-full min-w-0">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

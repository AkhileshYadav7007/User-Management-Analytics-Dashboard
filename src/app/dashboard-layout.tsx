"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useUserStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply dark mode // but now this is not working
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  
  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("min-h-screen bg-gray-50 dark:bg-black text-gray-950 dark:text-gray-50")}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900 lg:hidden">
        <span className="text-xl font-bold">AdminPanel</span>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <main className="lg:pl-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

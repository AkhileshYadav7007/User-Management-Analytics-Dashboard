"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BarChart3, Moon, Sun, LayoutDashboard, X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useUserStore();

  const navItems = [
    { name: "Users", href: "/users", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  return (
    <aside className="h-full w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="flex h-full flex-col px-3 py-4">
        <div className="mb-10 flex items-center justify-between px-2">
          <div className="flex items-center">
            <LayoutDashboard className="mr-2 h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">AdminPanel</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className="mr-3 h-5 w-5" />
            ) : (
              <Moon className="mr-3 h-5 w-5" />
            )}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </div>
    </aside>
  );
}

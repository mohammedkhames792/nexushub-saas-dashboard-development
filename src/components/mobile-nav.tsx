"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, CheckSquare, Users, Settings,
} from "lucide-react";

const TAB_ITEMS = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/dashboard/community", label: "Feed", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-surface-200 dark:border-surface-800 bg-white/90 dark:bg-surface-900/90 backdrop-blur-lg safe-bottom">
      <div className="flex items-center justify-around h-16">
        {TAB_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/dashboard/settings" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-active"
                  className="absolute -top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-nexus-600"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-nexus-600 dark:text-nexus-400" : "text-surface-400 dark:text-surface-500"}`} />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-nexus-600 dark:text-nexus-400" : "text-surface-400 dark:text-surface-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, CheckSquare, Users,
  Sparkles, LogOut, Settings,
} from "lucide-react";
import { useAuthStore, useUIStore } from "@/lib/store";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/dashboard/community", label: "Community", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

// ─── Desktop Sidebar ───
export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 border-r border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 overflow-hidden"
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo row */}
        <div className="flex items-center h-16 px-4 border-b border-surface-200 dark:border-surface-800">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-nexus-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="ml-3 text-lg font-bold text-surface-900 dark:text-white whitespace-nowrap overflow-hidden"
              >
                NexusHub
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <DesktopNav collapsed={collapsed} />

        {/* Bottom */}
        <DesktopBottom collapsed={collapsed} />
      </div>

      {/* Collapse Toggle - تم إخراج الزر للخارج بمسافة أكبر ليصبح بارزاً */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-1 top-20 h-7 w-7 rounded-full border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 flex items-center justify-center text-surface-700 dark:text-surface-200 hover:text-nexus-600 dark:hover:text-nexus-400 shadow-xl transition-all z-50 hover:scale-110 active:scale-95"
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <motion.svg
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </motion.svg>
      </button>
    </motion.aside>
  );
}

function DesktopNav({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/dashboard/settings" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 relative ${
              isActive
                ? "bg-nexus-600/10 dark:bg-nexus-500/15 text-nexus-600 dark:text-nexus-400"
                : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100"
            } ${collapsed ? "justify-center" : ""}`}
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-nexus-600"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-nexus-600 dark:text-nexus-400" : ""}`} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        );
      })}
    </nav>
  );
}

function DesktopBottom({ collapsed }: { collapsed: boolean }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="border-t border-surface-200 dark:border-surface-800 p-2 space-y-1">
      {user && (
        <div className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${collapsed ? "justify-center" : ""}`}>
          <div className="h-8 w-8 shrink-0 rounded-full bg-nexus-600 flex items-center justify-center text-white text-xs font-bold">
            {user.avatar}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">{user.name}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400 truncate">{user.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <button
        onClick={logout}
        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors ${collapsed ? "justify-center" : ""}`}
      >
        <LogOut className="h-5 w-5 shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-medium whitespace-nowrap overflow-hidden">
              Logout
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

// ─── Mobile Sidebar ───
export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          />
          {/* Panel */}
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 md:hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors z-10"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-surface-200 dark:border-surface-800">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-nexus-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-lg font-bold text-surface-900 dark:text-white">NexusHub</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/dashboard/settings" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 relative ${
                      isActive
                        ? "bg-nexus-600/10 dark:bg-nexus-500/15 text-nexus-600 dark:text-nexus-400"
                        : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
                    }`}
                  >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-nexus-600" />}
                    <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-nexus-600 dark:text-nexus-400" : ""}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="border-t border-surface-200 dark:border-surface-800 p-2 space-y-1">
              {user && (
                <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-nexus-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">{user.name}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400 truncate">{user.email}</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
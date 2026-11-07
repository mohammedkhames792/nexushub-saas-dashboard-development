"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Sun, Moon, Bell, LogOut, User, ChevronDown,
  CheckCheck, Settings, Menu, Command, LayoutDashboard,
  FolderKanban, CheckSquare, Users, ArrowRight,
} from "lucide-react";
import { useAuthStore, useUIStore, useNotificationStore, useProjectStore, useTaskStore } from "@/lib/store";
import type { Notification } from "@/lib/types";

const COMMAND_ITEMS = [
  { id: "dashboard", label: "Go to Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "projects", label: "Go to Projects", icon: FolderKanban, href: "/dashboard/projects" },
  { id: "tasks", label: "Go to Tasks", icon: CheckSquare, href: "/dashboard/tasks" },
  { id: "community", label: "Go to Community", icon: Users, href: "/dashboard/community" },
  { id: "settings", label: "Go to Settings", icon: Settings, href: "/dashboard/settings" },
  { id: "theme", label: "Toggle Theme", icon: Sun, href: null },
];

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const projects = useProjectStore((s) => s.projects);
  const tasks = useTaskStore((s) => s.tasks);

  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);

  const notifRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cmdInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Build search items dynamically
  const allItems = [
    ...COMMAND_ITEMS,
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      label: `Project: ${p.name}`,
      icon: FolderKanban,
      href: "/dashboard/projects",
    })),
    ...tasks.map((t) => ({
      id: `task-${t.id}`,
      label: `Task: ${t.title}`,
      icon: CheckSquare,
      href: "/dashboard/tasks",
    })),
  ];

  const filteredItems = cmdQuery
    ? allItems.filter((item) => item.label.toLowerCase().includes(cmdQuery.toLowerCase()))
    : allItems;

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
        setCmdQuery("");
        setCmdIndex(0);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus input when command palette opens
  useEffect(() => {
    if (cmdOpen) {
      setTimeout(() => cmdInputRef.current?.focus(), 50);
    }
  }, [cmdOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCmdSelect = useCallback((item: typeof COMMAND_ITEMS[number]) => {
    setCmdOpen(false);
    if (item.id === "theme") {
      toggleTheme();
    } else if (item.href) {
      router.push(item.href);
    }
  }, [router, toggleTheme]);

  const handleCmdKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCmdIndex((i) => Math.min(i + 1, filteredItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCmdIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filteredItems[cmdIndex]) {
      handleCmdSelect(filteredItems[cmdIndex]);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const NOTIF_TYPE_STYLE: Record<Notification["type"], string> = {
    info: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    error: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  };

  return (
    <>
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-surface-200 dark:border-surface-800 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md sticky top-0 z-30">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile Hamburger */}
          <button
            onClick={onMenuClick}
            className="md:hidden h-9 w-9 rounded-xl flex items-center justify-center text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search / Command Palette trigger */}
          <button
            onClick={() => { setCmdOpen(true); setCmdQuery(""); setCmdIndex(0); }}
            className="flex-1 max-w-md flex items-center gap-2 pl-3 pr-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-sm text-surface-400 hover:border-surface-300 dark:hover:border-surface-600 transition-all text-left"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1">Search projects, tasks, people…</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-surface-200 dark:bg-surface-700 text-[10px] font-medium text-surface-500 dark:text-surface-400">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="h-9 w-9 rounded-xl flex items-center justify-center text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Sun className="h-4.5 w-4.5" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Moon className="h-4.5 w-4.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="h-9 w-9 rounded-xl flex items-center justify-center text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all relative"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 shadow-xl z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-surface-100 dark:border-surface-700">
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100">Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-nexus-600 dark:text-nexus-400 hover:underline flex items-center gap-1">
                        <CheckCheck className="h-3 w-3" /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors flex gap-3 ${!n.read ? "bg-nexus-50/50 dark:bg-nexus-950/20" : ""}`}
                      >
                        <div className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold ${NOTIF_TYPE_STYLE[n.type]}`}>
                          {n.type[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">{n.title}</p>
                          <p className="text-xs text-surface-500 dark:text-surface-400 truncate">{n.message}</p>
                        </div>
                        {!n.read && <div className="h-2 w-2 shrink-0 rounded-full bg-nexus-500 mt-2" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar Dropdown */}
          <div ref={avatarRef} className="relative ml-2">
            <button
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-3 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
            >
              <div className="h-8 w-8 rounded-full bg-nexus-600 flex items-center justify-center text-white text-xs font-bold">
                {user?.avatar ?? "U"}
              </div>
              <span className="text-sm font-medium text-surface-700 dark:text-surface-200 hidden sm:block">{user?.name ?? "User"}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-surface-400 transition-transform ${avatarOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {avatarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 shadow-xl z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-surface-100 dark:border-surface-700">
                    <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">{user?.name}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <button onClick={() => { router.push("/dashboard/settings"); setAvatarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                      <User className="h-4 w-4" /> Profile
                    </button>
                    <button onClick={() => { router.push("/dashboard/settings"); setAvatarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                      <Settings className="h-4 w-4" /> Settings
                    </button>
                  </div>
                  <div className="border-t border-surface-100 dark:border-surface-700 py-1">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ─── Command Palette ─── */}
      <AnimatePresence>
        {cmdOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCmdOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[61] rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 border-b border-surface-100 dark:border-surface-800">
                <Search className="h-5 w-5 text-surface-400 shrink-0" />
                <input
                  ref={cmdInputRef}
                  value={cmdQuery}
                  onChange={(e) => { setCmdQuery(e.target.value); setCmdIndex(0); }}
                  onKeyDown={handleCmdKeyDown}
                  placeholder="Type a command or search…"
                  className="flex-1 py-4 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 bg-transparent focus:outline-none"
                />
                <kbd className="px-1.5 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-[10px] font-medium text-surface-500">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-2">
                {filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-surface-400">No results found</p>
                  </div>
                ) : (
                  filteredItems.slice(0, 8).map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCmdSelect(item)}
                        onMouseEnter={() => setCmdIndex(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          i === cmdIndex
                            ? "bg-nexus-50 dark:bg-nexus-950/30 text-nexus-600 dark:text-nexus-400"
                            : "text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {i === cmdIndex && <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-50" />}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-surface-100 dark:border-surface-800 text-[10px] text-surface-400">
                <span>Navigate with ↑↓ · Select with Enter</span>
                <span>{filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

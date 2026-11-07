"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useUIStore, useToastStore, useAuthStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import type { ToastType } from "@/lib/types";
import { PageProgressBar } from "@/components/progress-bar";
import { ShortcutsModal } from "@/components/shortcuts-modal";
import { OnboardingTour } from "@/components/onboarding";
import { MobileBottomNav } from "@/components/mobile-nav";

// ─── Theme Hydrator ───
function ThemeHydrator() {
  const theme = useUIStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  return null;
}

// ─── Toast Icons ───
const TOAST_ICONS: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-emerald-400" />,
  error: <AlertCircle className="h-5 w-5 text-red-400" />,
  info: <Info className="h-5 w-5 text-blue-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-400" />,
};

const TOAST_BORDER: Record<ToastType, string> = {
  success: "border-l-emerald-400",
  error: "border-l-red-400",
  info: "border-l-blue-400",
  warning: "border-l-amber-400",
};

// ─── Toast Container ───
function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`flex items-start gap-3 rounded-xl border border-l-4 border-surface-200 dark:border-surface-700 ${TOAST_BORDER[toast.type]} bg-white dark:bg-surface-800 p-4 shadow-lg`}
          >
            {TOAST_ICONS[toast.type]}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Providers ───
export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global keyboard shortcuts for sidebar toggle and dark mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const toggleSidebar = useUIStore.getState().toggleSidebar;
      const toggleTheme = useUIStore.getState().toggleTheme;

      if ((e.metaKey || e.ctrlKey) && e.key === "\\") {
        e.preventDefault();
        toggleSidebar();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        toggleTheme();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <ThemeHydrator />
      <PageProgressBar />
      {children}
      {mounted && <ToastContainer />}
      {mounted && isAuthenticated && <ShortcutsModal />}
      {mounted && isAuthenticated && <OnboardingTour />}
      {mounted && isAuthenticated && <MobileBottomNav />}
    </>
  );
}

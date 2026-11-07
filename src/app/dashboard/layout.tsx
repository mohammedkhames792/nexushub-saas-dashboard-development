"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useUIStore } from "@/lib/store";
import { Sidebar, MobileSidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { motion } from "framer-motion";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-nexus-600 animate-pulse-soft" />
          <p className="text-sm text-surface-400">Loading NexusHub…</p>
        </div>
      </div>
    );
  }

  // ضبط المقاسات بدقة لتتطابق مع عرض الـ Sidebar الفعلي
  const sidebarWidth = isMobile ? 0 : collapsed ? 80 : 264;

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex">
      <Sidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div
        className="flex flex-col min-h-screen flex-1 transition-all duration-200 ease-in-out min-w-0"
        style={{ marginLeft: isMobile ? 0 : sidebarWidth }}
      >
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 pb-24 md:pb-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

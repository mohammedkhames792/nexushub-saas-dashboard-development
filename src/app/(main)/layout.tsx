'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Sidebar } from '@/components/sidebar';
import { Topbar } from '@/components/topbar';
import { ToastContainer } from '@/components/toast';
import { CommandPalette } from '@/components/command-palette';
import { ChatDrawer } from '@/components/chat-drawer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, _hydrated, theme } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  // Track client mount to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Only redirect after both React mount and store hydration are complete
  useEffect(() => {
    if (!mounted || !_hydrated) return;
    if (!isAuthenticated) router.replace('/login');
  }, [mounted, _hydrated, isAuthenticated, router]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Wait for hydration before rendering anything auth-gated
  if (!mounted || !_hydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-400">Loading&hellip;</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Sidebar />
      <div className="ml-64 min-h-screen flex flex-col">
        <Topbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <ToastContainer />
      <CommandPalette />
      <ChatDrawer />
    </div>
  );
}

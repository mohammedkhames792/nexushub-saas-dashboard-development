"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

const ROUTE_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  tasks: "Tasks",
  community: "Community",
  settings: "Settings",
};

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0 || !segments.includes("dashboard")) return null;

  const crumbs: { href: string; label: string }[] = [
    { href: "/dashboard", label: "Home" },
  ];

  let currentPath = "/dashboard";
  for (let i = 1; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    crumbs.push({
      href: currentPath,
      label: ROUTE_MAP[segments[i]] ?? segments[i],
    });
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-1.5 text-sm mb-4"
      aria-label="Breadcrumb"
    >
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-surface-300 dark:text-surface-600" />}
            {i === 0 && <Home className="h-3.5 w-3.5 text-surface-400" />}
            {isLast ? (
              <span className="font-medium text-surface-900 dark:text-white">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-surface-500 dark:text-surface-400 hover:text-nexus-600 dark:hover:text-nexus-400 transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </motion.nav>
  );
}

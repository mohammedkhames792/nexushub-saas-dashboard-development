"use client";

import { motion } from "framer-motion";

function Pulse({ className = "" }: { className?: string }) {
  return <div className={`rounded-xl bg-surface-200 dark:bg-surface-700 animate-pulse ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <Pulse className="h-8 w-48 mb-2" />
        <Pulse className="h-4 w-72" />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Pulse className="h-3 w-20" />
                <Pulse className="h-7 w-28" />
                <Pulse className="h-3 w-24" />
              </div>
              <Pulse className="h-11 w-11 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
          <Pulse className="h-5 w-36 mb-2" />
          <Pulse className="h-3 w-48 mb-6" />
          <Pulse className="h-[280px] w-full" />
        </div>
        <div className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
          <Pulse className="h-5 w-36 mb-2" />
          <Pulse className="h-3 w-48 mb-6" />
          <Pulse className="h-[280px] w-full" />
        </div>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
          <Pulse className="h-5 w-32 mb-4" />
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Pulse className="h-9 w-9 rounded-lg shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Pulse className="h-3.5 w-full" />
                  <Pulse className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
          <Pulse className="h-5 w-32 mb-4" />
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Pulse className="h-3.5 w-32" />
                  <Pulse className="h-5 w-16 rounded-full" />
                </div>
                <Pulse className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Pulse className="h-8 w-32" />
          <Pulse className="h-4 w-52" />
        </div>
        <Pulse className="h-10 w-28 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-5 space-y-3">
            <div className="flex items-start justify-between">
              <Pulse className="h-5 w-32" />
              <Pulse className="h-5 w-20 rounded-full" />
            </div>
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-3/4" />
            <div className="flex gap-1.5">
              <Pulse className="h-5 w-14 rounded-md" />
              <Pulse className="h-5 w-16 rounded-md" />
            </div>
            <Pulse className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TasksSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <Pulse className="h-8 w-32" />
        <Pulse className="h-4 w-52" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((col) => (
          <div key={col} className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-surface-50 dark:bg-surface-900/50 p-3 space-y-2">
            <div className="flex items-center gap-2 px-2 pb-3">
              <Pulse className="h-4 w-4 rounded-full" />
              <Pulse className="h-4 w-20" />
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-3 space-y-2">
                <Pulse className="h-4 w-full" />
                <Pulse className="h-3 w-16 rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CommunitySkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Pulse className="h-8 w-36" />
          <Pulse className="h-4 w-56" />
        </div>
        <Pulse className="h-10 w-24 rounded-xl" />
      </div>
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <Pulse key={i} className="h-8 w-16 rounded-lg" />
        ))}
      </div>
      <div className="space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Pulse className="h-10 w-10 rounded-full" />
              <div className="space-y-1.5">
                <Pulse className="h-4 w-24" />
                <Pulse className="h-3 w-16" />
              </div>
            </div>
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-3/4" />
            <div className="flex gap-4 pt-3">
              <Pulse className="h-4 w-12" />
              <Pulse className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

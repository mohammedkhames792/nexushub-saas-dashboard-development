"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <span className="text-[120px] sm:text-[160px] font-black leading-none bg-gradient-to-br from-nexus-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="relative mb-8">
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-4 h-8 w-8 rounded-lg bg-nexus-500/20 flex items-center justify-center"
          >
            <Sparkles className="h-4 w-4 text-nexus-500" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 -right-2 h-6 w-6 rounded-full bg-violet-500/20"
          />
        </div>

        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-nexus-600 hover:bg-nexus-700 text-white font-semibold py-3 px-5 transition-all hover:shadow-lg hover:shadow-nexus-600/25 active:scale-[0.98] text-sm"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Link>
          <button
            onClick={() => typeof window !== "undefined" && window.history.back()}
            className="flex items-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-medium py-3 px-5 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Command, Keyboard } from "lucide-react";

const SHORTCUTS = [
  { category: "Navigation", items: [
    { keys: ["⌘", "K"], description: "Open command palette" },
    { keys: ["?"], description: "Show keyboard shortcuts" },
    { keys: ["Esc"], description: "Close modal / palette" },
  ]},
  { category: "Command Palette", items: [
    { keys: ["↑", "↓"], description: "Navigate results" },
    { keys: ["Enter"], description: "Select result" },
  ]},
  { category: "General", items: [
    { keys: ["⌘", "\\"], description: "Toggle sidebar" },
    { keys: ["⌘", "D"], description: "Toggle dark mode" },
  ]},
];

export function ShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      // Ctrl+\ to toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === "\\") {
        e.preventDefault();
        // Will be handled by the store directly
      }
      // Ctrl+D to toggle dark mode
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        // Will be handled by the store directly
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] w-full max-w-md rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 dark:border-surface-800">
              <div className="flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-nexus-500" />
                <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Keyboard Shortcuts</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {SHORTCUTS.map((group) => (
                <div key={group.category}>
                  <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">{group.category}</h3>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div key={item.description} className="flex items-center justify-between">
                        <span className="text-sm text-surface-700 dark:text-surface-300">{item.description}</span>
                        <div className="flex items-center gap-1">
                          {item.keys.map((key, i) => (
                            <span key={i}>
                              <kbd className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-xs font-medium text-surface-600 dark:text-surface-400 shadow-sm">
                                {key === "⌘" ? <Command className="h-3 w-3" /> : key}
                              </kbd>
                              {i < item.keys.length - 1 && <span className="text-surface-300 dark:text-surface-600 text-xs mx-0.5">+</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-surface-100 dark:border-surface-800 text-center">
              <p className="text-xs text-surface-400">Press <kbd className="px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-[10px] font-medium">?</kbd> to toggle this panel</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileJson, FileSpreadsheet, X } from "lucide-react";
import { useProjectStore, useTaskStore, useToastStore } from "@/lib/store";

export function DataExportButton() {
  const [open, setOpen] = useState(false);
  const projects = useProjectStore((s) => s.projects);
  const tasks = useTaskStore((s) => s.tasks);
  const addToast = useToastStore((s) => s.addToast);

  const exportJSON = (type: "projects" | "tasks") => {
    const data = type === "projects" ? projects : tasks;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    downloadBlob(blob, `nexushub-${type}-${Date.now()}.json`);
    addToast("success", "Export Complete", `${type} exported as JSON.`);
    setOpen(false);
  };

  const exportCSV = (type: "projects" | "tasks") => {
    const data = type === "projects" ? projects : tasks;
    if (data.length === 0) {
      addToast("warning", "No Data", `No ${type} to export.`);
      setOpen(false);
      return;
    }

    const headers = Object.keys(data[0] as unknown as Record<string, unknown>);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((h) => {
          const val = (row as unknown as Record<string, unknown>)[h];
          const str = Array.isArray(val) ? val.join("; ") : String(val ?? "");
          return `"${str.replace(/"/g, '""')}"`;
        }).join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    downloadBlob(blob, `nexushub-${type}-${Date.now()}.csv`);
    addToast("success", "Export Complete", `${type} exported as CSV.`);
    setOpen(false);
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700 font-medium py-2 px-3 text-xs transition-colors"
      >
        <Download className="h-3.5 w-3.5" /> Export
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100 dark:border-surface-800">
                <h2 className="text-base font-semibold text-surface-900 dark:text-white">Export Data</h2>
                <button onClick={() => setOpen(false)} className="h-7 w-7 rounded-lg flex items-center justify-center text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Projects */}
                <div>
                  <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Projects ({projects.length})</h3>
                  <div className="flex gap-2">
                    <button onClick={() => exportJSON("projects")} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 py-2.5 text-xs font-medium text-surface-700 dark:text-surface-300 transition-colors">
                      <FileJson className="h-4 w-4 text-blue-500" /> JSON
                    </button>
                    <button onClick={() => exportCSV("projects")} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 py-2.5 text-xs font-medium text-surface-700 dark:text-surface-300 transition-colors">
                      <FileSpreadsheet className="h-4 w-4 text-emerald-500" /> CSV
                    </button>
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Tasks ({tasks.length})</h3>
                  <div className="flex gap-2">
                    <button onClick={() => exportJSON("tasks")} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 py-2.5 text-xs font-medium text-surface-700 dark:text-surface-300 transition-colors">
                      <FileJson className="h-4 w-4 text-blue-500" /> JSON
                    </button>
                    <button onClick={() => exportCSV("tasks")} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 py-2.5 text-xs font-medium text-surface-700 dark:text-surface-300 transition-colors">
                      <FileSpreadsheet className="h-4 w-4 text-emerald-500" /> CSV
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

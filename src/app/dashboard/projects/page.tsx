"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, LayoutGrid, List, X, FolderKanban,
  ArrowRight, Search, SlidersHorizontal,
} from "lucide-react";
import { useProjectStore, useToastStore } from "@/lib/store";
import { Breadcrumb } from "@/components/breadcrumb";
import { DataExportButton } from "@/components/data-export";
import type { ProjectStatus } from "@/lib/types";

const STATUS_STYLES: Record<ProjectStatus, { bg: string; text: string; label: string }> = {
  "in-progress": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", label: "In Progress" },
  completed: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", label: "Completed" },
  "on-hold": { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", label: "On Hold" },
};

const PROGRESS_COLORS: Record<ProjectStatus, string> = {
  "in-progress": "bg-nexus-500",
  completed: "bg-emerald-500",
  "on-hold": "bg-amber-500",
};

const STATUS_FILTERS: { value: "all" | ProjectStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" },
];

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "progress", label: "Progress" },
  { value: "status", label: "Status" },
] as const;

export default function ProjectsPage() {
  const projects = useProjectStore((s) => s.projects);
  const viewMode = useProjectStore((s) => s.viewMode);
  const addProject = useProjectStore((s) => s.addProject);
  const deleteProject = useProjectStore((s) => s.deleteProject);
  const setViewMode = useProjectStore((s) => s.setViewMode);
  const addToast = useToastStore((s) => s.addToast);

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [statusFilter, setStatusFilter] = useState<"all" | ProjectStatus>("all");
  const [sortBy, setSortBy] = useState<"name" | "progress" | "status">("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({ name: "", description: "", status: "in-progress" as ProjectStatus, progress: 0, techStack: "", dueDate: "" });

  const resetForm = () => {
    setForm({ name: "", description: "", status: "in-progress", progress: 0, techStack: "", dueDate: "" });
    setStep(0);
    setShowModal(false);
  };

  const handleCreate = () => {
    addProject({
      name: form.name,
      description: form.description,
      status: form.status,
      progress: form.progress,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      dueDate: form.dueDate || new Date().toISOString(),
    });
    addToast("success", "Project Created!", `"${form.name}" has been added to your projects.`);
    resetForm();
  };

  const handleDelete = (id: string, name: string) => {
    deleteProject(id);
    addToast("info", "Project Removed", `"${name}" has been deleted.`);
  };

  // Filter + Sort
  let filtered = statusFilter === "all" ? projects : projects.filter((p) => p.status === statusFilter);
  if (searchQuery) {
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "progress") return b.progress - a.progress;
    return a.status.localeCompare(b.status);
  });

  return (
    <div className="space-y-6">
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Projects</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">{filtered.length} projects{statusFilter !== "all" ? ` (${STATUS_STYLES[statusFilter].label})` : ""}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <DataExportButton />
          <div className="flex items-center rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-1">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-nexus-600 text-white" : "text-surface-500 hover:text-surface-700"}`}>
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-nexus-600 text-white" : "text-surface-500 hover:text-surface-700"}`}>
              <List className="h-4 w-4" />
            </button>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-xl bg-nexus-600 hover:bg-nexus-700 text-white font-medium py-2.5 px-4 transition-all hover:shadow-lg hover:shadow-nexus-600/25 text-sm">
            <Plus className="h-4 w-4" /> New Project
          </button>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/30 transition-all"
          />
        </div>
        {/* Status Filters */}
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="h-4 w-4 text-surface-400" />
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === f.value ? "bg-nexus-600 text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-1.5 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-xs text-surface-600 dark:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/30"
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
        </select>
      </div>

      {/* Projects Grid / List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-16 w-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
            <FolderKanban className="h-8 w-8 text-surface-400" />
          </div>
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white">No projects found</h3>
          <p className="text-surface-500 dark:text-surface-400 mt-1">{searchQuery ? "Try a different search term." : "Create your first project to get started."}</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const st = STATUS_STYLES[project.status];
              return (
                <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="card-hover rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-5 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-semibold text-surface-900 dark:text-white">{project.name}</h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}>{st.label}</span>
                  </div>
                  <p className="text-sm text-surface-500 dark:text-surface-400 flex-1 line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-xs text-surface-600 dark:text-surface-400 font-medium">{tech}</span>
                    ))}
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-surface-500 dark:text-surface-400">Progress</span>
                      <span className="text-xs font-semibold text-surface-700 dark:text-surface-300">{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className={`h-full rounded-full ${PROGRESS_COLORS[project.status]}`} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-800">
                    <span className="text-xs text-surface-400">{new Date(project.createdAt).toLocaleDateString()}</span>
                    <button onClick={() => handleDelete(project.id, project.name)} className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors">Delete</button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 overflow-hidden">
          {filtered.map((project, i) => {
            const st = STATUS_STYLES[project.status];
            return (
              <div key={project.id} className={`flex items-center gap-4 px-5 py-4 ${i > 0 ? "border-t border-surface-100 dark:border-surface-800" : ""}`}>
                <div className="h-10 w-10 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center shrink-0">
                  <FolderKanban className="h-5 w-5 text-surface-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white">{project.name}</h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400 truncate">{project.description}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${st.bg} ${st.text} shrink-0`}>{st.label}</span>
                <div className="w-32 shrink-0 hidden sm:block">
                  <div className="h-1.5 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                    <div className={`h-full rounded-full ${PROGRESS_COLORS[project.status]}`} style={{ width: `${project.progress}%` }} />
                  </div>
                  <span className="text-xs text-surface-400 mt-0.5 block text-right">{project.progress}%</span>
                </div>
                <button onClick={() => handleDelete(project.id, project.name)} className="text-xs text-red-500 hover:text-red-600 font-medium shrink-0 transition-colors">Delete</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Project Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={(e) => { if (e.target === e.currentTarget) resetForm(); }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 dark:border-surface-800">
                <div>
                  <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Create New Project</h2>
                  <p className="text-xs text-surface-400">Step {step + 1} of 2</p>
                </div>
                <button onClick={resetForm} className="h-8 w-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"><X className="h-4 w-4" /></button>
              </div>
              <div className="flex gap-1 px-6 pt-4">
                <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 0 ? "bg-nexus-500" : "bg-surface-200 dark:bg-surface-700"}`} />
                <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-nexus-500" : "bg-surface-200 dark:bg-surface-700"}`} />
              </div>
              <div className="p-6 space-y-4">
                {step === 0 ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Project Name</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="My Awesome Project" className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Description</label>
                      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your project…" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 transition-all resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Tech Stack <span className="text-surface-400 font-normal">(comma-separated)</span></label>
                      <input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} placeholder="Next.js, TypeScript, Tailwind" className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 transition-all" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Status</label>
                      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 transition-all">
                        <option value="in-progress">In Progress</option>
                        <option value="on-hold">On Hold</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Initial Progress</label>
                      <input type="range" min={0} max={100} value={form.progress} onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })} className="w-full accent-nexus-600" />
                      <span className="text-xs text-surface-400">{form.progress}%</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Due Date</label>
                      <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 transition-all" />
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between px-6 py-4 border-t border-surface-100 dark:border-surface-800">
                <button onClick={resetForm} className="text-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors">Cancel</button>
                <div className="flex gap-2">
                  {step > 0 && <button onClick={() => setStep(step - 1)} className="rounded-xl border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-medium py-2.5 px-4 text-sm hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">Back</button>}
                  {step < 1 ? (
                    <button onClick={() => setStep(1)} disabled={!form.name.trim()} className="rounded-xl bg-nexus-600 hover:bg-nexus-700 disabled:bg-nexus-400 text-white font-medium py-2.5 px-4 text-sm transition-all disabled:cursor-not-allowed flex items-center gap-1">Next <ArrowRight className="h-3.5 w-3.5" /></button>
                  ) : (
                    <button onClick={handleCreate} className="rounded-xl bg-nexus-600 hover:bg-nexus-700 text-white font-medium py-2.5 px-4 text-sm transition-all flex items-center gap-1">Create <Plus className="h-3.5 w-3.5" /></button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

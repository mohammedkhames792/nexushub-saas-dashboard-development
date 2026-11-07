"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, X, Trash2, GripVertical, CheckSquare,
  Circle, Clock, AlertCircle, Edit3, Check,
} from "lucide-react";
import { useTaskStore, useToastStore } from "@/lib/store";
import { Breadcrumb } from "@/components/breadcrumb";
import type { TaskStatus, TaskPriority, Task } from "@/lib/types";

const COLUMNS: { id: TaskStatus; title: string; icon: typeof Circle; color: string }[] = [
  { id: "todo", title: "To Do", icon: Circle, color: "text-surface-400" },
  { id: "in-progress", title: "In Progress", icon: Clock, color: "text-blue-500" },
  { id: "done", title: "Done", icon: CheckSquare, color: "text-emerald-500" },
];

const PRIORITY_STYLES: Record<TaskPriority, { bg: string; text: string; icon: typeof AlertCircle }> = {
  high: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", icon: AlertCircle },
  medium: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", icon: Clock },
  low: { bg: "bg-surface-100 dark:bg-surface-800", text: "text-surface-600 dark:text-surface-400", icon: Circle },
};

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

function EditTaskModal({ task, onClose }: { task: Task; onClose: () => void }) {
  const updateTask = useTaskStore((s) => s.updateTask);
  const addToast = useToastStore((s) => s.addToast);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [assignee, setAssignee] = useState(task.assignee);

  const handleSave = () => {
    updateTask(task.id, { title, description, priority, status, assignee });
    addToast("success", "Task Updated", `"${title}" has been updated.`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 dark:border-surface-800">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Edit Task</h2>
          <button onClick={onClose} className="h-8 w-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all">
                {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all">
                {PRIORITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Assignee</label>
            <input value={assignee} onChange={(e) => setAssignee(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-surface-100 dark:border-surface-800">
          <button onClick={onClose} className="rounded-xl border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 font-medium py-2.5 px-4 text-sm hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">Cancel</button>
          <button onClick={handleSave} className="rounded-xl bg-nexus-600 hover:bg-nexus-700 text-white font-medium py-2.5 px-4 text-sm transition-all flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Save</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TasksPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const addTask = useTaskStore((s) => s.addTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const moveTask = useTaskStore((s) => s.moveTask);
  const addToast = useToastStore((s) => s.addToast);

  const [showAdd, setShowAdd] = useState<TaskStatus | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dragTask, setDragTask] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<TaskStatus | null>(null);

  const handleAdd = (status: TaskStatus) => {
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle.trim(),
      description: "",
      status,
      priority: "medium",
      assignee: "You",
    });
    addToast("success", "Task Added", `"${newTitle.trim()}" added to ${COLUMNS.find((c) => c.id === status)?.title}.`);
    setNewTitle("");
    setShowAdd(null);
  };

  const handleDelete = (id: string, title: string) => {
    deleteTask(id);
    addToast("info", "Task Deleted", `"${title}" has been removed.`);
  };

  const handleDragStart = (taskId: string) => setDragTask(taskId);
  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    setDragOver(status);
  };
  const handleDrop = (status: TaskStatus) => {
    if (dragTask) {
      moveTask(dragTask, status);
    }
    setDragTask(null);
    setDragOver(null);
  };
  const handleDragEnd = () => {
    setDragTask(null);
    setDragOver(null);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Task Board</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">Organize and prioritize your work · Drag tasks between columns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[500px]">
        {COLUMNS.map((col) => {
          const ColIcon = col.icon;
          const columnTasks = tasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDrop={() => handleDrop(col.id)}
              onDragLeave={() => setDragOver(null)}
              className={`rounded-2xl border-2 transition-colors p-3 flex flex-col ${
                dragOver === col.id
                  ? "border-nexus-500 bg-nexus-50/50 dark:bg-nexus-950/20"
                  : "border-surface-200 dark:border-surface-700/60 bg-surface-50 dark:bg-surface-900/50"
              }`}
            >
              <div className="flex items-center justify-between px-2 pb-3">
                <div className="flex items-center gap-2">
                  <ColIcon className={`h-4.5 w-4.5 ${col.color}`} />
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white">{col.title}</h3>
                  <span className="text-xs text-surface-400 bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded-full font-medium">{columnTasks.length}</span>
                </div>
                <button
                  onClick={() => setShowAdd(col.id)}
                  className="h-7 w-7 rounded-lg flex items-center justify-center text-surface-400 hover:text-nexus-600 hover:bg-nexus-50 dark:hover:bg-nexus-950/30 transition-all"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto min-h-[100px]">
                <AnimatePresence mode="popLayout">
                  {columnTasks.map((task) => {
                    const prStyle = PRIORITY_STYLES[task.priority];
                    const PrIcon = prStyle.icon;
                    return (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        onDragEnd={handleDragEnd}
                        className={`group rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-3 cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md ${dragTask === task.id ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-start gap-2">
                          <GripVertical className="h-4 w-4 text-surface-300 dark:text-surface-600 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{task.title}</p>
                            {task.description && (
                              <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5 truncate">{task.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button
                              onClick={() => setEditingTask(task)}
                              className="h-6 w-6 rounded-md flex items-center justify-center text-nexus-500 hover:text-nexus-600 hover:bg-nexus-50 dark:hover:bg-nexus-950/30 transition-all"
                            >
                              <Edit3 className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleDelete(task.id, task.title)}
                              className="h-6 w-6 rounded-md flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 pl-6">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${prStyle.bg} ${prStyle.text}`}>
                            <PrIcon className="h-2.5 w-2.5" /> {task.priority}
                          </span>
                          <span className="text-[10px] text-surface-400">{task.assignee}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <AnimatePresence>
                  {showAdd === col.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-xl border-2 border-dashed border-nexus-400 dark:border-nexus-500 bg-nexus-50/50 dark:bg-nexus-950/20 p-3">
                        <input
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") handleAdd(col.id); if (e.key === "Escape") { setShowAdd(null); setNewTitle(""); } }}
                          placeholder="Task title…"
                          autoFocus
                          className="w-full px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 mb-2"
                        />
                        <div className="flex gap-2">
                          <button onClick={() => handleAdd(col.id)} className="flex-1 rounded-lg bg-nexus-600 hover:bg-nexus-700 text-white text-xs font-medium py-1.5 transition-colors">Add</button>
                          <button onClick={() => { setShowAdd(null); setNewTitle(""); }} className="rounded-lg border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 text-xs font-medium py-1.5 px-3 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">Cancel</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {columnTasks.length === 0 && showAdd !== col.id && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ColIcon className={`h-8 w-8 ${col.color} opacity-30 mb-2`} />
                    <p className="text-xs text-surface-400 dark:text-surface-500">No tasks yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingTask && <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} />}
      </AnimatePresence>
    </div>
  );
}

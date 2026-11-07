"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban, DollarSign, CheckCircle, TrendingUp,
  TrendingDown, Activity, Clock,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import { useProjectStore, useTaskStore } from "@/lib/store";
import { DashboardSkeleton } from "@/components/skeleton";
import { ActivityHeatmap } from "@/components/heatmap";
import { Breadcrumb } from "@/components/breadcrumb";
import { DataExportButton } from "@/components/data-export";
import type { ChartDataPoint } from "@/lib/types";

const METRICS = [
  { label: "Active Projects", value: "12", change: 8.2, trend: "up" as const, icon: FolderKanban, gradient: "from-nexus-500 to-violet-500" },
  { label: "Revenue", value: "$48.2K", change: 12.5, trend: "up" as const, icon: DollarSign, gradient: "from-emerald-500 to-teal-500" },
  { label: "Tasks Completed", value: "284", change: -2.4, trend: "down" as const, icon: CheckCircle, gradient: "from-amber-500 to-orange-500" },
  { label: "Growth Rate", value: "23.8%", change: 4.1, trend: "up" as const, icon: TrendingUp, gradient: "from-rose-500 to-pink-500" },
];

const ACTIVITY_DATA: ChartDataPoint[] = [
  { name: "Jan", value: 4000, value2: 2400 },
  { name: "Feb", value: 3000, value2: 1398 },
  { name: "Mar", value: 5000, value2: 3800 },
  { name: "Apr", value: 4780, value2: 3908 },
  { name: "May", value: 5890, value2: 4800 },
  { name: "Jun", value: 4390, value2: 3800 },
  { name: "Jul", value: 6490, value2: 4300 },
];

const TASK_DATA: ChartDataPoint[] = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 35 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 42 },
  { name: "Fri", value: 38 },
  { name: "Sat", value: 15 },
  { name: "Sun", value: 8 },
];

const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b"];

const RECENT_ACTIVITY = [
  { text: "Completed task: API Documentation", time: "2 min ago", icon: CheckCircle, color: "text-emerald-500" },
  { text: "New comment on NexusHub Platform", time: "15 min ago", icon: Activity, color: "text-blue-500" },
  { text: "Project CloudSync API updated", time: "1 hour ago", icon: FolderKanban, color: "text-violet-500" },
  { text: "Sprint review scheduled", time: "3 hours ago", icon: Clock, color: "text-amber-500" },
];

export default function DashboardPage() {
  const projects = useProjectStore((s) => s.projects);
  const tasks = useTaskStore((s) => s.tasks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Compute pie chart data from projects
  const statusCounts = [
    { name: "In Progress", value: projects.filter((p) => p.status === "in-progress").length },
    { name: "Completed", value: projects.filter((p) => p.status === "completed").length },
    { name: "On Hold", value: projects.filter((p) => p.status === "on-hold").length },
  ];

  if (loading) return <DashboardSkeleton />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <Breadcrumb />

      {/* Header with Export */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Dashboard</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">Here&apos;s what&apos;s happening with your projects today.</p>
        </div>
        <DataExportButton />
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div key={metric.label} variants={itemVariants} className="card-hover relative overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">{metric.label}</p>
                  <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{metric.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${metric.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                    {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{metric.change}%</span>
                    <span className="text-surface-400 dark:text-surface-500">vs last month</span>
                  </div>
                </div>
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className={`absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br ${metric.gradient} opacity-[0.06]`} />
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Activity Trends</h2>
              <p className="text-sm text-surface-500 dark:text-surface-400">Revenue and expenses over time</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-nexus-500" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-violet-400" /> Expenses</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={ACTIVITY_DATA}>
              <defs>
                <linearGradient id="gradNexus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradViolet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#6366f1" fill="url(#gradNexus)" strokeWidth={2} />
              <Area type="monotone" dataKey="value2" stroke="#a78bfa" fill="url(#gradViolet)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Task Completion</h2>
            <p className="text-sm text-surface-500 dark:text-surface-400">Tasks completed this week</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={TASK_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Heatmap + Pie Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ActivityHeatmap />
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">Project Status</h2>
          <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">Distribution by status</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusCounts}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {statusCounts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {statusCounts.map((item, i) => (
              <span key={item.name} className="flex items-center gap-1.5 text-xs text-surface-600 dark:text-surface-400">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                {item.name} ({item.value})
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`h-9 w-9 shrink-0 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center ${item.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-surface-900 dark:text-surface-100">{item.text}</p>
                    <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-6">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Project Summary</h2>
          <div className="space-y-4">
            {projects.slice(0, 4).map((project) => (
              <div key={project.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{project.name}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    project.status === "completed" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                    project.status === "in-progress" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                    "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  }`}>
                    {project.status === "in-progress" ? "In Progress" : project.status === "completed" ? "Completed" : "On Hold"}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className={`h-full rounded-full ${
                      project.status === "completed" ? "bg-emerald-500" :
                      project.status === "in-progress" ? "bg-nexus-500" :
                      "bg-amber-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

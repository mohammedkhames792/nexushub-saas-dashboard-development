// ============================================================
// NexusHub – Core Type Definitions
// ============================================================

// ---------- Auth ----------
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "developer" | "creator" | "admin";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  demoLogin: () => void;
}

// ---------- UI ----------
export type Theme = "light" | "dark";

export interface UIState {
  theme: Theme;
  sidebarCollapsed: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
}

// ---------- Projects ----------
export type ProjectStatus = "in-progress" | "completed" | "on-hold";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number; // 0–100
  techStack: string[];
  createdAt: string;
  dueDate: string;
}

// ---------- Tasks / Kanban ----------
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  createdAt: string;
}

// ---------- Community ----------
export interface CommunityPost {
  id: string;
  author: User;
  content: string;
  likes: number;
  liked: boolean;
  comments: number;
  createdAt: string;
  tags: string[];
}

// ---------- Notifications ----------
export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "info" | "success" | "warning" | "error";
}

// ---------- Toast ----------
export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

// ---------- Metrics ----------
export interface MetricCard {
  label: string;
  value: string;
  change: number; // percentage
  trend: "up" | "down" | "neutral";
  icon: string;
}

// ---------- Chart ----------
export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

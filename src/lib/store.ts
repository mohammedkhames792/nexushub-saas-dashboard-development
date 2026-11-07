"use client";
// ============================================================
// NexusHub – Global State Management (Zustand)
// ============================================================
import { create } from "zustand";
import type {
  User,
  Theme,
  Project,
  ProjectStatus,
  Task,
  TaskStatus,
  TaskPriority,
  CommunityPost,
  Notification,
  Toast,
  ToastType,
} from "./types";

// ────────────── Helpers ──────────────
const uid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
const now = () => new Date().toISOString();

// ────────────── Seed Data ──────────────
const DEMO_USER: User = {
  id: "demo-001",
  name: "Alex Chen",
  email: "alex@nexushub.dev",
  avatar: "AC",
  role: "developer",
};

const SEED_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "NexusHub Platform",
    description:
      "All-in-one developer dashboard with analytics, tasks, and community features.",
    status: "in-progress",
    progress: 72,
    techStack: ["Next.js", "TypeScript", "Tailwind"],
    createdAt: "2025-01-15T00:00:00Z",
    dueDate: "2025-06-30T00:00:00Z",
  },
  {
    id: "p2",
    name: "CloudSync API",
    description:
      "Real-time sync engine for distributed applications with conflict resolution.",
    status: "in-progress",
    progress: 45,
    techStack: ["Go", "gRPC", "Redis"],
    createdAt: "2025-02-01T00:00:00Z",
    dueDate: "2025-08-15T00:00:00Z",
  },
  {
    id: "p3",
    name: "DesignKit UI",
    description:
      "Open-source component library with 120+ accessible, themeable components.",
    status: "completed",
    progress: 100,
    techStack: ["React", "Storybook", "CSS"],
    createdAt: "2024-09-01T00:00:00Z",
    dueDate: "2025-03-01T00:00:00Z",
  },
  {
    id: "p4",
    name: "DataForge CLI",
    description: "CLI tool for rapid data pipeline scaffolding and deployment.",
    status: "on-hold",
    progress: 20,
    techStack: ["Rust", "Python", "Docker"],
    createdAt: "2025-01-20T00:00:00Z",
    dueDate: "2025-07-01T00:00:00Z",
  },
  {
    id: "p5",
    name: "PixelStream Editor",
    description:
      "Browser-based collaborative code editor with real-time pairing.",
    status: "in-progress",
    progress: 58,
    techStack: ["TypeScript", "WebSocket", "Yjs"],
    createdAt: "2025-03-10T00:00:00Z",
    dueDate: "2025-09-01T00:00:00Z",
  },
  {
    id: "p6",
    name: "AuthVault",
    description: "Zero-knowledge authentication service with passkey support.",
    status: "completed",
    progress: 100,
    techStack: ["Node.js", "WebAuthn", "PostgreSQL"],
    createdAt: "2024-11-01T00:00:00Z",
    dueDate: "2025-04-01T00:00:00Z",
  },
];

const SEED_TASKS: Task[] = [
  {
    id: "t1",
    title: "Design new onboarding flow",
    description: "Create wireframes and prototypes",
    status: "todo",
    priority: "high",
    assignee: "Alex Chen",
    createdAt: now(),
  },
  {
    id: "t2",
    title: "Implement auth middleware",
    description: "Add JWT validation to API routes",
    status: "todo",
    priority: "medium",
    assignee: "Sam Lee",
    createdAt: now(),
  },
  {
    id: "t3",
    title: "Write API documentation",
    description: "OpenAPI spec for all endpoints",
    status: "todo",
    priority: "low",
    assignee: "Jordan Kim",
    createdAt: now(),
  },
  {
    id: "t4",
    title: "Set up CI/CD pipeline",
    description: "GitHub Actions with staging deploys",
    status: "in-progress",
    priority: "high",
    assignee: "Alex Chen",
    createdAt: now(),
  },
  {
    id: "t5",
    title: "Refactor state management",
    description: "Migrate to Zustand from Redux",
    status: "in-progress",
    priority: "medium",
    assignee: "Sam Lee",
    createdAt: now(),
  },
  {
    id: "t6",
    title: "Fix responsive layout bugs",
    description: "Sidebar and card grid on mobile",
    status: "in-progress",
    priority: "low",
    assignee: "Jordan Kim",
    createdAt: now(),
  },
  {
    id: "t7",
    title: "Launch landing page",
    description: "Deploy V1 marketing site",
    status: "done",
    priority: "high",
    assignee: "Alex Chen",
    createdAt: now(),
  },
  {
    id: "t8",
    title: "Database schema v2",
    description: "Add analytics and billing tables",
    status: "done",
    priority: "medium",
    assignee: "Sam Lee",
    createdAt: now(),
  },
];

const SEED_POSTS: CommunityPost[] = [
  {
    id: "cp1",
    author: {
      id: "u2",
      name: "Sam Lee",
      email: "sam@dev.io",
      avatar: "SL",
      role: "developer",
    },
    content:
      "Just shipped the new real-time collaboration engine! 🚀 It handles 10k+ concurrent users with sub-50ms latency. Would love feedback from the community.",
    likes: 42,
    liked: false,
    comments: 8,
    createdAt: "2025-04-10T14:30:00Z",
    tags: ["release", "performance"],
  },
  {
    id: "cp2",
    author: {
      id: "u3",
      name: "Jordan Kim",
      email: "jordan@create.co",
      avatar: "JK",
      role: "creator",
    },
    content:
      "Pro tip: When building dashboards, start with the data structure, not the UI. It saves you from countless refactors later. Trust me on this one. 💡",
    likes: 28,
    liked: true,
    comments: 5,
    createdAt: "2025-04-09T10:15:00Z",
    tags: ["tips", "architecture"],
  },
  {
    id: "cp3",
    author: {
      id: "u4",
      name: "Riley Park",
      email: "riley@stack.dev",
      avatar: "RP",
      role: "developer",
    },
    content:
      "Anyone else noticing that Next.js Server Components pair beautifully with Zustand for client state? The hydration story keeps getting better.",
    likes: 15,
    liked: false,
    comments: 3,
    createdAt: "2025-04-08T16:45:00Z",
    tags: ["nextjs", "state"],
  },
  {
    id: "cp4",
    author: {
      id: "u5",
      name: "Morgan Cruz",
      email: "morgan@design.io",
      avatar: "MC",
      role: "creator",
    },
    content:
      "New design tokens system just dropped! 120+ primitives with automatic dark mode support. Open source and ready to use. ✨",
    likes: 67,
    liked: false,
    comments: 12,
    createdAt: "2025-04-07T09:00:00Z",
    tags: ["design", "open-source"],
  },
  {
    id: "cp5",
    author: {
      id: "u6",
      name: "Avery Quinn",
      email: "avery@cloud.dev",
      avatar: "AQ",
      role: "admin",
    },
    content:
      "Reminder: Platform maintenance window this Saturday 2-4 AM UTC. All services will be briefly unavailable during the database migration.",
    likes: 5,
    liked: false,
    comments: 2,
    createdAt: "2025-04-06T11:30:00Z",
    tags: ["announcement", "maintenance"],
  },
];

const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Project Milestone",
    message: "NexusHub Platform reached 72% completion",
    read: false,
    createdAt: now(),
    type: "success",
  },
  {
    id: "n2",
    title: "New Comment",
    message: "Sam Lee commented on your task",
    read: false,
    createdAt: now(),
    type: "info",
  },
  {
    id: "n3",
    title: "System Update",
    message: "Platform maintenance scheduled",
    read: true,
    createdAt: now(),
    type: "warning",
  },
  {
    id: "n4",
    title: "Deploy Success",
    message: "DesignKit UI deployed to production",
    read: true,
    createdAt: now(),
    type: "success",
  },
];

// ─────────────────────────────────────────────────────────────
// Auth Store
// ─────────────────────────────────────────────────────────────
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  demoLogin: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  // Hydrate from localStorage
  let initialUser: User | null = null;
  let initialAuth = false;
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("nexushub-auth");
      if (stored) {
        const parsed = JSON.parse(stored) as {
          user: User;
          isAuthenticated: boolean;
        };
        initialUser = parsed.user;
        initialAuth = parsed.isAuthenticated;
      }
    } catch {
      /* ignore */
    }
  }

  const persist = (user: User | null, isAuthenticated: boolean) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "nexushub-auth",
        JSON.stringify({ user, isAuthenticated }),
      );
    }
  };

  return {
    user: initialUser,
    isAuthenticated: initialAuth,
    login: (email: string, _password: string) => {
      const user: User = {
        id: uid(),
        name: email.split("@")[0],
        email,
        avatar: email.slice(0, 2).toUpperCase(),
        role: "developer",
      };
      set({ user, isAuthenticated: true });
      persist(user, true);
      return true;
    },
    register: (name: string, email: string, _password: string) => {
      const user: User = {
        id: uid(),
        name,
        email,
        avatar: name.slice(0, 2).toUpperCase(),
        role: "creator",
      };
      set({ user, isAuthenticated: true });
      persist(user, true);
      return true;
    },
    logout: () => {
      set({ user: null, isAuthenticated: false });
      persist(null, false);
    },
    demoLogin: () => {
      set({ user: DEMO_USER, isAuthenticated: true });
      persist(DEMO_USER, true);
    },
  };
});

// ─────────────────────────────────────────────────────────────
// UI Store
// ─────────────────────────────────────────────────────────────
interface UIStore {
  theme: Theme;
  sidebarCollapsed: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => {
  let initialTheme: Theme = "dark";
  let initialCollapsed = false;
  if (typeof window !== "undefined") {
    try {
      const t = localStorage.getItem("nexushub-theme") as Theme | null;
      if (t) initialTheme = t;
      const c = localStorage.getItem("nexushub-sidebar");
      if (c) initialCollapsed = c === "collapsed";
    } catch {
      /* ignore */
    }
  }

  return {
    theme: initialTheme,
    sidebarCollapsed: initialCollapsed,
    toggleTheme: () =>
      set((s) => {
        const next = s.theme === "dark" ? "light" : "dark";
        if (typeof window !== "undefined")
          localStorage.setItem("nexushub-theme", next);
        return { theme: next };
      }),
    toggleSidebar: () =>
      set((s) => {
        const next = !s.sidebarCollapsed;
        if (typeof window !== "undefined")
          localStorage.setItem(
            "nexushub-sidebar",
            next ? "collapsed" : "expanded",
          );
        return { sidebarCollapsed: next };
      }),
    setSidebarCollapsed: (v: boolean) => {
      if (typeof window !== "undefined")
        localStorage.setItem("nexushub-sidebar", v ? "collapsed" : "expanded");
      set({ sidebarCollapsed: v });
    },
  };
});

// ─────────────────────────────────────────────────────────────
// Projects Store
// ─────────────────────────────────────────────────────────────
interface ProjectStore {
  projects: Project[];
  viewMode: "grid" | "list";
  addProject: (p: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setViewMode: (m: "grid" | "list") => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: SEED_PROJECTS,
  viewMode: "grid",
  addProject: (p) =>
    set((s) => ({
      projects: [...s.projects, { ...p, id: uid(), createdAt: now() }],
    })),
  updateProject: (id, updates) =>
    set((s) => ({
      projects: s.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deleteProject: (id) =>
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
  setViewMode: (m) => set({ viewMode: m }),
}));

// ─────────────────────────────────────────────────────────────
// Tasks Store (Kanban)
// ─────────────────────────────────────────────────────────────
interface TaskStore {
  tasks: Task[];
  addTask: (t: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: SEED_TASKS,
  addTask: (t) =>
    set((s) => ({
      tasks: [...s.tasks, { ...t, id: uid(), createdAt: now() }],
    })),
  updateTask: (id, updates) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  deleteTask: (id) =>
    set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
  moveTask: (id, status) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),
}));

// ─────────────────────────────────────────────────────────────
// Community Store
// ─────────────────────────────────────────────────────────────
interface CommunityStore {
  posts: CommunityPost[];
  filter: string;
  addPost: (content: string, tags: string[]) => void;
  toggleLike: (id: string) => void;
  setFilter: (f: string) => void;
}

export const useCommunityStore = create<CommunityStore>((set, get) => ({
  posts: SEED_POSTS,
  filter: "all",
  addPost: (content, tags) => {
    const auth = useAuthStore.getState();
    const author: User = auth.user ?? DEMO_USER;
    set((s) => ({
      posts: [
        {
          id: uid(),
          author,
          content,
          likes: 0,
          liked: false,
          comments: 0,
          createdAt: now(),
          tags,
        },
        ...s.posts,
      ],
    }));
  },
  toggleLike: (id) =>
    set((s) => ({
      posts: s.posts.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    })),
  setFilter: (f) => set({ filter: f }),
}));

// ─────────────────────────────────────────────────────────────
// Notifications Store
// ─────────────────────────────────────────────────────────────
interface NotificationStore {
  notifications: Notification[];
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: SEED_NOTIFICATIONS,
  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),
}));

// ─────────────────────────────────────────────────────────────
// Toast Store
// ─────────────────────────────────────────────────────────────
interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type, title, message) => {
    const id = uid();
    set((s) => ({ toasts: [...s.toasts, { id, type, title, message }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));


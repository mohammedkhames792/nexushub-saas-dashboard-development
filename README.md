<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PostgreSQL-Drizzle-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

<h1 align="center">⚡ NexusHub</h1>

<h3 align="center">All-in-One Developer & Creator Ecosystem Dashboard</h3>

<p align="center">
  A sleek, high-performance SaaS-like platform where creators and developers can manage projects,
  <br />track analytics, organize tasks Kanban-style, and interact with a community feed.
  <br /><br />
  <strong>Built with Next.js 16 · TypeScript · Tailwind CSS 4 · Zustand · Framer Motion · Recharts</strong>
</p>

---

## 📑 Table of Contents

- [✨ Features](#-features)
  - [🔐 Authentication Flow](#-authentication-flow)
  - [📊 Dashboard Overview](#-dashboard-overview)
  - [📁 Projects Manager](#-projects-manager)
  - [✅ Task Kanban Board](#-task-kanban-board)
  - [💬 Community Feed](#-community-feed)
  - [⚙️ Settings Page](#️-settings-page)
  - [🔍 Command Palette](#-command-palette)
  - [🎓 Onboarding Tour](#-onboarding-tour)
  - [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
  - [📊 Activity Heatmap](#-activity-heatmap)
  - [🧭 Breadcrumb Navigation](#-breadcrumb-navigation)
  - [📱 Mobile Bottom Navigation](#-mobile-bottom-navigation)
  - [📤 Data Export](#-data-export)
  - [🔄 Page Loading Progress Bar](#-page-loading-progress-bar)
  - [🍩 Pie Chart](#-pie-chart)
  - [🚫 Custom 404 Page](#-custom-404-page)
  - [🎨 UI/UX Polish](#-uiux-polish)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🎯 Key Design Decisions](#-key-design-decisions)
- [⌨️ Keyboard Shortcuts Reference](#️-keyboard-shortcuts-reference)
- [📸 Screenshots](#-screenshots)
- [📄 License](#-license)

---

## ✨ Features

### 🔐 Authentication Flow
- **Split-screen layout** — Left: Dynamic branding with animated testimonial slider · Right: Form
- **Zod + React Hook Form** inline validation with real-time error messages
- **Show/Hide password** toggle with eye icon
- **"Remember me"** checkbox & "Forgot password?" link
- **Social login buttons** (Google & GitHub UI)
- **Quick Demo Login** — One-click login for portfolio reviewers (logs in as "Alex Chen")
- **Protected routes** — Unauthenticated users are automatically redirected to login
- **Auth state persistence** — Survives page reloads via localStorage

### 📊 Dashboard Overview
- **Collapsible sidebar** with smooth expand/collapse animation, active route indicator, and user profile
- **Top navbar** with global search, dark/light mode toggle, notifications dropdown, and user avatar menu
- **4 Metric cards** — Active Projects, Revenue, Tasks Completed, Growth Rate with trend indicators, gradient icons, and glassmorphism accents
- **Area chart** — Revenue vs Expenses over time with gradient fills (Recharts)
- **Bar chart** — Weekly task completion with rounded bars
- **Donut/Pie chart** — Project status distribution (In Progress, Completed, On Hold)
- **Activity Heatmap** — GitHub-style contribution graph (26 weeks, animated reveal)
- **Recent activity feed** and **project progress summary** with animated progress bars
- **Data Export button** — Export projects & tasks as JSON or CSV directly from the dashboard

### 📁 Projects Manager
- **Grid/List view** toggle with animated layout transitions
- **Status badges** (In Progress, Completed, On Hold) with color-coded styling
- **Progress bars** with animated fill on mount
- **Multi-step create modal** (2 steps: Info → Settings) with step indicator
- **Delete projects** with toast confirmation
- **Search bar** — Filter projects by name or description in real-time
- **Status filter tabs** — All, In Progress, Completed, On Hold
- **Sort dropdown** — Sort by Name, Progress, or Status
- **Combined filtering** — Search + filter + sort work together seamlessly

### ✅ Task Kanban Board
- **3 columns**: To Do · In Progress · Done
- **Drag-and-drop** tasks between columns with visual drop indicators
- **Inline add** tasks with Enter/Escape keyboard shortcuts
- **Priority indicators** (High, Medium, Low) with color-coded badges
- **Edit task modal** — Full editing: title, description, status, priority, assignee
- **Delete tasks** with hover-revealed action buttons
- **Empty states** with icons per column

### 💬 Community Feed
- **Paginated posts** with author avatars, gradient backgrounds, and relative timestamps
- **Like toggle** with animated heart icon and real-time count updates
- **Tag-based filtering** (release, tips, architecture, nextjs, design, announcement)
- **Compose new posts** with tag support (comma-separated)
- **Pagination controls** with page number buttons
- **Empty state** illustration when no posts match the filter

### ⚙️ Settings Page
- **Profile section** — Edit name, email, bio, and avatar placeholder
- **Appearance section** — Light/Dark mode visual toggle with themed switcher buttons
- **Notification preferences** — Animated toggle switches for email & push notifications
- **Save button** with "Saved! ✓" confirmation state

### 🔍 Command Palette (⌘K)
- Press **⌘K** or **Ctrl+K** to open instantly
- **Fuzzy search** across projects, tasks, pages, and commands
- **Keyboard navigation** — ↑↓ to move, Enter to select, Escape to close
- **Dynamic results** — Includes all projects and tasks from the Zustand store
- **Results counter** and keyboard hints in the footer

### 🎓 Onboarding Tour
- **Step-by-step walkthrough** for first-time users (auto-opens after 1.5s)
- **5 interactive steps** with descriptions for key features
- **Progress bar** and dot indicators
- **Persists in localStorage** — Won't show again after completion or skip
- **Skip anytime** or navigate Back/Next

### ⌨️ Keyboard Shortcuts
- **?** — Show keyboard shortcuts modal with categorized list
- **⌘K / Ctrl+K** — Open command palette
- **⌘\\ / Ctrl+\\** — Toggle sidebar collapse
- **⌘D / Ctrl+D** — Toggle dark/light mode
- **Esc** — Close any modal, palette, or dropdown
- **↑↓** — Navigate in command palette
- **Enter** — Select in command palette

### 📊 Activity Heatmap
- **GitHub-style contribution graph** on the dashboard
- **26 weeks** of simulated activity data (weekday-biased)
- **4 intensity levels** with color legend (Less → More)
- **Animated staggered reveal** on mount (each cell fades in)
- **Month & day labels** for easy reading
- **Contribution count** summary in the header

### 🧭 Breadcrumb Navigation
- **Auto-generated breadcrumbs** from the current URL path
- **Clickable path segments** for quick navigation back
- **Home icon** + ChevronRight separators
- **Active segment** highlighted as the current page
- **Present on every dashboard sub-page**

### 📱 Mobile Bottom Navigation
- **Tab bar** fixed at the bottom on mobile screens (hidden on desktop)
- **5 tabs**: Home, Projects, Tasks, Feed, Settings
- **Active indicator** with animated top border (spring layout animation)
- **Safe area padding** for modern phones with notch/home indicator

### 📤 Data Export
- **Export Projects & Tasks** as **JSON** or **CSV**
- **Download modal** with format selection per data type
- **Real file download** via Blob + URL.createObjectURL
- **Item counts** shown next to each data type
- **Toast confirmation** after successful export
- **Available on Dashboard and Projects pages**

### 🔄 Page Loading Progress Bar
- **Thin gradient bar** (NProgress-style) at the very top of the viewport
- **Framer Motion** animated scaleX transition on route changes
- **Auto-dismisses** after 600ms
- **z-index 100** — Always visible above all content

### 🍩 Pie Chart
- **Donut chart** for project status distribution on the dashboard
- **3 color-coded segments**: In Progress (indigo), Completed (emerald), On Hold (amber)
- **Inner radius** for donut effect
- **Legend with counts** below the chart
- **Recharts Tooltip** on hover

### 🚫 Custom 404 Page
- **Gradient 404** — Massive number with `bg-clip-text` text-transparent gradient
- **Floating decorative elements** with spring and oscillating animations
- **Two CTAs**: "Go to Dashboard" (primary) and "Go Back" (secondary using `history.back()`)
- **Responsive** and centered layout

### 🎨 UI/UX Polish
- **Dark/Light mode** — Persisted in localStorage, smooth icon rotation animation on toggle
- **Skeleton loaders** — Pulse-animated placeholders for dashboard, projects, tasks, and community pages
- **Toast notifications** — 4 types (success ✅, error ❌, info ℹ️, warning ⚠️) with auto-dismiss after 4s
- **Micro-interactions** — Framer Motion animations on page transitions, card hover lift, modals, sidebar, staggered grid reveals
- **Mobile-responsive** — Hamburger menu with overlay sidebar, bottom tab nav, responsive grids
- **Custom scrollbars** — Thin 6px styled scrollbars matching the theme
- **Glassmorphism** — Backdrop blur effects on navbar and decorative elements
- **Custom animations** — fade-in, slide-in (4 directions), scale-in, shimmer, pulse-soft
- **Custom theme tokens** — Full `nexus` and `surface` color palettes via `@theme`
- **Card hover effects** — Subtle translateY lift with enhanced shadow

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | Server & Client components, file-based routing |
| **Language** | TypeScript 5.9 (Strict) | Full type safety, no `any` types |
| **Styling** | Tailwind CSS 4 | Utility-first + custom theme tokens |
| **State Management** | Zustand | Auth, UI, Projects, Tasks, Community, Toasts + localStorage |
| **Forms & Validation** | React Hook Form + Zod | Login, Register, inline validation |
| **Animations** | Framer Motion | Layout animations, modals, page transitions, staggered reveals |
| **Charts** | Recharts | Area, Bar, Pie charts with gradient fills |
| **Icons** | Lucide React | 30+ icons throughout the UI |
| **Database** | PostgreSQL via Drizzle ORM | Schema with enums, relations, migrations |
| **Font** | Inter | System sans-serif fallback |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout + Providers
│   ├── page.tsx                      # Auth-aware redirect
│   ├── not-found.tsx                 # Custom 404 page
│   ├── globals.css                   # Theme tokens, animations, utilities
│   ├── login/
│   │   └── page.tsx                  # Login (split-screen, testimonial slider)
│   ├── register/
│   │   └── page.tsx                  # Registration (with confirm password)
│   ├── dashboard/
│   │   ├── layout.tsx                # Protected layout (sidebar + topbar + mobile)
│   │   ├── page.tsx                  # Dashboard (metrics, charts, heatmap, pie)
│   │   ├── projects/
│   │   │   └── page.tsx              # Projects (grid/list, CRUD, search, filter, sort)
│   │   ├── tasks/
│   │   │   └── page.tsx              # Kanban (drag-drop, edit modal, inline add)
│   │   ├── community/
│   │   │   └── page.tsx              # Community (posts, likes, tags, pagination)
│   │   └── settings/
│   │       └── page.tsx              # Settings (profile, appearance, notifications)
│   └── api/health/
│       └── route.ts                  # Health check endpoint
├── components/
│   ├── providers.tsx                 # Theme hydrator + Toast container + global components
│   ├── sidebar.tsx                   # Desktop sidebar (collapse) + Mobile overlay sidebar
│   ├── topbar.tsx                    # Top navbar + Command Palette (⌘K)
│   ├── skeleton.tsx                  # Skeleton loaders (Dashboard, Projects, Tasks, Community)
│   ├── onboarding.tsx                # 5-step onboarding tour
│   ├── shortcuts-modal.tsx           # Keyboard shortcuts modal (press ?)
│   ├── heatmap.tsx                   # GitHub-style activity heatmap
│   ├── breadcrumb.tsx                # Auto-generated breadcrumb navigation
│   ├── mobile-nav.tsx                # Mobile bottom tab bar
│   ├── data-export.tsx               # JSON/CSV data export modal
│   └── progress-bar.tsx              # Page loading progress bar (NProgress-style)
├── lib/
│   ├── types.ts                      # Strict TypeScript interfaces (User, Project, Task, etc.)
│   └── store.ts                      # Zustand stores (auth, UI, projects, tasks, community, notifications, toasts)
└── db/
    ├── index.ts                      # Database connection (Drizzle + pg)
    └── schema.ts                     # Drizzle ORM schema (users, projects, tasks, community_posts)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **PostgreSQL** (or use the provided sandbox database)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/nexushub.git
cd nexushub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Push database schema
npx drizzle-kit push

# Run development server
npm run dev
```

### Quick Demo

1. Open the app at **http://localhost:3000**
2. Click **"Quick Demo Login"** on the login page
3. You're in! Explore the dashboard, projects, kanban board, and community feed.

---

## 🎯 Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **`use client` only where needed** | Server Components by default; Client Components only for interactive parts |
| **Zustand over Context** | Simpler API, better performance, built-in `localStorage` persistence |
| **No `any` types** | Every interface is strictly typed in `src/lib/types.ts` |
| **Tailwind-only styling** | No external CSS frameworks; custom theme tokens via `@theme` directive |
| **Framer Motion for animations** | Layout animations, modal transitions, staggered reveals — zero CSS animation hacks |
| **localStorage persistence** | Auth state, theme, sidebar, and onboarding survive page reloads |
| **Recharts over D3** | Simpler React integration, sufficient customization for dashboard charts |
| **Command Palette** | Power-user feature inspired by VS Code/Raycast — makes the app feel professional |
| **Onboarding Tour** | First-time UX pattern — reduces friction and showcases features immediately |

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `?` | Show keyboard shortcuts modal |
| `⌘\` / `Ctrl+\` | Toggle sidebar |
| `⌘D` / `Ctrl+D` | Toggle dark/light mode |
| `Esc` | Close modal / palette / dropdown |
| `↑` / `↓` | Navigate results in command palette |
| `Enter` | Select result in command palette |

---

## 📸 Screenshots

| Login Page | Dashboard |
|:---:|:---:|
| Split-screen auth with animated testimonial slider | Metrics, area/bar/pie charts, heatmap, activity feed |

| Projects Manager | Kanban Board |
|:---:|:---:|
| Grid/list view, search, filter, sort, status badges | Drag-drop columns, edit modal, priority indicators |

| Community Feed | Settings |
|:---:|:---:|
| Posts, likes, tag filters, pagination | Profile, appearance toggle, notification switches |

| Command Palette | Keyboard Shortcuts |
|:---:|:---:|
| ⌘K search across projects, tasks, pages | Press ? for categorized shortcuts list |

| Onboarding Tour | Custom 404 |
|:---:|:---:|
| 5-step walkthrough for first-time users | Gradient 404 with floating animations |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using Next.js · TypeScript · Tailwind CSS · Zustand · Framer Motion
</p>

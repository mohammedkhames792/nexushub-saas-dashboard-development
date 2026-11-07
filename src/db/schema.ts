import { pgTable, uuid, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";

// ─── Enums ───
export const projectStatusEnum = pgEnum("project_status", ["in-progress", "completed", "on-hold"]);
export const taskStatusEnum = pgEnum("task_status", ["todo", "in-progress", "done"]);
export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high"]);

// ─── Users ───
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar").notNull().default(""),
  role: text("role").notNull().default("developer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Projects ───
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  status: projectStatusEnum("status").notNull().default("in-progress"),
  progress: integer("progress").notNull().default(0),
  techStack: text("tech_stack").notNull().default(""),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Tasks ───
export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  status: taskStatusEnum("status").notNull().default("todo"),
  priority: taskPriorityEnum("priority").notNull().default("medium"),
  assignee: text("assignee").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Community Posts ───
export const communityPosts = pgTable("community_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  authorId: uuid("author_id").references(() => users.id),
  content: text("content").notNull(),
  likes: integer("likes").notNull().default(0),
  comments: integer("comments").notNull().default(0),
  tags: text("tags").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

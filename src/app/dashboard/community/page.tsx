"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, MessageCircle, Send, Tag, Filter, Plus,
} from "lucide-react";
import { useCommunityStore, useToastStore, useAuthStore, useUIStore } from "@/lib/store";
import { Breadcrumb } from "@/components/breadcrumb";

const FILTERS = ["all", "release", "tips", "architecture", "nextjs", "design", "announcement"];

export default function CommunityPage() {
  const posts = useCommunityStore((s) => s.posts);
  const filter = useCommunityStore((s) => s.filter);
  const addPost = useCommunityStore((s) => s.addPost);
  const toggleLike = useCommunityStore((s) => s.toggleLike);
  const setFilter = useCommunityStore((s) => s.setFilter);
  const addToast = useToastStore((s) => s.addToast);
  const user = useAuthStore((s) => s.user);
  
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);

  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const [showCompose, setShowCompose] = useState(false);
  const [page, setPage] = useState(0);
  const PER_PAGE = 5;

  const filtered = filter === "all" ? posts : posts.filter((p) => p.tags.includes(filter));
  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const handlePost = () => {
    if (!newContent.trim()) return;
    const tags = newTags.split(",").map((t) => t.trim()).filter(Boolean);
    addPost(newContent.trim(), tags);
    addToast("success", "Post Published", "Your post is now live on the community feed.");
    setNewContent("");
    setNewTags("");
    setShowCompose(false);
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <motion.div
      initial={false}
      animate={{ paddingLeft: window.innerWidth >= 768 ? (sidebarCollapsed ? "90px" : "276px") : "24px" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="min-h-screen transition-all pl-6 pr-6 sm:pr-8 py-8 w-full max-w-5xl mx-auto"
    >
      <div className="space-y-6">
        <Breadcrumb />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Community</h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">Connect, share, and learn from the community</p>
          </div>
          <button
            onClick={() => setShowCompose(!showCompose)}
            className="flex items-center gap-2 rounded-xl bg-nexus-600 hover:bg-nexus-700 text-white font-medium py-2.5 px-4 transition-all hover:shadow-lg hover:shadow-nexus-600/25 text-sm"
          >
            <Plus className="h-4 w-4" /> New Post
          </button>
        </div>

        {/* Compose */}
        <AnimatePresence>
          {showCompose && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-5 space-y-3 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-full bg-nexus-600 flex items-center justify-center text-white text-xs font-bold">
                    {user?.avatar ?? "U"}
                  </div>
                  <span className="text-sm font-medium text-surface-900 dark:text-white">{user?.name ?? "You"}</span>
                </div>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="What's on your mind? Share an update, tip, or question..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all resize-none"
                />
                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4 text-surface-400" />
                  <input
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="Tags (comma-separated): nextjs, tips, release"
                    className="flex-1 px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-xs text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 transition-all"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => { setShowCompose(false); setNewContent(""); setNewTags(""); }} className="rounded-xl border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 font-medium py-2 px-4 text-xs hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handlePost} disabled={!newContent.trim()} className="rounded-xl bg-nexus-600 hover:bg-nexus-700 disabled:bg-nexus-400 text-white font-medium py-2 px-4 text-xs transition-all disabled:cursor-not-allowed flex items-center gap-1">
                    <Send className="h-3 w-3" /> Publish
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-surface-400" />
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(0); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-nexus-600 text-white"
                  : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-surface-400" />
            </div>
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white">No posts found</h3>
            <p className="text-surface-500 dark:text-surface-400 mt-1">Be the first to share something!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {paginated.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-5 shadow-sm"
                >
                  {/* Author */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-nexus-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                      {post.author.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900 dark:text-white">{post.author.name}</p>
                      <p className="text-xs text-surface-400">{timeAgo(post.createdAt)}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed mb-4">{post.content}</p>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-nexus-50 dark:bg-nexus-950/30 text-xs text-nexus-600 dark:text-nexus-400 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-3 border-t border-surface-100 dark:border-surface-800">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${post.liked ? "text-red-500" : "text-surface-500 dark:text-surface-400 hover:text-red-500"}`}
                    >
                      <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-surface-500 dark:text-surface-400 hover:text-nexus-600 dark:hover:text-nexus-400 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-40 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-8 w-8 rounded-lg text-xs font-medium transition-colors ${
                  page === i
                    ? "bg-nexus-600 text-white"
                    : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
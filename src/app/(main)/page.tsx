'use client';

import { useStore } from '@/lib/store';
import { MOCK_USERS } from '@/lib/mock-data';
import { PostCard } from '@/components/post-card';
import { CreatePost } from '@/components/create-post';
import { TrendingUp, Zap, Award } from 'lucide-react';
import Link from 'next/link';

export default function FeedPage() {
  const { posts } = useStore();
  const visiblePosts = posts.filter(p => !p.hidden);
  const trendingUsers = MOCK_USERS.slice(1, 4);

  return (
    <div className="max-w-6xl mx-auto flex gap-6">
      {/* Main Feed */}
      <div className="flex-1 min-w-0 space-y-5">
        <CreatePost />
        {visiblePosts.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
            <p className="text-slate-500">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          visiblePosts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {/* Sidebar Widgets */}
      <div className="w-80 shrink-0 space-y-5 hidden lg:block">
        {/* Trending */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Trending</h3>
          </div>
          <div className="space-y-3">
            {['Next.js 15', 'Rust Web Dev', 'AI Code Review', 'Edge Computing', 'TypeScript 5.5'].map((tag, i) => (
              <div key={tag} className="flex items-center gap-2 text-sm">
                <span className="text-xs font-bold text-slate-400">{i + 1}</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">#{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested People */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">People to follow</h3>
          </div>
          <div className="space-y-3">
            {trendingUsers.map(user => (
              <Link key={user.id} href={`/profile/${user.id}`} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 transition-colors">{user.name}</div>
                  <div className="text-xs text-slate-500 truncate">{user.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Developer Badges */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Top Badges</h3>
          </div>
          <div className="space-y-2">
            {[
              { icon: '⚡', name: 'Next.js Wizard', color: 'bg-black text-white' },
              { icon: '🥷', name: 'TypeScript Ninja', color: 'bg-blue-600 text-white' },
              { icon: '🤖', name: 'AI Pioneer', color: 'bg-emerald-600 text-white' },
              { icon: '☁️', name: 'Cloud Guru', color: 'bg-sky-600 text-white' },
            ].map(b => (
              <div key={b.name} className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${b.color}`}>{b.icon} {b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

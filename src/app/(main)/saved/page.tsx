'use client';

import { useStore } from '@/lib/store';
import { PostCard } from '@/components/post-card';
import { Bookmark } from 'lucide-react';

export default function SavedPage() {
  const { posts } = useStore();
  const savedPosts = posts.filter(p => p.saved && !p.hidden);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="w-6 h-6 text-amber-500" />
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Saved Posts</h1>
          <p className="text-sm text-slate-500 mt-1">Your bookmarked content</p>
        </div>
      </div>

      {savedPosts.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
          <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500">No saved posts yet</p>
          <p className="text-sm text-slate-400 mt-1">Bookmark posts from the feed to see them here</p>
        </div>
      ) : (
        <div className="space-y-5">
          {savedPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { MOCK_USERS } from '@/lib/mock-data';
import { Clock, Heart, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';

export default function ArticlesPage() {
  const { articles } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? articles.find(a => a.id === selectedId) : null;

  if (selected) {
    const author = MOCK_USERS.find(u => u.id === selected.authorId);
    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setSelectedId(null)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </button>
        <article className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {selected.tags.map(t => (
              <span key={t} className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium">{t}</span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4 leading-tight">{selected.title}</h1>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              {author?.name.charAt(0) ?? '?'}
            </div>
            <div>
              <Link href={`/profile/${selected.authorId}`} className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors">{author?.name ?? 'Unknown'}</Link>
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <Clock className="w-3 h-3" /> {selected.readTime} read · {new Date(selected.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
          <div className="h-56 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-violet-600/20 rounded-xl mb-8 flex items-center justify-center text-6xl">📖</div>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {selected.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">{line.slice(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">{line.slice(3)}</h2>;
              if (line.startsWith('- ')) return <li key={i} className="ml-4 text-sm">{line.slice(2)}</li>;
              if (line.trim() === '') return <div key={i} className="h-3" />;
              return <p key={i} className="text-sm mb-2">{line}</p>;
            })}
          </div>
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" /> {selected.claps}
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Tech Articles</h1>
      <p className="text-sm text-slate-500 mb-6">In-depth technical writing from elite developers</p>
      <div className="grid gap-5 md:grid-cols-2">
        {articles.map(article => {
          const author = MOCK_USERS.find(u => u.id === article.authorId);
          return (
            <button
              key={article.id}
              onClick={() => setSelectedId(article.id)}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all text-left group"
            >
              <div className="h-40 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-violet-600/20 flex items-center justify-center text-5xl">📝</div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {article.tags.slice(0, 2).map(t => (
                    <span key={t} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">{t}</span>
                  ))}
                </div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">{author?.name.charAt(0) ?? '?'}</div>
                  <div className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{author?.name}</span> · {article.readTime} read
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useStore } from '@/lib/store';
import { MOCK_USERS } from '@/lib/mock-data';
import { Search, User, FileText, Briefcase, Hash, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchItem {
  id: string;
  type: 'user' | 'post' | 'article' | 'job';
  label: string;
  sub: string;
  href: string;
}

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useStore();
  const { posts, jobs, articles } = useStore();
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') setCommandPaletteOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const items = useMemo<SearchItem[]>(() => {
    const all: SearchItem[] = [
      ...MOCK_USERS.map(u => ({ id: u.id, type: 'user' as const, label: u.name, sub: u.title, href: `/profile/${u.id}` })),
      ...posts.map(p => ({ id: p.id, type: 'post' as const, label: p.content.slice(0, 60) + '...', sub: `by ${MOCK_USERS.find(u => u.id === p.authorId)?.name ?? 'Unknown'}`, href: `/` })),
      ...articles.map(a => ({ id: a.id, type: 'article' as const, label: a.title, sub: a.readTime, href: `/articles` })),
      ...jobs.map(j => ({ id: j.id, type: 'job' as const, label: j.title, sub: j.company, href: `/jobs` })),
    ];
    if (!query.trim()) return all.slice(0, 12);
    const q = query.toLowerCase();
    return all.filter(i => i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q)).slice(0, 12);
  }, [query, posts, jobs, articles]);

  if (!commandPaletteOpen) return null;

  const iconFor = (type: SearchItem['type']) => {
    switch (type) {
      case 'user': return <User className="w-4 h-4" />;
      case 'post': return <Hash className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'job': return <Briefcase className="w-4 h-4" />;
    }
  };

  const select = (item: SearchItem) => {
    setCommandPaletteOpen(false);
    setQuery('');
    router.push(item.href);
  };

  return (
    <div className="palette-backdrop fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)}>
      <div className="palette-content w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search developers, posts, articles, jobs..."
            className="flex-1 bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 text-sm"
            autoFocus
            onKeyDown={e => { if (e.key === 'Enter' && items[0]) select(items[0]); }}
          />
          <kbd className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 rounded border border-slate-200 dark:border-slate-600">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {items.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-400">No results found</div>
          )}
          {items.map((item) => (
            <button
              key={`${item.type}-${item.id}`}
              onClick={() => select(item)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
            >
              <span className="text-slate-400">{iconFor(item.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{item.label}</div>
                <div className="text-xs text-slate-500 truncate">{item.sub}</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 px-4 py-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
          <span>Navigate to open</span>
          <span>↵ to select</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}

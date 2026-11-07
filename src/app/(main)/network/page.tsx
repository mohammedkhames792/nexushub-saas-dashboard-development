'use client';

import { useStore } from '@/lib/store';
import { MOCK_USERS } from '@/lib/mock-data';
import { UserPlus, UserCheck, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function NetworkPage() {
  const { currentUser, connections, toggleConnection, addToast } = useStore();
  const [search, setSearch] = useState('');
  const users = MOCK_USERS.filter(u => u.id !== currentUser?.id);
  const filtered = search.trim() ? users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.title.toLowerCase().includes(search.toLowerCase())) : users;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">My Network</h1>
          <p className="text-sm text-slate-500 mt-1">Connect with elite developers</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search developers..." className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(user => {
          const isFollowing = connections.has(user.id);
          return (
            <div key={user.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <Link href={`/profile/${user.id}`} className="block">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold hover:scale-105 transition-transform">
                      {user.name.charAt(0)}
                    </div>
                  </Link>
                  {user.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 online-pulse" />}
                </div>
                <div className="min-w-0">
                  <Link href={`/profile/${user.id}`}>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors truncate">{user.name}</div>
                  </Link>
                  <div className="text-xs text-slate-500 truncate">{user.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{user.location} · {user.connections.toLocaleString()} connections</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {user.skills.slice(0, 3).map(s => (
                  <span key={s} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">{s}</span>
                ))}
              </div>
              <button
                onClick={() => { toggleConnection(user.id); addToast(isFollowing ? `Unfollowed ${user.name}` : `Connected with ${user.name}!`, 'success'); }}
                className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium transition-colors ${isFollowing ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {isFollowing ? <><UserCheck className="w-4 h-4" /> Following</> : <><UserPlus className="w-4 h-4" /> Connect</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

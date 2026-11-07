'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { MOCK_USERS } from '@/lib/mock-data';
import { Bell, AtSign, UserPlus, Heart, MessageSquare, Briefcase, Check, CheckCheck } from 'lucide-react';
import Link from 'next/link';

type TabType = 'all' | 'mentions' | 'requests';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, addToast } = useStore();
  const [tab, setTab] = useState<TabType>('all');

  const filtered = notifications.filter(n => {
    if (tab === 'mentions') return n.type === 'mention';
    if (tab === 'requests') return n.type === 'connection';
    return true;
  });

  const iconFor = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'connection': return <UserPlus className="w-4 h-4 text-emerald-500" />;
      case 'mention': return <AtSign className="w-4 h-4 text-violet-500" />;
      case 'job': return <Briefcase className="w-4 h-4 text-amber-500" />;
      default: return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All', icon: <Bell className="w-4 h-4" /> },
    { key: 'mentions', label: 'Mentions', icon: <AtSign className="w-4 h-4" /> },
    { key: 'requests', label: 'Requests', icon: <UserPlus className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">Stay updated with your developer network</p>
        </div>
        <button
          onClick={() => { markAllNotificationsRead(); addToast('All marked as read', 'success'); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-xl transition-colors"
        >
          <CheckCheck className="w-4 h-4" /> Mark all read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No notifications</div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {filtered.map(n => {
              const from = MOCK_USERS.find(u => u.id === n.fromUserId);
              return (
                <div
                  key={n.id}
                  className={`flex items-center gap-4 px-5 py-4 transition-colors ${!n.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                >
                  <div className="relative shrink-0">
                    <Link href={`/profile/${n.fromUserId}`}>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm hover:scale-105 transition-transform">
                        {from?.name.charAt(0) ?? '?'}
                      </div>
                    </Link>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                      {iconFor(n.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <Link href={`/profile/${n.fromUserId}`} className="font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors">{from?.name}</Link>
                      {' '}{n.content}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => { markNotificationRead(n.id); addToast('Marked as read', 'info'); }}
                      className="shrink-0 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

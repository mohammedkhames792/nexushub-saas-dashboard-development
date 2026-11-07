'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { MOCK_USERS } from '@/lib/mock-data';
import { PostCard } from '@/components/post-card';
import { QRCodeSVG } from 'qrcode.react';
import { MapPin, Building2, Link2, Edit3, Download, Share2, QrCode, Briefcase, FileCode2, Award, Activity, X, Check } from 'lucide-react';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params promise with React.use()
  const { id } = React.use(params);
  const { currentUser, posts, updateProfile, addToast, connections, toggleConnection } = useStore();
  const [activeTab, setActiveTab] = useState<'activity' | 'projects' | 'badges'>('activity');
  const [showQR, setShowQR] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ bio: '', title: '', skills: '' });

  const user = MOCK_USERS.find(u => u.id === id);
  if (!user) {
    return <div className="text-center py-20 text-slate-500">User not found</div>;
  }

  const isOwner = currentUser?.id === user.id;
  const isConnected = connections.has(user.id);
  const userPosts = posts.filter(p => p.authorId === user.id && !p.hidden);
  const profileUrl = typeof window !== 'undefined' ? `${window.location.origin}/profile/${user.id}` : '';

  const startEdit = () => {
    if (!currentUser) return;
    setEditForm({ bio: currentUser.bio, title: currentUser.title, skills: currentUser.skills.join(', ') });
    setEditing(true);
  };

  const saveEdit = () => {
    updateProfile({
      bio: editForm.bio,
      title: editForm.title,
      skills: editForm.skills.split(',').map(s => s.trim()).filter(Boolean),
    });
    setEditing(false);
    addToast('Profile updated!', 'success');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(profileUrl);
    addToast('Profile link copied!', 'success');
  };

  const handlePDF = () => {
    addToast('PDF Resume exported!', 'success');
  };

  const tabItems = [
    { key: 'activity' as const, label: 'Activity', icon: Activity, count: userPosts.length },
    { key: 'projects' as const, label: 'Projects', icon: FileCode2, count: user.projects.length },
    { key: 'badges' as const, label: 'Badges', icon: Award, count: user.badges.length },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover & Avatar */}
      <div className="relative rounded-2xl overflow-hidden mb-4">
        <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
        <div className="absolute -bottom-12 left-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-slate-800 shadow-xl">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mt-2">
        <div className="flex items-start justify-between ml-32 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">{user.name}</h1>
              {user.openToWork && (
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1">
                  <Briefcase className="w-3 h-3" /> Open to Work
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{user.title}</p>
          </div>
          <div className="flex items-center gap-2">
            {isOwner ? (
              <>
                <button onClick={startEdit} className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-600 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={handlePDF} className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </>
            ) : (
              <button onClick={() => { toggleConnection(user.id); addToast(isConnected ? 'Unfollowed' : 'Connected!', 'success'); }} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${isConnected ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                {isConnected ? <><Check className="w-3.5 h-3.5" /> Following</> : 'Connect'}
              </button>
            )}
            <button onClick={handleShare} className="p-1.5 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button onClick={() => setShowQR(true)} className="p-1.5 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="ml-32 text-sm text-slate-600 dark:text-slate-400 mb-4">{user.bio}</div>

        <div className="ml-32 flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {user.location}</span>
          <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {user.company}</span>
          <span className="flex items-center gap-1"><Link2 className="w-3.5 h-3.5" /> {user.connections.toLocaleString()} connections</span>
        </div>

        <div className="ml-32 flex flex-wrap gap-2">
          {user.skills.map(skill => (
            <span key={skill} className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium">{skill}</span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 mt-4 overflow-hidden">
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          {tabItems.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label} <span className="text-xs text-slate-400">({tab.count})</span>
            </button>
          ))}
        </div>
        <div className="p-5">
          {activeTab === 'activity' && (
            <div className="space-y-4">
              {userPosts.length === 0 ? <p className="text-center text-slate-500 py-8">No posts yet</p> : userPosts.map(p => <PostCard key={p.id} post={p} />)}
            </div>
          )}
          {activeTab === 'projects' && (
            <div className="grid gap-4 md:grid-cols-2">
              {user.projects.length === 0 ? <p className="text-center text-slate-500 py-8 col-span-2">No projects yet</p> : user.projects.map(proj => (
                <div key={proj.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{proj.title}</h4>
                  <p className="text-sm text-slate-500 mb-3">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.tech.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">{t}</span>)}
                  </div>
                  <div className="flex gap-3 text-xs">
                    {proj.liveUrl !== '#' && <a href={proj.liveUrl} className="text-blue-600 hover:underline">🔗 Live</a>}
                    {proj.githubUrl !== '#' && <a href={proj.githubUrl} className="text-slate-500 hover:underline">📂 GitHub</a>}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'badges' && (
            <div className="grid gap-3 md:grid-cols-2">
              {user.badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${badge.color}`}>{badge.icon} {badge.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowQR(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Share Profile QR Code</h3>
              <button onClick={() => setShowQR(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <div className="bg-white p-4 rounded-xl flex items-center justify-center">
              <QRCodeSVG value={profileUrl || `https://devin.dev/profile/${user.id}`} size={200} />
            </div>
            <p className="text-center text-sm text-slate-500 mt-3">{user.name}&apos;s Profile</p>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setEditing(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Edit Profile</h3>
              <button onClick={() => setEditing(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio</label>
                <textarea value={editForm.bio} onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skills (comma-separated)</label>
                <input value={editForm.skills} onChange={e => setEditForm(f => ({ ...f, skills: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={saveEdit} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors">Save Changes</button>
                <button onClick={() => setEditing(false)} className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

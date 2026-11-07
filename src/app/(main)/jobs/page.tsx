'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { MOCK_USERS } from '@/lib/mock-data';
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, Send, X, CheckCircle, Eye, FileText, AlertCircle } from 'lucide-react';

export default function JobsPage() {
  const { jobs, appliedJobs, applyToJob, addToast } = useStore();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showApplied, setShowApplied] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', cover: '' });

  const filtered = jobs.filter(j => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q)) return false;
    }
    if (typeFilter !== 'all' && j.type !== typeFilter) return false;
    return true;
  });

  const job = selectedJob ? jobs.find(j => j.id === selectedJob) : null;
  const isApplied = (id: string) => appliedJobs.some(a => a.jobId === id);

  const handleApply = () => {
    if (!selectedJob) return;
    if (!applyForm.name.trim() || !applyForm.email.trim()) {
      addToast('Please fill in required fields', 'error');
      return;
    }
    applyToJob(selectedJob);
    addToast('Application submitted!', 'success');
    setSelectedJob(null);
    setApplyForm({ name: '', email: '', cover: '' });
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'reviewed': return <Eye className="w-4 h-4 text-blue-500" />;
      case 'interview': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Tech Jobs</h1>
          <p className="text-sm text-slate-500 mt-1">Find your dream role at top tech companies</p>
        </div>
        <button onClick={() => setShowApplied(!showApplied)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${showApplied ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
          <FileText className="w-4 h-4 inline mr-1.5" /> My Applications ({appliedJobs.length})
        </button>
      </div>

      {showApplied ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">My Applications</h3>
          </div>
          {appliedJobs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No applications yet</div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {appliedJobs.map(ap => {
                const j = jobs.find(x => x.id === ap.jobId);
                if (!j) return null;
                return (
                  <div key={ap.jobId} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg font-bold text-slate-600 dark:text-slate-300">{j.logo}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{j.title}</div>
                      <div className="text-xs text-slate-500">{j.company}</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm capitalize">
                      {statusIcon(ap.status)}
                      <span className="text-slate-600 dark:text-slate-400">{ap.status}</span>
                    </div>
                    <div className="text-xs text-slate-400">{new Date(ap.appliedAt).toLocaleDateString()}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..." className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none">
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filtered.map(j => (
              <div key={j.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-300 shrink-0">{j.logo}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">{j.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{j.company}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {j.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {j.type}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {j.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {j.tech.map(t => <span key={t} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded text-xs">{t}</span>)}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {isApplied(j.id) ? (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-medium"><CheckCircle className="w-4 h-4" /> Applied</span>
                    ) : (
                      <button onClick={() => setSelectedJob(j.id)} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors">Quick Apply</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Apply Modal */}
      {job && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setSelectedJob(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Apply to {job.title}</h3>
              <button onClick={() => setSelectedJob(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <p className="text-sm text-slate-500 mb-4">{job.company} · {job.location}</p>
            <div className="space-y-3">
              <input value={applyForm.name} onChange={e => setApplyForm(f => ({ ...f, name: e.target.value }))} placeholder="Full Name *" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              <input value={applyForm.email} onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))} placeholder="Email *" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea value={applyForm.cover} onChange={e => setApplyForm(f => ({ ...f, cover: e.target.value }))} placeholder="Cover note (optional)" rows={3} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <button onClick={handleApply} className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">
                <Send className="w-4 h-4" /> Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Sparkles, Upload, BarChart3, CheckCircle, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';

const METRICS = [
  { label: 'Code Quality', score: 92, color: 'bg-emerald-500' },
  { label: 'Project Completeness', score: 87, color: 'bg-blue-500' },
  { label: 'Documentation', score: 78, color: 'bg-amber-500' },
  { label: 'Design & UX', score: 95, color: 'bg-violet-500' },
  { label: 'Performance', score: 88, color: 'bg-cyan-500' },
  { label: 'Accessibility', score: 82, color: 'bg-pink-500' },
];

const FEEDBACK = [
  { type: 'success', title: 'Outstanding UI Architecture', desc: 'Component composition and design system implementation is production-grade.' },
  { type: 'warning', title: 'Add More Unit Tests', desc: 'Critical business logic paths need test coverage. Aim for 80%+ coverage.' },
  { type: 'tip', title: 'Implement Error Boundaries', desc: 'Add React error boundaries to prevent full page crashes from component failures.' },
  { type: 'success', title: 'Excellent TypeScript Usage', desc: 'Strict typing with proper interfaces and generics. Very clean.' },
  { type: 'warning', title: 'Missing Loading States', desc: 'Some async operations lack skeleton loaders or spinner feedback.' },
  { type: 'tip', title: 'Consider ISR for Blog', desc: 'Incremental Static Regeneration would improve article page TTFB significantly.' },
];

export default function AIReviewPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setDone(true); }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">AI Portfolio Reviewer</h1>
        <p className="text-slate-500 max-w-lg mx-auto">Get instant, AI-powered feedback on your portfolio, resume, and code quality. Powered by advanced analysis models.</p>
      </div>

      {!done ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
            <Upload className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Upload Your Portfolio</h3>
          <p className="text-sm text-slate-500 mb-6">Paste your GitHub URL or upload your resume for instant analysis</p>
          <div className="max-w-md mx-auto mb-6">
            <input placeholder="https://github.com/your-username" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500 mb-3" />
          </div>
          <button onClick={startAnalysis} disabled={analyzing} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-violet-500/25">
            {analyzing ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Start AI Review<ArrowRight className="w-4 h-4" /></>
            )}
          </button>
          {analyzing && (
            <div className="mt-6 space-y-2 text-sm text-slate-500">
              <div className="flex items-center justify-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" /> Scanning repository structure...</div>
              <div className="flex items-center justify-center gap-2"><div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse delay-100" /> Analyzing code patterns...</div>
              <div className="flex items-center justify-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-200" /> Generating recommendations...</div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-violet-600" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Analysis Results</h2>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-28 h-28 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">87</div>
                  <div className="text-xs text-slate-500">/ 100</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-600 mb-1">Excellent Portfolio</h3>
                <p className="text-sm text-slate-500">Your portfolio ranks in the top 15% of developer profiles analyzed. Strong technical depth with room for improvement in documentation.</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {METRICS.map(m => (
                <div key={m.label} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{m.label}</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{m.score}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} rounded-full transition-all duration-1000`} style={{ width: `${m.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Detailed Feedback</h2>
            <div className="space-y-3">
              {FEEDBACK.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  {f.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />}
                  {f.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />}
                  {f.type === 'tip' && <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />}
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{f.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => setDone(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Run Another Analysis</button>
          </div>
        </div>
      )}
    </div>
  );
}

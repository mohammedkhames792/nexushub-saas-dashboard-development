'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Image, Code2, Sparkles, Send } from 'lucide-react';

const AI_TEMPLATES = [
  '🚀 Pro Tip: When using Next.js App Router, always start with Server Components and only add "use client" where you need interactivity. This dramatically reduces your JavaScript bundle size.',
  '💡 Did you know? TypeScript 5.4 introduced `NoInfer<T>` — a utility type that prevents TypeScript from inferring generic types from certain positions. Perfect for API design!',
  '🔧 Quick Fix: If your React app feels slow, check for unnecessary re-renders. Wrap expensive computations in `useMemo` and component outputs in `React.memo`. Profile with React DevTools first!',
  '🎯 Architecture Pattern: The Compound Component pattern in React lets you build flexible APIs. Think `<Select><Option /></Select>` — each part manages shared state implicitly through context.',
];

export function CreatePost() {
  const { currentUser, addPost, addToast } = useStore();
  const [content, setContent] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [codeLang, setCodeLang] = useState('typescript');
  const [codeContent, setCodeContent] = useState('');

  if (!currentUser) return null;

  const handlePost = () => {
    if (!content.trim()) return;
    const post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      content: content.trim(),
      ...(showCode && codeContent.trim() ? { codeBlock: { language: codeLang, code: codeContent } } : {}),
      createdAt: new Date().toISOString(),
      reactions: { like: 0, celebrate: 0, support: 0, insightful: 0 },
      userReaction: null as string | null,
      comments: [],
      saved: false,
      hidden: false,
      reported: false,
    };
    addPost(post);
    setContent('');
    setCodeContent('');
    setShowCode(false);
    addToast('Post published!', 'success');
  };

  const handleAI = () => {
    const template = AI_TEMPLATES[Math.floor(Math.random() * AI_TEMPLATES.length)];
    setContent(template);
    addToast('AI assistant generated a post!', 'info');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
      <div className="flex gap-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shrink-0">
          {currentUser.name.charAt(0)}
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share a tech insight, ask a question, or start a discussion..."
            className="w-full resize-none bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 text-sm outline-none min-h-[60px]"
            rows={3}
          />

          {showCode && (
            <div className="mt-3 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <Code2 className="w-4 h-4 text-slate-500" />
                <select value={codeLang} onChange={e => setCodeLang(e.target.value)} className="text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600 px-2 py-0.5 outline-none">
                  <option value="typescript">TypeScript</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="rust">Rust</option>
                  <option value="go">Go</option>
                  <option value="swift">Swift</option>
                </select>
              </div>
              <textarea
                value={codeContent}
                onChange={e => setCodeContent(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full px-3 py-2 bg-[#1e1e1e] text-slate-200 font-mono text-xs resize-none outline-none min-h-[80px]"
                rows={5}
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors" title="Add image">
                <Image className="w-4 h-4" />
              </button>
              <button onClick={() => setShowCode(!showCode)} className={`p-2 rounded-lg transition-colors ${showCode ? 'bg-blue-50 dark:bg-blue-950 text-blue-600' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'}`} title="Add code">
                <Code2 className="w-4 h-4" />
              </button>
              <button onClick={handleAI} className="p-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 rounded-lg text-violet-500 transition-colors" title="AI Assistant">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handlePost}
              disabled={!content.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

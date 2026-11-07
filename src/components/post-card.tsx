'use client';

import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { MOCK_USERS } from '@/lib/mock-data';
import type { Post, ReactionType } from '@/lib/types';
import { CodeBlock } from './code-block';
import { Heart, ThumbsUp, PartyPopper, Dumbbell, Lightbulb, MessageSquare, Share2, Bookmark, BookmarkCheck, MoreHorizontal, Link2, EyeOff, Flag, Pencil, Trash2, Send } from 'lucide-react';
import Link from 'next/link';

const REACTION_CONFIG: { key: ReactionType; icon: React.ReactNode; label: string }[] = [
  { key: 'like', icon: <ThumbsUp className="w-4 h-4" />, label: 'Like' },
  { key: 'celebrate', icon: <PartyPopper className="w-4 h-4" />, label: 'Celebrate' },
  { key: 'support', icon: <Dumbbell className="w-4 h-4" />, label: 'Support' },
  { key: 'insightful', icon: <Lightbulb className="w-4 h-4" />, label: 'Insightful' },
];

const REACTION_EMOJI: Record<ReactionType, string> = { like: '👍', celebrate: '🎉', support: '💪', insightful: '💡' };

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { currentUser, toggleReaction, toggleSave, hidePost, reportPost, updatePost, deletePost, addComment, addToast } = useStore();
  const [showReactions, setShowReactions] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const optionsRef = useRef<HTMLDivElement>(null);
  const reactionsRef = useRef<HTMLDivElement>(null);

  const author = MOCK_USERS.find(u => u.id === post.authorId);
  const isOwner = currentUser?.id === post.authorId;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) setShowOptions(false);
      if (reactionsRef.current && !reactionsRef.current.contains(e.target as Node)) setShowReactions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (post.hidden) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    addToast('Link copied to clipboard!', 'success');
  };

  const handleEditSave = () => {
    updatePost(post.id, { content: editContent });
    setEditing(false);
    addToast('Post updated successfully', 'success');
  };

  const handleDelete = () => {
    deletePost(post.id);
    addToast('Post deleted', 'info');
  };

  const handleComment = () => {
    if (!commentText.trim() || !currentUser) return;
    addComment(post.id, {
      id: `c-${Date.now()}`,
      authorId: currentUser.id,
      content: commentText.trim(),
      createdAt: new Date().toISOString(),
    });
    setCommentText('');
  };

  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processed = processed.replace(/•/g, '<span class="text-blue-500">•</span>');
      return <p key={i} className={line.trim() === '' ? 'h-2' : ''} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 transition-all hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <Link href={`/profile/${post.authorId}`} className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
            {author?.name.charAt(0) ?? '?'}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">{author?.name ?? 'Unknown'}</div>
            <div className="text-xs text-slate-500">{author?.title} · {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </div>
        </Link>
        <div className="relative" ref={optionsRef}>
          <button onClick={() => setShowOptions(!showOptions)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {showOptions && (
            <div className="absolute right-0 top-8 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-10">
              <button onClick={() => { handleShare(); setShowOptions(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                <Link2 className="w-4 h-4" /> Copy link
              </button>
              <button onClick={() => { hidePost(post.id); setShowOptions(false); addToast('Post hidden', 'info'); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                <EyeOff className="w-4 h-4" /> Hide post
              </button>
              <button onClick={() => { reportPost(post.id); setShowOptions(false); addToast('Post reported', 'info'); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
                <Flag className="w-4 h-4" /> Report
              </button>
              {isOwner && (
                <>
                  <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                  <button onClick={() => { setEditing(true); setEditContent(post.content); setShowOptions(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                    <Pencil className="w-4 h-4" /> Edit post
                  </button>
                  <button onClick={() => { handleDelete(); setShowOptions(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
                    <Trash2 className="w-4 h-4" /> Delete post
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {editing ? (
        <div className="mb-4">
          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]" />
          <div className="flex gap-2 mt-2">
            <button onClick={handleEditSave} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Save</button>
            <button onClick={() => setEditing(false)} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="mb-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-0.5">
          {renderContent(post.content)}
        </div>
      )}

      {/* Code Block */}
      {post.codeBlock && !editing && <CodeBlock language={post.codeBlock.language} code={post.codeBlock.code} />}

      {/* Reactions Summary */}
      {totalReactions > 0 && (
        <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
          <div className="flex -space-x-1">
            {(Object.entries(post.reactions) as [ReactionType, number][]).filter(([, v]) => v > 0).map(([key]) => (
              <span key={key} className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs">{REACTION_EMOJI[key]}</span>
            ))}
          </div>
          <span>{totalReactions}</span>
          {post.comments.length > 0 && <span className="ml-auto">{post.comments.length} comment{post.comments.length > 1 ? 's' : ''}</span>}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 -mx-1">
        <div className="relative" ref={reactionsRef}>
          <button
            onMouseEnter={() => setShowReactions(true)}
            onClick={() => toggleReaction(post.id, 'like')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${post.userReaction ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
          >
            {post.userReaction ? <span className="text-base">{REACTION_EMOJI[post.userReaction as ReactionType]}</span> : <Heart className="w-4 h-4" />}
            <span>{post.userReaction ? REACTION_CONFIG.find(r => r.key === post.userReaction)?.label : 'React'}</span>
          </button>
          {showReactions && (
            <div className="absolute left-0 bottom-10 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-1.5 flex gap-1 z-10">
              {REACTION_CONFIG.map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => { toggleReaction(post.id, key); setShowReactions(false); }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${post.userReaction === key ? 'bg-blue-50 dark:bg-blue-950 text-blue-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <MessageSquare className="w-4 h-4" /> Comment
        </button>
        <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <Share2 className="w-4 h-4" /> Share
        </button>
        <button onClick={() => { toggleSave(post.id); addToast(post.saved ? 'Post unsaved' : 'Post saved!', 'success'); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${post.saved ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
          {post.saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />} Save
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
          {post.comments.map(comment => {
            const cAuthor = MOCK_USERS.find(u => u.id === comment.authorId);
            return (
              <div key={comment.id} className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {cAuthor?.name.charAt(0) ?? '?'}
                </div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{cAuthor?.name ?? 'Unknown'}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{comment.content}</div>
                </div>
              </div>
            );
          })}
          {currentUser && (
            <div className="flex gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleComment()}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleComment} disabled={!commentText.trim()} className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-white transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

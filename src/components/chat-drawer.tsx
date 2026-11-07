'use client';

import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { MOCK_USERS } from '@/lib/mock-data';
import { X, Send, MessageCircle, Minus } from 'lucide-react';

export function ChatDrawer() {
  const { chatOpen, setChatOpen, chatContacts, activeChatUser, setActiveChatUser, currentUser, sendMessage, addToast } = useStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contacts = MOCK_USERS.filter(u => u.id !== currentUser?.id);
  const activeUser = MOCK_USERS.find(u => u.id === activeChatUser);
  const activeChat = chatContacts.find(c => c.userId === activeChatUser);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages.length]);

  if (!chatOpen) return null;

  const handleSend = () => {
    if (!input.trim() || !activeChatUser) return;
    sendMessage(activeChatUser, input.trim());
    addToast('Message sent', 'success');
    setInput('');
  };

  return (
    <div className="chat-drawer fixed right-0 top-0 bottom-0 w-96 z-40 flex flex-col bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">Messages</span>
        </div>
        <button onClick={() => setChatOpen(false)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <Minus className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {activeChatUser && activeUser ? (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-700">
            <button onClick={() => setActiveChatUser(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm">← Back</button>
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                {activeUser.name.charAt(0)}
              </div>
              {activeUser.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{activeUser.name}</div>
              <div className="text-xs text-slate-500">{activeUser.online ? '● Online' : '○ Offline'}</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {(!activeChat || activeChat.messages.length === 0) && (
              <div className="text-center text-sm text-slate-400 mt-8">No messages yet. Say hello! 👋</div>
            )}
            {activeChat?.messages.map(msg => {
              const isMine = msg.senderId === currentUser?.id;
              return (
                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${isMine ? 'bg-blue-600 text-white rounded-br-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-md'}`}>
                    {msg.content}
                    <div className={`text-[10px] mt-1 ${isMine ? 'text-blue-200' : 'text-slate-400'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSend} disabled={!input.trim()} className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {contacts.map(user => {
            const chat = chatContacts.find(c => c.userId === user.id);
            const lastMsg = chat?.messages[chat.messages.length - 1];
            return (
              <button
                key={user.id}
                onClick={() => setActiveChatUser(user.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  {user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{user.name}</div>
                  <div className="text-xs text-slate-500 truncate">{lastMsg ? lastMsg.content : 'Start a conversation'}</div>
                </div>
                {user.online && <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

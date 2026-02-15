
import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

interface ConnectionsProps {
  user: User;
}

const Connections: React.FC<ConnectionsProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState<User | null>(null);

  const toggleRequest = (userId: string) => {
    if (pendingRequests.includes(userId)) {
      setPendingRequests(pendingRequests.filter(id => id !== userId));
    } else {
      setPendingRequests([...pendingRequests, userId]);
    }
  };

  const filteredUsers = MOCK_USERS.filter(u => 
    u.id !== user.id && 
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">Network</h1>
          <p className="text-slate-500">Find students with complementary skills to exchange knowledge.</p>
        </div>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search by name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 ring-primary-500 outline-none transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUsers.map(u => (
          <div key={u.id} className="glass-card p-8 rounded-3xl group hover:border-primary-500 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <img src={u.avatar} className="w-24 h-24 rounded-3xl border-4 border-white dark:border-slate-800 shadow-xl" alt={u.name} />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
              </div>
              <h3 className="text-xl font-black">{u.name}</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">{u.profession || 'Student'}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {u.skills.map((s, idx) => (
                  <span key={idx} className="text-[10px] font-black uppercase tracking-widest bg-primary-500/10 text-primary-600 px-3 py-1.5 rounded-xl">
                    {s}
                  </span>
                ))}
              </div>

              <div className="w-full space-y-3">
                <button 
                  onClick={() => toggleRequest(u.id)}
                  className={`w-full py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                    pendingRequests.includes(u.id)
                    ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20'
                  }`}
                >
                  {pendingRequests.includes(u.id) ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      Request Sent
                    </>
                  ) : 'Send Exchange Request'}
                </button>
                <button 
                  onClick={() => setActiveChat(u as any)}
                  className="w-full py-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Basic Chat Overlay */}
      {activeChat && (
        <div className="fixed bottom-6 right-6 w-80 h-[450px] glass-card shadow-2xl rounded-3xl z-[100] flex flex-col animate-in slide-in-from-bottom-8">
          <div className="p-4 bg-primary-600 text-white rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={activeChat.avatar} className="w-8 h-8 rounded-xl border border-white/20" alt="" />
              <span className="font-bold text-sm">{activeChat.name}</span>
            </div>
            <button onClick={() => setActiveChat(null)} className="hover:bg-white/10 p-1 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-grow p-4 flex flex-col items-center justify-center text-center opacity-40">
            <p className="text-xs">Chat will be enabled once your request is accepted!</p>
          </div>
          <div className="p-4 border-t dark:border-slate-800">
            <input disabled type="text" placeholder="Type a message..." className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-sm outline-none cursor-not-allowed opacity-50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;


import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { gemini } from '../services/geminiService';

interface LandingPageProps {
  user: User | null;
  onLogin: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ user, onLogin }) => {
  const [trends, setTrends] = useState({ demand: 'Loading skills...', jobs: 'Loading jobs...' });

  useEffect(() => {
    gemini.getMarketTrends().then(setTrends);
  }, []);

  return (
    <div className="flex flex-col animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-32 text-center bg-gradient-to-b from-primary-50/50 to-white dark:from-slate-900/50 dark:to-slate-900 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            BEYOND THE SURFACE—<br/>
            <span className="text-primary-600 dark:text-primary-400">EXPLORE YOUR INNER WORLD.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            SkillXchange is the peer-to-peer ecosystem where students mentor each other. Exchange skills, get AI-powered roadmaps, and land your first internship through a community that understands you.
          </p>
          {!user && (
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/30">
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                See How It Works
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Demand Grid */}
      <section className="px-6 py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="glass-card p-10 rounded-3xl border border-primary-100 dark:border-slate-800 hover:shadow-2xl transition-all group">
            <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-black mb-4 group-hover:text-primary-500 transition-colors">Skills In Demand</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {trends.demand}
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl border border-blue-100 dark:border-slate-800 hover:shadow-2xl transition-all group">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-2xl font-black mb-4 group-hover:text-blue-500 transition-colors">Job Trends</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {trends.jobs}
            </p>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="px-6 py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-black uppercase tracking-widest text-primary-500">The SkillXchange Way</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-16">Everything you need to grow.</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              { title: "Smart Roadmaps", desc: "AI-generated study plans that fit your timeline.", icon: "📚" },
              { title: "Peer Matching", desc: "Find students with the exact skills you want to learn.", icon: "🤝" },
              { title: "Mentor Chat", desc: "Our empathetic AI bot helps keep you motivated.", icon: "🤖" },
              { title: "Resume Review", desc: "Get real-time feedback on your portfolio.", icon: "📑" },
              { title: "Real Job Leads", desc: "Curated internships with clear hiring processes.", icon: "💼" },
              { title: "Experience Sharing", desc: "Learn from the journeys of senior students.", icon: "✨" },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:-translate-y-1 transition-all">
                <span className="text-4xl block mb-4">{f.icon}</span>
                <h4 className="text-lg font-bold mb-2">{f.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

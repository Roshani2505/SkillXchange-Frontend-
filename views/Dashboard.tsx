
import React, { useState } from 'react';
import { User, RoadmapResponse, JobOpportunity, ChatMessage } from '../types';
import { gemini } from '../services/geminiService';
import { MOCK_JOBS } from '../constants';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'learning' | 'jobs' | 'bot'>('learning');
  
  // Roadmap state
  const [skillInput, setSkillInput] = useState('');
  const [levelInput, setLevelInput] = useState('Intermediate');
  const [durationInput, setDurationInput] = useState('3 months');
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(false);

  // Bot state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateRoadmap = async () => {
    if (!skillInput) return;
    setIsLoadingRoadmap(true);
    const result = await gemini.generateRoadmap(skillInput, levelInput, durationInput);
    setRoadmap(result);
    setIsLoadingRoadmap(false);
  };

  const handleSendMessage = async () => {
    if (!chatInput) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: chatInput, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    const aiResponse = await gemini.getMentorChatResponse(chatInput, user);
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponse, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-2">My Dashboard</h1>
        <p className="text-slate-500">Welcome back, {user.name.split(' ')[0]}! Here's your growth summary.</p>
      </div>

      <div className="flex gap-2 mb-8 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit">
        {[
          { id: 'learning', label: 'My Learning', icon: '🎓' },
          { id: 'jobs', label: 'Recommended Jobs', icon: '💼' },
          { id: 'bot', label: 'My Bot', icon: '🤖' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === tab.id 
              ? 'bg-white dark:bg-slate-700 shadow-md text-primary-600 dark:text-primary-400' 
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'learning' && (
          <div className="grid lg:grid-cols-[400px_1fr] gap-12">
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-6">New Roadmap</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2 opacity-60">I want to learn...</label>
                    <input 
                      type="text" 
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-primary-500 outline-none"
                      placeholder="e.g. DSA with Java, React.js"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-2 opacity-60">Level</label>
                      <select 
                        value={levelInput}
                        onChange={(e) => setLevelInput(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm outline-none"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Expert</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-2 opacity-60">Time Period</label>
                      <select 
                        value={durationInput}
                        onChange={(e) => setDurationInput(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm outline-none"
                      >
                        <option>1 month</option>
                        <option>3 months</option>
                        <option>6 months</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={generateRoadmap}
                    disabled={isLoadingRoadmap || !skillInput}
                    className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold mt-4 hover:bg-primary-700 transition-all disabled:opacity-50"
                  >
                    {isLoadingRoadmap ? 'AI is Thinking...' : 'Generate AI Roadmap'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {!roadmap ? (
                <div className="h-full border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                  <span className="text-6xl mb-6">🗺️</span>
                  <h4 className="text-xl font-bold text-slate-300">Your Learning Path Awaits</h4>
                  <p className="max-w-xs mt-2">Generate a roadmap to see a detailed week-by-week guide generated just for you.</p>
                </div>
              ) : (
                <div className="animate-in slide-in-from-right-8 duration-500">
                  <div className="bg-primary-600 text-white p-8 rounded-t-3xl">
                    <h2 className="text-3xl font-black">{roadmap.skill}</h2>
                    <p className="opacity-80 mt-1">{roadmap.level} Level • {roadmap.duration}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-b-3xl space-y-8 shadow-xl">
                    {roadmap.steps.map((step, idx) => (
                      <div key={idx} className="relative pl-12">
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 flex items-center justify-center font-bold text-sm">
                          {step.week}
                        </div>
                        {idx !== roadmap.steps.length - 1 && (
                          <div className="absolute left-4 top-10 w-0.5 h-[calc(100%+2rem)] bg-slate-100 dark:bg-slate-700"></div>
                        )}
                        <h4 className="font-bold text-lg mb-2">{step.topic}</h4>
                        <p className="text-slate-500 text-sm mb-4 leading-relaxed">{step.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.resources.map((res, rIdx) => (
                            <span key={rIdx} className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-400">
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-12">
            <div className="bg-blue-600 text-white p-12 rounded-3xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl font-black mb-4">Job Match Analysis</h2>
                <p className="text-lg opacity-90">Based on your skills in React and Python, we've identified 12 high-compatibility roles currently hiring.</p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_JOBS.map(job => (
                <div key={job.id} className="glass-card p-8 rounded-3xl hover:border-primary-500 transition-colors group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-xl font-bold group-hover:text-primary-500 transition-colors">{job.role}</h4>
                      <p className="text-slate-500 font-medium">{job.company} • {job.location}</p>
                    </div>
                    <span className="bg-primary-500/10 text-primary-600 px-3 py-1 rounded-full text-xs font-bold">{job.package}</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <h5 className="text-[10px] font-black uppercase text-slate-400 mb-2">Hiring Process</h5>
                      <p className="text-sm">{job.process}</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black uppercase text-slate-400 mb-2">Requirements</h5>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-bold">{req}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-grow py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">Apply Now</button>
                    <button className="px-4 py-3 border dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bot' && (
          <div className="max-w-4xl mx-auto h-[600px] flex flex-col glass-card rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b dark:border-slate-800 flex items-center gap-4 bg-slate-50 dark:bg-slate-900">
              <div className="w-10 h-10 bg-primary-500 rounded-2xl flex items-center justify-center text-white text-xl">🤖</div>
              <div>
                <h4 className="font-bold">SkillX Mentor</h4>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online & Empathetic</p>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                  <div className="text-4xl mb-4">✨</div>
                  <p>"I'm here to help you stay motivated. Tell me about your goals or how you're feeling today."</p>
                </div>
              )}
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-none' 
                    : 'bg-slate-100 dark:bg-slate-800 rounded-tl-none text-slate-700 dark:text-slate-300'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white dark:bg-slate-950 border-t dark:border-slate-800">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-grow bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-primary-500 outline-none"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

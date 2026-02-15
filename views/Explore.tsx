
import React, { useState } from 'react';
import { User } from '../types';
import { gemini } from '../services/geminiService';
import { EXPLORE_SLIDES, WHY_SLIDES } from '../constants';

interface ExploreProps {
  user: User;
}

const Explore: React.FC<ExploreProps> = ({ user }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [toolResult, setToolResult] = useState('');
  const [isToolLoading, setIsToolLoading] = useState(false);
  const [resumeText, setResumeText] = useState('');

  const handleToolAction = async (id: string) => {
    if (id === 'resume') {
      if (!resumeText) return;
      setIsToolLoading(true);
      const feedback = await gemini.getResumeFeedback(resumeText);
      setToolResult(feedback);
      setIsToolLoading(false);
    } else {
      setToolResult("This tool feature is currently in beta. Stay tuned!");
    }
  };

  const currentSlide = EXPLORE_SLIDES[activeSlide];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
      {/* Tool Carousel Section */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest text-primary-500 mb-4">Growth Tools</h2>
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
          <div className="glass-card p-12 rounded-[40px] shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-8 flex gap-2">
              {EXPLORE_SLIDES.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => { setActiveSlide(i); setToolResult(''); }}
                  className={`w-12 h-1 rounded-full transition-all ${activeSlide === i ? 'bg-primary-500 w-24' : 'bg-slate-200 dark:bg-slate-800'}`}
                />
              ))}
            </div>
            
            <div key={activeSlide} className="animate-in fade-in slide-in-from-right-12 duration-500">
              <h3 className="text-4xl font-black mb-6">{currentSlide.title}</h3>
              <p className="text-xl text-slate-500 mb-12 max-w-lg">{currentSlide.description}</p>
              
              <div className="space-y-6">
                {currentSlide.id === 'resume' && (
                  <textarea 
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume content here for AI analysis..."
                    className="w-full h-40 bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 text-sm outline-none focus:ring-2 ring-primary-500"
                  />
                )}
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleToolAction(currentSlide.id)}
                    disabled={isToolLoading}
                    className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/30 disabled:opacity-50"
                  >
                    {isToolLoading ? 'Analysing...' : currentSlide.id === 'resume' ? 'Analyze Resume' : 'Try Now'}
                  </button>
                  <button 
                    onClick={() => setActiveSlide((activeSlide + 1) % EXPLORE_SLIDES.length)}
                    className="px-8 py-4 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Next Tool
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full">
            {toolResult ? (
              <div className="h-full bg-slate-900 text-slate-100 p-8 rounded-[40px] shadow-inner overflow-y-auto animate-in zoom-in-95">
                <h4 className="font-bold text-primary-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  AI Insights
                </h4>
                <div className="text-sm leading-relaxed whitespace-pre-wrap opacity-90">{toolResult}</div>
              </div>
            ) : (
              <div className="h-full border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px] flex flex-col items-center justify-center p-12 text-center text-slate-400">
                <div className="text-6xl mb-6 opacity-20">📊</div>
                <p className="text-sm font-medium">Use a tool on the left to see generated insights here.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why SkillXchange Carousel */}
      <section className="bg-slate-50 dark:bg-slate-900 -mx-6 px-6 py-24 rounded-[60px]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black">Why choose SkillXchange?</h2>
          <p className="text-slate-500 mt-4">Bridging the gap between theory and industry for thousands of students.</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
          {WHY_SLIDES.map((slide, i) => (
            <div key={i} className="flex-shrink-0 w-80 glass-card p-10 rounded-3xl snap-center hover:bg-primary-600 hover:text-white transition-all group duration-500">
              <span className="text-4xl block mb-8">0{i + 1}</span>
              <h4 className="text-xl font-black mb-4 group-hover:text-white">{slide.title}</h4>
              <p className="text-sm opacity-70 group-hover:opacity-100 leading-relaxed">{slide.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;

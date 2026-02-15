
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t dark:border-slate-900 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-primary-600">SkillXchange</span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500">Learn. Share. Grow.</span>
          </div>
          <p className="text-sm text-slate-500">
            A student-first platform designed to bridge the gap between curiosity and expertise through peer-to-peer mentorship.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm">Company</h4>
            <ul className="text-sm text-slate-500 flex flex-col gap-2">
              <li><a href="#" className="hover:text-primary-500">About Us</a></li>
              <li><a href="#" className="hover:text-primary-500">Careers</a></li>
              <li><a href="#" className="hover:text-primary-500">Contact</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm">Community</h4>
            <ul className="text-sm text-slate-500 flex flex-col gap-2">
              <li><a href="#" className="hover:text-primary-500">Roadmaps</a></li>
              <li><a href="#" className="hover:text-primary-500">Mentors</a></li>
              <li><a href="#" className="hover:text-primary-500">Events</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="#" className="text-slate-400 hover:text-primary-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
              <a href="#" className="text-slate-400 hover:text-primary-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18H6.984V10h10.032v8zM12 9c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/></svg></a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t dark:border-slate-900 text-center text-xs text-slate-500">
        © 2026 SkillXchange. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

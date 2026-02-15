
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onLogin: (user: User) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onLogin, isDarkMode, toggleTheme }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 glass-card z-50 px-6 flex items-center justify-between border-b dark:border-slate-800">
        <Link to="/" className="flex flex-col items-start leading-none group">
          <span className="text-xl font-black text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform">SkillXchange</span>
          <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500">Learn. Share. Grow.</span>
        </Link>

        <div className="flex items-center gap-4 lg:gap-8">
          {user && (
            <div className="hidden md:flex items-center gap-6 font-medium text-sm">
              <Link to="/dashboard" className="hover:text-primary-500 transition-colors">My Dashboard</Link>
              <Link to="/connections" className="hover:text-primary-500 transition-colors">Connections</Link>
              <Link to="/explore" className="hover:text-primary-500 transition-colors">Explore</Link>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full border dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <span className="hidden sm:inline text-xs font-semibold">{user.name}</span>
                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} className="w-8 h-8 rounded-full border border-primary-500" alt="Avatar" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b dark:border-slate-800">
                      <p className="text-xs font-bold truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-primary-50 dark:hover:bg-slate-800"
                    >
                      My Profile
                    </Link>
                    <button 
                      onClick={() => { onLogout(); navigate('/'); setIsProfileMenuOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-1.5 text-sm font-semibold hover:text-primary-500 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-4 py-1.5 text-sm font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={onLogin} />}
      {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} onLogin={onLogin} />}
    </>
  );
};

export default Navbar;

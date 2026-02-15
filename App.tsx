
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { User } from './types';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import Connections from './views/Connections';
import Explore from './views/Explore';
import Profile from './views/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (mockUser: User) => {
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans selection:bg-primary-500 selection:text-white">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          onLogin={handleLogin} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
        />
        
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<LandingPage user={user} onLogin={handleLogin} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
            <Route path="/connections" element={user ? <Connections user={user} /> : <Navigate to="/" />} />
            <Route path="/explore" element={user ? <Explore user={user} /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile user={user} onUpdate={setUser} /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;


import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES } from '../constants';

interface HeaderProps {
    onOpenHistory?: () => void;
    onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenHistory, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <button onClick={() => handleNavClick('/')} className="flex items-center group">
              <span className="text-lg md:text-xl font-black text-textPrimary-light dark:text-textPrimary-dark tracking-tighter uppercase italic">FIXUNO<span className="text-primary">.</span></span>
            </button>

            <div className="flex items-center space-x-2 md:space-x-6">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-textPrimary-light dark:text-textPrimary-dark hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/5 dark:border-white/5"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center space-x-8">
                {['Services', 'Reviews', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => handleNavClick(`/${item.toLowerCase()}`)}
                    className="text-[10px] font-bold text-textSecondary-light dark:text-textSecondary-dark hover:text-textPrimary-light dark:hover:text-textPrimary-dark uppercase tracking-[0.2em] transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-2"></div>
                <button 
                  onClick={onOpenHistory}
                  className="text-[10px] font-bold text-primary hover:text-primary/80 uppercase tracking-[0.2em] transition-colors"
                >
                  My Bookings
                </button>
              </nav>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden text-textPrimary-light dark:text-textPrimary-dark p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
                 </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Compact Mobile Menu Dropdown */}
        <div className={`absolute top-full left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
            {['Services', 'Reviews', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => handleNavClick(`/${item.toLowerCase()}`)}
                className="text-sm font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-widest text-left hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => { onOpenHistory?.(); setIsMobileMenuOpen(false); }}
              className="text-sm font-black text-primary uppercase tracking-widest text-left"
            >
              My Bookings
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default React.memo(Header);

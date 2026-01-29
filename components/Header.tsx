
import React, { useState, useEffect, useRef } from 'react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
);

interface HeaderProps {
    onOpenHistory?: () => void;
    onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenHistory, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsSocialsOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-surface/80 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNavigate('/')} className="flex items-center group cursor-pointer bg-transparent border-none">
             <div className="relative text-primary group-hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
            <span className="ml-3 text-2xl font-bold text-textPrimary tracking-wider uppercase">FIXUNO</span>
          </button>
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => onNavigate('/service')} className="text-textSecondary hover:text-primary transition-colors duration-200 text-sm font-medium">Services</button>
            <button onClick={() => onNavigate('/contact-us')} className="text-textSecondary hover:text-primary transition-colors duration-200 text-sm font-medium">Contact Us</button>
            <button onClick={onOpenHistory} className="text-textSecondary hover:text-primary transition-colors duration-200 text-sm font-medium">My Bookings</button>
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsSocialsOpen(!isSocialsOpen)}
                    className="flex items-center text-textSecondary hover:text-primary transition-colors duration-200 animate-subtle-glow px-3 py-1 text-sm font-medium"
                >
                    Follow Us
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform duration-200 ${isSocialsOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {isSocialsOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg py-1 z-50 animate-fade-in border border-slate-700">
                        <a href="https://www.instagram.com/fixunmultiservice/" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 text-textSecondary hover:bg-background hover:text-primary transition-colors">
                            <InstagramIcon className="w-5 h-5 mr-3" />
                            Instagram
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 text-textSecondary hover:bg-background hover:text-primary transition-colors">
                            <FacebookIcon className="w-5 h-5 mr-3" />
                            Facebook
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 text-textSecondary hover:bg-background hover:text-primary transition-colors">
                            <YouTubeIcon className="w-5 h-5 mr-3" />
                            YouTube
                        </a>
                    </div>
                )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

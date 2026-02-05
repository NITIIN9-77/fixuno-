
import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES } from '../constants';

interface HeaderProps {
    onOpenHistory?: () => void;
    onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenHistory, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return SERVICES.flatMap(s => 
        s.subServices
            .filter(sub => sub.name.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
            .map(sub => ({ ...sub, parentName: s.name, parentId: s.id }))
    ).slice(0, 5);
  }, [searchQuery]);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setSearchQuery('');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-surface shadow-2xl backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <button onClick={() => handleNavClick('/')} className="flex items-center group z-50">
             <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2.5" />
                </svg>
             </div>
            <span className="ml-2 text-xl font-black text-textPrimary tracking-widest uppercase">FIXUNO</span>
          </button>

          {/* Global Search (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 mx-8 max-w-md relative">
            <div className={`flex items-center w-full bg-slate-800/50 border ${isSearchActive ? 'border-primary ring-2 ring-primary/20' : 'border-slate-700'} rounded-full px-5 transition-all`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-textSecondary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input 
                    type="text" 
                    placeholder="Search repairs..." 
                    className="bg-transparent border-none text-sm text-textPrimary py-3 w-full focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchActive(true)}
                    onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
                />
            </div>
            {isSearchActive && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-surface border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-slide-in-up">
                    {searchResults.map((res) => (
                        <button 
                            key={res.id}
                            onClick={() => handleNavClick(`/${res.parentId}`)}
                            className="w-full text-left px-6 py-4 hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-0"
                        >
                            <p className="text-sm font-bold text-textPrimary">{res.name}</p>
                            <p className="text-[10px] text-textSecondary uppercase tracking-tighter mt-1">{res.parentName}</p>
                        </button>
                    ))}
                </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                <button className="flex items-center text-sm font-black text-textSecondary hover:text-primary transition-colors py-4 uppercase tracking-[0.2em]">
                    Services
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {isServicesOpen && (
                    <div className="absolute right-0 top-full w-[450px] bg-surface rounded-2xl shadow-2xl p-8 border border-slate-700 grid grid-cols-2 gap-8 animate-fade-in">
                        <div>
                            <h4 className="text-[10px] font-black text-primary uppercase mb-4 tracking-widest border-b border-slate-800 pb-2">Repairs</h4>
                            <div className="space-y-2">
                                {SERVICES.slice(0, 4).map(s => (
                                    <button key={s.id} onClick={() => handleNavClick(`/${s.id}`)} className="block text-sm text-textSecondary hover:text-textPrimary transition-colors text-left w-full">{s.name}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-primary uppercase mb-4 tracking-widest border-b border-slate-800 pb-2">Home Care</h4>
                            <div className="space-y-2">
                                {SERVICES.slice(4).map(s => (
                                    <button key={s.id} onClick={() => handleNavClick(`/${s.id}`)} className="block text-sm text-textSecondary hover:text-textPrimary transition-colors text-left w-full">{s.name}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <button onClick={() => handleNavClick('/reviews')} className="text-sm font-black text-textSecondary hover:text-primary transition-colors uppercase tracking-[0.2em]">Reviews</button>
            <button onClick={() => handleNavClick('/contact-us')} className="text-sm font-black text-textSecondary hover:text-primary transition-colors uppercase tracking-[0.2em]">Contact</button>
            <button onClick={onOpenHistory} className="bg-primary/10 text-primary border border-primary/30 px-6 py-2.5 rounded-full text-xs font-black hover:bg-primary hover:text-white transition-all">MY BOOKINGS</button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-textSecondary z-50">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
             </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Fixed overlapping issue) */}
      <div className={`fixed inset-0 bg-background/98 backdrop-blur-xl z-40 lg:hidden transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-28 px-8 space-y-6 overflow-y-auto pb-12">
            {/* Mobile Search */}
            <div className="relative mb-4">
                <input 
                    type="text" 
                    placeholder="Search services..." 
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-textPrimary focus:outline-none focus:border-primary shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Links */}
            <button onClick={() => handleNavClick('/')} className="text-4xl font-black text-textPrimary text-left border-b border-slate-800 pb-5 uppercase tracking-tighter">HOME</button>
            <button onClick={() => handleNavClick('/service')} className="text-4xl font-black text-textPrimary text-left border-b border-slate-800 pb-5 uppercase tracking-tighter">SERVICES</button>
            <button onClick={() => handleNavClick('/reviews')} className="text-4xl font-black text-textPrimary text-left border-b border-slate-800 pb-5 uppercase tracking-tighter">REVIEWS</button>
            <button onClick={() => handleNavClick('/contact-us')} className="text-4xl font-black text-textPrimary text-left border-b border-slate-800 pb-5 uppercase tracking-tighter">CONTACT</button>
            <button onClick={() => { onOpenHistory?.(); setIsMobileMenuOpen(false); }} className="text-2xl font-black text-primary text-left py-2">MY BOOKINGS</button>
            
            <div className="pt-8">
                <h4 className="text-[10px] font-black text-textSecondary uppercase tracking-[0.3em] mb-6">Popular Repairs</h4>
                <div className="grid grid-cols-1 gap-4">
                    {SERVICES.slice(0, 5).map(s => (
                        <button key={s.id} onClick={() => handleNavClick(`/${s.id}`)} className="text-lg font-bold text-textPrimary bg-surface p-5 rounded-xl border border-slate-800 text-left flex justify-between items-center group">
                            {s.name}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

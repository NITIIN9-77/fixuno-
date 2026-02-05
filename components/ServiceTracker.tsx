
import React, { useState, useEffect } from 'react';

const ServiceTracker: React.FC = () => {
  const [stats, setStats] = useState({
    active: 14,
    completedToday: 1282,
    rating: 4.9
  });

  useEffect(() => {
    const interval = setInterval(() => {
        setStats(prev => ({
            ...prev,
            completedToday: prev.completedToday + (Math.random() > 0.7 ? 1 : 0),
            active: Math.max(8, prev.active + (Math.random() > 0.5 ? 1 : -1))
        }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface/50 border-y border-slate-800 py-6 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 text-center md:text-left">
            <div className="flex items-center space-x-4 animate-fade-in">
                <div className="relative">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
                </div>
                <div>
                    <p className="text-2xl font-black text-textPrimary tracking-tighter">{stats.active}</p>
                    <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold">Technicians Live</p>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                    <p className="text-2xl font-black text-textPrimary tracking-tighter">{stats.completedToday.toLocaleString()}+</p>
                    <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold">Jobs Accomplished</p>
                </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
                <div>
                    <p className="text-2xl font-black text-textPrimary tracking-tighter">{stats.rating}</p>
                    <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold">Satisfaction Score</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTracker;

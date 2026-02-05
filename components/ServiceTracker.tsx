
import React, { useState, useEffect } from 'react';

const ServiceTracker: React.FC = () => {
  // Use localStorage to maintain the accomplished count
  const [accomplishedCount, setAccomplishedCount] = useState<number>(() => {
    const saved = localStorage.getItem('fixuno_tracker_count');
    // Start with a base that feels established
    return saved ? parseInt(saved, 10) : 1290;
  });

  const [activeTechs, setActiveTechs] = useState<number>(11);

  useEffect(() => {
    // Dynamic Increment: Simulate 5-20 jobs per day
    // In a live browser session, we check frequently for a visual "growing" effect
    const countInterval = setInterval(() => {
      setAccomplishedCount(prev => {
        // High frequency check, low probability of increment to simulate daily growth naturally
        const shouldIncrement = Math.random() > 0.85; 
        const next = prev + (shouldIncrement ? 1 : 0);
        localStorage.setItem('fixuno_tracker_count', next.toString());
        return next;
      });
    }, 12000); // Check every 12 seconds

    // Fluctuate technicians slightly to show "live" activity
    const techInterval = setInterval(() => {
      setActiveTechs(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(9, Math.min(18, prev + (Math.random() > 0.7 ? change : 0)));
      });
    }, 15000);

    return () => {
      clearInterval(countInterval);
      clearInterval(techInterval);
    };
  }, []);

  return (
    <section className="relative bg-[#020617] py-20 overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            d="M0,160 C480,240 960,80 1440,160"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-around gap-12 md:gap-0">
          
          <div className="text-center group">
            <h3 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-4 transition-transform duration-500 group-hover:scale-105">
              {accomplishedCount.toLocaleString()}
            </h3>
            <div className="flex flex-col items-center">
              <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.4em] mb-3">
                Services Accomplished
              </span>
              <div className="w-16 h-1.5 bg-primary rounded-full animate-glow"></div>
            </div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center space-x-3 mb-3">
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-500 text-xs font-black uppercase tracking-widest">Live Active</span>
            </div>
            <h3 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-4 transition-transform duration-500 group-hover:scale-105">
              {activeTechs}
            </h3>
            <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.4em]">
              Technicians On Field
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceTracker;

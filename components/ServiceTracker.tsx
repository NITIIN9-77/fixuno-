
import React, { useState, useEffect } from 'react';

const ServiceTracker: React.FC = () => {
  // We use localStorage to keep the count persistent and growing for the user session
  const [accomplishedCount, setAccomplishedCount] = useState<number>(() => {
    const saved = localStorage.getItem('fixuno_tracker_count');
    return saved ? parseInt(saved, 10) : 1288;
  });

  const [activeTechs, setActiveTechs] = useState<number>(11);

  useEffect(() => {
    // Simulate growth: Increments randomly to mimic 5-20 jobs per day
    // In a live session, we'll increment every 30-60 seconds for visual effect
    const countInterval = setInterval(() => {
      setAccomplishedCount(prev => {
        const increment = Math.random() > 0.8 ? 1 : 0; // 20% chance to increment every check
        const next = prev + increment;
        localStorage.setItem('fixuno_tracker_count', next.toString());
        return next;
      });
    }, 15000); // Check every 15 seconds

    // Fluctuate technicians slightly to show "live" activity
    const techInterval = setInterval(() => {
      setActiveTechs(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = Math.max(8, Math.min(15, prev + (Math.random() > 0.7 ? change : 0)));
        return next;
      });
    }, 20000);

    return () => {
      clearInterval(countInterval);
      clearInterval(techInterval);
    };
  }, []);

  return (
    <section className="relative bg-[#020617] py-16 overflow-hidden border-t border-slate-900">
      {/* Background Decorative Curve (matches the screenshot style) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            d="M0,160 C320,240 640,80 960,160 C1280,240 1440,160 1440,160"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-around gap-12 md:gap-0">
          
          {/* Accomplished Services */}
          <div className="text-center group">
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2 transition-transform duration-500 group-hover:scale-110">
              {accomplishedCount.toLocaleString()}
            </h3>
            <div className="flex flex-col items-center">
              <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.3em] mb-2">
                Services Accomplished
              </span>
              <div className="w-12 h-1 bg-primary rounded-full animate-glow"></div>
            </div>
          </div>

          {/* Active Technicians */}
          <div className="text-center group">
            <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-500 text-xs font-black uppercase tracking-widest">Live Active</span>
            </div>
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2 transition-transform duration-500 group-hover:scale-110">
              {activeTechs}
            </h3>
            <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
              Technicians On Field
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceTracker;


import React, { useState, useEffect } from 'react';

const ServiceTracker: React.FC = () => {
  const [accomplishedCount, setAccomplishedCount] = useState<number>(3150);
  const [activeTechs, setActiveTechs] = useState<number>(0);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  useEffect(() => {
    const calculateStats = () => {
      const now = new Date();
      
      // 1. Calculate Services Accomplished (Synchronized across all devices)
      // Base date: Jan 1, 2024. Using exact time elapsed to calculate growth.
      const baseDate = new Date('2024-01-01T00:00:00').getTime(); 
      const elapsedMs = now.getTime() - baseDate;
      const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);

      // Start at 3000, grow by exactly 23.5 per day based on milliseconds elapsed.
      // Everyone looking at the site at the exact same second will see the exact same number.
      const currentAccomplished = 3000 + Math.floor(elapsedDays * 23.5);
      setAccomplishedCount(currentAccomplished);

      // 2. Calculate Technicians on Field
      const currentHour = now.getHours();
      
      // Offline from 11:00 PM (23) to 7:00 AM (7)
      if (currentHour >= 23 || currentHour < 7) {
        setIsOffline(true);
        setActiveTechs(0);
      } else {
        setIsOffline(false);
        // Create a pseudo-random number based on time that changes every 5 minutes.
        // This ensures the number fluctuates between 50 and 70, but is the SAME for everyone.
        const timeSeed = Math.floor(now.getTime() / (1000 * 60 * 5));
        const pseudoRandom = Math.abs(Math.sin(timeSeed)); // Returns a value between 0 and 1
        
        // Scale to 50-70 range
        const techs = 50 + Math.floor(pseudoRandom * 21);
        setActiveTechs(techs);
      }
    };

    // Calculate immediately on load
    calculateStats();

    // Recalculate every minute to keep it live and synchronized
    const interval = setInterval(calculateStats, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-background py-24 overflow-hidden border-t border-slate-900">
      {/* Visual Background Curve */}
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
        <div className="flex flex-col md:flex-row items-center justify-around gap-16 md:gap-0">
          
          {/* Accomplished Services Counter */}
          <div className="text-center group">
            <h3 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-4 transition-transform duration-700 group-hover:scale-105">
              {accomplishedCount.toLocaleString()}
            </h3>
            <div className="flex flex-col items-center">
              <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">
                Services Accomplished
              </span>
              <div className="w-20 h-1.5 bg-primary rounded-full animate-glow shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>

          {/* Active Technicians Counter */}
          <div className="text-center group">
            <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="flex h-4 w-4 relative">
                    {isOffline ? (
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-slate-700"></span>
                    ) : (
                        <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                        </>
                    )}
                </span>
                <span className={`${isOffline ? 'text-slate-500' : 'text-green-500'} text-sm font-black uppercase tracking-widest transition-colors`}>
                    {isOffline ? 'Offline (Resumes 7 AM)' : 'Live Active'}
                </span>
            </div>
            
            <h3 className={`text-7xl md:text-9xl font-black tracking-tighter mb-4 transition-transform duration-700 group-hover:scale-105 ${isOffline ? 'text-slate-700' : 'text-white'}`}>
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

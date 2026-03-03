
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

      // Start at 3000, grow by exactly 15 per day based on milliseconds elapsed.
      // Everyone looking at the site at the exact same second will see the exact same number.
      const currentAccomplished = 3000 + Math.floor(elapsedDays * 15);
      setAccomplishedCount(currentAccomplished);

      // 2. Calculate Technicians on Field
      const currentHour = now.getHours();
      
      // Offline from 10:00 PM (22) to 8:00 AM (8)
      if (currentHour >= 22 || currentHour < 8) {
        setIsOffline(true);
        setActiveTechs(0);
      } else {
        setIsOffline(false);
        // Create a pseudo-random number based on time that changes every 5 minutes.
        // This ensures the number fluctuates between 80 and 90, but is the SAME for everyone.
        const timeSeed = Math.floor(now.getTime() / (1000 * 60 * 5));
        const pseudoRandom = Math.abs(Math.sin(timeSeed)); // Returns a value between 0 and 1
        
        // Scale to 80-90 range
        const techs = 80 + Math.floor(pseudoRandom * 11);
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
    <section className="relative bg-background-light dark:bg-background-dark py-16 overflow-hidden border-t border-black/5 dark:border-white/5">
      {/* Visual Background Curve */}
      <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="none" 
            stroke="#007AFF" 
            strokeWidth="1" 
            d="M0,160 C480,240 960,80 1440,160"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-around gap-12 md:gap-0">
          
          {/* Accomplished Services Counter */}
          <div className="text-center group">
            <h3 className="text-6xl md:text-8xl font-black text-textPrimary-light dark:text-textPrimary-dark tracking-tighter mb-2 transition-transform duration-700 group-hover:scale-105">
              {accomplishedCount.toLocaleString()}
            </h3>
            <div className="flex flex-col items-center">
              <span className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3">
                Services Accomplished
              </span>
              <div className="w-16 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(0,122,255,0.3)]"></div>
            </div>
          </div>

          {/* Active Technicians Counter */}
          <div className="text-center group">
            <div className="flex items-center justify-center space-x-2 mb-3">
                <span className="flex h-3 w-3 relative">
                    {isOffline ? (
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-textSecondary-light/30 dark:bg-textSecondary-dark/30"></span>
                    ) : (
                        <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </>
                    )}
                </span>
                <span className={`${isOffline ? 'text-textSecondary-light dark:text-textSecondary-dark' : 'text-emerald-500'} text-[9px] font-black uppercase tracking-widest transition-colors`}>
                    {isOffline ? 'Offline (Resumes 8 AM)' : 'Live Active'}
                </span>
            </div>
            
            <h3 className={`text-6xl md:text-8xl font-black tracking-tighter mb-2 transition-transform duration-700 group-hover:scale-105 ${isOffline ? 'text-textSecondary-light/20 dark:text-textSecondary-dark/20' : 'text-textPrimary-light dark:text-textPrimary-dark'}`}>
              {activeTechs}
            </h3>
            
            <span className="text-[9px] md:text-[10px] font-black text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-[0.4em]">
              Technicians On Field
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceTracker;

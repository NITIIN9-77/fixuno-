
import React, { useState, useEffect } from 'react';

const ServiceTracker: React.FC = () => {
  // Start with a base number of services
  const [count, setCount] = useState(1284);
  const [activeTechs, setActiveTechs] = useState(14);

  useEffect(() => {
    // Dynamic increment: Add 1 service every few seconds randomly
    const interval = setInterval(() => {
        setCount(prev => prev + (Math.random() > 0.6 ? 1 : 0));
        // Randomly fluctuate active techs
        if (Math.random() > 0.8) {
            setActiveTechs(prev => Math.max(10, prev + (Math.random() > 0.5 ? 1 : -1)));
        }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary/5 border-y border-primary/10 py-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-pulse" />
          </svg>
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-around gap-12 text-center">
            <div className="space-y-2">
                <p className="text-5xl lg:text-7xl font-black text-textPrimary tracking-tighter transition-all duration-1000 ease-out">
                    {count.toLocaleString()}
                </p>
                <p className="text-sm font-black text-primary uppercase tracking-[0.3em]">Services Accomplished</p>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-4"></div>
            </div>
            
            <div className="space-y-2">
                <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <p className="text-xl font-bold text-green-500">Live Active</p>
                </div>
                <p className="text-4xl lg:text-6xl font-black text-textPrimary tracking-tighter">
                    {activeTechs}
                </p>
                <p className="text-sm font-black text-textSecondary uppercase tracking-[0.3em]">Technicians on Field</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTracker;

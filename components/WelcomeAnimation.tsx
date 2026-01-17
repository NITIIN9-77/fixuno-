
import React, { useEffect, useState } from 'react';

const WelcomeAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Allow fade-out animation to finish
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-background z-[100] transition-opacity duration-700 opacity-0 pointer-events-none"></div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-primary/10 rounded-full animate-ping opacity-20"></div>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Stylized 3D Technician SVG */}
        <svg viewBox="0 0 200 200" className="w-full h-full animate-slide-in-up">
          <defs>
            <linearGradient id="uniformGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="toolboxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="4" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Technician Character */}
          <g className="technician-group animate-bounce-slow" style={{ animationDuration: '1.5s' }}>
            {/* Body */}
            <rect x="75" y="80" width="50" height="70" rx="10" fill="url(#uniformGrad)" filter="url(#shadow)" />
            {/* Head */}
            <circle cx="100" cy="55" r="22" fill="#fde047" filter="url(#shadow)" />
            <rect x="85" y="38" width="30" height="15" rx="5" fill="#1e293b" /> {/* Cap */}
            
            {/* Legs with walking animation */}
            <g className="animate-pulse">
                <rect x="80" y="145" width="12" height="30" rx="4" fill="#1e293b" />
                <rect x="108" y="145" width="12" height="30" rx="4" fill="#1e293b" />
            </g>

            {/* Arms */}
            <rect x="62" y="85" width="15" height="45" rx="7" fill="url(#uniformGrad)" transform="rotate(10 62 85)" />
            <rect x="123" y="85" width="15" height="45" rx="7" fill="url(#uniformGrad)" transform="rotate(-15 123 85)" />

            {/* Toolbox (The 3D asset) */}
            <g transform="translate(130, 110)">
                <rect x="0" y="0" width="35" height="25" rx="4" fill="url(#toolboxGrad)" filter="url(#shadow)" />
                <rect x="5" y="-8" width="25" height="12" rx="2" stroke="#64748b" fill="none" strokeWidth="3" /> {/* Handle */}
                <rect x="15" y="10" width="5" height="5" fill="#fbbf24" /> {/* Latch */}
            </g>
          </g>

          {/* Floor Shadow */}
          <ellipse cx="100" cy="185" rx="60" ry="10" fill="black" fillOpacity="0.2" className="animate-pulse" />
        </svg>
      </div>

      <div className="mt-8 text-center relative z-10">
        <h2 className="text-2xl font-bold text-textPrimary tracking-widest uppercase animate-pulse">
          FIXUNO
        </h2>
        <div className="mt-4 flex items-center justify-center space-x-2">
            <p className="text-primary font-medium">Technician is arriving</p>
            <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomeAnimation;

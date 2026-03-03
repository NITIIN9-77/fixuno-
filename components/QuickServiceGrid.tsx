
import React from 'react';
import { SERVICES } from '../constants';
import type { Service } from '../types';

interface QuickServiceGridProps {
  onServiceClick: (service: Service) => void;
}

const QuickServiceGrid: React.FC<QuickServiceGridProps> = ({ onServiceClick }) => {
  return (
    <section className="bg-background-light dark:bg-background-dark border-b border-black/5 dark:border-white/5 pt-4 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-[0.3em]">
              Quick Services
            </h3>
            <div className="flex-grow h-px bg-black/5 dark:bg-white/5 ml-6"></div>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 md:gap-2">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => onServiceClick(service)}
                className="group flex flex-col items-center p-2 md:p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
              >
                <div className="mb-1.5 p-2.5 md:p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] group-hover:bg-primary/10 transition-colors border border-black/5 dark:border-white/5">
                  {React.cloneElement(service.icon as React.ReactElement, { 
                    className: "w-5 h-5 md:w-6 md:h-6 text-textSecondary-light dark:text-textSecondary-dark group-hover:text-primary transition-colors" 
                  })}
                </div>
                
                <p className="text-[8px] md:text-[9px] font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-widest text-center opacity-80 group-hover:opacity-100">
                  {service.name.split(' ')[0]}
                </p>
              </button>
            ))}
            
            {/* Custom Need Tile */}
            <button
              onClick={() => {
                // Since chat is removed, we might want to navigate to contact or show a simple alert
                onServiceClick(SERVICES[0]); // Fallback or handle differently
              }}
              className="group flex flex-col items-center p-2 md:p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              <div className="mb-1.5 p-2.5 md:p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] group-hover:bg-primary/10 transition-colors border border-black/5 dark:border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-textSecondary-light dark:text-textSecondary-dark group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[8px] md:text-[9px] font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-widest text-center opacity-80 group-hover:opacity-100">
                Custom
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(QuickServiceGrid);

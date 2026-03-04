
import React from 'react';
import { SERVICES } from '../constants';
import type { Service } from '../types';

interface QuickServiceGridProps {
  onServiceClick: (service: Service) => void;
  onCustomClick?: () => void;
}

const QuickServiceGrid: React.FC<QuickServiceGridProps> = ({ onServiceClick, onCustomClick }) => {
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
                    className: `${(service.icon as React.ReactElement).props.className} w-5 h-5 md:w-6 md:h-6` 
                  })}
                </div>
                
                <p className="text-[8px] md:text-[9px] font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-widest text-center opacity-80 group-hover:opacity-100">
                  {service.name.split(' ')[0]}
                </p>
              </button>
            ))}
            
            {/* Custom Need Tile */}
            <button
              onClick={() => onCustomClick?.()}
              className="group flex flex-col items-center p-2 md:p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              <div className="mb-1.5 p-2.5 md:p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] group-hover:bg-primary/10 transition-colors border border-black/5 dark:border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
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

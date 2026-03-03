
import React from 'react';
import { SERVICES } from '../constants';
import ServiceCard from './ServiceCard';
import type { Service } from '../types';

interface ServicesProps {
  onViewDetails: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ onViewDetails }) => {
  return (
    <section id="services" className="py-20 bg-background-light dark:bg-background-dark scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.5em] mb-4">Catalog</p>
              <h2 className="text-3xl md:text-6xl font-black text-textPrimary-light dark:text-textPrimary-dark tracking-tighter uppercase italic leading-none mb-6">
                Full Service <br />
                <span className="text-primary">Inventory.</span>
              </h2>
              <p className="text-textSecondary-light dark:text-textSecondary-dark text-sm md:text-base leading-relaxed">
                Our comprehensive suite of home maintenance solutions, delivered by industry-certified specialists.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-background-light dark:bg-background-dark p-8 md:p-10 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-all duration-500 group">
                <ServiceCard service={service} onViewDetails={onViewDetails} />
              </div>
            ))}
            
            {/* Custom Service Card */}
            <div className="bg-background-light dark:bg-background-dark p-8 md:p-10 flex flex-col items-start transition-all duration-500 group border-t md:border-t-0 border-black/5 dark:border-white/5">
              <div className="mb-8 bg-black/5 dark:bg-white/5 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-textSecondary-light dark:text-textSecondary-dark group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </div>
              <h3 className="text-xl font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-widest mb-4">Custom Need?</h3>
              <p className="text-textSecondary-light dark:text-textSecondary-dark text-sm mb-8 leading-relaxed">Don't see what you need? We handle all kinds of bespoke home repairs and installations.</p>
              <div className="mt-auto w-full space-y-4">
                  <button
                      onClick={() => {
                          const chatBtn = document.querySelector('[aria-label="Drag to move, click to chat"]') as HTMLElement;
                          if (chatBtn) chatBtn.click();
                      }}
                      className="w-full bg-black/5 dark:bg-white/5 text-textPrimary-light dark:text-textPrimary-dark font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 uppercase tracking-widest text-[10px]"
                  >
                      Chat With Uno
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Services);

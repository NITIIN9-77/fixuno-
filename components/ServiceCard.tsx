
import React, { memo } from 'react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onViewDetails: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  return (
    <div className="flex flex-col items-start h-full">
      <div className="mb-8 bg-black/5 dark:bg-white/5 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors duration-500">
        {React.cloneElement(service.icon as React.ReactElement, { 
          className: "w-8 h-8 text-textSecondary-light dark:text-textSecondary-dark group-hover:text-primary transition-colors duration-500" 
        })}
      </div>
      
      <div className="flex-grow">
        {service.badge && (
          <span className="inline-block text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-3">
            {service.badge}
          </span>
        )}
        <h3 className="text-xl font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-widest mb-4 group-hover:text-primary transition-colors duration-500">
          {service.name}
        </h3>
        <p className="text-textSecondary-light dark:text-textSecondary-dark text-sm leading-relaxed mb-8">
          {service.description}
        </p>
      </div>

      <button
        onClick={() => onViewDetails(service)}
        className="group/btn inline-flex items-center text-[10px] font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-[0.3em] hover:text-primary transition-colors"
      >
        <span>View Options</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-3 transition-transform group-hover/btn:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
};

// Speed: Prevent unnecessary re-renders of static service cards
export default memo(ServiceCard);

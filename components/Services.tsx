
import React from 'react';
import { SERVICES } from '../constants';
import ServiceCard from './ServiceCard';
import type { Service } from '../types';

interface ServicesProps {
  onViewDetails: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ onViewDetails }) => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary">Our Services</h2>
          <p className="mt-4 text-lg text-textSecondary max-w-2xl mx-auto">
            We offer a wide range of services to keep your home running smoothly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} onViewDetails={onViewDetails} />
          ))}
          
          {/* Custom Service / Not Listed Card */}
          <div className="bg-surface/50 rounded-lg overflow-hidden flex flex-col p-6 text-center items-center transition-all duration-300 transform border-2 border-dashed border-slate-700 hover:border-primary hover:-translate-y-2 group">
            <div className="mb-4 bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors animate-pulse-subtle">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-textPrimary mb-2">Service Not Listed?</h3>
            <p className="text-textSecondary flex-grow mb-4">Don't see what you need? We handle all kinds of custom home repairs and installations.</p>
            <div className="flex flex-col space-y-2 w-full">
                <button
                    onClick={() => {
                        // Logic to open chat with prefilled message
                        const chatBtn = document.querySelector('[aria-label="Drag to move, click to chat"]') as HTMLElement;
                        if (chatBtn) chatBtn.click();
                    }}
                    className="mt-auto bg-primary text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:brightness-110 shadow-lg"
                >
                    Chat With Uno
                </button>
                <a 
                    href="tel:8423979371"
                    className="text-textSecondary hover:text-primary text-sm font-medium transition-colors"
                >
                    Or Call: 8423979371
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

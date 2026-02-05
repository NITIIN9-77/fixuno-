
import React, { useEffect, useState } from 'react';
import type { Service, SubService, CartItem } from '../types';
import ExplanationModal from './ExplanationModal';

interface ServiceDetailModalProps {
  service: Service;
  cart: CartItem[];
  onAddToCart: (subService: SubService, parentServiceName: string) => void;
  onUpdateCartQuantity: (subServiceId: string, quantity: number) => void;
  onClose: () => void;
  onProceed: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, cart, onAddToCart, onUpdateCartQuantity, onClose, onProceed }) => {
  const [explainingSubService, setExplainingSubService] = useState<SubService | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderServiceItem = (subService: SubService, isPart: boolean = false) => {
    const cartItem = cart.find(item => item.id === subService.id);
    return (
      <div key={subService.id} className="group flex items-center justify-between border border-slate-700/60 bg-slate-800/20 hover:border-primary transition-all p-6 rounded-2xl">
        <div className="flex-1 pr-6">
          <div className="flex items-center">
            <h4 className="font-bold text-xl text-textPrimary group-hover:text-primary transition-colors tracking-tight">{subService.name}</h4>
            {!isPart && (
                <button 
                onClick={() => setExplainingSubService(subService)}
                className="ml-3 text-textSecondary hover:text-primary transition-colors p-1"
                aria-label={`Learn more`}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            )}
          </div>
          {!isPart && <p className="text-primary font-black mt-2 text-2xl">₹{subService.price}</p>}
          {isPart && <p className="text-textSecondary text-[10px] uppercase tracking-[0.2em] mt-2 font-bold opacity-70">Quality Tested Component</p>}
          {subService.description && (
            <p className="text-sm text-textSecondary mt-3 leading-relaxed opacity-90">{subService.description}</p>
          )}
        </div>
        {!isPart ? (
            cartItem ? (
                <div className="flex items-center space-x-5 bg-slate-900 px-2 py-1.5 rounded-full border border-slate-700 shadow-inner">
                    <button onClick={() => onUpdateCartQuantity(subService.id, cartItem.quantity - 1)} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-textSecondary hover:text-white transition-colors">-</button>
                    <span className="text-md font-black text-textPrimary">{cartItem.quantity}</span>
                    <button onClick={() => onUpdateCartQuantity(subService.id, cartItem.quantity + 1)} className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/30">+</button>
                </div>
            ) : (
                <button onClick={() => onAddToCart(subService, service.name)} className="bg-primary/10 border border-primary/20 text-primary font-black px-10 py-4 rounded-full hover:bg-primary hover:text-white transition-all text-xs uppercase tracking-[0.2em] shadow-xl">
                ADD
                </button>
            )
        ) : (
            <div className="text-textSecondary text-[10px] font-black text-center uppercase border border-slate-700/50 px-4 py-2 rounded-xl bg-slate-900/50">
                Contact For Parts
            </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/85 backdrop-blur-xl flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-surface rounded-[40px] shadow-[0_0_80px_rgba(0,0,0,0.6)] w-full max-w-2xl animate-scale-up-fade-in border border-slate-700 overflow-hidden flex flex-col max-h-[92vh]" onClick={(e) => e.stopPropagation()}>
          
          <header className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
              <div>
                <h2 className="text-4xl font-black text-textPrimary tracking-tighter uppercase">{service.name}</h2>
                <p className="text-[10px] text-textSecondary uppercase tracking-[0.4em] mt-2 font-black opacity-60">Verified Professional Service Module</p>
              </div>
              <button onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-white transition-all p-3 hover:bg-slate-800 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
          </header>

          <div className="flex-grow overflow-y-auto p-10 space-y-10 custom-scrollbar">
            <div className="space-y-5">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-8 flex items-center">
                    <span className="w-8 h-px bg-primary/30 mr-4"></span>
                    Service Labor & Diagnostics
                    <span className="w-8 h-px bg-primary/30 ml-4"></span>
                </h3>
                {service.subServices.map(sub => renderServiceItem(sub, false))}
            </div>

            {service.parts && service.parts.length > 0 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-black text-textSecondary uppercase tracking-[0.4em] flex items-center">
                        <span className="w-8 h-px bg-slate-700 mr-4"></span>
                        Genuine Spare Parts
                    </h3>
                    <span className="text-[9px] text-textSecondary/40 font-black uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Market Rate Applied At Visit</span>
                </div>
                {service.parts.map(part => renderServiceItem(part, true))}
              </div>
            )}
          </div>

          {totalItems > 0 && (
            <footer className="p-10 border-t border-slate-800 bg-slate-900 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex-shrink-0 animate-slide-in-up">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-textSecondary uppercase font-black tracking-widest mb-2 opacity-60">Total Estimated Labor</p>
                  <p className="text-5xl font-black text-textPrimary tracking-tighter">₹{total}</p>
                </div>
                <button onClick={onProceed} className="bg-primary text-white font-black py-6 px-16 rounded-[24px] hover:scale-[1.03] active:scale-95 transition-all text-xl shadow-[0_15px_40px_rgba(59,130,246,0.3)] tracking-widest uppercase">
                  CONFIRM BOOKING
                </button>
              </div>
            </footer>
          )}
        </div>
      </div>
      {explainingSubService && (
        <ExplanationModal
            serviceName={service.name}
            subService={explainingSubService}
            onClose={() => setExplainingSubService(null)}
        />
      )}
    </>
  );
};

export default ServiceDetailModal;

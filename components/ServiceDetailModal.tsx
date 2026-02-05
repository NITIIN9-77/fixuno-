
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
      <div key={subService.id} className="group flex items-center justify-between border border-slate-700/50 bg-slate-800/20 hover:border-primary/50 transition-all p-5 rounded-2xl">
        <div className="flex-1 pr-6">
          <div className="flex items-center">
            <h4 className="font-bold text-lg text-textPrimary group-hover:text-primary transition-colors">{subService.name}</h4>
            {!isPart && (
                <button 
                onClick={() => setExplainingSubService(subService)}
                className="ml-2 text-textSecondary hover:text-primary transition-colors p-1"
                aria-label={`Learn more`}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            )}
          </div>
          {!isPart && <p className="text-primary font-black mt-1 text-xl">₹{subService.price}</p>}
          {isPart && <p className="text-textSecondary text-xs uppercase tracking-widest mt-1 font-bold">Standard Part</p>}
          {subService.description && (
            <p className="text-sm text-textSecondary mt-2 leading-relaxed">{subService.description}</p>
          )}
        </div>
        {!isPart ? (
            cartItem ? (
                <div className="flex items-center space-x-4 bg-slate-900 p-1.5 rounded-full border border-slate-700 shadow-inner">
                    <button onClick={() => onUpdateCartQuantity(subService.id, cartItem.quantity - 1)} className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-textSecondary hover:text-white transition-colors">-</button>
                    <span className="text-sm font-black text-textPrimary">{cartItem.quantity}</span>
                    <button onClick={() => onUpdateCartQuantity(subService.id, cartItem.quantity + 1)} className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">+</button>
                </div>
            ) : (
                <button onClick={() => onAddToCart(subService, service.name)} className="bg-primary/10 border border-primary/20 text-primary font-black px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all text-xs uppercase tracking-[0.2em]">
                ADD
                </button>
            )
        ) : (
            <div className="text-textSecondary text-[10px] font-black text-center uppercase border border-slate-700 px-3 py-1.5 rounded-lg bg-slate-900/50">
                Price On Visit
            </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-surface rounded-[32px] shadow-2xl w-full max-w-2xl animate-scale-up-fade-in border border-slate-700 overflow-hidden flex flex-col max-h-[92vh]" onClick={(e) => e.stopPropagation()}>
          
          <header className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div>
                <h2 className="text-3xl font-black text-textPrimary tracking-tight uppercase">{service.name}</h2>
                <p className="text-[10px] text-textSecondary uppercase tracking-[0.3em] mt-1 font-bold">Official Fixuno Service Module</p>
              </div>
              <button onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-white transition-colors p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
          </header>

          <div className="flex-grow overflow-y-auto p-8 space-y-8">
            <div className="space-y-4">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-6">Expert Service Options</h3>
                {service.subServices.map(sub => renderServiceItem(sub, false))}
            </div>

            {service.parts && service.parts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-black text-textSecondary uppercase tracking-[0.3em]">Compatible Spare Parts</h3>
                    <span className="text-[10px] text-textSecondary/50 font-bold italic">Market rates applied at visit</span>
                </div>
                {service.parts.map(part => renderServiceItem(part, true))}
              </div>
            )}
          </div>

          {totalItems > 0 && (
            <footer className="p-8 border-t border-slate-800 bg-slate-900 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex-shrink-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-textSecondary uppercase font-black tracking-widest mb-1">Estimated Labor Total</p>
                  <p className="text-4xl font-black text-textPrimary tracking-tighter">₹{total}</p>
                </div>
                <button onClick={onProceed} className="bg-primary text-white font-black py-5 px-12 rounded-2xl hover:scale-105 active:scale-95 transition-all text-lg shadow-2xl shadow-primary/30 tracking-widest uppercase">
                  CONFIRM
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

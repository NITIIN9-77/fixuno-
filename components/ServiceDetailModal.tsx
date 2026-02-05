
import React, { useEffect } from 'react';
import type { Service, SubService, CartItem } from '../types';

interface ServiceDetailModalProps {
  service: Service;
  cart: CartItem[];
  onAddToCart: (subService: SubService) => void;
  onUpdateCartQuantity: (id: string, q: number) => void;
  onClose: () => void;
  onProceed: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, cart, onAddToCart, onUpdateCartQuantity, onClose, onProceed }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface rounded-3xl shadow-2xl w-full max-w-2xl animate-scale-up-fade-in border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <header className="p-8 bg-slate-900 flex justify-between items-center border-b border-slate-800">
            <div>
                <h2 className="text-3xl font-black text-textPrimary tracking-tight uppercase">{service.name}</h2>
                <p className="text-xs text-textSecondary uppercase tracking-widest mt-1">Professional labor & diagnostic pricing</p>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </header>

        <div className="p-8 overflow-y-auto space-y-6">
            {service.subServices.map(sub => {
                const inCart = cart.find(i => i.id === sub.id);
                return (
                    <div key={sub.id} className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 flex items-center justify-between hover:border-primary transition-all">
                        <div className="flex-1 pr-6">
                            <h4 className="font-bold text-xl text-textPrimary">{sub.name}</h4>
                            <p className="text-sm text-textSecondary mt-1">{sub.description}</p>
                            <p className="text-primary font-black mt-2 text-lg">₹{sub.price}</p>
                        </div>
                        {inCart ? (
                            <div className="flex items-center space-x-4 bg-slate-900 p-1.5 rounded-full border border-slate-700 shadow-inner">
                                <button onClick={() => onUpdateCartQuantity(sub.id, inCart.quantity - 1)} className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-textSecondary hover:text-white">-</button>
                                <span className="text-sm font-black text-textPrimary">{inCart.quantity}</span>
                                <button onClick={() => onUpdateCartQuantity(sub.id, inCart.quantity + 1)} className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">+</button>
                            </div>
                        ) : (
                            <button onClick={() => onAddToCart(sub)} className="bg-primary/10 border border-primary/20 text-primary font-black px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all text-xs uppercase tracking-widest">ADD</button>
                        )}
                    </div>
                );
            })}
            
            <div className="bg-primary/5 border border-dashed border-primary/30 p-6 rounded-2xl text-center">
                <p className="text-xs text-textSecondary leading-relaxed">
                    <span className="font-bold text-primary uppercase block mb-1">Parts Notice</span> 
                    Pricing above is for labor & expertise. Spare parts are provided at actual market cost upon technician visit if replacement is required.
                </p>
            </div>
        </div>

        {total > 0 && (
            <footer className="p-8 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                <div>
                    <p className="text-[10px] text-textSecondary uppercase font-black tracking-widest">Estimated Service Total</p>
                    <p className="text-4xl font-black text-textPrimary tracking-tighter">₹{total}</p>
                </div>
                <button onClick={onProceed} className="bg-primary text-white font-black px-12 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 tracking-widest uppercase text-lg">PROCEED</button>
            </footer>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailModal;

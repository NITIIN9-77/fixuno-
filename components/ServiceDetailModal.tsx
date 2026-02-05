
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
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = 'auto'; }; }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface rounded-3xl shadow-2xl w-full max-w-2xl animate-scale-up-fade-in border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <header className="p-6 bg-slate-900 flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-black text-textPrimary tracking-tight">{service.name}</h2>
                <p className="text-xs text-textSecondary uppercase tracking-widest mt-1">Pricing for professional labor & diagnostics</p>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </header>

        <div className="p-8 overflow-y-auto space-y-6">
            {service.subServices.map(sub => {
                const inCart = cart.find(i => i.id === sub.id);
                return (
                    <div key={sub.id} className="group bg-slate-800/40 border border-slate-700 rounded-2xl p-5 flex items-center justify-between hover:border-primary transition-all">
                        <div className="flex-1 pr-6">
                            <h4 className="font-bold text-lg text-textPrimary group-hover:text-primary transition-colors">{sub.name}</h4>
                            <p className="text-sm text-textSecondary mt-1 leading-relaxed">{sub.description}</p>
                            <p className="text-primary font-black mt-2">₹{sub.price}</p>
                        </div>
                        {inCart ? (
                            <div className="flex items-center space-x-4 bg-slate-900 p-1 rounded-full border border-slate-700">
                                <button onClick={() => onUpdateCartQuantity(sub.id, inCart.quantity - 1)} className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-textSecondary hover:text-white">-</button>
                                <span className="text-sm font-black text-textPrimary">{inCart.quantity}</span>
                                <button onClick={() => onUpdateCartQuantity(sub.id, inCart.quantity + 1)} className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">+</button>
                            </div>
                        ) : (
                            <button onClick={() => onAddToCart(sub)} className="bg-primary/10 border border-primary/20 text-primary font-black px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all text-sm uppercase tracking-widest">ADD</button>
                        )}
                    </div>
                );
            })}
            
            {/* Note: Specific part prices are excluded as per user request */}
            <div className="bg-primary/5 border border-dashed border-primary/30 p-4 rounded-xl">
                <p className="text-xs text-textSecondary text-center">
                    <span className="font-bold text-primary uppercase mr-2">Please Note:</span> 
                    Above costs cover professional labor and inspection. Spare part prices are determined based on actual requirement and brand availability at the time of service.
                </p>
            </div>
        </div>

        {total > 0 && (
            <footer className="p-6 bg-slate-900 border-t border-slate-700 flex justify-between items-center">
                <div>
                    <p className="text-xs text-textSecondary uppercase font-bold tracking-widest">Estimated Service Total</p>
                    <p className="text-3xl font-black text-textPrimary">₹{total}</p>
                </div>
                <button onClick={onProceed} className="bg-primary text-white font-black px-10 py-4 rounded-xl hover:scale-105 transition-all shadow-2xl shadow-primary/30 tracking-widest uppercase">PROCEED</button>
            </footer>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailModal;

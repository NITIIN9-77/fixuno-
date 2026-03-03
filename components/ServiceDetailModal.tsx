import React, { useEffect, useState } from 'react';
import type { Service, SubService, CartItem } from '../types';

interface ServiceDetailModalProps {
  service: Service;
  cart: CartItem[];
  onAddToCart: (subService: SubService, parentServiceName: string) => void;
  onUpdateCartQuantity: (subServiceId: string, quantity: number) => void;
  onClose: () => void;
  onProceed: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, cart, onAddToCart, onUpdateCartQuantity, onClose, onProceed }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderServiceItem = (subService: SubService) => {
    const cartItem = cart.find(item => item.id === subService.id);
    return (
      <div key={subService.id} className="flex items-center justify-between border border-black/5 dark:border-white/5 hover:border-primary/50 transition-colors p-4 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="flex-1 pr-4">
          <div className="flex items-center">
            <h4 className="font-bold text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-tight text-sm">{subService.name}</h4>
          </div>
          <p className="text-primary font-black mt-1 text-sm">₹{subService.price}</p>
          {subService.description && (
            <p className="text-[10px] text-textSecondary-light dark:text-textSecondary-dark mt-2 leading-relaxed">{subService.description}</p>
          )}
        </div>
        {cartItem ? (
          <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1">
            <button onClick={() => onUpdateCartQuantity(subService.id, cartItem.quantity - 1)} className="text-textSecondary-light dark:text-textSecondary-dark hover:text-primary rounded-full w-8 h-8 flex items-center justify-center transition-colors font-bold">-</button>
            <span className="w-8 text-center font-black text-textPrimary-light dark:text-textPrimary-dark text-xs">{cartItem.quantity}</span>
            <button onClick={() => onUpdateCartQuantity(subService.id, cartItem.quantity + 1)} className="bg-primary text-white hover:brightness-110 rounded-full w-8 h-8 flex items-center justify-center transition-all font-bold">+</button>
          </div>
        ) : (
          <button onClick={() => onAddToCart(subService, service.name)} className="bg-primary text-white font-black py-2 px-6 rounded-full hover:brightness-110 transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">
            Add
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
        <div className="bg-background-light dark:bg-background-dark rounded-3xl shadow-2xl w-full max-w-2xl m-4 relative animate-slide-in-up flex flex-col max-h-[90vh] border border-black/5 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
          
          <header className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center flex-shrink-0">
              <h2 className="text-xl font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-widest italic">{service.name}</h2>
              <button onClick={onClose} aria-label="Close" className="text-textSecondary-light dark:text-textSecondary-dark hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
          </header>

          <div className="flex-grow overflow-y-auto p-6 space-y-8">
            <div>
              <h3 className="text-[10px] font-black text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-[0.3em] mb-6 flex items-center">
                Available Services
                <div className="flex-grow h-px bg-black/5 dark:bg-white/5 ml-4"></div>
              </h3>
              <div className="space-y-3">
                {service.subServices.map(renderServiceItem)}
              </div>
            </div>

            {service.parts && service.parts.length > 0 && (
              <div>
                <h3 className="text-[10px] font-black text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-[0.3em] mb-6 flex items-center">
                  Related Spare Parts
                  <div className="flex-grow h-px bg-black/5 dark:border-white/5 ml-4"></div>
                </h3>
                <div className="space-y-3">
                  {service.parts.map(renderServiceItem)}
                </div>
              </div>
            )}
          </div>

          {totalItems > 0 && (
            <footer className="p-6 border-t border-black/5 dark:border-white/5 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md rounded-b-3xl flex-shrink-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-1">{totalItems} {totalItems > 1 ? 'Items' : 'Item'}</p>
                  <p className="text-primary font-black text-2xl">₹{total}</p>
                </div>
                <button onClick={onProceed} className="bg-primary text-white font-black py-4 px-10 rounded-full hover:brightness-110 transition-all text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
                  Proceed to Book
                </button>
              </div>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceDetailModal;
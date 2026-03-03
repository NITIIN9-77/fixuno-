
import React, { useEffect } from 'react';
import type { Booking } from '../types';

interface BookingHistoryModalProps {
  bookings: Booking[];
  onClose: () => void;
  onDelete: (id: string) => void;
}

const BookingHistoryModal: React.FC<BookingHistoryModalProps> = ({ bookings, onClose, onDelete }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-surface rounded-xl shadow-2xl w-full max-w-2xl m-4 relative animate-slide-in-up flex flex-col max-h-[80vh] border border-slate-700" onClick={(e) => e.stopPropagation()}>
        <header className="p-6 border-b border-slate-700 flex justify-between items-center bg-surface sticky top-0 z-10 rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-textPrimary">My Bookings</h2>
            <p className="text-sm text-textSecondary">Manage your service requests.</p>
          </div>
          <button onClick={onClose} className="p-2 text-textSecondary hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {bookings.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-background/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-600">
                <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-textSecondary">No bookings found for your number.</p>
              <button onClick={onClose} className="mt-4 text-primary hover:underline font-medium">Book a service now</button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-background/40 border border-slate-800 rounded-lg p-5 hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{booking.id}</span>
                    <h3 className="text-textPrimary font-bold mt-2">{booking.date}</h3>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === 'Confirmed' ? 'bg-green-500/10 text-green-400' : 
                        booking.status === 'Completed' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-yellow-500/10 text-yellow-400'
                    }`}>
                        {booking.status}
                    </span>
                    {booking.status === 'Pending' && (
                        <button 
                            onClick={() => onDelete(booking.id)}
                            className="text-[10px] text-red-400 hover:text-red-300 flex items-center bg-red-500/10 px-2 py-1 rounded transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Cancel Request
                        </button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 border-t border-slate-800 pt-4 mt-4">
                  {booking.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-textSecondary">{item.name} <span className="text-xs">x{item.quantity}</span></span>
                      <span className="text-textPrimary font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-slate-800 mt-2">
                    <span>Total Cost</span>
                    <span>₹{booking.total}</span>
                  </div>
                </div>

                <div className="mt-4 bg-surface/50 p-3 rounded text-xs text-textSecondary">
                    <p className="font-bold text-textPrimary mb-1">Service Address:</p>
                    <p>{booking.userAddress}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="p-4 border-t border-slate-700 bg-surface/50 text-center text-[10px] text-textSecondary uppercase tracking-widest">
            Fixuno Secure Data Management System
        </footer>
      </div>
    </div>
  );
};

export default BookingHistoryModal;

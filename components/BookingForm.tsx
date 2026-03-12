
import React, { useState, useEffect } from 'react';
import type { CartItem, User, Booking } from '../types';

interface BookingFormProps {
  cart: CartItem[];
  userProfile: User | null;
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
}

interface FormErrors {
  phone?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ cart, userProfile, onClose, onSuccess }) => {
  const [name, setName] = useState(userProfile?.name || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [address, setAddress] = useState(userProfile?.address || '');
  const [isLocating, setIsLocating] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionError, setSubmissionError] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [lastBookingId, setLastBookingId] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)} (Approximate Location)`);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please check your browser permissions and enter it manually.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const cleanPhone = phone.replace(/\s/g, '');
    if (!/^\d{10}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');

    if (!validateForm()) return;
    if (!name || !phone || !address) {
        alert("Please fill in all fields.");
        return;
    }

    setSubmissionStatus('submitting');

    const bookingId = `FIX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setLastBookingId(bookingId);
    const dateStr = new Date().toLocaleString("en-IN");

    const newBooking: Booking = {
        id: bookingId,
        date: dateStr,
        items: cart,
        total: total,
        status: 'Pending',
        userName: name,
        userPhone: phone,
        userAddress: address
    };

    const formData = {
      bookingId: bookingId,
      name,
      phone,
      address,
      services: cart.map((item) => `${item.name} (x${item.quantity}) - ₹${item.price}`).join(", "),
      total,
      date: dateStr,
    };

    try {
      const url = "https://script.google.com/macros/s/AKfycbzs1zsZvTOrrklPMhU2S8XrY1pc5rTPqHSjXadiKZnsCn9EESEZ6Zq362Hq_8xMUGRP/exec";
      
      // Sending to Real Backend
      await fetch(url, {
        method: "POST",
        mode: "no-cors", 
        body: JSON.stringify(formData),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });

      setSubmissionStatus("success");
      
      const timer = setTimeout(() => {
        onSuccess(newBooking);
      }, 3000);

      return () => clearTimeout(timer);

    } catch (error) {
      console.error("Error submitting booking:", error);
      setSubmissionError('Failed to submit booking to backend. Please check your connection and try again.');
      setSubmissionStatus('idle');
    }
  };

  if (submissionStatus === 'success') {
      return (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10 text-center animate-scale-up-fade-in animate-glow-success border border-black/5 dark:border-white/5 max-w-md mx-4">
                  <div className="mb-6 text-emerald-500">
                    <svg className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-textPrimary-light dark:text-textPrimary-dark mb-4 uppercase tracking-widest italic">Booking Saved!</h2>
                  <p className="text-textSecondary-light dark:text-textSecondary-dark text-sm mb-8">Your details are securely stored. A technician will contact you shortly.</p>
                  <p className="text-[10px] text-primary font-black bg-primary/10 p-3 rounded-xl uppercase tracking-[0.2em]">Booking ID: {lastBookingId}</p>
              </div>
          </div>
      );
  }

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 w-full max-w-lg m-4 relative animate-slide-in-up overflow-y-auto max-h-[90vh] border border-black/5 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-6 right-6 text-textSecondary-light dark:text-textSecondary-dark hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <h2 className="text-xl font-black text-textPrimary-light dark:text-textPrimary-dark mb-2 uppercase tracking-widest italic">Secure Booking</h2>
        <p className="text-[10px] text-textSecondary-light dark:text-textSecondary-dark mb-8 uppercase tracking-widest">Your details will be synchronized with our server.</p>

        <div className="text-textSecondary-light dark:text-textSecondary-dark mb-8 bg-black/[0.02] dark:bg-white/[0.02] p-6 rounded-2xl border border-black/5 dark:border-white/5">
            <p className="text-[10px] font-black text-primary mb-4 uppercase tracking-widest">Order Summary</p>
            <ul className="space-y-3 max-h-32 overflow-y-auto py-2">
                {cart.map(item => (
                    <li key={item.id} className="flex justify-between items-center text-xs">
                        <span className="font-bold text-textPrimary-light dark:text-textPrimary-dark">{item.name} <span className="text-textSecondary-light/50 font-normal">x{item.quantity}</span></span>
                        <span className="font-black text-textPrimary-light dark:text-textPrimary-dark">₹{item.price * item.quantity}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between font-black text-textPrimary-light dark:text-textPrimary-dark mt-4 text-lg border-t border-black/5 dark:border-white/5 pt-4">
                <span className="uppercase tracking-tighter italic">Total</span>
                <span>₹{total}</span>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[10px] font-black text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-2">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 text-textPrimary-light dark:text-textPrimary-dark focus:outline-none focus:border-primary transition-colors placeholder:text-textSecondary-light/30" placeholder="John Doe" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-[10px] font-black text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-2">Phone Number</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 text-textPrimary-light dark:text-textPrimary-dark focus:outline-none focus:border-primary transition-colors placeholder:text-textSecondary-light/30" placeholder="8423979371" required />
            {formErrors.phone && <p className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-widest">{formErrors.phone}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-[10px] font-black text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-2">Service Address</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-2xl p-4 text-textPrimary-light dark:text-textPrimary-dark focus:outline-none focus:border-primary transition-colors placeholder:text-textSecondary-light/30 resize-none" placeholder="Enter your full address..." required></textarea>
            <button type="button" onClick={handleGetLocation} disabled={isLocating} className="mt-3 text-[10px] font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">
              {isLocating ? '[ Accessing GPS... ]' : '[ Fetch Location from Browser ]'}
            </button>
          </div>
          {submissionError && <p className="text-red-500 text-center bg-red-500/10 p-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest">{submissionError}</p>}
          <div className="flex justify-end pt-6 space-x-4">
            <button type="button" onClick={onClose} disabled={submissionStatus === 'submitting'} className="text-[10px] font-black text-textSecondary-light dark:text-textSecondary-dark hover:text-primary uppercase tracking-widest transition-colors">Cancel</button>
            <button type="submit" disabled={submissionStatus === 'submitting'} className="bg-primary text-white font-black py-4 px-10 rounded-full hover:brightness-110 transition-all disabled:opacity-50 text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
                {submissionStatus === 'submitting' ? 'Saving...' : 'Finalize Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

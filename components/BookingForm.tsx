
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
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-surface rounded-lg shadow-2xl p-8 text-center animate-scale-up-fade-in animate-glow-success">
                  <div className="mb-4 text-green-400">
                    <svg className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-textPrimary mb-3">Booking Saved!</h2>
                  <p className="text-textSecondary text-lg mb-4">Your details are securely stored in our backend. A technician will contact you shortly.</p>
                  <p className="text-sm text-primary font-mono bg-background/50 p-2 rounded">Booking ID: FIX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
          </div>
      );
  }

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-2xl p-8 w-full max-w-lg m-4 relative animate-slide-in-up overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-gray-400 hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <h2 className="text-2xl font-bold text-textPrimary mb-2">Secure Backend Booking</h2>
        <p className="text-sm text-textSecondary mb-6 italic">Your details will be synchronized with our server for service tracking.</p>

        <div className="text-textSecondary mb-6 bg-background/50 p-4 rounded-md">
            <p className="font-semibold text-primary mb-2">Order Summary:</p>
            <ul className="space-y-1 max-h-32 overflow-y-auto divide-y divide-slate-700/50 py-2">
                {cart.map(item => (
                    <li key={item.id} className="flex justify-between items-center text-sm pt-2">
                        <span>{item.name} <span className="text-textSecondary/80">x{item.quantity}</span></span>
                        <span className="font-medium text-textPrimary">₹{item.price * item.quantity}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between font-bold text-textPrimary mt-2 text-lg border-t border-slate-700 pt-2">
                <span>Total Amount</span>
                <span>₹{total}</span>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-textSecondary">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-background border border-slate-600 rounded-md text-textPrimary focus:ring-primary focus:border-primary" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-textSecondary">Phone Number</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-background border border-slate-600 rounded-md text-textPrimary focus:ring-primary focus:border-primary" required />
            {formErrors.phone && <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-textSecondary">Service Address</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-background border border-slate-600 rounded-md text-textPrimary focus:ring-primary focus:border-primary" required></textarea>
            <button type="button" onClick={handleGetLocation} disabled={isLocating} className="mt-2 text-sm text-primary hover:underline">
              {isLocating ? 'Accessing GPS...' : 'Fetch Location from Browser'}
            </button>
          </div>
          {submissionError && <p className="text-red-400 text-center bg-red-500/10 p-3 rounded-md text-sm">{submissionError}</p>}
          <div className="flex justify-end pt-4 space-x-3">
            <button type="button" onClick={onClose} disabled={submissionStatus === 'submitting'} className="px-4 py-2 text-textSecondary hover:text-white transition-colors">Cancel</button>
            <button type="submit" disabled={submissionStatus === 'submitting'} className="bg-primary text-white font-bold py-2 px-8 rounded-md hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                {submissionStatus === 'submitting' ? 'Saving to Backend...' : 'Finalize Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;


import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Reviews from './components/Reviews';
import BookingForm from './components/BookingForm';
import ChatModal from './components/ChatModal';
import Footer from './components/Footer';
import ServiceDetailModal from './components/ServiceDetailModal';
import BookingHistoryModal from './components/BookingHistoryModal';
import AdminDashboard from './components/AdminDashboard';
import ServiceTracker from './components/ServiceTracker';
import { SERVICES } from './constants';
import type { Service, CartItem, SubService, User, Booking } from './types';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname.toLowerCase());
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [globalBookings, setGlobalBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('fixuno_user');
    const storedHistory = localStorage.getItem('fixuno_global_bookings');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedHistory) setGlobalBookings(JSON.parse(storedHistory));
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.toLowerCase());
  }, []);

  useEffect(() => {
    const path = currentPath;
    setIsServiceDetailOpen(false);
    setIsBookingFormOpen(false);
    setIsHistoryOpen(false);
    setIsAdminDashboardOpen(false);

    const match = SERVICES.find(s => path.includes(s.id));
    if (match) { setSelectedService(match); setIsServiceDetailOpen(true); }
  }, [currentPath]);

  const handleBookingSuccess = (newBooking: Booking) => {
    const updated = [newBooking, ...globalBookings];
    setGlobalBookings(updated);
    localStorage.setItem('fixuno_global_bookings', JSON.stringify(updated));
    setIsBookingFormOpen(false);
    setCart([]);
    navigate('/');
  };

  const isReviewsView = currentPath.includes('reviews');
  const isContactView = currentPath.includes('contact-us');

  return (
    <div className="flex flex-col min-h-screen bg-background text-textPrimary">
      <Header onOpenHistory={() => setIsHistoryOpen(true)} onNavigate={navigate} />
      
      <main className="flex-grow">
        {(currentPath === '/' || currentPath === '') && (
          <>
            <Hero onBookNow={() => navigate('/service')} />
            <ServiceTracker />
          </>
        )}

        <div className={(isReviewsView || isContactView) ? 'hidden' : ''}>
          <Services onViewDetails={(s) => { setSelectedService(s); setIsServiceDetailOpen(true); navigate(`/${s.id}`); }} />
        </div>

        {isReviewsView && <div className="pt-10"><Reviews /></div>}

        {isContactView && (
            <div className="container mx-auto px-4 py-20 text-center animate-slide-in-up">
                <h1 className="text-5xl font-black text-primary mb-10 uppercase tracking-[0.2em]">Contact Fixuno</h1>
                <div className="bg-surface p-12 rounded-3xl border border-slate-700 max-w-2xl mx-auto shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                    <p className="text-3xl font-bold mb-4">8423979371</p>
                    <p className="text-xl text-textSecondary mb-10">fixuno628@gmail.com</p>
                    <button onClick={() => navigate('/')} className="bg-primary text-white px-10 py-4 rounded-full font-black tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">BACK HOME</button>
                </div>
            </div>
        )}
      </main>

      <Footer onAdminLogin={() => { const p = prompt("Admin PIN:"); if(p==="niko143") setIsAdminDashboardOpen(true); }} onNavigate={navigate} />

      {isServiceDetailOpen && selectedService && (
        <ServiceDetailModal
          service={selectedService}
          cart={cart}
          onAddToCart={(sub) => setCart([...cart, { ...sub, quantity: 1, parentServiceName: selectedService.name }])}
          onUpdateCartQuantity={(id, q) => setCart(cart.map(i => i.id === id ? {...i, quantity: q} : i).filter(i => i.quantity > 0))}
          onClose={() => { setIsServiceDetailOpen(false); navigate('/'); }}
          onProceed={() => { setIsServiceDetailOpen(false); setIsBookingFormOpen(true); }}
        />
      )}
      
      {isBookingFormOpen && <BookingForm cart={cart} userProfile={user} onClose={() => setIsBookingFormOpen(false)} onSuccess={handleBookingSuccess} />}
      {isHistoryOpen && <BookingHistoryModal bookings={globalBookings.filter(b => b.userPhone === user?.phone)} onClose={() => setIsHistoryOpen(false)} onDelete={() => {}} />}
      {isAdminDashboardOpen && <AdminDashboard bookings={globalBookings} onClose={() => setIsAdminDashboardOpen(false)} onUpdateStatus={() => {}} onDelete={() => {}} />}
      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} onOpen={() => setIsChatModalOpen(true)} />
    </div>
  );
};

export default App;

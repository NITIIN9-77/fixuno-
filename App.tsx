
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname.toLowerCase());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isHome = currentPath === '/' || currentPath === '';
  const isReviews = currentPath.includes('/reviews');
  const isContact = currentPath.includes('/contact-us');

  const handleBookingSuccess = (newBooking: Booking) => {
    const updated = [newBooking, ...globalBookings];
    setGlobalBookings(updated);
    localStorage.setItem('fixuno_global_bookings', JSON.stringify(updated));
    setIsBookingFormOpen(false);
    setCart([]);
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-textPrimary">
      <Header onOpenHistory={() => setIsHistoryOpen(true)} onNavigate={navigate} />
      
      <main className="flex-grow">
        {isHome && (
          <>
            <Hero onBookNow={() => navigate('/service')} />
            <ServiceTracker />
            <Services onViewDetails={(s) => { setSelectedService(s); setIsServiceDetailOpen(true); }} />
          </>
        )}

        {isReviews && (
          <div className="pt-10 animate-fade-in">
            <Reviews />
          </div>
        )}

        {isContact && (
            <div className="container mx-auto px-4 py-24 text-center animate-slide-in-up">
                <h1 className="text-5xl font-black text-primary mb-10 uppercase tracking-widest">Connect with FIXUNO</h1>
                <div className="bg-surface p-12 rounded-3xl border border-slate-700 max-w-2xl mx-auto shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
                    <p className="text-4xl font-black mb-6 tracking-tight">8423979371</p>
                    <p className="text-xl text-textSecondary mb-12">fixuno628@gmail.com</p>
                    <button onClick={() => navigate('/')} className="bg-primary text-white font-black px-12 py-5 rounded-full text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all">BACK HOME</button>
                </div>
            </div>
        )}
      </main>

      <Footer onAdminLogin={() => { const p = prompt("PIN:"); if(p==="niko143") setIsAdminDashboardOpen(true); }} onNavigate={navigate} />

      {isServiceDetailOpen && selectedService && (
        <ServiceDetailModal
          service={selectedService}
          cart={cart}
          onAddToCart={(sub) => setCart([...cart, { ...sub, quantity: 1, parentServiceName: selectedService.name }])}
          onUpdateCartQuantity={(id, q) => setCart(cart.map(i => i.id === id ? {...i, quantity: q} : i).filter(i => i.quantity > 0))}
          onClose={() => setIsServiceDetailOpen(false)}
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

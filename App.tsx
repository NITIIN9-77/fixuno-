
import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuickServiceGrid from './components/QuickServiceGrid';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import ServiceTracker from './components/ServiceTracker';
import { SERVICES } from './constants';
import type { Service, CartItem, SubService, User, Booking } from './types';

// Lazy load modals for better initial performance
const BookingForm = lazy(() => import('./components/BookingForm'));
const ServiceDetailModal = lazy(() => import('./components/ServiceDetailModal'));

const App: React.FC = () => {
  // Navigation State
  const [currentPath, setCurrentPath] = useState(window.location.pathname.toLowerCase());
  
  // Modal states
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState<boolean>(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  
  // Data states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Simulated "Backend" Storage (localStorage)
  const [user, setUser] = useState<User | null>(null);
  const [globalBookings, setGlobalBookings] = useState<Booking[]>([]);

  // Load "Backend" data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fixuno_user');
    const storedGlobalHistory = localStorage.getItem('fixuno_global_bookings');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedGlobalHistory) setGlobalBookings(JSON.parse(storedGlobalHistory));
  }, []);

  // Helper to update URL without reload
  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.toLowerCase());
  }, []);

  // Routing Logic
  useEffect(() => {
    const path = currentPath;
    
    // Reset Modal States
    setIsServiceDetailOpen(false);
    setIsBookingFormOpen(false);
    setIsHistoryOpen(false);
    setIsAdminDashboardOpen(false);

    // Deep Linking to Services
    if (path.includes('ac-repair')) {
      const service = SERVICES.find(s => s.id === 'ac');
      if (service) { setSelectedService(service); setIsServiceDetailOpen(true); }
    } else if (path.includes('minor-home-repairs')) {
      const service = SERVICES.find(s => s.id === 'minor_work');
      if (service) { setSelectedService(service); setIsServiceDetailOpen(true); }
    } else if (path.includes('large-appliance-repair')) {
      const service = SERVICES.find(s => s.id === 'large-appliance');
      if (service) { setSelectedService(service); setIsServiceDetailOpen(true); }
    } else if (path.includes('service')) {
      setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (path.includes('follow-us') || path.includes('contact-us')) {
      setTimeout(() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [currentPath]);

  // Handle Browser Back/Forward
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname.toLowerCase());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleBookingSuccess = useCallback((newBooking: Booking) => {
    setGlobalBookings(prev => {
      const updatedGlobal = [newBooking, ...prev];
      localStorage.setItem('fixuno_global_bookings', JSON.stringify(updatedGlobal));
      return updatedGlobal;
    });
    
    const updatedUser: User = {
        name: newBooking.userName,
        phone: newBooking.userPhone,
        address: newBooking.userAddress,
        lastBookingDate: newBooking.date
    };
    setUser(updatedUser);
    localStorage.setItem('fixuno_user', JSON.stringify(updatedUser));
    
    setIsBookingFormOpen(false);
    setCart([]); 
    setSelectedService(null);
    navigate('/'); 
  }, [navigate]);

  const handleUpdateBookingStatus = useCallback((bookingId: string, newStatus: Booking['status']) => {
    setGlobalBookings(prev => {
      const updated = prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
      localStorage.setItem('fixuno_global_bookings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleDeleteBooking = useCallback((bookingId: string) => {
      if (window.confirm("Are you sure you want to delete/cancel this booking?")) {
        setGlobalBookings(prev => {
          const updated = prev.filter(b => b.id !== bookingId);
          localStorage.setItem('fixuno_global_bookings', JSON.stringify(updated));
          return updated;
        });
      }
  }, []);

  const handleAddToCart = useCallback((subService: SubService, parentServiceName: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === subService.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === subService.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...subService, quantity: 1, parentServiceName }];
    });
  }, []);

  const handleUpdateCartQuantity = useCallback((subServiceId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) return prevCart.filter(item => item.id !== subServiceId);
      return prevCart.map(item => item.id === subServiceId ? { ...item, quantity } : item);
    });
  }, []);

  const userBookings = globalBookings.filter(b => b.userPhone === user?.phone);

  // Check if we are in a "Dedicated View"
  const isContactView = currentPath.includes('contact-us');
  const isServiceView = currentPath.includes('service');

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark">
      <Header onNavigate={navigate} />
      
      <main className={`flex-grow animate-fade-in ${currentPath === '/' || currentPath === '' ? 'pt-16' : 'pt-20'}`}>
        {/* Only show Hero on Home Path */}
        {(currentPath === '/' || currentPath === '') && !isContactView && !isServiceView && (
          <div className="flex flex-col">
            <QuickServiceGrid onServiceClick={(s) => {
                setSelectedService(s); 
                setIsServiceDetailOpen(true); 
                if(s.id === 'ac') navigate('/ac-repair');
                else if(s.id === 'minor_work') navigate('/minor-home-repairs');
                else if(s.id === 'large-appliance') navigate('/large-appliance-repair');
            }} />
            <Hero onBookNow={() => navigate('/service')} />
          </div>
        )}

        {/* Services Section */}
        <div className={isContactView ? 'hidden' : ''}>
           <Services onViewDetails={(s) => { 
                setSelectedService(s); 
                setIsServiceDetailOpen(true); 
                if(s.id === 'ac') navigate('/ac-repair');
                else if(s.id === 'minor_work') navigate('/minor-home-repairs');
                else if(s.id === 'large-appliance') navigate('/large-appliance-repair');
            }} />
        </div>

        {/* Contact Us Dedicated View */}
        {isContactView && (
            <div className="container mx-auto px-4 py-20 text-center animate-slide-in-up">
                <h1 className="text-5xl md:text-7xl font-black text-textPrimary mb-8 uppercase tracking-tighter">CONTACT</h1>
                <div className="bg-surface p-12 rounded-[40px] border border-slate-700 max-w-2xl mx-auto shadow-2xl space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary group-hover:w-4 transition-all"></div>
                    <div>
                        <p className="text-[10px] text-textSecondary uppercase font-black tracking-[0.4em] mb-2">Priority Hotline</p>
                        <p className="text-4xl font-black text-primary">8423979371</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-textSecondary uppercase font-black tracking-[0.4em] mb-2">Support Email</p>
                        <p className="text-xl font-bold text-textPrimary">fixuno628@gmail.com</p>
                    </div>
                    <div className="pt-6 border-t border-slate-800">
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-primary text-white font-black px-12 py-4 rounded-full hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Reviews - Show on Home or Service View */}
        {!isContactView && <Reviews />}

        {/* Dynamic Service Tracker */}
        {!isContactView && <ServiceTracker />}
      </main>

      <Footer 
        onNavigate={navigate}
      />

      <Suspense fallback={null}>
        {isServiceDetailOpen && selectedService && (
          <ServiceDetailModal
            service={selectedService}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onClose={() => { setIsServiceDetailOpen(false); navigate(isServiceView ? '/service' : '/'); }}
            onProceed={() => { setIsServiceDetailOpen(false); setIsBookingFormOpen(true); }}
          />
        )}
        
        {isBookingFormOpen && (
          <BookingForm
            cart={cart}
            userProfile={user}
            onClose={() => { setIsBookingFormOpen(false); navigate('/'); }}
            onSuccess={handleBookingSuccess}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;

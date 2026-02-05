
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
import { SERVICES } from './constants';
import type { Service, CartItem, SubService, User, Booking } from './types';

const App: React.FC = () => {
  // Navigation State
  const [currentPath, setCurrentPath] = useState(window.location.pathname.toLowerCase());
  
  // Modal states
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState<boolean>(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState<boolean>(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
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
    } else if (path.includes('minor-home-repairs') || path.includes('minor%20home%20repairs')) {
      const service = SERVICES.find(s => s.id === 'minor_work');
      if (service) { setSelectedService(service); setIsServiceDetailOpen(true); }
    } else if (path.includes('large-appliance-repair') || path.includes('large%20appliance%20repair')) {
      const service = SERVICES.find(s => s.id === 'large-appliance');
      if (service) { setSelectedService(service); setIsServiceDetailOpen(true); }
    } else if (path.includes('service')) {
      // If it's just the service page, we might want to hide other things or scroll
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

  const handleBookingSuccess = (newBooking: Booking) => {
    const updatedGlobal = [newBooking, ...globalBookings];
    const updatedUser: User = {
        name: newBooking.userName,
        phone: newBooking.userPhone,
        address: newBooking.userAddress,
        lastBookingDate: newBooking.date
    };
    setGlobalBookings(updatedGlobal);
    setUser(updatedUser);
    localStorage.setItem('fixuno_global_bookings', JSON.stringify(updatedGlobal));
    localStorage.setItem('fixuno_user', JSON.stringify(updatedUser));
    setIsBookingFormOpen(false);
    setCart([]); 
    setSelectedService(null);
    navigate('/'); 
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    const updated = globalBookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    setGlobalBookings(updated);
    localStorage.setItem('fixuno_global_bookings', JSON.stringify(updated));
  };

  const handleDeleteBooking = (bookingId: string) => {
      if (window.confirm("Are you sure you want to delete/cancel this booking?")) {
        const updated = globalBookings.filter(b => b.id !== bookingId);
        setGlobalBookings(updated);
        localStorage.setItem('fixuno_global_bookings', JSON.stringify(updated));
      }
  };

  const handleAddToCart = (subService: SubService, parentServiceName: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === subService.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === subService.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...subService, quantity: 1, parentServiceName }];
    });
  };

  const handleUpdateCartQuantity = (subServiceId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) return prevCart.filter(item => item.id !== subServiceId);
      return prevCart.map(item => item.id === subServiceId ? { ...item, quantity } : item);
    });
  };

  const userBookings = globalBookings.filter(b => b.userPhone === user?.phone);

  // Check if we are in a "Dedicated View"
  const isContactView = currentPath.includes('contact-us');
  const isServiceView = currentPath.includes('service');

  return (
    <div className="flex flex-col min-h-screen bg-background text-textPrimary">
      <Header onOpenHistory={() => setIsHistoryOpen(true)} onNavigate={navigate} />
      
      <main className="flex-grow animate-fade-in">
        {/* Only show Hero on Home Path */}
        {(currentPath === '/' || currentPath === '') && !isContactView && !isServiceView && (
          <Hero onBookNow={() => navigate('/service')} />
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
                <h1 className="text-4xl font-black text-primary mb-6 uppercase tracking-widest">Contact Fixuno</h1>
                <div className="bg-surface p-10 rounded-2xl border border-slate-700 max-w-xl mx-auto shadow-2xl">
                    <p className="text-2xl font-bold mb-4">Phone: 8423979371</p>
                    <p className="text-xl text-textSecondary mb-8">Email: fixuno628@gmail.com</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-primary/20 text-primary border border-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        )}

        {/* Reviews - Show on Home or Service View */}
        {!isContactView && <Reviews />}
      </main>

      <Footer 
        onAdminLogin={() => {
          const pin = prompt("Enter Partner Admin PIN:");
          if (pin === "niko143") { setIsAdminDashboardOpen(true); } 
          else if (pin !== null) { alert("Invalid PIN."); }
        }} 
        onNavigate={navigate}
      />

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

      {isHistoryOpen && (
        <BookingHistoryModal 
            bookings={userBookings} 
            onClose={() => { setIsHistoryOpen(false); navigate('/'); }} 
            onDelete={handleDeleteBooking}
        />
      )}

      {isAdminDashboardOpen && (
          <AdminDashboard 
            bookings={globalBookings}
            onClose={() => setIsAdminDashboardOpen(false)}
            onUpdateStatus={handleUpdateBookingStatus}
            onDelete={handleDeleteBooking}
          />
      )}

      <ChatModal 
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        onOpen={() => setIsChatModalOpen(true)}
      />
    </div>
  );
};

export default App;

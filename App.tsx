
import React, { useState, useEffect } from 'react';
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
import type { Service, CartItem, SubService, User, Booking } from './types';

const App: React.FC = () => {
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

  // Back Button Logic
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isServiceDetailOpen || isBookingFormOpen || isChatModalOpen || isHistoryOpen || isAdminDashboardOpen) {
        setIsServiceDetailOpen(false);
        setIsBookingFormOpen(false);
        setIsChatModalOpen(false);
        setIsHistoryOpen(false);
        setIsAdminDashboardOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    if (isServiceDetailOpen || isBookingFormOpen || isChatModalOpen || isHistoryOpen || isAdminDashboardOpen) {
      window.history.pushState({ modalOpen: true }, '');
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isServiceDetailOpen, isBookingFormOpen, isChatModalOpen, isHistoryOpen, isAdminDashboardOpen]);

  const handleBookingSuccess = (newBooking: Booking) => {
    // 1. Update Global "Backend"
    const updatedGlobal = [newBooking, ...globalBookings];
    const updatedUser: User = {
        name: newBooking.userName,
        phone: newBooking.userPhone,
        address: newBooking.userAddress,
        lastBookingDate: newBooking.date
    };

    setGlobalBookings(updatedGlobal);
    setUser(updatedUser);

    // 2. Persist to "Backend"
    localStorage.setItem('fixuno_global_bookings', JSON.stringify(updatedGlobal));
    localStorage.setItem('fixuno_user', JSON.stringify(updatedUser));

    // 3. Reset
    setIsBookingFormOpen(false);
    setCart([]); 
    setSelectedService(null);
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    const updated = globalBookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    setGlobalBookings(updated);
    localStorage.setItem('fixuno_global_bookings', JSON.stringify(updated));
  };

  const handleDeleteBooking = (bookingId: string) => {
      if (window.confirm("Are you sure you want to delete this booking from the backend?")) {
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

  // Filter global bookings for the current logged-in user view
  const userBookings = globalBookings.filter(b => b.userPhone === user?.phone);

  return (
    <div className="flex flex-col min-h-screen bg-background text-textPrimary">
      <Header onOpenHistory={() => setIsHistoryOpen(true)} />
      <main className="flex-grow">
        <Hero onBookNow={() => {
          const mainServicesSection = document.getElementById('services');
          if (mainServicesSection) mainServicesSection.scrollIntoView({ behavior: 'smooth' });
        }} />
        <Services onViewDetails={(s) => { setSelectedService(s); setIsServiceDetailOpen(true); }} />
        <Reviews />
      </main>
      <Footer onAdminLogin={() => {
          const pin = prompt("Enter Partner Admin PIN:");
          if (pin === "1234") {
              setIsAdminDashboardOpen(true);
          } else if (pin !== null) {
              alert("Invalid PIN.");
          }
      }} />

      {isServiceDetailOpen && selectedService && (
        <ServiceDetailModal
          service={selectedService}
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onClose={() => setIsServiceDetailOpen(false)}
          onProceed={() => { setIsServiceDetailOpen(false); setIsBookingFormOpen(true); }}
        />
      )}
      
      {isBookingFormOpen && (
        <BookingForm
          cart={cart}
          userProfile={user}
          onClose={() => setIsBookingFormOpen(false)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {isHistoryOpen && (
        <BookingHistoryModal 
            bookings={userBookings} 
            onClose={() => setIsHistoryOpen(false)} 
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

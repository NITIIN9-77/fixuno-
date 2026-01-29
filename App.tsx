
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
import type { Service, CartItem, SubService, User, Booking } from './types';

const App: React.FC = () => {
  // Modal states
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState<boolean>(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState<boolean>(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  
  // Data states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Simulated "Backend" Storage (localStorage)
  const [user, setUser] = useState<User | null>(null);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  // Load "Backend" data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fixuno_user');
    const storedHistory = localStorage.getItem('fixuno_bookings');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedHistory) setBookingHistory(JSON.parse(storedHistory));
  }, []);

  // Back Button Logic: Handle mobile back button to close modals
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isServiceDetailOpen || isBookingFormOpen || isChatModalOpen || isHistoryOpen) {
        setIsServiceDetailOpen(false);
        setIsBookingFormOpen(false);
        setIsChatModalOpen(false);
        setIsHistoryOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    if (isServiceDetailOpen || isBookingFormOpen || isChatModalOpen || isHistoryOpen) {
      window.history.pushState({ modalOpen: true }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [isServiceDetailOpen, isBookingFormOpen, isChatModalOpen, isHistoryOpen]);

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setIsServiceDetailOpen(true);
  };

  const closeServiceDetailModal = () => {
    setIsServiceDetailOpen(false);
  };
  
  const handleProceedToBooking = () => {
    if (cart.length > 0) {
      setIsServiceDetailOpen(false);
      setIsBookingFormOpen(true);
    } else {
      alert("Your cart is empty. Please add a service to proceed.");
    }
  };

  const closeBookingForm = () => {
    setIsBookingFormOpen(false);
  };
  
  const handleBookingSuccess = (newBooking: Booking) => {
    // 1. Update Simulated Backend
    const updatedHistory = [newBooking, ...bookingHistory];
    const updatedUser: User = {
        name: newBooking.userName,
        phone: newBooking.userPhone,
        address: newBooking.userAddress,
        lastBookingDate: newBooking.date
    };

    setBookingHistory(updatedHistory);
    setUser(updatedUser);

    // 2. Persist to "Backend" (localStorage)
    localStorage.setItem('fixuno_bookings', JSON.stringify(updatedHistory));
    localStorage.setItem('fixuno_user', JSON.stringify(updatedUser));

    // 3. Reset App State
    setIsBookingFormOpen(false);
    setCart([]); 
    setSelectedService(null);
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
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== subServiceId);
      }
      return prevCart.map(item =>
        item.id === subServiceId ? { ...item, quantity } : item
      );
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-textPrimary">
      <Header onOpenHistory={() => setIsHistoryOpen(true)} />
      <main className="flex-grow">
        <Hero onBookNow={() => {
          const mainServicesSection = document.getElementById('services');
          if (mainServicesSection) {
            mainServicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }} />
        <Services onViewDetails={handleViewDetails} />
        <Reviews />
      </main>
      <Footer />

      {isServiceDetailOpen && selectedService && (
        <ServiceDetailModal
          service={selectedService}
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onClose={closeServiceDetailModal}
          onProceed={handleProceedToBooking}
        />
      )}
      
      {isBookingFormOpen && (
        <BookingForm
          cart={cart}
          userProfile={user}
          onClose={closeBookingForm}
          onSuccess={handleBookingSuccess}
        />
      )}

      {isHistoryOpen && (
        <BookingHistoryModal 
            bookings={bookingHistory} 
            onClose={() => setIsHistoryOpen(false)} 
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

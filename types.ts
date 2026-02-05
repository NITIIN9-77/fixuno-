
import type React from 'react';

export interface SubService {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface Service {
  id: string;
  category: 'Repair' | 'Installation' | 'Maintenance';
  name: string;
  description: string;
  icon: React.ReactNode;
  subServices: SubService[];
  parts?: SubService[];
}

export interface CartItem extends SubService {
  quantity: number;
  parentServiceName: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface User {
  name: string;
  phone: string;
  address: string;
  lastBookingDate?: string;
}

export interface Booking {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Completed';
  userName: string;
  userPhone: string;
  userAddress: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  isVerified: boolean;
  image?: string;
}

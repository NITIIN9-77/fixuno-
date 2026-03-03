
import React from 'react';

export interface SubService {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  subServices: SubService[];
  parts?: SubService[];
}

export interface CartItem extends SubService {
  quantity: number;
  parentServiceName: string;
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
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  userName: string;
  userPhone: string;
  userAddress: string;
}

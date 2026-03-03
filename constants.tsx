
import React from 'react';
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'ac',
    name: 'AC Repair & Service',
    description: 'Expert cooling solutions for all brands. Gas charging, deep cleaning, and installation.',
    badge: 'Popular',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    subServices: [
      { id: 'ac_service', name: 'Deep Cleaning Service', price: 599, description: 'Comprehensive jet pump cleaning for indoor and outdoor units.' },
      { id: 'ac_repair', name: 'Repair Visit', price: 299, description: 'Diagnostic visit and minor fixes.' }
    ],
    parts: [
      { id: 'capacitor', name: 'Run Capacitor', price: 450 },
      { id: 'gas_refill', name: 'Gas Refill (per kg)', price: 2500 }
    ]
  },
  {
    id: 'minor_work',
    name: 'Minor Home Repairs',
    description: 'Electrical, plumbing, and carpentry fixes. Quick and reliable service for your home.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 011 1V4z" />
      </svg>
    ),
    subServices: [
      { id: 'elec_fix', name: 'Electrical Fix', price: 199, description: 'Switch, socket, or fan repair.' },
      { id: 'plumb_fix', name: 'Plumbing Fix', price: 249, description: 'Tap leak or pipe repair.' }
    ]
  },
  {
    id: 'large-appliance',
    name: 'Large Appliance Repair',
    description: 'Washing machine, refrigerator, and microwave repair by certified professionals.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    subServices: [
      { id: 'wm_repair', name: 'Washing Machine Repair', price: 499 },
      { id: 'fridge_repair', name: 'Refrigerator Repair', price: 599 }
    ]
  }
];

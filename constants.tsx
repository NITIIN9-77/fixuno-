
import React from 'react';
import type { Service } from './types';

const AirConditionerIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 15h2v2h-2v-2zm-2 0h-2v2h2v-2zm6 0h-2v2h2v-2zm-1-8H8c-1.1 0-2 .9-2 2v4h12v-4c0-1.1-.9-2-2-2zm-1.5 3.5h-5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h5c.28 0 .5.22.5.5s-.22.5-.5.5zM20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM4 17V7h16v10H4z" />
    </svg>
);

const FanIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v-6h-2v6zm0-8h2V7h-2v1zm-3.95 9.95l1.41-1.41C9.05 15.12 9 13.59 9 12c0-1.59.12-3.12 1.46-4.54l-1.41-1.41C7.6 7.5 7 9.67 7 12s.6 4.5 2.05 6.05zM15.54 16.54c1.34-1.42 1.46-2.95 1.46-4.54s-.12-3.12-1.46-4.54l1.41-1.41C16.4 7.5 17 9.67 17 12s-.6 4.5-2.05 6.05l-1.41-1.41z" />
    </svg>
);

const WiringIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const LightBulbIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const ApplianceRepairIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 00-1.806.547" transform="rotate(45 12 12)"/>
    </svg>
);

const HandymanIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const SERVICES: Service[] = [
  {
    id: 'ac',
    category: 'Maintenance',
    name: 'AC Service & Repair',
    description: 'Expert installation, repair, and maintenance for all types of air conditioners.',
    icon: <AirConditionerIcon className="w-12 h-12 text-primary" />,
    subServices: [
      { id: 'ac-s-jet', name: 'Split AC Jet Service', price: 599, description: 'Deep cleaning with high-pressure water jet.' },
      { id: 'ac-gas', name: 'AC Gas Charge (up to 1.5 ton)', price: 2499, description: 'Refilling of refrigerant gas to restore cooling.' },
      { id: 'ac-s-install', name: 'Split AC Installation', price: 1499, description: 'Professional installation of new split units.' },
      { id: 'ac-inspect', name: 'AC Repair (Inspection Fee)', price: 299, description: 'Basic visit fee for diagnosis.' },
    ]
  },
  {
    id: 'lighting',
    category: 'Installation',
    name: 'Lighting & Fixtures',
    description: 'Installation and repair of tube lights, bulb holders, and decorative lighting.',
    icon: <LightBulbIcon className="w-12 h-12 text-primary" />,
    subServices: [
        { id: 'light-tube-install', name: 'Tube Light Installation', price: 149, description: 'Professional installation of LED tube lights.' },
        { id: 'light-decorative', name: 'Decorative/Festive Lights', price: 499, description: 'Setup of festive lights for home.' },
    ]
  },
  {
    id: 'large-appliance',
    category: 'Repair',
    name: 'Large Appliance Repair',
    description: 'Fixing all major home appliances including refrigerators and washing machines.',
    icon: <ApplianceRepairIcon className="w-12 h-12 text-primary" />,
    subServices: [
        { id: 'app-fridge', name: 'Refrigerator Repair (Inspection)', price: 299, description: 'Visit and diagnosis of fridge issues.' },
        { id: 'app-wm', name: 'Washing Machine Repair (Inspection)', price: 299, description: 'Inspection charge for washing machine faults.' },
    ]
  },
  {
    id: 'wiring',
    category: 'Maintenance',
    name: 'Home Wiring Solutions',
    description: 'Complete home wiring, re-wiring, and fault detection.',
    icon: <WiringIcon className="w-12 h-12 text-primary" />,
    subServices: [
        { id: 'wiring-point', name: 'New Wiring Point (per point)', price: 299, description: 'Creating new electrical points with basic wiring.' },
        { id: 'wiring-fault', name: 'Fault Detection & Repair', price: 300, description: 'Identifying and fixing short circuits.' },
    ]
  },
  {
    id: 'minor_work',
    category: 'Repair',
    name: 'Minor Home Repairs',
    description: 'Quick fixes for all the small but important jobs around your house.',
    icon: <HandymanIcon className="w-12 h-12 text-primary" />,
    subServices: [
        { id: 'mw-drilling', name: 'Drill & Hang (per item)', price: 99, description: 'Drilling for photo frames, clocks, etc.' },
        { id: 'mw-hinge', name: 'Door Hinge/Handle Repair', price: 149, description: 'Fixing loose hinges or handles.' },
    ]
  },
];

export const FAQS = [
    { q: "How quickly can a technician arrive?", a: "Typically within 2-4 hours for major urban areas." },
    { q: "Are the service charges fixed?", a: "The inspection fee is fixed. Final labor depends on work complexity." },
    { q: "Do you provide warranty?", a: "Yes, we provide a 30-day service warranty on all labor." },
];

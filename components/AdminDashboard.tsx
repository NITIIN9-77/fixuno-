
import React, { useState } from 'react';
import type { Booking } from '../types';

interface AdminDashboardProps {
  bookings: Booking[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: Booking['status']) => void;
  onDelete: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ bookings, onClose, onUpdateStatus, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    revenue: bookings.reduce((sum, b) => sum + (b.status === 'Completed' ? b.total : 0), 0),
    potential: bookings.reduce((sum, b) => sum + b.total, 0),
  };

  const filteredBookings = bookings.filter(b => 
    b.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.userPhone.includes(searchTerm) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col overflow-hidden animate-fade-in">
      {/* Sidebar / Topbar */}
      <header className="bg-surface border-b border-slate-700 p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center">
            <div className="bg-primary p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            </div>
            <div>
                <h1 className="text-xl font-bold text-textPrimary uppercase tracking-widest">Partner Control Panel</h1>
                <p className="text-xs text-textSecondary">Backend Management System</p>
            </div>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
                <input 
                    type="text" 
                    placeholder="Search customer, phone or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-background border border-slate-700 rounded-full px-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:border-primary transition-all"
                />
            </div>
            <button onClick={onClose} className="bg-slate-800 text-textSecondary hover:text-white p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 md:p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface p-6 rounded-xl border border-slate-700">
                <p className="text-textSecondary text-xs uppercase font-bold tracking-tighter">Total Requests</p>
                <h3 className="text-3xl font-black text-textPrimary mt-1">{stats.total}</h3>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-slate-700">
                <p className="text-textSecondary text-xs uppercase font-bold tracking-tighter">Pending Action</p>
                <h3 className="text-3xl font-black text-yellow-500 mt-1">{stats.pending}</h3>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-slate-700">
                <p className="text-textSecondary text-xs uppercase font-bold tracking-tighter">Potential Earnings</p>
                <h3 className="text-3xl font-black text-primary mt-1">₹{stats.potential}</h3>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-slate-700">
                <p className="text-textSecondary text-xs uppercase font-bold tracking-tighter">Completed Revenue</p>
                <h3 className="text-3xl font-black text-green-500 mt-1">₹{stats.revenue}</h3>
            </div>
        </div>

        {/* Bookings List */}
        <div className="bg-surface rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
                <h2 className="font-bold text-textPrimary">Recent Customer Activity</h2>
                <span className="text-xs text-textSecondary">{filteredBookings.length} results</span>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-textSecondary uppercase bg-slate-900">
                        <tr>
                            <th className="px-6 py-3">Booking ID & Date</th>
                            <th className="px-6 py-3">Customer Details</th>
                            <th className="px-6 py-3">Services</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {filteredBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-textPrimary">{b.id}</p>
                                    <p className="text-xs text-textSecondary">{b.date}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-textPrimary">{b.userName}</p>
                                    <p className="text-xs text-primary">{b.userPhone}</p>
                                    <p className="text-xs text-textSecondary truncate max-w-[150px]">{b.userAddress}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {b.items.map((item, idx) => (
                                            <span key={idx} className="text-[10px] bg-slate-700 text-textSecondary px-1.5 py-0.5 rounded">
                                                {item.name} x{item.quantity}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-textPrimary">
                                    ₹{b.total}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                                        b.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                                        b.status === 'Confirmed' ? 'bg-green-500/10 text-green-400' :
                                        'bg-blue-500/10 text-blue-400'
                                    }`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        {b.status === 'Pending' && (
                                            <button 
                                                onClick={() => onUpdateStatus(b.id, 'Confirmed')}
                                                className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-3 rounded transition-colors"
                                            >
                                                Confirm
                                            </button>
                                        )}
                                        {b.status === 'Confirmed' && (
                                            <button 
                                                onClick={() => onUpdateStatus(b.id, 'Completed')}
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-3 rounded transition-colors"
                                            >
                                                Done
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => onDelete(b.id)}
                                            className="text-textSecondary hover:text-red-400 p-1"
                                            title="Delete permanently"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredBookings.length === 0 && (
                    <div className="p-12 text-center text-textSecondary italic">
                        No activity found matching your search.
                    </div>
                )}
            </div>
        </div>
      </main>
      <footer className="bg-surface border-t border-slate-700 p-4 text-center">
          <p className="text-[10px] text-textSecondary uppercase tracking-widest">
            Fixuno Partner v1.0 • Secure Session
          </p>
      </footer>
    </div>
  );
};

export default AdminDashboard;

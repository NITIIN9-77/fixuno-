
import React, { useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  isVerified: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  { id: 1, name: "Rahul Sharma", rating: 5, text: "Excellent AC service! The technician was very professional and cleaned the unit perfectly. Cooling is back to 100%.", date: "Oct 12, 2024", isVerified: true },
  { id: 2, name: "Priya Verma", rating: 5, text: "Got my RO serviced yesterday. Very fast response and honest pricing. Highly recommended for home repairs.", date: "Oct 10, 2024", isVerified: true },
  { id: 3, name: "Amit Gupta", rating: 4, text: "Wiring installation was done neatly. The team arrived on time and explained everything clearly.", date: "Oct 08, 2024", isVerified: true },
  { id: 4, name: "Suresh Mehra", rating: 5, text: "Best service in the area. They fixed my washing machine which others couldn't diagnose properly.", date: "Oct 05, 2024", isVerified: true },
  { id: 5, name: "Deepika Singh", rating: 5, text: "Lighting setup for my balcony looks amazing. Very creative technicians!", date: "Oct 02, 2024", isVerified: true },
];

const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`${className} ${filled ? 'text-yellow-400' : 'text-slate-700'}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Reviews: React.FC = () => {
  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);

  return (
    <section className="py-24 bg-background animate-fade-in">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black text-textPrimary uppercase tracking-tighter mb-6">Customer Reviews</h1>
            <p className="text-xl text-textSecondary max-w-2xl mx-auto">Verified stories from homeowners who trust FIXUNO for their daily service needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-surface rounded-3xl p-10 border border-slate-700 shadow-2xl relative overflow-hidden group hover:border-primary transition-all">
              <div className="flex justify-between items-center mb-8">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} filled={s <= review.rating} className="w-5 h-5" />
                  ))}
                </div>
                {review.isVerified && (
                    <span className="flex items-center text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-500/20">
                        Verified
                    </span>
                )}
              </div>
              
              <p className="text-textPrimary text-lg italic mb-10 leading-relaxed font-medium">"{review.text}"</p>
              
              <div className="flex items-center justify-between mt-auto border-t border-slate-800 pt-6">
                <h4 className="font-black text-textPrimary tracking-tight">{review.name}</h4>
                <span className="text-[10px] text-textSecondary uppercase font-black tracking-widest">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-surface/50 border border-slate-800 rounded-[40px] p-16 text-center max-w-4xl mx-auto shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <h3 className="text-4xl font-black text-textPrimary mb-6 tracking-tight">How was your service?</h3>
            <p className="text-xl text-textSecondary mb-10 leading-relaxed max-w-2xl mx-auto">Help our technicians reach the top by sharing your honest feedback. Your review helps the Fixuno community grow.</p>
            <button className="bg-primary text-white font-black px-12 py-5 rounded-full shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.2em] text-sm">Write My Review</button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;


import React, { useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  isVerified: boolean;
  image?: string;
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-textPrimary uppercase tracking-tighter mb-4">Verified Testimonials</h1>
          <p className="text-xl text-textSecondary max-w-2xl mx-auto">Real stories from customers who trust FIXUNO for their home solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-surface rounded-2xl p-8 border border-slate-700 shadow-xl relative overflow-hidden group hover:border-primary transition-all">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} filled={s <= review.rating} className="w-5 h-5" />
                  ))}
                </div>
                {review.isVerified && (
                    <span className="flex items-center text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-widest">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Verified
                    </span>
                )}
              </div>
              
              <p className="text-textPrimary text-lg italic mb-8 leading-relaxed">"{review.text}"</p>
              
              <div className="flex items-center justify-between mt-auto">
                <h4 className="font-bold text-textPrimary">{review.name}</h4>
                <span className="text-xs text-textSecondary uppercase font-bold">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-surface/50 border border-slate-800 rounded-3xl p-12 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-black text-textPrimary mb-6">Recently Finished a Service?</h3>
            <p className="text-textSecondary mb-8 text-lg">Your feedback helps our community and rewards our hard-working technicians.</p>
            <button className="bg-primary text-white font-black px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-all uppercase tracking-widest">Share Your Story</button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

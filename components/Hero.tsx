
import React from 'react';

interface HeroProps {
    onBookNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  const heroImageUrl = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=75&w=1280&auto=format&fit=crop";

  return (
    <section className="relative h-[40vh] md:h-[60vh] min-h-[300px] md:min-h-[500px] flex items-center overflow-hidden bg-background-light dark:bg-background-dark">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-40 grayscale"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-background-light dark:from-background-dark via-background-light/80 dark:via-background-dark/80 to-transparent"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-flex items-center space-x-3 mb-4 md:mb-8">
            <div className="w-8 h-px bg-primary"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.5em]">Premium Standard</span>
          </div>
          
          <h1 className="text-4xl md:text-8xl font-black text-textPrimary-light dark:text-textPrimary-dark tracking-tighter uppercase italic leading-[0.85] mb-6 md:mb-10">
            Expert Care <br />
            <span className="text-primary">Redefined.</span>
          </h1>
          
          <p className="text-textSecondary-light dark:text-textSecondary-dark text-xs md:text-lg max-w-md leading-relaxed mb-8 md:mb-12">
            The definitive solution for high-end home maintenance, delivered by industry-certified specialists.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8">
            <button 
              onClick={onBookNow}
              className="bg-primary text-white font-black px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs shadow-2xl shadow-primary/20"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

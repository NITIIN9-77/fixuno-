import React, { useState, useRef } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  image?: string;
}

const StarIcon: React.FC<{ filled: boolean; className?: string; onClick?: () => void }> = ({ filled, className, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${filled ? 'text-yellow-400' : 'text-slate-600'} transition-colors duration-200 cursor-pointer`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Reviews: React.FC = () => {
  // Cleared initial mock reviews as requested
  const [reviews, setReviews] = useState<Review[]>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 0 });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRatingClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    const reviewToAdd: Review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: imagePreview || undefined
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: '', text: '', rating: 0 });
    handleRemoveImage();
    setIsFormOpen(false);
  };

  return (
    <section id="reviews" className="py-20 bg-background-light dark:bg-background-dark border-t border-black/5 dark:border-white/5 scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.5em] mb-4">Testimonials</p>
              <h2 className="text-3xl md:text-6xl font-black text-textPrimary-light dark:text-textPrimary-dark tracking-tighter uppercase italic leading-none mb-6">
                Client <br />
                <span className="text-primary">Feedback.</span>
              </h2>
              <p className="text-textSecondary-light dark:text-textSecondary-dark text-sm md:text-base leading-relaxed">
                {reviews.length > 0 
                  ? "A collection of experiences from our clientele who demand the highest standard of home care."
                  : "Be the first to document your experience with our premium home service specialists."}
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="bg-black/5 dark:bg-white/5 text-textPrimary-light dark:text-textPrimary-dark font-bold py-4 px-8 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
              >
                {isFormOpen ? 'Cancel Entry' : 'Submit Review'}
              </button>
            </div>
          </div>

          {isFormOpen && (
            <div className="max-w-2xl mb-20 bg-black/[0.02] dark:bg-white/[0.02] p-8 md:p-10 rounded-3xl border border-black/5 dark:border-white/5 animate-slide-in-up">
              <h3 className="text-xl font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-widest mb-8">New Entry</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-4">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        filled={star <= newReview.rating}
                        className="w-8 h-8 hover:scale-110"
                        onClick={() => handleRatingClick(star)}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-bold text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-3">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 text-textPrimary-light dark:text-textPrimary-dark focus:outline-none focus:border-primary transition-colors placeholder:text-textSecondary-light/30"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-3">Media (Optional)</label>
                    <div className="flex items-center space-x-4">
                      <label className="cursor-pointer text-[10px] font-bold text-textSecondary-light dark:text-textSecondary-dark hover:text-textPrimary-light dark:hover:text-textPrimary-dark transition-colors uppercase tracking-widest">
                        [ Upload File ]
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                      </label>
                      {imagePreview && (
                        <div className="relative">
                          <img src={imagePreview} alt="Preview" className="h-12 w-12 object-cover rounded-lg border border-black/10 dark:border-white/10" />
                          <button type="button" onClick={handleRemoveImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-3">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-2xl p-6 text-textPrimary-light dark:text-textPrimary-dark focus:outline-none focus:border-primary transition-colors placeholder:text-textSecondary-light/30 resize-none"
                    placeholder="Describe your experience..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-white font-black py-5 rounded-full hover:brightness-110 transition-all uppercase tracking-widest text-xs">
                  Publish Entry
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            {reviews.map((review) => (
              <div key={review.id} className="bg-background-light dark:bg-background-dark p-8 md:p-10 flex flex-col group">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="font-black text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-widest mb-2">{review.name}</h4>
                    <div className="flex space-x-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= review.rating} className="w-3 h-3" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-tighter">{review.date}</span>
                </div>
                
                <p className="text-textSecondary-light dark:text-textSecondary-dark text-sm leading-relaxed mb-8 flex-grow italic">"{review.text}"</p>
                
                {review.image && (
                  <div className="mt-auto overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={review.image} alt={`Review by ${review.name}`} className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
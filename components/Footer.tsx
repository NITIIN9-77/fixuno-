
import React from 'react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
);

interface FooterProps {
    onAdminLogin?: () => void;
    onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminLogin, onNavigate }) => {
  return (
    <footer id="footer" className="bg-background-light dark:bg-background-dark border-t border-black/5 dark:border-white/5 py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h3 className="text-2xl font-black text-textPrimary-light dark:text-textPrimary-dark tracking-tighter uppercase italic mb-8">FIXUNO<span className="text-primary">.</span></h3>
            <p className="text-textSecondary-light dark:text-textSecondary-dark text-sm leading-relaxed max-w-sm mb-12">
              The definitive standard for premium home maintenance. Delivering excellence through certified expertise and meticulous attention to detail.
            </p>
            <div className="flex space-x-6">
              {[InstagramIcon, FacebookIcon, YouTubeIcon].map((Icon, i) => (
                <a key={i} href="#" className="text-textSecondary-light dark:text-textSecondary-dark hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-[0.4em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Services', 'Reviews', 'Live Status', 'Contact Us'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => onNavigate(`/${item.toLowerCase().replace(' ', '-')}`)}
                    className="text-sm text-textSecondary-light dark:text-textSecondary-dark hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold text-textPrimary-light dark:text-textPrimary-dark uppercase tracking-[0.4em] mb-8">Contact</h4>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-1">Direct Line</p>
                <a href="tel:8423979371" className="text-lg font-bold text-textPrimary-light dark:text-textPrimary-dark hover:text-primary transition-colors">8423979371</a>
              </div>
              <div>
                <p className="text-[10px] text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest mb-1">Email Support</p>
                <a href="mailto:fixuno628@gmail.com" className="text-sm font-bold text-textPrimary-light dark:text-textPrimary-dark hover:text-primary transition-colors">fixuno628@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Fixuno. All Rights Reserved.
          </p>
          <button 
            onClick={onAdminLogin}
            className="text-[10px] text-textSecondary-light dark:text-textSecondary-dark hover:text-primary uppercase tracking-widest transition-colors"
          >
            Partner Access
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

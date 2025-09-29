import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Shield } from 'lucide-react';

export const CookiesPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('invictus-cookie-consent');
    
    if (!cookieChoice) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('invictus-cookie-consent', 'accepted');
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleDecline = () => {
    localStorage.setItem('invictus-cookie-consent', 'declined');
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };


  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[10000] transition-all duration-300 ${
      isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-primary/95 backdrop-blur-sm border-t border-tertiary/20 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-tertiary/20 rounded-full">
                  <Cookie className="w-5 h-5 text-tertiary" />
                </div>
                <h3 className="text-lg font-semibold text-white">We Use Cookies</h3>
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-2">
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
              <div className="flex items-center gap-4 text-xs text-white/70">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Secure & GDPR Compliant</span>
                </div>
                <Link 
                  to="/cookies-policy" 
                  className="text-tertiary hover:text-tertiary/80 underline transition-colors"
                >
                  Learn more in our Cookies Policy
                </Link>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm text-white/80 hover:text-white border border-white/30 hover:border-white/50 rounded-md transition-colors whitespace-nowrap"
              >
                Decline All
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 text-sm font-medium text-primary bg-tertiary hover:bg-tertiary/90 rounded-md transition-colors whitespace-nowrap"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

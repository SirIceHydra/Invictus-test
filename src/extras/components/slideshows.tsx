import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function HeroSlideshow() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative overflow-hidden flex justify-center mt-24">
      {/* Responsive iframe container */}
      <div className="relative w-full max-w-full overflow-hidden">
        <iframe
          src={import.meta.env.VITE_SLIDER_COMPONENT_URL}
          className="border-0 w-full"
          style={{
            width: '100%',
            height: isMobile ? '300px' : '600px',
            maxWidth: '100%',
            maxHeight: '640px',
            minHeight: isMobile ? '250px' : '600px'
          }}
          title="Hero Slideshow"
          loading="lazy"
          allowFullScreen
          scrolling="no"
        />
      </div>
      
      {/* Responsive Button Overlay */}
      <div className={`absolute pointer-events-auto ${
        isMobile 
          ? 'bottom-4 right-4' 
          : 'bottom-8 right-8'
      }`}>
        <Link to="/shop">
          <button className={`bg-white/90 backdrop-blur-sm text-gray-900 rounded-full shadow-lg font-bold tracking-wide transition-transform duration-200 hover:scale-105 ${
            isMobile
              ? 'px-4 py-2 text-sm'
              : 'px-8 py-4 text-xl'
          }`}>
            SHOP NOW
          </button>
        </Link>
      </div>
    </section>
  );
}

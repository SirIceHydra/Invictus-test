import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Banner = { image: string; alt?: string; link?: string };

export function HeroSlideshow() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [i, setI] = useState(0);
  const [fadeOpacity, setFadeOpacity] = useState(1);
  
  const API =
    (import.meta as any).env.VITE_SLIDER_COMPONENT_URL;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) throw new Error('Failed to fetch banners');
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        // Fallback to default banner
      }
    })();
  }, [API]);

  useEffect(() => {
    if (!banners.length) return;
    
    const t = setInterval(() => {
      // Start fade out
      setFadeOpacity(0);
      
      // After fade out, change image and fade in
      setTimeout(() => {
        setI((x) => (x + 1) % banners.length);
        setFadeOpacity(1);
      }, 400); // Wait for fade out to complete
    }, 3000);
    
    return () => clearInterval(t);
  }, [banners.length]);

  // Use inline styles to completely avoid CSS conflicts
  const containerStyle = {
    position: 'relative' as const,
    width: '100%',
    marginTop: '6rem',
    height: 'clamp(200px, 35vw, 640px)',
    zIndex: 10,
    backgroundColor: '#f3f4f6',
    overflow: 'hidden'
  };

  const backgroundStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
    transition: 'opacity 0.2s ease-in-out'
  };

  const ctaStyle = {
    position: 'absolute' as const,
    right: '2rem',
    bottom: '2rem',
    zIndex: 20,
    opacity: fadeOpacity,
    transition: 'opacity 0.4s ease-in-out'
  };

  if (!banners.length) {
    // Fallback banner for testing
    const fallbackBanner = {
      image: '/assets/Banners/on-banner.png',
      alt: 'Fallback Banner'
    };
    
    return (
      <div style={containerStyle}>
        {/* Background image */}
        <div style={{
          ...backgroundStyle,
          backgroundImage: `url(${fallbackBanner.image})`,
          opacity: fadeOpacity
        }} aria-hidden="true" />
        
        {/* CTA Button */}
        <div style={ctaStyle}>
          <Link to="/shop" style={{ display: 'inline-block' }}>
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#111827',
              padding: '12px 24px',
              borderRadius: '9999px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              fontSize: '18px',
              display: 'inline-block'
            }}>
              SHOP NOW
            </span>
          </Link>
        </div>
      </div>
    );
  }
  
  const currentBanner = banners[i];

  return (
    <div style={containerStyle}>
      {/* Background image */}
      <div style={{
        ...backgroundStyle,
        backgroundImage: `url(${currentBanner.image})`,
        opacity: fadeOpacity
      }} aria-hidden="true" />
      
      {/* CTA Button */}
      <div style={ctaStyle}>
        <Link to="/shop" style={{ display: 'inline-block' }}>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#111827',
            padding: '12px 24px',
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            fontSize: '18px',
            display: 'inline-block'
          }}>
            SHOP NOW
          </span>
        </Link>
      </div>
    </div>
  );
}

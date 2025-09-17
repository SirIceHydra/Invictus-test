import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Banner = { image: string; alt?: string; link?: string };

export function HeroSlideshow() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [i, setI] = useState(0);
  const [fadeOpacity, setFadeOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const API = (import.meta as any).env.VITE_SLIDER_COMPONENT_URL;

  // Default fallback banners
  const defaultBanners: Banner[] = [
    {
      image: '/assets/Banners/on-banner.png',
      alt: 'Optimum Nutrition Banner',
    },
    {
      image: '/assets/Banners/myprotein_banner.png',
      alt: 'MyProtein Banner',
    },
    {
      image: '/assets/Banners/muscletech_banner.mp4',
      alt: 'MuscleTech Banner',
    },
  ];

  // Fetch banners
  useEffect(() => {
    (async () => {
      // If no API URL is configured, use default banners
      if (!API) {
        console.log('📸 No slider API URL configured, using default banners');
        setBanners(defaultBanners);
        return;
      }

      try {
        console.log('📸 Fetching banners from:', API);
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('✅ Successfully loaded banners:', data);
        setBanners(data);
      } catch (error) {
        console.warn('⚠️ Failed to fetch banners from API, using defaults:', error);
        setBanners(defaultBanners);
      }
    })();
  }, [API]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!banners.length) return;
    const t = setInterval(() => {
      setFadeOpacity(0);
      setTimeout(() => {
        setI((x) => (x + 1) % banners.length);
        setFadeOpacity(1);
      }, 300);
    }, 5000);
    return () => clearInterval(t);
  }, [banners.length]);

  // Detect mobile screen size
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);


  // Touch/swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const THRESHOLD = 50;
    if (touchDeltaX.current > THRESHOLD) {
      setI((x) => (x - 1 + (banners.length || 1)) % (banners.length || 1));
    } else if (touchDeltaX.current < -THRESHOLD) {
      setI((x) => (x + 1) % (banners.length || 1));
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // Click handler - redirect to shop page
  const onClick = () => {
    navigate('/shop');
  };

  // Styles
  const sectionStyle: React.CSSProperties = {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: isMobile ? '0 12px' : '0',
    overflow: 'hidden',
  };

     const containerStyle: React.CSSProperties = {
     position: 'relative',
     width: '100%',
     maxWidth: '1024px',
     margin: '0 auto 2rem auto',
     height: isMobile ? '240px' : '500px',
     zIndex: 10,
     backgroundColor: '#000000',
     overflow: 'hidden',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     borderRadius: isMobile ? '12px' : '16px',
     border: '1px solid rgba(0,0,0,0.05)',
     touchAction: 'pan-y',
     cursor: 'pointer',
     transition: 'transform 0.2s ease, box-shadow 0.2s ease',
     transform: (isHovered && !isMobile) ? 'scale(1.02)' : 'scale(1)',
     boxShadow: (isHovered && !isMobile) ? '0 8px 25px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.05)',
   };

  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: isMobile ? 'cover' : 'contain',
    transition: 'opacity 0.2s ease-in-out',
    opacity: fadeOpacity,
    borderRadius: isMobile ? '12px' : '16px',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  const dotsWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: isMobile ? '8px' : '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: isMobile ? '6px' : '8px',
    zIndex: 5,
  };

  const dotStyle = (active: boolean): React.CSSProperties => ({
    width: isMobile ? '6px' : '8px',
    height: isMobile ? '6px' : '8px',
    borderRadius: '9999px',
    background: active ? 'var(--tertiary)' : 'rgba(213,183,117,0.4)',
    transition: 'transform 0.2s ease',
    transform: active ? 'scale(1.15)' : 'scale(1)',
  });

  const currentBanner = banners.length ? banners[i] : defaultBanners[0];

  return (
    <section style={sectionStyle}>
      {/* Static Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(/assets/Banners/cover-background.png)',
          filter: 'brightness(0.8)' 
        }}
      />
      
      <div
        style={containerStyle}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Promotional banners - Click to visit shop"
        className="relative z-10"
      >
        <img
          src={currentBanner.image}
          alt={currentBanner.alt ?? 'Banner'}
          style={imageStyle}
          draggable={false}
        />

        {banners.length > 1 && (
          <div style={dotsWrapperStyle} aria-hidden="true">
            {banners.map((_, idx) => (
              <span key={idx} style={dotStyle(idx === i)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
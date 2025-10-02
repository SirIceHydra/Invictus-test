import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePosts } from '../../posts/hooks/usePosts';

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

  // Fetch posts from the "Slideshow" category
  const { posts: slideshowPosts, loading: postsLoading, error: postsError } = usePosts({
    initialFilters: { category: 'slideshow', perPage: 10 },
    autoFetch: true
  });

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

  // Convert blog posts to banner format
  useEffect(() => {
    if (postsLoading) {
      return;
    }

    if (postsError) {
      setBanners(defaultBanners);
      return;
    }

    if (slideshowPosts && slideshowPosts.length > 0) {
      const convertedBanners: Banner[] = slideshowPosts
        .filter(post => post.featuredImage) // Only include posts with featured images
        .map(post => ({
          image: post.featuredImage,
          alt: post.featuredImageAlt || post.title,
          link: `/posts/${post.slug}` // Link to the blog post
        }));
      
      if (convertedBanners.length > 0) {
        setBanners(convertedBanners);
      } else {
        setBanners(defaultBanners);
      }
    } else {
      setBanners(defaultBanners);
    }
  }, [slideshowPosts, postsLoading, postsError]);

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

  // Click handler - always redirect to shop page
  const onClick = () => {
    navigate('/shop');
  };

  // Navigation handlers
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent slideshow click
    setFadeOpacity(0);
    setTimeout(() => {
      setI((x) => (x - 1 + banners.length) % banners.length);
      setFadeOpacity(1);
    }, 300);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent slideshow click
    setFadeOpacity(0);
    setTimeout(() => {
      setI((x) => (x + 1) % banners.length);
      setFadeOpacity(1);
    }, 300);
  };

  // Styles
  const sectionStyle: React.CSSProperties = {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column', // Ensure vertical layout
    justifyContent: 'center',
    alignItems: 'center',
    padding: isMobile ? '0 12px' : '0',
    paddingTop: isMobile ? '80px' : '60px',
    paddingBottom: isMobile ? '10px' : '20px', // Minimal bottom padding
    overflow: 'hidden',
  };

     const containerStyle: React.CSSProperties = {
     position: 'relative',
     width: '100%',
     maxWidth: '1024px',
     margin: '0 auto 2rem auto',
     height: isMobile ? '200px' : '350px', // Decreased height for more compact slideshow
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
    objectFit: 'cover', // Use cover to fill the container completely
    objectPosition: 'center',
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
    <section style={sectionStyle} className="border-b-2 border-tertiary/30">
      {/* Static Background Image with Extended Height and Fade */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(/assets/Banners/cover-background.png)',
          filter: 'brightness(0.8)',
          opacity: '0.7',
          height: '200%', // Extended background height to cover blurb section
          top: '-20%', // Position it higher to create the extended effect
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

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            {/* Previous Arrow */}
            <button
              onClick={goToPrevious}
              style={{
                position: 'absolute',
                left: isMobile ? '8px' : '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 6,
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: 'white',
                opacity: 0.8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              aria-label="Previous banner"
            >
              <ChevronLeft size={isMobile ? 20 : 24} />
            </button>

            {/* Next Arrow */}
            <button
              onClick={goToNext}
              style={{
                position: 'absolute',
                right: isMobile ? '8px' : '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 6,
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: 'white',
                opacity: 0.8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              aria-label="Next banner"
            >
              <ChevronRight size={isMobile ? 20 : 24} />
            </button>
          </>
        )}

        {/* Shop Now Button - Bottom Right */}
        <div 
          style={{
            position: 'absolute',
            bottom: isMobile ? '12px' : '16px',
            right: isMobile ? '12px' : '16px',
            zIndex: 6,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent slideshow click
              navigate('/shop');
            }}
            style={{
              padding: isMobile ? '8px 16px' : '12px 24px',
              backgroundColor: 'var(--tertiary)',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: isMobile ? '6px' : '8px',
              fontSize: isMobile ? '12px' : '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transform: 'scale(1)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.backgroundColor = 'var(--tertiary)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'var(--tertiary)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            SHOP NOW
          </button>
        </div>
      </div>

      {/* About Invictus Nutrition Blurb - Underneath slideshow container */}
      <div className="relative z-10 mt-6 mb-0 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
              WELCOME TO INVICTUS NUTRITION
            </h2>
            <p className="text-white text-base leading-relaxed">
              We're passionate about providing premium quality supplements that help you achieve your fitness goals. 
              Our carefully curated selection features only the most trusted brands in the industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
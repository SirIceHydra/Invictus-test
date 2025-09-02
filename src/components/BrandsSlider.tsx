import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBrands } from '../hooks/useBrands';
import { Loading } from './ui/Loading';

export default function BrandsSlider() {
  const { brands, loading, error } = useBrands();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create a duplicated array for seamless looping
  const duplicatedBrands = [...brands, ...brands, ...brands];

  // Auto-scroll functionality
  useEffect(() => {
    if (brands.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Always increment, the modulo will handle the loop
        return (prevIndex + 1) % brands.length;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [brands.length]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading text="Loading brands..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Failed to load brands. Please try again later.</p>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No brands available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Brands Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / Math.min(4, duplicatedBrands.length))}%)`,
            width: `${Math.max(100, duplicatedBrands.length * 25)}%`
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div 
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / Math.min(4, duplicatedBrands.length)}%` }}
            >
              <Link 
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="block group"
              >
                <div className="flex items-center justify-center h-32">
                  {brand.image?.src ? (
                    <img
                      src={brand.image.src}
                      alt={brand.image.alt || brand.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-gray-400 text-lg font-medium">
                      {brand.name}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

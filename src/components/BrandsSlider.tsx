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
    <div className="relative w-full">
      {/* Brands Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / Math.min(2, brands.length))}%)`,
            width: `${Math.min(2, brands.length) * 50}%`
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div 
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 px-2 md:px-4"
              style={{ width: `${100 / Math.min(2, brands.length)}%` }}
            >
              <Link 
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="block group"
              >
                <div className="flex items-center justify-center h-24 md:h-32 bg-white border-2 border-tertiary/30 rounded-lg p-3 md:p-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  {brand.image?.src ? (
                    <img
                      src={brand.image.src}
                      alt={brand.image.alt || brand.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm md:text-lg font-medium text-center">
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

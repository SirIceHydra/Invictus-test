import React, { useState } from 'react';
import { X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../core/cart/CartContext';
import { formatPrice, isProductInStock, getStockStatusText } from '../../utils/helpers';
import { Loading } from '../../components/ui/Loading';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const inStock = isProductInStock(product.stockStatus, product.stockQuantity);
  const hasMultipleImages = product.images && product.images.length > 1;

  const handleAdd = async () => {
    if (!inStock) return;
    setAdding(true);
    try {
      await addToCart(product, 1);
    } finally {
      setAdding(false);
    }
  };

  const nextImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      setImageLoading(true);
    }
  };

  const previousImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      setImageLoading(true);
    }
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setImageLoading(true);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="flex min-h-full items-start justify-center p-2 sm:p-4 pt-20">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            <h2 className="text-xl sm:text-2xl font-bold">PRODUCT DETAILS</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row max-h-[calc(95vh-80px)] overflow-y-auto">
            {/* Left Side - Image Gallery */}
            <div className="lg:w-1/2 p-4 sm:p-6">
              <div className="relative w-full h-64 sm:h-96 bg-white rounded-lg overflow-hidden">
                {/* Main Image */}
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loading size="lg" />
                  </div>
                )}
                
                <img 
                  src={product.images[currentImageIndex] || '/assets/placeholder-product.jpg'} 
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`} 
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      title="Previous Image"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      title="Next Image"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {hasMultipleImages && (
                <div className="mt-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex
                            ? 'border-rose-400 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Product Information */}
            <div className="lg:w-1/2 p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                {product.onSale && product.salePrice ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-bold text-rose-500">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-base sm:text-lg text-gray-500 line-through">
                      {formatPrice(product.regularPrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Availability */}
              <div className="text-sm text-gray-600 mb-6">
                <span className="font-medium">Availability:</span> {getStockStatusText(product.stockStatus, product.stockQuantity)}
              </div>

              {/* Quick Overview */}
              {product.shortDescription && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Quick Overview</h3>
                  <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
                </div>
              )}

              {/* Product Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Product Description</h3>
                  <div 
                    className="text-gray-600 leading-relaxed prose prose-sm max-w-none" 
                    dangerouslySetInnerHTML={{ __html: product.description }} 
                  />
                </div>
              )}

              {/* Action Buttons - Sticky on mobile */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 bg-white sticky bottom-0 pb-2">
                <button 
                  onClick={handleAdd} 
                  disabled={!inStock || adding} 
                  className={`w-full py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all ${
                    inStock 
                      ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white hover:scale-105' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {adding ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


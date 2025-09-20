import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation } from '../../components/Navigation';
import { useCart } from '../core/cart/CartContext';
import { formatPrice, isProductInStock, getStockStatusText } from '../../utils/helpers';
import { Loading } from '../../components/ui/Loading';
import { Helmet } from 'react-helmet';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, isInCart, getCartItemQuantity } = useCart();
  const [adding, setAdding] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Import the WooCommerce service directly
        const { getProduct } = await import('../../services/woocommerce');
        
        // Fetch product by ID using the direct getProduct function
        const productData = await getProduct(parseInt(id));
        setProduct(productData);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary text-tertiary">
        <Navigation isScrolled={isScrolled} />
        <div className="container mx-auto px-4 py-12 pt-24">
          <div className="flex justify-center items-center h-64">
            <Loading size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-primary text-tertiary">
        <Navigation isScrolled={isScrolled} />
        <div className="container mx-auto px-4 py-12 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-tertiary mb-4">Product Not Found</h1>
            <p className="text-secondary/80 mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 px-6 py-3 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inStock = isProductInStock(product.stockStatus, product.stockQuantity);
  const hasMultipleImages = product.images && product.images.length > 1;
  const isOutOfStock = product.stockQuantity === 0 || product.stockStatus === 'outofstock';
  const cartQuantity = product ? getCartItemQuantity(product.id) : 0;
  const isInCartState = product ? isInCart(product.id) : false;

  const handleAdd = async () => {
    if (!inStock || isOutOfStock) return;
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
    <div className="min-h-screen bg-primary text-tertiary">
      <Navigation isScrolled={isScrolled} />
      <Helmet>
        <title>{product.name} - Invictus Nutrition</title>
        <meta name="description" content={product.shortDescription || product.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 overflow-hidden">
          <Link 
            to="/shop" 
            className="flex items-center gap-2 text-white hover:text-tertiary transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Shop</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="text-white/60 flex-shrink-0">/</span>
          <span className="text-white truncate min-w-0" title={product.name}>
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-96 lg:h-[500px] bg-primary overflow-hidden border-2 border-tertiary/30 rounded-lg">
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
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary text-white hover:bg-tertiary hover:text-primary shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 rounded"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary text-white hover:bg-tertiary hover:text-primary shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 rounded"
                    title="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-primary text-white border border-tertiary/30 text-sm px-3 py-1 rounded">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {hasMultipleImages && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 overflow-hidden border-2 rounded transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'border-tertiary shadow-lg'
                        : 'border-tertiary/30 hover:border-tertiary/60'
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
            )}
          </div>

          {/* Right Side - Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold mb-4 text-white">{product.name}</h1>
              
              {/* Categories */}
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map((category: string, index: number) => (
                    <span 
                      key={index}
                      className="text-xs bg-tertiary text-primary px-3 py-1 font-medium rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                {product.onSale && product.salePrice ? (
                  <>
                    <span className="text-2xl lg:text-3xl font-bold text-tertiary">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-lg text-tertiary/70 line-through">
                      {formatPrice(product.regularPrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl lg:text-3xl font-bold text-tertiary">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="text-base text-white mb-6">
                <span className="font-medium">Stock Status:</span> 
                <span className={`ml-2 font-semibold ${
                  isOutOfStock 
                    ? 'text-red-400' 
                    : product.stockQuantity && product.stockQuantity < 10 
                      ? 'text-yellow-400' 
                      : 'text-green-400'
                }`}>
                  {isOutOfStock 
                    ? 'Out of Stock' 
                    : product.stockQuantity 
                      ? `${product.stockQuantity} in stock` 
                      : getStockStatusText(product.stockStatus, product.stockQuantity)
                  }
                </span>
              </div>
            </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-tertiary/30">
                <div className="flex gap-4">
                  <button 
                    onClick={handleAdd} 
                    disabled={!inStock || isOutOfStock || adding} 
                    className={`flex-1 py-4 px-6 font-semibold text-lg transition-all duration-300 ${
                      inStock && !isOutOfStock
                        ? 'bg-gradient-to-r from-tertiary to-primarySupport text-white hover:scale-105 hover:shadow-lg' 
                        : 'bg-primary/20 text-tertiary/50 cursor-not-allowed'
                    }`}
                  >
                    {adding 
                      ? 'Adding...' 
                      : (inStock && !isOutOfStock) 
                        ? (isInCartState ? `In Cart (${cartQuantity})` : 'Add to Cart') 
                        : 'Out of Stock'
                    }
                  </button>
                  
                  <Link 
                    to="/cart" 
                    className="flex items-center justify-center gap-2 bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 px-6 py-3 font-medium"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    View Cart
                  </Link>
                </div>
              </div>

              {/* Quick Overview */}
              {product.shortDescription && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-tertiary">Quick Overview</h3>
                  <p className="text-white leading-relaxed">{product.shortDescription}</p>
                </div>
              )}

              {/* Product Description */}
              {product.description && (
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-tertiary">Product Description</h4>
                  <div 
                    className="text-white leading-relaxed max-w-none product-description"
                    dangerouslySetInnerHTML={{ __html: product.description }} 
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

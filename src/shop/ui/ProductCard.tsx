import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../core/cart/CartContext';
import { formatPrice, isProductInStock, getStockStatusText } from '../../utils/helpers';
import { Loading } from '../../components/ui/Loading';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onViewDetails, onAddToWishlist, className = '' }: ProductCardProps) {
  const { addToCart, isInCart, getCartItemQuantity } = useCart();
  const [imageLoading, setImageLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const isInStock = isProductInStock(product.stockStatus, product.stockQuantity);
  const cartQuantity = getCartItemQuantity(product.id);
  const isInCartState = isInCart(product.id);

  const handleAddToCart = async () => {
    if (!isInStock) return;
    setAddingToCart(true);
    try { await addToCart(product, 1); } finally { setAddingToCart(false); }
  };

  return (
    <div className={`group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full ${className}`}>
      <div className="relative w-full h-64 bg-white overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center"><Loading size="sm" /></div>
        )}
        <img 
          src={product.images[0] || '/assets/placeholder-product.jpg'} 
          alt={product.name} 
          className={`w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} 
          onLoad={() => setImageLoading(false)} 
          onError={() => setImageLoading(false)} 
        />
        {product.onSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            SALE
          </div>
        )}
        {!isInStock && (
          <div className="absolute top-3 right-3 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            OUT OF STOCK
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button 
            onClick={() => onViewDetails?.(product)} 
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-200" 
            title="View Details"
          >
            <Eye className="w-5 h-5 text-gray-600 group-hover:text-rose-500 transition-colors duration-200" />
          </button>
          <button 
            onClick={() => onAddToWishlist?.(product)} 
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-200" 
            title="Add to Wishlist"
          >
            <Heart className="w-5 h-5 text-gray-600 group-hover:text-rose-500 transition-colors duration-200" />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        {product.categories?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.categories.slice(0,2).map((c, i) => (
              <span key={i} className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium group-hover:bg-rose-200 group-hover:scale-105 transition-all duration-200">
                {c}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem] flex items-start group-hover:text-rose-600 transition-colors duration-200">
          {product.name}
        </h3>
        <div className="text-xs text-gray-500 mb-2 group-hover:text-gray-600 transition-colors duration-200">
          {getStockStatusText(product.stockStatus, product.stockQuantity)}
        </div>
        <div className="flex items-center gap-2 mb-3">
          {product.onSale && product.salePrice ? (
            <>
              <span className="text-lg font-bold text-rose-500 group-hover:scale-105 transition-transform duration-200">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xs text-gray-500 line-through group-hover:opacity-75 transition-opacity duration-200">
                {formatPrice(product.regularPrice)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-2">
          <button 
            onClick={() => onViewDetails?.(product)} 
            className="flex-1 text-sm text-rose-400 hover:text-rose-500 font-medium px-3 py-2 border border-rose-400 rounded-lg hover:bg-rose-50 hover:border-rose-500 hover:scale-105 transition-all duration-200"
          >
            View Details
          </button>
          <button 
            onClick={handleAddToCart} 
            disabled={!isInStock || addingToCart} 
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
              isInStock 
                ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white hover:scale-105 hover:shadow-lg hover:from-rose-500 hover:to-amber-500' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {addingToCart ? 'Adding...' : isInStock ? (isInCartState ? `In Cart (${cartQuantity})` : 'Add to Cart') : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CompactProductCard({ product, onAddToCart, className = '' }: { product: Product; onAddToCart?: (p: Product) => void; className?: string; }) {
  const isInStock = isProductInStock(product.stockStatus, product.stockQuantity);
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <div className={`group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full ${className}`}>
      <div className="relative w-full h-48 bg-white overflow-hidden">
        {imageLoading && (<div className="absolute inset-0 flex items-center justify-center"><Loading size="sm" /></div>)}
        <img 
          src={product.images[0] || '/assets/placeholder-product.jpg'} 
          alt={product.name} 
          className={`w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} 
          onLoad={() => setImageLoading(false)} 
          onError={() => setImageLoading(false)} 
        />
        {product.onSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            SALE
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {product.categories?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.categories.slice(0,2).map((c,i) => (
              <span key={i} className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium group-hover:bg-rose-200 group-hover:scale-105 transition-all duration-200">
                {c}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem] flex items-start group-hover:text-rose-600 transition-colors duration-200">
          {product.name}
        </h3>
        <div className="text-xs text-gray-500 mb-2 group-hover:text-gray-600 transition-colors duration-200">
          {getStockStatusText(product.stockStatus, product.stockQuantity)}
        </div>
        <div className="flex items-center gap-2 mb-3">
          {product.onSale && product.salePrice ? (
            <>
              <span className="text-lg font-bold text-rose-500 group-hover:scale-105 transition-transform duration-200">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xs text-gray-500 line-through group-hover:opacity-75 transition-opacity duration-200">
                {formatPrice(product.regularPrice)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <div className="flex-1"></div>
        <button 
          onClick={() => isInStock && onAddToCart?.(product)} 
          disabled={!isInStock} 
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
            isInStock 
              ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white hover:scale-105 hover:shadow-lg hover:from-rose-500 hover:to-amber-500' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
            {isInStock ? 'Add to Cart' : 'Out of Stock'}
          </div>
        </button>
      </div>
    </div>
  );
}

export function ProductListItem({ product, onViewDetails, onAddToCart, className = '' }: { product: Product; onViewDetails?: (p: Product) => void; onAddToCart?: (p: Product) => void; className?: string; }) {
  const isInStock = isProductInStock(product.stockStatus, product.stockQuantity);
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <div className={`group bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out ${className}`}>
      <div className="flex gap-6">
        <div className="relative w-32 h-32 bg-white rounded-lg overflow-hidden flex-shrink-0">
          {imageLoading && (<div className="absolute inset-0 flex items-center justify-center"><Loading size="sm" /></div>)}
          <img 
            src={product.images[0] || '/assets/placeholder-product.jpg'} 
            alt={product.name} 
            className={`w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} 
            onLoad={() => setImageLoading(false)} 
            onError={() => setImageLoading(false)} 
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          {product.categories?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.categories.slice(0,3).map((c,i) => (
                <span key={i} className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium group-hover:bg-rose-200 group-hover:scale-105 transition-all duration-200">
                  {c}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {product.shortDescription}
          </p>
          <div className="flex items-center gap-3 mb-3">
            {product.onSale && product.salePrice ? (
              <>
                <span className="text-xl font-bold text-rose-500 group-hover:scale-105 transition-transform duration-200">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-sm text-gray-500 line-through group-hover:opacity-75 transition-opacity duration-200">
                  {formatPrice(product.regularPrice)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-200">
            {getStockStatusText(product.stockStatus, product.stockQuantity)}
          </div>
          <div className="flex-1"></div>
          <div className="flex gap-3">
            <button 
              onClick={() => onViewDetails?.(product)} 
              className="text-sm text-rose-400 hover:text-rose-500 font-medium px-4 py-2 border border-rose-400 rounded-lg hover:bg-rose-50 hover:border-rose-500 hover:scale-105 transition-all duration-200"
            >
              View Details
            </button>
            <button 
              onClick={() => isInStock && onAddToCart?.(product)} 
              disabled={!isInStock} 
              className={`text-sm font-semibold px-6 py-2 rounded-lg transition-all duration-300 ${
                isInStock 
                  ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white hover:scale-105 hover:shadow-lg hover:from-rose-500 hover:to-amber-500' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isInStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



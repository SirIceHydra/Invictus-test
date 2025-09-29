import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../core/cart/CartContext';
import { formatPrice, isProductInStock, getStockStatusText } from '../../utils/helpers';
import { Loading } from '../../components/ui/Loading';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onViewDetails, className = '' }: ProductCardProps) {
  const { addToCart, isInCart, getCartItemQuantity } = useCart();
  const [imageLoading, setImageLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const isInStock = isProductInStock(product.stockStatus, product.stockQuantity);
  const isOutOfStock = product.stockQuantity === 0 || product.stockStatus === 'outofstock';
  const cartQuantity = getCartItemQuantity(product.id);
  const isInCartState = isInCart(product.id);

  const handleAddToCart = async () => {
    if (!isInStock || isOutOfStock) return;
    setAddingToCart(true);
    try { await addToCart(product, 1); } finally { setAddingToCart(false); }
  };

  return (
    <div 
      className={`group bg-primary shadow-lg overflow-hidden sm:hover:shadow-2xl sm:hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full border-2 border-tertiary cursor-pointer ${className}`}
      onClick={() => onViewDetails?.(product)}
    >
      <div className="relative w-full h-48 sm:h-64 bg-secondary overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center"><Loading size="sm" /></div>
        )}
        <img 
          src={product.images[0] || '/assets/placeholder-product.jpg'} 
          alt={product.name} 
          className={`w-full h-full object-contain transition-all duration-700 ease-out sm:group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} 
          onLoad={() => setImageLoading(false)} 
          onError={() => setImageLoading(false)} 
        />
        {product.onSale && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 border border-tertiary">
            SALE
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h6 className="text-secondary mb-3 line-clamp-2 min-h-[2.5rem] flex items-start transition-colors duration-200">
          {product.name}
        </h6>
        <div className="flex items-center justify-center gap-2 mb-4">
          {product.onSale && product.salePrice ? (
            <>
              <span className="text-lg font-bold text-tertiary sm:group-hover:scale-105 transition-transform duration-200">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xs text-tertiary/70 line-through transition-opacity duration-200">
                {formatPrice(product.regularPrice)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-tertiary sm:group-hover:scale-105 transition-transform duration-200">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <div className="flex-1"></div>
        <div className="flex justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking button
              handleAddToCart();
            }}
            disabled={!isInStock || isOutOfStock || addingToCart} 
            className={`w-full py-3 px-4 text-sm font-semibold transition-all duration-300 ${
              isInStock && !isOutOfStock
                ? 'bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg' 
                : 'bg-tertiary/20 text-tertiary cursor-not-allowed'
            }`}
          >
            {addingToCart ? 'Adding...' : (isInStock && !isOutOfStock) ? (isInCartState ? `In Cart (${cartQuantity})` : 'Add to Cart') : 'Out of Stock'}
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
    <div className={`group bg-primary  shadow-md overflow-hidden sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full ${className}`}>
      <div className="relative w-full h-48 bg-secondary overflow-hidden">
        {imageLoading && (<div className="absolute inset-0 flex items-center justify-center"><Loading size="sm" /></div>)}
        <img 
          src={product.images[0] || '/assets/placeholder-product.jpg'} 
          alt={product.name} 
          className={`w-full h-full object-contain transition-all duration-700 ease-out sm:group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} 
          onLoad={() => setImageLoading(false)} 
          onError={() => setImageLoading(false)} 
        />
        {product.onSale && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded border border-tertiary">
            SALE
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {product.categories?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.categories.slice(0,2).map((c,i) => (
              <span key={i} className="text-xs bg-black text-white px-2 py-1  font-medium sm:group-hover:bg-tertiary sm:group-hover:scale-105 transition-all duration-200">
                {c}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-medium text-secondary text-sm mb-2 line-clamp-2 min-h-[2.5rem] flex items-start transition-colors duration-200">
          {product.name}
        </h3>
        <div className="text-xs text-secondary/70 mb-2 transition-colors duration-200">
          {getStockStatusText(product.stockStatus, product.stockQuantity)}
        </div>
        <div className="flex items-center gap-2 mb-3">
          {product.onSale && product.salePrice ? (
            <>
              <span className="text-lg font-bold text-tertiary sm:group-hover:scale-105 transition-transform duration-200">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xs text-tertiary/70 line-through transition-opacity duration-200">
                {formatPrice(product.regularPrice)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-tertiary sm:group-hover:scale-105 transition-transform duration-200">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <div className="flex-1"></div>
        <button 
          onClick={() => isInStock && onAddToCart?.(product)} 
          disabled={!isInStock} 
          className={`w-full py-3 px-4  font-semibold transition-all duration-300 ${
            isInStock 
              ? 'bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg' 
              : 'bg-tertiary/20 text-tertiary cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 mr-2 sm:group-hover:scale-110 transition-transform duration-200" />
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
    <div className={`group bg-primary  shadow-md p-6 sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-500 ease-out ${className}`}>
      <div className="flex gap-6">
        <div className="relative w-32 h-32 bg-secondary  overflow-hidden flex-shrink-0">
          {imageLoading && (<div className="absolute inset-0 flex items-center justify-center"><Loading size="sm" /></div>)}
          <img 
            src={product.images[0] || '/assets/placeholder-product.jpg'} 
            alt={product.name} 
            className={`w-full h-full object-contain transition-all duration-700 ease-out sm:group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} 
            onLoad={() => setImageLoading(false)} 
            onError={() => setImageLoading(false)} 
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          {product.categories?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.categories.slice(0,3).map((c,i) => (
                <span key={i} className="text-xs bg-black text-white px-2 py-1  font-medium sm:group-hover:bg-tertiary sm:group-hover:scale-105 transition-all duration-200">
                  {c}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-semibold text-secondary mb-2 line-clamp-2 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-secondary/80 mb-3 line-clamp-2 transition-colors duration-200">
            {product.shortDescription}
          </p>
          <div className="flex items-center gap-3 mb-3">
            {product.onSale && product.salePrice ? (
              <>
                <span className="text-xl font-bold text-tertiary sm:group-hover:scale-105 transition-transform duration-200">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-sm text-tertiary/70 line-through transition-opacity duration-200">
                  {formatPrice(product.regularPrice)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-tertiary sm:group-hover:scale-105 transition-transform duration-200">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <div className="text-sm text-tertiary mb-4 transition-colors duration-200">
            {getStockStatusText(product.stockStatus, product.stockQuantity)}
          </div>
          <div className="flex-1"></div>
          <div className="flex gap-3">
            <button 
              onClick={() => onViewDetails?.(product)} 
              className="text-sm text-secondary font-medium px-4 py-2 border border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 transition-all duration-200"
            >
              View Details
            </button>
            <button 
              onClick={() => isInStock && onAddToCart?.(product)} 
              disabled={!isInStock} 
              className={`text-sm font-semibold px-6 py-2  transition-all duration-300 ${
                isInStock 
                  ? 'bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg' 
                  : 'bg-tertiary/20 text-tertiary cursor-not-allowed'
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



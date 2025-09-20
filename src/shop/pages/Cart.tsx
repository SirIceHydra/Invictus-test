// Inline export removed (legacy file deleted). Bring current implementation by re-importing from app export if needed.
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ShoppingCart as CartIcon, Trash2, ArrowLeft, CreditCard, Package, Plus, Minus } from 'lucide-react';
import { useCart } from '../core/cart/CartContext';
import { useCheckout } from '../core/hooks/useCheckout';
import { formatPrice } from '../../utils/helpers';
import { Loading } from '../../components/ui/Loading';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';

interface CartProps { className?: string }

export default function Cart({ className = '' }: CartProps) {
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
  const { loading: checkoutLoading, error: checkoutError } = useCheckout();
  const [updatingItem, setUpdatingItem] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) { removeFromCart(productId); return; }
    setUpdatingItem(productId);
    try { updateCartItem(productId, newQuantity); } finally { setUpdatingItem(null); }
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    window.location.href = '/checkout';
  };

  if (cart.items.length === 0) {
    return (
      <div className={`min-h-screen bg-primary text-tertiary ${className}`}>
      <Navigation isScrolled={isScrolled} />
        <Helmet><title>Cart - Invictus Nutrition</title><meta name="description" content="Your shopping cart" /></Helmet>
        
        {/* Hero Banner Section */}
        <section className="min-h-[400px] relative flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url(/assets/Banners/cover-background.png)" }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <h1 className="mb-4 text-tertiary">YOUR CART</h1>
              <p className="mb-8 text-white">Review your selected products</p>
              <div className="flex justify-center">
                <Link 
                  to="/shop" 
                  className="bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Border Section */}
        <section className="bg-primary border-t-2 border-white border-b-2 border-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-white">Ready to start shopping?</p>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Button
              variant="underline"
              size="lg"
              className="text-tertiary after:bg-tertiary"
              onClick={() => window.location.href = '/shop'}
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Button>
          </div>
          <div className="bg-primary border-2 border-white shadow-lg p-12 text-center">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CartIcon className="w-12 h-12 text-tertiary" />
            </div>
            <h3 className="text-tertiary mb-4">Your cart is empty</h3>
            <p className="text-xl text-white mb-8 max-w-md mx-auto">Start adding some amazing products to your cart and fuel your performance!</p>
            <Link to="/shop" className="bg-gradient-to-r from-tertiary to-primarySupport text-white px-8 py-4 font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2 text-lg">
              <CartIcon className="w-5 h-5" /> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-primary text-tertiary ${className}`}>
      <Navigation isScrolled={isScrolled} />
      <Helmet><title>Cart - Invictus Nutrition</title><meta name="description" content="Your shopping cart" /></Helmet>
      
      {/* Hero Banner Section */}
      <section className="min-h-[400px] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url(/assets/Banners/cover-background.png)" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="mb-4 text-tertiary">YOUR CART</h1>
            <p className="mb-8 text-white">Review your selected products</p>
            <div className="flex justify-center">
              <Link 
                to="/shop" 
                className="bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Border Section */}
      <section className="bg-primary border-t-2 border-white border-b-2 border-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-white">Ready to complete your order?</p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-xl text-white mb-6">{cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} in your cart</p>
          <Button
            variant="underline"
            size="lg"
            className="text-tertiary after:bg-tertiary"
            onClick={() => window.location.href = '/shop'}
          >
            <ArrowLeft className="w-5 h-5" /> Continue Shopping
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 overflow-hidden">
          <div className="lg:col-span-2 overflow-hidden">
            <div className="bg-primary border-2 border-white shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-black/20"><h2 className="text-xl font-semibold text-tertiary">Cart Items ({cart.itemCount})</h2></div>
              <div className="divide-y divide-black/20">
                {cart.items.map(item => (
                  <div key={item.id} className="p-4 sm:p-6 hover:bg-black/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <div className="flex-shrink-0 flex justify-center sm:justify-start">
                        <img src={item.image || '/placeholder-product.jpg'} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover shadow-sm" />
                      </div>
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h3 className="text-lg font-semibold text-tertiary mb-2 break-words">{item.name}</h3>
                        <p className="text-tertiary font-medium text-lg">{formatPrice(item.price)}</p>
                        <p className="text-sm text-white mt-1">Stock: {item.stockStatus === 'instock' ? 'In Stock' : 'Limited'}</p>
                      </div>
                      <div className="flex items-center justify-center sm:justify-end gap-3">
                        <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)} disabled={updatingItem === item.productId} className="w-10 h-10 flex items-center justify-center border-2 border-tertiary/40 hover:border-tertiary hover:bg-tertiary/10 disabled:opacity-50 transition-all"><Minus className="w-4 h-4" /></button>
                        <span className="w-16 text-center font-semibold text-lg">{updatingItem === item.productId ? <Loading size="sm" /> : item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)} disabled={updatingItem === item.productId} className="w-10 h-10 flex items-center justify-center border-2 border-tertiary/40 hover:border-tertiary hover:bg-tertiary/10 disabled:opacity-50 transition-all"><Plus className="w-4 h-4" /></button>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-xl font-bold text-tertiary">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <div className="flex justify-center sm:justify-end">
                        <button onClick={() => removeFromCart(item.productId)} className="text-tertiary/70 hover:text-red-500 transition-colors p-2" title="Remove item"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-primary border-2 border-white shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-tertiary mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center"><span className="text-white">Subtotal</span><span className="font-semibold">{formatPrice(cart.total)}</span></div>
                <div className="flex justify-between items-center"><span className="text-white">Shipping</span><span className="font-semibold text-white">Calculated at checkout</span></div>
                <div className="flex justify-between items-center"><span className="text-white">Tax</span><span className="font-semibold">Included</span></div>
                <div className="border-t border-black/20 pt-4"><div className="flex justify-between items-center"><span className="text-xl font-bold text-tertiary">Total</span><span className="text-xl font-bold text-tertiary">{formatPrice(cart.total)}</span></div></div>
              </div>
              {checkoutError && (<div className="mb-6 p-4 bg-primary border border-tertiary"><p className="text-tertiary text-sm">{checkoutError}</p></div>)}
              <div className="space-y-3">
                <button onClick={handleCheckout} disabled={checkoutLoading || cart.items.length === 0} className="w-full bg-gradient-to-r from-tertiary to-primarySupport text-white py-4 px-6 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-transform flex items-center justify-center gap-2 font-semibold text-lg">{checkoutLoading ? (<Loading size="sm" text="Processing..." />) : (<><CreditCard className="w-5 h-5" />Proceed to Checkout</>)}</button>
                <button onClick={clearCart} className="w-full bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 py-3 px-6 font-medium">Clear Cart</button>
              </div>
              <div className="mt-6 pt-6 border-t border-black/20">
                <div className="text-center">
                  <p className="text-sm text-white mb-3">Secure Checkout</p>
                  <div className="flex justify-center items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-white"><CreditCard className="w-4 h-4" /> PayFast</div>
                    <div className="flex items-center gap-1 text-xs text-white"><Package className="w-4 h-4" /> Free Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


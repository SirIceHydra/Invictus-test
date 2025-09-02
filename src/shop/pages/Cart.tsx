// Inline export removed (legacy file deleted). Bring current implementation by re-importing from app export if needed.
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ShoppingCart as CartIcon, Trash2, ArrowLeft, CreditCard, Package, Plus, Minus } from 'lucide-react';
import { useCart } from '../core/cart/CartContext';
import { useCheckout } from '../core/hooks/useCheckout';
import { formatPrice } from '../../utils/helpers';
import { Loading } from '../../components/ui/Loading';
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
      <div className={`min-h-screen bg-white ${className}`}>
        <Navigation isScrolled={isScrolled} />
        <div className="h-20" />
        <Helmet><title>Cart - Invictus Nutrition</title><meta name="description" content="Your shopping cart" /></Helmet>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Your Cart</h1>
            <Link to="/shop" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-500 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
          <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl shadow-lg p-12 text-center">
            <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CartIcon className="w-12 h-12 text-rose-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">Start adding some amazing products to your cart and fuel your performance!</p>
            <Link to="/shop" className="bg-gradient-to-r from-rose-400 to-amber-400 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2 text-lg">
              <CartIcon className="w-5 h-5" /> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Navigation isScrolled={isScrolled} />
      <div className="h-20" />
      <Helmet><title>Cart - Invictus Nutrition</title><meta name="description" content="Your shopping cart" /></Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Your Cart</h1>
          <p className="text-xl text-gray-600 mb-6">{cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} in your cart</p>
          <Link to="/shop" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-500 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Continue Shopping
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-200"><h2 className="text-xl font-semibold text-gray-900">Cart Items ({cart.itemCount})</h2></div>
              <div className="divide-y divide-gray-200">
                {cart.items.map(item => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0"><img src={item.image || '/placeholder-product.jpg'} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-rose-500 font-medium text-lg">{formatPrice(item.price)}</p>
                        <p className="text-sm text-gray-500 mt-1">Stock: {item.stockStatus === 'instock' ? 'In Stock' : 'Limited'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)} disabled={updatingItem === item.id} className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full hover:border-rose-400 hover:bg-rose-50 disabled:opacity-50 transition-all"><Minus className="w-4 h-4" /></button>
                        <span className="w-16 text-center font-semibold text-lg">{updatingItem === item.id ? <Loading size="sm" /> : item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)} disabled={updatingItem === item.id} className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full hover:border-rose-400 hover:bg-rose-50 disabled:opacity-50 transition-all"><Plus className="w-4 h-4" /></button>
                      </div>
                      <div className="text-right"><p className="text-xl font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p></div>
                      <button onClick={() => removeFromCart(item.productId)} className="text-gray-400 hover:text-red-500 transition-colors p-2" title="Remove item"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center"><span className="text-gray-600">Subtotal</span><span className="font-semibold">{formatPrice(cart.total)}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Shipping</span><span className="font-semibold text-green-600">Free</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Tax</span><span className="font-semibold">Included</span></div>
                <div className="border-t border-gray-200 pt-4"><div className="flex justify-between items-center"><span className="text-xl font-bold text-gray-900">Total</span><span className="text-xl font-bold text-rose-500">{formatPrice(cart.total)}</span></div></div>
              </div>
              {checkoutError && (<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-600 text-sm">{checkoutError}</p></div>)}
              <div className="space-y-3">
                <button onClick={handleCheckout} disabled={checkoutLoading || cart.items.length === 0} className="w-full bg-gradient-to-r from-rose-400 to-amber-400 text-white py-4 px-6 rounded-full hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-transform flex items-center justify-center gap-2 font-semibold text-lg">{checkoutLoading ? (<Loading size="sm" text="Processing..." />) : (<><CreditCard className="w-5 h-5" />Proceed to Checkout</>)}</button>
                <button onClick={clearCart} className="w-full text-gray-600 py-3 px-6 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-medium">Clear Cart</button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Secure Checkout</p>
                  <div className="flex justify-center items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500"><CreditCard className="w-4 h-4" /> PayFast</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500"><Package className="w-4 h-4" /> Free Shipping</div>
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


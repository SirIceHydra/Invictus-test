import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, CreditCard, Package, Shield } from 'lucide-react';
import { useCart } from '../core/cart/CartContext';
import { useCheckout } from '../core/hooks/useCheckout';
import { formatPrice } from '../../utils/helpers';
import { Loading } from '../../components/ui/Loading';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CheckoutForm } from '../../types/checkout';
import { Navigation } from '../../components/Navigation';

interface CheckoutProps { className?: string }

export default function Checkout({ className = '' }: CheckoutProps) {
  const { cart, clearCart } = useCart();
  const { loading: checkoutLoading, error: checkoutError, createOrder, processPayment } = useCheckout();
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'South Africa',
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.items.length === 0) { alert('Your cart is empty'); return; }
    try {
      const orderResult = await createOrder(cart.items, formData);
      if (!orderResult.success || !orderResult.orderId) throw new Error(orderResult.error || 'Failed to create order');
      const paymentResult = await processPayment(orderResult.orderId, `ORDER-${orderResult.orderId}`, {
        firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone, total: cart.total,
      });
      if (paymentResult.success) {
        clearCart();
        if (paymentResult.redirectUrl) {
          alert('Order created successfully! Redirecting to PayFast for secure payment...');
          window.location.href = paymentResult.redirectUrl;
        } else {
          window.location.href = `/payment/success?order_id=${paymentResult.orderId}`;
        }
      } else {
        throw new Error(paymentResult.error || 'Payment processing failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className={`min-h-screen bg-white ${className}`}>
        <Navigation isScrolled={isScrolled} />
        <div className="h-20" />
        <Helmet><title>Checkout - Invictus Nutrition</title><meta name="description" content="Complete your purchase" /></Helmet>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white shadow-sm p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Please add some products to your cart before checkout.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-tertiary text-white px-6 py-3 hover:bg-primarySupport transition-colors">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Navigation isScrolled={isScrolled} />
      <div className="h-20" />
      <Helmet><title>Checkout - Invictus Nutrition</title><meta name="description" content="Complete your purchase" /></Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-tertiary transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                    <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                </div>
                {checkoutError && (<div className="p-3 bg-red-50 border border-red-200"><p className="text-red-600 text-sm">{checkoutError}</p></div>)}
                <button type="submit" disabled={checkoutLoading} className="w-full bg-tertiary text-white py-3 px-4 hover:bg-primarySupport disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">{checkoutLoading ? (<><Loader2 className="w-5 h-5 animate-spin" />Processing...</>) : (<><CreditCard className="w-5 h-5" />Complete Order</>)}</button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4"><img src={item.image || '/placeholder-product.jpg'} alt={item.name} className="w-12 h-12 object-cover" /><div className="flex-1"><h3 className="font-medium text-gray-900">{item.name}</h3><p className="text-sm text-gray-600">Qty: {item.quantity}</p></div><p className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p></div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">{formatPrice(cart.total)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className="font-medium">Free</span></div>
                <div className="border-t border-gray-200 pt-3"><div className="flex justify-between"><span className="text-lg font-semibold text-gray-900">Total</span><span className="text-lg font-semibold text-gray-900">{formatPrice(cart.total)}</span></div></div>
              </div>
              <div className="mt-6 p-4 bg-gray-50"><div className="flex items-center gap-2 mb-2"><Shield className="w-5 h-5 text-green-600" /><span className="text-sm font-medium text-gray-900">Secure Checkout</span></div><p className="text-xs text-gray-600">Your payment information is encrypted and secure. We use PayFast for secure payment processing.</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


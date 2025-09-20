import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import { useCart } from '../core/cart/CartContext';

export default function PaymentSuccess({ className = '' }: { className?: string }) {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { clearCart } = useCart();
  
  useEffect(() => {
    const id = searchParams.get('order_id'); 
    setOrderId(id); 
    setLoading(false);
    
    // Always clear the cart when landing on payment success page
    // This ensures the cart is cleared regardless of any conditions
    clearCart();
    
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll); 
    return () => window.removeEventListener('scroll', onScroll);
  }, [searchParams, clearCart]);
  if (loading) {
    return (<div className={`min-h-screen bg-primary text-tertiary flex items-center justify-center ${className}`}><Navigation isScrolled={isScrolled} /><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tertiary mx-auto"></div><p className="mt-4 text-tertiary/90">Processing payment...</p></div></div>);
  }
  return (
    <div className={`min-h-screen bg-primary text-tertiary ${className}`}>
      <Navigation isScrolled={isScrolled} />
      <div className="h-28" />
      <Helmet><title>Payment Successful - Invictus Nutrition</title><meta name="description" content="Your payment was successful" /></Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-primary border-2 border-white rounded-2xl shadow-xl p-12 text-center">
          <div className="bg-green-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-12 h-12 text-white" /></div>
          <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">Payment Successful!</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">🎉 Thank you! Your payment has been processed successfully and your order is being prepared.</p>
          {orderId && (<div className="bg-primary rounded-lg p-6 mb-8 shadow-md border border-tertiary/30"><div className="flex items-center justify-center gap-2 mb-3"><Package className="w-6 h-6 text-tertiary" /><h3 className="text-xl font-semibold text-tertiary">Order Details</h3></div><p className="text-lg text-tertiary mb-2"><strong>Order ID:</strong> #{orderId}</p><p className="text-white">📧 You will receive an email confirmation shortly with tracking information.</p></div>)}
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/" className="w-full sm:w-auto bg-gradient-to-r from-tertiary to-primarySupport text-white py-4 px-6 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-transform flex items-center justify-center gap-2 font-semibold text-lg"><Home className="w-5 h-5" />Back to Home</Link><Link to="/shop" className="w-full sm:w-auto bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 py-3 px-6 font-medium flex items-center justify-center gap-2"><ShoppingBag className="w-5 h-5" />Continue Shopping</Link></div>
        </div>
      </div>
    </div>
  );
}


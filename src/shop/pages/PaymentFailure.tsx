import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { XCircle, Home, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';

export default function PaymentFailure({ className = '' }: { className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setIsScrolled(window.scrollY > 50); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  return (
    <div className={`min-h-screen bg-primary text-tertiary ${className}`}>
      <Navigation isScrolled={isScrolled} />
      <div className="h-28" />
      <Helmet><title>Payment Failed - Invictus Nutrition</title><meta name="description" content="Your payment failed" /></Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-primary border-2 border-white rounded-2xl shadow-xl p-12 text-center">
          <div className="bg-red-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"><XCircle className="w-12 h-12 text-white" /></div>
          <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">Payment Failed</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Unfortunately we couldn't process your transaction. Please try again or choose a different payment method.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/" className="w-full sm:w-auto bg-gradient-to-r from-tertiary to-primarySupport text-white py-4 px-6 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-transform flex items-center justify-center gap-2 font-semibold text-lg"><Home className="w-5 h-5" />Back to Home</Link><Link to="/shop" className="w-full sm:w-auto bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 py-3 px-6 font-medium flex items-center justify-center gap-2"><ShoppingBag className="w-5 h-5" />Continue Shopping</Link></div>
        </div>
      </div>
    </div>
  );
}


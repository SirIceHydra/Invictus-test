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
      <div className="h-20" />
      <Helmet><title>Payment Failed - Invictus Nutrition</title><meta name="description" content="Your payment failed" /></Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-primarySupport rounded-2xl shadow-xl p-12 text-center">
          <div className="bg-red-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"><XCircle className="w-12 h-12 text-white" /></div>
          <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">Payment Failed</h1>
          <p className="text-xl text-tertiary/90 mb-8 max-w-2xl mx-auto">Unfortunately we couldn't process your transaction. Please try again or choose a different payment method.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/" className="bg-tertiary text-primary px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2 text-lg"><Home className="w-5 h-5" />Back to Home</Link><Link to="/shop" className="bg-primary text-tertiary border-2 border-tertiary px-8 py-4 rounded-full font-semibold hover:bg-tertiary hover:text-primary transition-colors inline-flex items-center gap-2 text-lg"><ShoppingBag className="w-5 h-5" />Continue Shopping</Link></div>
        </div>
      </div>
    </div>
  );
}


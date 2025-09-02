import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';

export default function PaymentSuccess({ className = '' }: { className?: string }) {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const id = searchParams.get('order_id'); setOrderId(id); setLoading(false);
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll);
  }, [searchParams]);
  if (loading) {
    return (<div className={`min-h-screen bg-white flex items-center justify-center ${className}`}><Navigation isScrolled={isScrolled} /><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div><p className="mt-4 text-gray-600">Processing payment...</p></div></div>);
  }
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Navigation isScrolled={isScrolled} />
      <div className="h-20" />
      <Helmet><title>Payment Successful - Invictus Nutrition</title><meta name="description" content="Your payment was successful" /></Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-xl p-12 text-center">
          <div className="bg-green-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-12 h-12 text-white" /></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Payment Successful!</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">🎉 Thank you! Your payment has been processed successfully and your order is being prepared.</p>
          {orderId && (<div className="bg-white rounded-lg p-6 mb-8 shadow-md"><div className="flex items-center justify-center gap-2 mb-3"><Package className="w-6 h-6 text-rose-400" /><h3 className="text-xl font-semibold text-gray-900">Order Details</h3></div><p className="text-lg text-gray-700 mb-2"><strong>Order ID:</strong> #{orderId}</p><p className="text-gray-600">📧 You will receive an email confirmation shortly with tracking information.</p></div>)}
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/" className="bg-gradient-to-r from-rose-400 to-amber-400 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2 text-lg"><Home className="w-5 h-5" />Back to Home</Link><Link to="/shop" className="bg-white text-gray-800 border-2 border-gray-300 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-lg"><ShoppingBag className="w-5 h-5" />Continue Shopping</Link></div>
        </div>
      </div>
    </div>
  );
}


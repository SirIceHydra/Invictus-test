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
    return (<div className={`min-h-screen bg-primary text-tertiary flex items-center justify-center ${className}`}><Navigation isScrolled={isScrolled} /><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tertiary mx-auto"></div><p className="mt-4 text-tertiary/90">Processing payment...</p></div></div>);
  }
  return (
    <div className={`min-h-screen bg-primary text-tertiary ${className}`}>
      <Navigation isScrolled={isScrolled} />
      <div className="h-20" />
      <Helmet><title>Payment Successful - Invictus Nutrition</title><meta name="description" content="Your payment was successful" /></Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-primarySupport rounded-2xl shadow-xl p-12 text-center">
          <div className="bg-green-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-12 h-12 text-white" /></div>
          <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">Payment Successful!</h1>
          <p className="text-xl text-tertiary/90 mb-8 max-w-2xl mx-auto">🎉 Thank you! Your payment has been processed successfully and your order is being prepared.</p>
          {orderId && (<div className="bg-primary rounded-lg p-6 mb-8 shadow-md border border-tertiary/30"><div className="flex items-center justify-center gap-2 mb-3"><Package className="w-6 h-6 text-tertiary" /><h3 className="text-xl font-semibold text-tertiary">Order Details</h3></div><p className="text-lg text-tertiary mb-2"><strong>Order ID:</strong> #{orderId}</p><p className="text-tertiary/90">📧 You will receive an email confirmation shortly with tracking information.</p></div>)}
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/" className="bg-tertiary text-primary px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2 text-lg"><Home className="w-5 h-5" />Back to Home</Link><Link to="/shop" className="bg-primary text-tertiary border-2 border-tertiary px-8 py-4 rounded-full font-semibold hover:bg-tertiary hover:text-primary transition-colors inline-flex items-center gap-2 text-lg"><ShoppingBag className="w-5 h-5" />Continue Shopping</Link></div>
        </div>
      </div>
    </div>
  );
}


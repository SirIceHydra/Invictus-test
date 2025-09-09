import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function ShippingPolicy() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation isScrolled={false} />
      <div className="pt-24">
        <div className="container mx-auto px-4 py-16">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-600 transition-colors font-semibold"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-8">SHIPPING POLICY</h1>
          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <p className="text-gray-700 leading-relaxed mb-8">
                We know you're excited to receive your order, and we work hard to get your supplements to you as quickly as possible. Here's everything you need to know about our shipping process.
              </p>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing & Shipping Times</h2>
                <p className="text-gray-700 mb-4">
                  We aim to process and ship all orders within <strong>5-7 business days</strong> (Monday-Friday, excluding holidays) of your purchase. Once your order has shipped, you will receive a confirmation email with a tracking number so you can follow its journey to your doorstep.
                </p>
                <p className="text-gray-700 mb-4">
                  Please note that this timeframe does not include weekends or public holidays. Shipping times may vary based on your location and carrier delays, but we'll do our best to keep you informed of any issues.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Costs</h2>
                <p className="text-gray-700 mb-4">
                  Shipping costs are calculated at checkout and are based on your location and the size and weight of your order. We occasionally offer free shipping promotions, so be sure to sign up for our newsletter to stay updated.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Damaged or Lost Packages</h2>
                <div className="space-y-4">
                  <div className="bg-rose-50 border-l-4 border-rose-400 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Damaged Packages</h3>
                    <p className="text-gray-700">
                      If your package arrives damaged, please take photos of the package and the contents and contact us immediately at <a href="mailto:invictusnutrition@gmail.com" className="text-rose-400 hover:text-rose-600 underline">invictusnutrition@gmail.com</a>. We will work with the shipping carrier to resolve the issue and send you a replacement.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Lost Packages</h3>
                    <p className="text-gray-700">
                      If your tracking information shows that your package was delivered but you haven't received it, please check with your neighbors or your local post office. If you still can't locate the package, contact us, and we will do our best to assist you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

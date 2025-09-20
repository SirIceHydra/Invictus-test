import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function ShippingPolicy() {
  // Scroll restoration is now handled globally by ScrollRestoration component

  return (
    <div className="min-h-screen bg-primary text-white">
      <Navigation isScrolled={false} />
      
      {/* Hero Section */}
      <section className="py-20 bg-primary relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url(/assets/Banners/cover-background.png)" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="mb-6 text-tertiary">
            SHIPPING POLICY
          </h1>
          <p className="text-white max-w-4xl mx-auto leading-relaxed mb-8">
            We know you're excited to receive your order, and we work hard to get your supplements to you as quickly as possible.
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold inline-flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Border Section */}
      <section className="bg-primary border-t-2 border-white border-b-2 border-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-white">Everything you need to know about our shipping process</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary border-2 border-white shadow-lg p-6">
              <p className="text-white leading-relaxed mb-8">
                We know you're excited to receive your order, and we work hard to get your supplements to you as quickly as possible. Here's everything you need to know about our shipping process.
              </p>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Processing & Shipping Times</h2>
                <p className="text-white mb-4">
                  We aim to process and ship all orders within <strong>5-7 business days</strong> (Monday-Friday, excluding holidays) of your purchase. Once your order has shipped, you will receive a confirmation email with a tracking number so you can follow its journey to your doorstep.
                </p>
                <p className="text-white mb-4">
                  Please note that this timeframe does not include weekends or public holidays. Shipping times may vary based on your location and carrier delays, but we'll do our best to keep you informed of any issues.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Shipping Costs</h2>
                <p className="text-white mb-4">
                  Shipping costs are calculated at checkout and are based on your location and the size and weight of your order. We occasionally offer free shipping promotions, so be sure to sign up for our newsletter to stay updated.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Damaged or Lost Packages</h2>
                <p className="text-white mb-4">
                  If your package arrives damaged, please take photos of the package and the contents and contact us immediately at <a href="mailto:invictusnutrition@gmail.com" className="text-tertiary hover:text-tertiary/80 underline">invictusnutrition@gmail.com</a>. We will work with the shipping carrier to resolve the issue and send you a replacement.
                </p>
                <p className="text-white mb-4">
                  If your tracking information shows that your package was delivered but you haven't received it, please check with your neighbors or your local post office. If you still can't locate the package, contact us, and we will do our best to assist you.
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

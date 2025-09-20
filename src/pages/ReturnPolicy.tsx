import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function ReturnPolicy() {
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
            RETURN POLICY
          </h1>
          <p className="text-white max-w-4xl mx-auto leading-relaxed mb-8">
            We get it—sometimes things just don't work out. Our goal is to make returns as simple and stress-free as possible.
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
            <p className="text-white">Simple and stress-free returns for your peace of mind</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary border-2 border-white shadow-lg p-6">
              <p className="text-white leading-relaxed mb-8">
                We get it—sometimes things just don't work out. Our goal is to make returns as simple and stress-free as possible. Please read our policy below, and don't hesitate to reach out if you have any questions.
              </p>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Our 30-Day Money-Back Guarantee</h2>
                <p className="text-white mb-4">
                  We are confident you'll love our supplements. But if for any reason you're not completely satisfied with your purchase, you can return it within 30 days of the original purchase date for a full refund.
                </p>
                <p className="text-white mb-4">
                  To be eligible for a return, your item must be in its original packaging and you must provide proof of purchase. Please note that opened products are <strong>NOT</strong> still eligible for a refund.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">How to Initiate a Return</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-tertiary text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-tertiary mb-2">Contact Us</h3>
                      <p className="text-white">
                        Send an email to <a href="mailto:invictusbrands1@gmail.com" className="text-tertiary hover:text-tertiary/80 underline">invictusbrands1@gmail.com</a> with the subject line "Return Request" and your order number. Please let us know which product you'd like to return and the reason for the return (this helps us improve!).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-tertiary text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-tertiary mb-2">Receive Your Return Label</h3>
                      <p className="text-white">
                        We will send you a pre-paid return shipping label and instructions on how to send back your product.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-tertiary text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-tertiary mb-2">Ship It Back</h3>
                      <p className="text-white">
                        Securely pack the item in its original packaging and drop it off at the designated carrier.
                      </p>
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

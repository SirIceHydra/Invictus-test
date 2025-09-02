import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';

export default function ReturnPolicy() {
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

          <h1 className="text-4xl font-bold mb-8">RETURN POLICY</h1>
          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <p className="text-gray-700 leading-relaxed mb-8">
                We get it—sometimes things just don't work out. Our goal is to make returns as simple and stress-free as possible. Please read our policy below, and don't hesitate to reach out if you have any questions.
              </p>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our 30-Day Money-Back Guarantee</h2>
                <p className="text-gray-700 mb-4">
                  We are confident you'll love our supplements. But if for any reason you're not completely satisfied with your purchase, you can return it within 30 days of the original purchase date for a full refund.
                </p>
                <p className="text-gray-700 mb-4">
                  To be eligible for a return, your item must be in its original packaging and you must provide proof of purchase. Please note that opened products are <strong>NOT</strong> still eligible for a refund.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Initiate a Return</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-rose-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
                      <p className="text-gray-700">
                        Send an email to <a href="mailto:invictusbrands1@gmail.com" className="text-rose-400 hover:text-rose-600 underline">invictusbrands1@gmail.com</a> with the subject line "Return Request" and your order number. Please let us know which product you'd like to return and the reason for the return (this helps us improve!).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-rose-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Receive Your Return Label</h3>
                      <p className="text-gray-700">
                        We will send you a pre-paid return shipping label and instructions on how to send back your product.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-rose-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Ship It Back</h3>
                      <p className="text-gray-700">
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

      {/* Footer */}
      <footer className="bg-white border-t border-rose-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <img
              src="/assets/Invictus.svg"
              alt="Invictus Nutrition Full Logo"
              className="h-16 mx-auto"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <h4 className="text-xl font-bold mb-4">CONTACT US</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-center">
                  <Phone size={20} className="text-rose-400" />
                  <span>+27 73 951 6670</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Mail size={20} className="text-rose-400" />
                  <span>invictusbrands1@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <MapPin size={20} className="text-rose-400" />
                  <span>Kenilworth, Johannesburg</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">QUICK LINKS</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/#about" className="hover:text-rose-400 transition-colors">
                    ABOUT US
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" className="hover:text-rose-400 transition-colors">
                    SHIPPING POLICY
                  </Link>
                </li>
                <li>
                  <Link to="/return-policy" className="hover:text-rose-400 transition-colors">
                    RETURN POLICY
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:text-rose-400 transition-colors">
                    PRIVACY POLICY
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-rose-100 text-center text-gray-600">
            © 2025 INVICTUS NUTRITION. ALL RIGHTS RESERVED. Website designed &amp; hosted by{' '}
            <a
              href="https://www.kaizentech.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4682b4] hover:text-[#3a6d96] transition-colors"
            >
              Kaizen Technology
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

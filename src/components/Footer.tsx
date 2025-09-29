import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative border-t border-gray-200 py-12 bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <img
            src="/assets/Invictus.svg"
            alt="Invictus Nutrition Full Logo"
            className="h-16 mx-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <h4 className="mb-4 text-tertiary">CONTACT US</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Phone size={20} className="text-tertiary" />
                <span className="text-white">+27 73 951 6670</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Mail size={20} className="text-tertiary" />
                <span className="text-white">invictusbrands1@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <MapPin size={20} className="text-tertiary" />
                <span className="text-white">Kenilworth, Johannesburg</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-tertiary">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-tertiary transition-colors text-white">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-tertiary transition-colors text-white">
                  CONTACT US
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-tertiary transition-colors text-white">
                  SHIPPING POLICY
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-tertiary transition-colors text-white">
                  RETURN POLICY
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-tertiary transition-colors text-white">
                  PRIVACY POLICY
                </Link>
              </li>
              <li>
                <Link to="/cookies-policy" className="hover:text-tertiary transition-colors text-white">
                  COOKIES POLICY
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-tertiary">FOLLOW US</h4>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/invictus_nutritionza?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:scale-110 transition-transform duration-300 group"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} className="text-tertiary group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/people/Invictus-Nutritionza/61577002406246/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:scale-110 transition-transform duration-300 group"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={24} className="text-tertiary group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <p className="text-white/80 text-sm mt-4">
              Stay connected for the latest updates and offers
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-white">
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
  );
};

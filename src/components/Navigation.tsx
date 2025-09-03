import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@shop/core/cart/CartContext';
import { useBrands } from '../hooks/useBrands';
import { useCategories } from '../hooks/useCategories';
import { useWordPressCategories } from '../hooks/useWordPressCategories';

interface NavigationProps {
  isScrolled: boolean;
}

export function Navigation({ isScrolled }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileWorkoutOpen, setMobileWorkoutOpen] = useState(false);
  const { cart } = useCart();
  const { brands, loading: brandsLoading } = useBrands();
  const { categories, loading: categoriesLoading } = useCategories();
  const { categories: wordpressCategories, loading: wordpressCategoriesLoading } = useWordPressCategories();

  // Filter for workout plan categories (categories that are children of "Workout Plans" parent)
  const workoutCategories = wordpressCategories.filter(cat => {
    // Find the "Workout Plans" parent category
    const workoutPlansParent = wordpressCategories.find(parent => 
      parent.name.toLowerCase().includes('workout') && parent.parent === 0
    );
    // Return categories that are children of the workout plans parent
    return workoutPlansParent && cat.parent === workoutPlansParent.id;
  });

  return (
    <nav
      className="fixed w-full z-[9999] transition-all duration-300 bg-white/95 pt-8 pb-8 shadow-lg top-0"
    >
      <div className="container mx-auto px-4 flex items-center justify-between max-w-full">
        {/* LOGO */}
        <Link to="/">
          <img
            src="/assets/Invictus.svg"
            alt="Invictus Nutrition Logo"
            className="max-h-12 transition-all duration-300 cursor-pointer hover:opacity-80"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/shop?onSale=true" className="hover:text-rose-400 transition-colors font-medium text-lg">
            SPECIALS
          </Link>
          
          {/* Brands Dropdown */}
          <div className="relative group">
            <button className="hover:text-rose-400 transition-colors font-medium text-lg flex items-center gap-1">
              BRANDS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {brandsLoading ? (
                <div className="px-4 py-2 text-gray-500">Loading brands...</div>
              ) : brands.length > 0 ? (
                brands.map((brand) => (
                  <Link 
                    key={brand.id}
                    to={`/shop?brand=${brand.name}`} 
                    className="block px-4 py-2 hover:bg-rose-50 hover:text-rose-400 transition-colors"
                  >
                    {brand.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No brands available</div>
              )}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative group">
            <button className="hover:text-rose-400 transition-colors font-medium text-lg flex items-center gap-1">
              CATEGORY
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {categoriesLoading ? (
                <div className="px-4 py-2 text-gray-500">Loading categories...</div>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <Link 
                    key={category.id}
                    to={`/shop?category=${category.id}`} 
                    className="block px-4 py-2 hover:bg-rose-50 hover:text-rose-400 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No categories available</div>
              )}
            </div>
          </div>

          {/* Workout Plans Dropdown */}
          <div className="relative group">
            <button className="hover:text-rose-400 transition-colors font-medium text-lg flex items-center gap-1">
              WORKOUT PLANS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {wordpressCategoriesLoading ? (
                <div className="px-4 py-2 text-gray-500">Loading workout plans...</div>
              ) : workoutCategories.length > 0 ? (
                workoutCategories.map((category) => (
                  <Link 
                    key={category.id}
                    to={`/posts?category=${category.slug}`} 
                    className="block px-4 py-2 hover:bg-rose-50 hover:text-rose-400 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No workout plans available</div>
              )}
            </div>
          </div>

          <Link to="/shop" className="hover:text-rose-400 transition-colors font-medium text-lg">
            SHOP
          </Link>
          
          <Link to="/blog-hub" className="hover:text-rose-400 transition-colors font-medium text-lg">
            BLOG HUB
          </Link>
          
          <Link 
            to="/cart" 
            className="border-2 border-rose-400 px-6 py-2 rounded-full flex items-center gap-2 hover:bg-rose-400 hover:text-white transition-all duration-300 relative"
          >
            <ShoppingCart size={20} />
            CART
            {cart.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.itemCount}
              </span>
            )}
          </Link>
          <Link
            to="/shop"
            className="bg-gradient-to-r from-rose-400 to-amber-400 px-6 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform text-white whitespace-nowrap"
          >
            <ShoppingCart size={20} />
            SHOP NOW
          </Link>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full">
          <div className="flex flex-col p-4 gap-4">
            <Link
              to="/shop?onSale=true"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-rose-400 transition-colors font-medium"
            >
              SPECIALS
            </Link>
            
            {/* Mobile Brands Section (collapsible) */}
            <div className="border-l-2 border-rose-200 pl-4">
              <button
                className="w-full text-left text-sm text-gray-600 mb-2 flex items-center justify-between"
                onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
                aria-expanded={mobileBrandsOpen}
                aria-controls="mobile-brands-list"
              >
                <span>BRANDS</span>
                {mobileBrandsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {mobileBrandsOpen && (
                <div id="mobile-brands-list">
                  {brandsLoading ? (
                    <div className="text-gray-500 py-1">Loading brands...</div>
                  ) : brands.length > 0 ? (
                    brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={`/shop?brand=${brand.name}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-rose-400 transition-colors"
                      >
                        {brand.name}
                      </Link>
                    ))
                  ) : (
                    <div className="text-gray-500 py-1">No brands available</div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Category Section (collapsible) */}
            <div className="border-l-2 border-rose-200 pl-4">
              <button
                className="w-full text-left text-sm text-gray-600 mb-2 flex items-center justify-between"
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                aria-expanded={mobileCategoriesOpen}
                aria-controls="mobile-categories-list"
              >
                <span>CATEGORY</span>
                {mobileCategoriesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {mobileCategoriesOpen && (
                <div id="mobile-categories-list">
                  {categoriesLoading ? (
                    <div className="text-gray-500 py-1">Loading categories...</div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/shop?category=${category.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-rose-400 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="text-gray-500 py-1">No categories available</div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Workout Plans Section (collapsible) */}
            <div className="border-l-2 border-rose-200 pl-4">
              <button
                className="w-full text-left text-sm text-gray-600 mb-2 flex items-center justify-between"
                onClick={() => setMobileWorkoutOpen(!mobileWorkoutOpen)}
                aria-expanded={mobileWorkoutOpen}
                aria-controls="mobile-workout-list"
              >
                <span>WORKOUT PLANS</span>
                {mobileWorkoutOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {mobileWorkoutOpen && (
                <div id="mobile-workout-list">
                  {wordpressCategoriesLoading ? (
                    <div className="text-gray-500 py-1">Loading workout plans...</div>
                  ) : workoutCategories.length > 0 ? (
                    workoutCategories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/posts?category=${category.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-rose-400 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="text-gray-500 py-1">No workout plans available</div>
                  )}
                </div>
              )}
            </div>

                         <Link
               to="/shop"
               onClick={() => setMobileMenuOpen(false)}
               className="hover:text-rose-400 transition-colors font-medium"
             >
               SHOP
             </Link>
             
                           <Link
                to="/blog-hub"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-rose-400 transition-colors font-medium"
              >
                BLOG HUB
              </Link>
             
             <Link
               to="/faq"
               onClick={() => setMobileMenuOpen(false)}
               className="hover:text-rose-400 transition-colors font-medium"
             >
               FAQ
             </Link>
             
                           <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-rose-400 transition-colors font-medium"
              >
                ABOUT
              </Link>
              
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-rose-400 transition-colors font-medium"
              >
                CONTACT
              </Link>
             
             <Link
               to="/cart"
               onClick={() => setMobileMenuOpen(false)}
               className="border-2 border-rose-400 px-6 py-2 rounded-full flex items-center gap-2 hover:bg-rose-400 hover:text-white transition-all duration-300 relative"
             >
              <ShoppingCart size={20} />
              CART
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gradient-to-r from-rose-400 to-amber-400 px-6 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform text-white"
            >
              <ShoppingCart size={20} />
              SHOP NOW
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 
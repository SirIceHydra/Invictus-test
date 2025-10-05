import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ChevronDown, ChevronUp, Truck, Gift, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@shop/core/cart/CartContext";
import { useBrands } from "../hooks/useBrands";
import { useCategories } from "../hooks/useCategories";
import { useWordPressCategories } from "../hooks/useWordPressCategories";
import { useSiteSearch } from "../hooks/useSiteSearch";
import { SearchSuggestions } from "./SearchSuggestions";

interface NavigationProps {
  isScrolled: boolean;
}

export function Navigation({}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileWorkoutOpen, setMobileWorkoutOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Site-wide search functionality
  const { searchTerm, suggestions, loading: searchLoading, search, clearSearch, loadData } = useSiteSearch({
    maxResults: 8,
    debounceMs: 300
  });
  const { cart } = useCart();
  const { brands, loading: brandsLoading } = useBrands();
  const { categories, loading: categoriesLoading } = useCategories();
  const {
    categories: wordpressCategories,
    loading: wordpressCategoriesLoading,
  } = useWordPressCategories();

  // Filter for workout plan categories (categories that are children of "Workout Plans" parent)
  const workoutCategories = wordpressCategories.filter((cat) => {
    // Find the "Workout Plans" parent category
    const workoutPlansParent = wordpressCategories.find(
      (parent) =>
        parent.name.toLowerCase().includes("workout") && parent.parent === 0
    );
    // Return categories that are children of the workout plans parent
    return workoutPlansParent && cat.parent === workoutPlansParent.id;
  });

  const freeShippingThreshold = parseFloat(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD || '1000');

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Hide bar after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Load search data on component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Close search on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        clearSearch();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (searchOpen && !target.closest('[data-search-container]')) {
        setSearchOpen(false);
        clearSearch();
      }
    };

    if (searchOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen, clearSearch]);

  return (
    <nav className="fixed w-full z-[9999] transition-all duration-300 bg-primary/95 shadow-lg top-0">
      {/* Main Navigation */}
      <div className="pt-8 pb-8">
        <div className="container mx-auto px-4 flex items-center justify-between max-w-full">
        {/* LOGO */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/assets/Invictus.svg"
            alt="Invictus Nutrition Logo"
            className="max-h-12 transition-all duration-300 cursor-pointer hover:opacity-80"
          />
        </Link>

        {/* Desktop Nav Links and Search */}
        <div className="hidden xl:flex items-center gap-6" data-search-container>
          <Link
            to="/shop?onSale=true"
            className="hover:text-white transition-colors font-medium text-base text-tertiary"
          >
            SPECIALS
          </Link>

          {/* Brands Dropdown */}
          <div className="relative group">
            <button className="hover:text-white transition-colors font-medium text-base flex items-center gap-1 text-tertiary">
              BRANDS
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute top-full left-0 bg-primary shadow-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {brandsLoading ? (
                <div className="px-4 py-2 text-tertiary/80">Loading brands...</div>
              ) : brands.length > 0 ? (
                brands.map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/shop?brand=${brand.name}`}
                    className="block px-4 py-2 hover:bg-primary hover:text-white transition-colors text-tertiary"
                  >
                    {brand.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-tertiary/80">
                  No brands available
                </div>
              )}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative group">
            <button className="hover:text-white transition-colors font-medium text-base flex items-center gap-1 text-tertiary">
              CATEGORY
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute top-full left-0 bg-primary shadow-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {categoriesLoading ? (
                <div className="px-4 py-2 text-tertiary/80">
                  Loading categories...
                </div>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/shop?category=${category.id}`}
                    className="block px-4 py-2 hover:bg-primary hover:text-white transition-colors text-tertiary"
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-tertiary/80">
                  No categories available
                </div>
              )}
            </div>
          </div>

          {/* Workout Plans Dropdown - Hidden when search is open */}
          {!searchOpen && (
            <div className="relative group">
              <button className="hover:text-white transition-colors font-medium text-base flex items-center gap-1 text-tertiary">
                WORKOUT PLANS
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 bg-primary shadow-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {wordpressCategoriesLoading ? (
                  <div className="px-4 py-2 text-tertiary/80">
                    Loading workout plans...
                  </div>
                ) : workoutCategories.length > 0 ? (
                  workoutCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/blog-hub?category=${category.slug}`}
                      className="block px-4 py-2 hover:bg-primary hover:text-white transition-colors text-tertiary"
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-tertiary/80">
                    No workout plans available
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Blog Hub Link - Hidden when search is open */}
          {!searchOpen && (
            <Link
              to="/blog-hub"
              className="hover:text-white transition-colors font-medium text-base text-tertiary"
            >
              BLOG HUB
            </Link>
          )}

          {/* About Link - Hidden when search is open */}
          {!searchOpen && (
            <Link
              to="/about"
              className="hover:text-white transition-colors font-medium text-base text-tertiary"
            >
              ABOUT
            </Link>
          )}

          <Link
            to="/cart"
            className="relative group flex items-center gap-2 transition-all duration-300 text-tertiary font-medium text-base"
          >
            <ShoppingCart size={20} />
            CART
            {cart.itemCount > 0 && (
              <span className="absolute -top-4 -right-4 bg-tertiary text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.itemCount}
              </span>
            )}
            <span className="pointer-events-none absolute left-0 bottom-0 h-0.5 w-0 bg-tertiary transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            to="/shop"
            className="relative group flex items-center gap-2 transition-all duration-300 text-tertiary font-medium text-base whitespace-nowrap overflow-hidden"
          >
            <ShoppingCart size={20} />
            SHOP NOW
            <span className="pointer-events-none absolute left-0 bottom-0 h-0.5 w-0 bg-tertiary transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Search Section */}
          <div className="relative flex items-center">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-tertiary hover:text-white transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Search Input */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              searchOpen ? 'w-96 opacity-100' : 'w-0 opacity-0'
            }`}>
              <div className="flex items-center h-10">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => search(e.target.value)}
                  placeholder="Search products & articles..."
                  className="w-full h-full px-3 bg-primary border border-tertiary/40 text-tertiary placeholder-tertiary/60 focus:ring-2 focus:ring-tertiary focus:border-transparent rounded-l-md"
                  autoFocus={searchOpen}
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    clearSearch();
                  }}
                  className="h-full px-3 bg-tertiary text-primary hover:bg-tertiary/90 transition-colors rounded-r-md flex items-center justify-center"
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Search Suggestions */}
            {searchOpen && (searchTerm.length > 0 || searchLoading) && (
              <SearchSuggestions
                suggestions={suggestions}
                loading={searchLoading}
                onSuggestionClick={() => {
                  setSearchOpen(false);
                  clearSearch();
                }}
              />
            )}
          </div>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="xl:hidden text-tertiary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-primarySupport shadow-lg w-full mt-2">
          <div className="flex flex-col p-4 gap-4">
            <Link
              to="/shop?onSale=true"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-secondary transition-colors font-medium text-secondary"
            >
              SPECIALS
            </Link>

            {/* Mobile Brands Section (collapsible) */}
            <div className="border-l-2 border-gray-600 pl-4">
              <button
                className="w-full text-left text-sm text-gray-300 mb-2 flex items-center justify-between"
                onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
                aria-expanded={mobileBrandsOpen}
                aria-controls="mobile-brands-list"
              >
                <span>BRANDS</span>
                {mobileBrandsOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {mobileBrandsOpen && (
                <div id="mobile-brands-list">
                  {brandsLoading ? (
                    <div className="text-gray-300 py-1">Loading brands...</div>
                  ) : brands.length > 0 ? (
                    brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={`/shop?brand=${brand.name}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-secondary transition-colors text-gray-300"
                      >
                        {brand.name}
                      </Link>
                    ))
                  ) : (
                    <div className="text-gray-300 py-1">
                      No brands available
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Category Section (collapsible) */}
            <div className="border-l-2 border-gray-600 pl-4">
              <button
                className="w-full text-left text-sm text-gray-300 mb-2 flex items-center justify-between"
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                aria-expanded={mobileCategoriesOpen}
                aria-controls="mobile-categories-list"
              >
                <span>CATEGORY</span>
                {mobileCategoriesOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {mobileCategoriesOpen && (
                <div id="mobile-categories-list">
                  {categoriesLoading ? (
                    <div className="text-gray-300 py-1">
                      Loading categories...
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/shop?category=${category.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-secondary transition-colors text-gray-300"
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="text-gray-300 py-1">
                      No categories available
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Workout Plans Section (collapsible) */}
            <div className="border-l-2 border-gray-600 pl-4">
              <button
                className="w-full text-left text-sm text-gray-300 mb-2 flex items-center justify-between"
                onClick={() => setMobileWorkoutOpen(!mobileWorkoutOpen)}
                aria-expanded={mobileWorkoutOpen}
                aria-controls="mobile-workout-list"
              >
                <span>WORKOUT PLANS</span>
                {mobileWorkoutOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {mobileWorkoutOpen && (
                <div id="mobile-workout-list">
                  {wordpressCategoriesLoading ? (
                    <div className="text-gray-300 py-1">
                      Loading workout plans...
                    </div>
                  ) : workoutCategories.length > 0 ? (
                    workoutCategories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/blog-hub?category=${category.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 hover:text-secondary transition-colors text-gray-300"
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="text-gray-300 py-1">
                      No workout plans available
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/blog-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-secondary transition-colors font-medium text-secondary"
            >
              BLOG HUB
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-secondary transition-colors font-medium text-secondary"
            >
              ABOUT
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="relative group px-6 py-2 flex items-center gap-2 transition-all duration-300 text-secondary"
            >
              <ShoppingCart size={20} />
              CART
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-tertiary text-primary text-xs w-5 h-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
              <span className="pointer-events-none absolute left-0 bottom-0 h-0.5 w-0 bg-tertiary transition-all duration-300 group-hover:w-full" />
            </Link>
            {/* Mobile Search */}
            <div className="px-6 py-2">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-tertiary" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => search(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchTerm.trim()) {
                      // Redirect to shop page with search term
                      window.location.href = `/shop?search=${encodeURIComponent(searchTerm.trim())}`;
                      setMobileMenuOpen(false);
                      clearSearch();
                    }
                  }}
                  placeholder="Search products & articles..."
                  className="flex-1 px-3 py-2 bg-primary border border-tertiary/40 text-tertiary placeholder-tertiary/60 focus:ring-2 focus:ring-tertiary focus:border-transparent rounded-md"
                />
              </div>
            </div>

            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gradient-to-r from-tertiary to-primarySupport px-6 py-2 flex items-center gap-2 hover:scale-105 transition-transform text-white"
            >
              <ShoppingCart size={20} />
              SHOP NOW
            </Link>
          </div>
        </div>
      )}
      </div>

      {/* Free Shipping Bar - Integrated into Navigation */}
      <div className={`transition-all duration-500 ease-out overflow-hidden ${
        isScrolled ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100'
      }`}>
        <div className="bg-gradient-to-r from-primary to-primarySupport border-t border-tertiary/20">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col items-center justify-center">
              {/* Main shipping banner content */}
              <div className="flex items-center gap-6 text-center">
                <div className="flex items-center gap-2">
                  <div className="bg-tertiary/20 p-1.5 rounded-full">
                    <Truck className="w-4 h-4 text-tertiary" />
                  </div>
                  <div>
                    <span className="text-tertiary font-bold text-sm">Free Shipping on orders over R{freeShippingThreshold}</span>
                  </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-4 text-secondary/80 text-xs">
                  <div className="flex items-center gap-1">
                    <Gift className="w-3 h-3 text-tertiary" />
                    <span>Track your order</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-tertiary" />
                    <span>3-5 day delivery</span>
                  </div>
                  <Link 
                    to="/shipping-policy" 
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    View shipping policy
                  </Link>
                </div>
              </div>
              
              {/* Mobile shipping policy link - properly integrated */}
              <div className="sm:hidden mt-1">
                <Link 
                  to="/shipping-policy" 
                  className="text-blue-400 hover:text-blue-300 underline text-xs transition-colors"
                >
                  View shipping policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

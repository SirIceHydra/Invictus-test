import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Clock,
  Plus,
  Minus,
  ShoppingCart
} from 'lucide-react';
import { Helmet } from 'react-helmet';
import ProteinPancakes from './ProteinPancakes';
import PostWorkoutSmoothie from './PostWorkoutSmoothie';
import ProteinEnergyBalls from './ProteinEnergyBalls';
import Shop from '@shop/pages/Shop';
import Cart from '@shop/pages/Cart';
import Checkout from '@shop/pages/Checkout';
import PaymentSuccess from '@shop/pages/PaymentSuccess';
import PaymentFailure from '@shop/pages/PaymentFailure';
import { ShopProvider } from '@shop/core/ShopProvider';
import { CartProvider } from '@shop/core/cart/CartContext';
import { Navigation } from './components/Navigation';
import { HeroSlideshow } from './extras/components/slideshows';
import { useProducts } from '@shop/core/hooks/useProducts';
import { ProductCard } from '@shop/ui/ProductCard';
import { ProductDetailsModal } from '@shop/ui/ProductDetailsModal';
import { Loading } from './components/ui/Loading';
import { PostGrid } from './posts/components/PostGrid';
import { usePosts } from './posts/hooks/usePosts';
import { preloadCache } from './posts/services/wordpress-api';
import PostsPage from './posts/pages/PostsPage';
import PostDetailPage from './posts/pages/PostDetailPage';
import BlogHub from './posts/pages/BlogHub';
import ShippingPolicy from './pages/ShippingPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import BlogPage from './pages/BlogPage';
import ContactUs from './pages/ContactUs';
import BrandsSlider from './components/BrandsSlider';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Preload posts cache on app start - temporarily disabled
  // useEffect(() => {
  //   preloadCache();
  // }, []);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);


    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setTimeout(() => {
      setActiveFaq(activeFaq === index ? null : index);
    }, 0);
  };

  // Helmet-based SEO metadata
  const SEOHead = () => (
    <Helmet>
      {/* Keep the title around ~65-70 chars if possible */}
      <title>Buy Optimum Nutrition Whey Protein in South Africa - Invictus</title>

      <meta
        name="description"
        content="Buy Optimum Nutrition Whey Protein in South Africa. 24g protein per serving. Fast shipping & best prices from Invictus Nutrition."
      />
      {/* Optionally add keywords meta (not as critical today) */}
      <meta
        name="keywords"
        content="nutrition, optimum, whey, protein, online, south africa, invictus"
      />
    </Helmet>
  );

  const HomePage = () => {
    const { products, loading: productsLoading, fetchProducts } = useProducts({ perPage: 4, orderBy: 'date', order: 'desc', featured: true });
    const { products: bestSellers, loading: bestSellersLoading, fetchProducts: fetchBestSellers } = useProducts({ perPage: 4, orderBy: 'popularity', order: 'desc' });
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [scrollPositions, setScrollPositions] = useState({ featured: 0, specials: 0, latest: 0 });

 

    useEffect(() => {
      fetchProducts();
      fetchBestSellers();
    }, [fetchProducts, fetchBestSellers]);

    const handleScroll = (id: string, e: React.UIEvent<HTMLDivElement>) => {
      const container = document.getElementById(id);
      if (container) {
        setScrollPositions(prev => ({
          ...prev,
          [id]: container.scrollLeft
        }));
      }
    };


    return (
    <div className="min-h-screen bg-white text-black">
      <SEOHead />

      {/* Navigation */}
      <Navigation isScrolled={isScrolled} />

      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Featured Products Section */}
      <section className="py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">
              FEATURED PRODUCTS
            </h3>
            <p className="text-gray-600 text-lg">
              Discover our premium nutrition supplements
            </p>
          </div>
          
          {productsLoading ? (
            <div className="flex justify-center"><Loading text="Loading products..." /></div>
          ) : (
            <>
              {/* Mobile: horizontal scroll */}
              <div className="md:hidden -mx-4 px-4 mt-4 relative group">
                <div 
                  id="featured-products"
                  className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                  onScroll={(e) => handleScroll('featured', e)}
                >
                  {products.slice(0, 8).map((product) => (
                    <div key={product.id} className="min-w-[260px] max-w-[280px] snap-start">
                      <ProductCard 
                        product={product}
                        className="hover-lift"
                        onViewDetails={(p) => { setSelectedProduct(p); setModalOpen(true); }}
                      />
                    </div>
                  ))}
                </div>
                
                
              </div>

              {/* Desktop: grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    className="hover-lift"
                    onViewDetails={(p) => { setSelectedProduct(p); setModalOpen(true); }}
                  />
                ))}
              </div>
            </>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="bg-gradient-to-r from-rose-400 to-amber-400 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform text-white inline-flex items-center gap-2"
            >
              VIEW ALL PRODUCTS <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* JSON-LD for Merchant Listings */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: 'Optimum Nutrition Whey',
              image: [
                'https://invictusnutrition.co.za/assets/optimum-nutrition.jpeg'
              ],
              description:
                'Premium whey protein isolate. 24g protein per serving. Available in multiple sizes and flavors.',
              brand: {
                '@type': 'Brand',
                name: 'Optimum Nutrition'
              },
              offers: [
                {
                  '@type': 'Offer',
                  sku: 'ONWhey2268g',
                  price: '2199.00',
                  priceCurrency: 'ZAR',
                  availability: 'https://schema.org/InStock',
                  url: 'https://www.takealot.com/seller/invictus-brands?sellers=29887187',
                  hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    applicableCountry: 'ZA',
                    returnPolicyCategory: 'https://schema.org/ExchangeRefund',
                    merchantReturnDays: '180',
                    returnPolicyUrl: 'https://www.takealot.com/help/returns'
                  },
                  shippingDetails: {
                    '@type': 'OfferShippingDetails',
                    shippingRate: {
                      '@type': 'MonetaryAmount',
                      value: '0.00',
                      currency: 'ZAR'
                    },
                    shippingDestination: {
                      '@type': 'DefinedRegion',
                      addressCountry: 'ZA'
                    },
                    deliveryTime: {
                      '@type': 'ShippingDeliveryTime',
                      transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 2,
                        maxValue: 7,
                        unitCode: 'DAY'
                      }
                    }
                  }
                },
                {
                  '@type': 'Offer',
                  sku: 'ONWhey908g',
                  price: '1049.00',
                  priceCurrency: 'ZAR',
                  availability: 'https://schema.org/InStock',
                  url: 'https://www.takealot.com/seller/invictus-brands?sellers=29887187',
                  hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    applicableCountry: 'ZA',
                    returnPolicyCategory: 'https://schema.org/ExchangeRefund',
                    merchantReturnDays: '180',
                    returnPolicyUrl: 'https://www.takealot.com/help/returns'
                  },
                  shippingDetails: {
                    '@type': 'OfferShippingDetails',
                    shippingRate: {
                      '@type': 'MonetaryAmount',
                      value: '0.00',
                      currency: 'ZAR'
                    },
                    shippingDestination: {
                      '@type': 'DefinedRegion',
                      addressCountry: 'ZA'
                    },
                    deliveryTime: {
                      '@type': 'ShippingDeliveryTime',
                      transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 2,
                        maxValue: 7,
                        unitCode: 'DAY'
                      }
                    }
                  }
                }
              ]
            })
          }}
        />
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-4xl font-bold mb-4">
                OUR BRANDS
              </h3>
              <p className="text-gray-600 text-lg">
                Discover premium nutrition brands trusted by athletes worldwide
              </p>
            </div>
            
            <div>
              <BrandsSlider />
            </div>
          </div>
        </div>
      </section>

        {/* On Sale Products Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">
                SPECIAL OFFERS
              </h3>
              <p className="text-gray-600 text-lg">
                Limited time deals on premium nutrition supplements
              </p>
            </div>
            
            {productsLoading ? (
              <div className="flex justify-center"><Loading text="Loading special offers..." /></div>
            ) : (
              <>
                {/* Mobile: horizontal scroll */}
                <div className="md:hidden -mx-4 px-4 mt-4 relative group">
                  <div 
                    id="special-offers"
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    onScroll={(e) => handleScroll('specials', e)}
                  >
                    {products
                      .filter(product => product.onSale)
                      .slice(0, 12)
                      .map((product) => (
                        <div key={product.id} className="min-w-[260px] max-w-[280px] snap-start">
                          <ProductCard 
                            product={product} 
                            className="hover-lift"
                            onViewDetails={(p) => { setSelectedProduct(p); setModalOpen(true); }}
                          />
                        </div>
                      ))}
                  </div>
                  
                  
                </div>

                {/* Desktop: grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {products
                    .filter(product => product.onSale)
                    .slice(0, 12)
                    .map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        className="hover-lift"
                        onViewDetails={(p) => { setSelectedProduct(p); setModalOpen(true); }}
                      />
                    ))}
                </div>
              </>
            )}
            
            {products.filter(product => product.onSale).length === 0 && !productsLoading && (
              <div className="text-center py-12">
                <div className="bg-white/50 rounded-lg p-8 max-w-md mx-auto">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-xl font-semibold text-gray-600 mb-2">No Special Offers Right Now</h4>
                  <p className="text-gray-500">Check back soon for amazing deals on premium supplements!</p>
                </div>
              </div>
            )}
            
            {products.filter(product => product.onSale).length > 0 && (
              <div className="text-center mt-12">
                <Link
                  to="/shop?onSale=true"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform text-white inline-flex items-center gap-2"
                >
                  VIEW ALL SPECIALS <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Invictus Section */}
       <section className="py-20 bg-white">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <h3 className="text-4xl font-bold mb-4">
               WHY CHOOSE INVICTUS NUTRITION?
             </h3>
             <p className="text-gray-600 text-lg max-w-3xl mx-auto">
               We're committed to providing you with the highest quality supplements backed by science and delivered with excellence
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="text-center">
               <div className="bg-gradient-to-br from-rose-400 to-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <h4 className="text-xl font-bold mb-3">PREMIUM QUALITY</h4>
               <p className="text-gray-600">
                 All products are third-party tested and meet the highest industry standards for purity and potency
               </p>
             </div>
             
             <div className="text-center">
               <div className="bg-gradient-to-br from-rose-400 to-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <h4 className="text-xl font-bold mb-3">FAST DELIVERY</h4>
               <p className="text-gray-600">
                 Quick and reliable shipping across South Africa with real-time tracking and secure packaging
               </p>
             </div>
             
             <div className="text-center">
               <div className="bg-gradient-to-br from-rose-400 to-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                 </svg>
               </div>
               <h4 className="text-xl font-bold mb-3">EXPERT SUPPORT</h4>
               <p className="text-gray-600">
                 Our nutrition experts are here to help you choose the right products for your fitness goals
               </p>
             </div>
             
             <div className="text-center">
               <div className="bg-gradient-to-br from-rose-400 to-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                 </svg>
               </div>
               <h4 className="text-xl font-bold mb-3">CUSTOMER SATISFACTION</h4>
               <p className="text-gray-600">
                 Join thousands of satisfied customers who trust Invictus for their nutrition needs
               </p>
             </div>
           </div>
           
           <div className="text-center mt-12">
             <Link
               to="/contact"
               className="bg-gradient-to-r from-rose-400 to-amber-400 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform text-white inline-flex items-center gap-2"
             >
               GET EXPERT ADVICE <ArrowRight size={20} />
             </Link>
           </div>
         </div>
               </section>

                                                               {/* Latest Arrivals Section */}
         <section className="py-20 bg-rose-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">
                LATEST ARRIVALS
          </h3>
              <p className="text-gray-600 text-lg">
                Fresh new products just added to our collection
              </p>
            </div>
           
                                   {bestSellersLoading ? (
              <div className="flex justify-center">
                <Loading text="Loading latest arrivals..." />
              </div>
            ) : bestSellers.length > 0 ? (
              <>
                {/* Mobile: horizontal scroll */}
                <div className="md:hidden -mx-4 px-4 mt-4 relative group">
                  <div 
                    id="latest-arrivals"
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    onScroll={(e) => handleScroll('latest', e)}
                  >
                    {bestSellers.slice(0, 12).map((product) => (
                      <div key={product.id} className="min-w-[260px] max-w-[280px] snap-start">
                        <ProductCard
                          key={product.id}
                          product={product}
                          className="hover-lift"
                          onViewDetails={(p) => { setSelectedProduct(p); setModalOpen(true); }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  
                </div>

                {/* Desktop: grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellers.slice(0, 12).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      className="hover-lift"
                      onViewDetails={(p) => { setSelectedProduct(p); setModalOpen(true); }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No latest arrivals available at the moment.</p>
              </div>
            )}
           
                       <div className="text-center mt-12">
              <Link
                to="/shop"
                className="bg-gradient-to-r from-rose-400 to-amber-400 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform text-white inline-flex items-center gap-2"
              >
                VIEW ALL PRODUCTS <ArrowRight size={20} />
              </Link>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center">FAQ</h3>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'WHEN SHOULD I TAKE PROTEIN POWDER?',
                a: 'FOR OPTIMAL RESULTS, CONSUME WITHIN 30 MINUTES AFTER YOUR WORKOUT. YOU CAN ALSO TAKE IT ANY TIME OF DAY TO MEET YOUR PROTEIN REQUIREMENTS.'
              },
              {
                q: 'HOW MUCH PROTEIN DO I NEED?',
                a: 'GENERALLY, ACTIVE INDIVIDUALS NEED 1.6-2.2G OF PROTEIN PER KG OF BODY WEIGHT DAILY. ATHLETES MAY REQUIRE MORE BASED ON TRAINING INTENSITY.'
              },
              {
                q: 'IS THIS PRODUCT THIRD-PARTY TESTED?',
                a: 'YES, OUR PRODUCTS UNDERGO RIGOROUS THIRD-PARTY TESTING TO ENSURE QUALITY, PURITY, AND LABEL ACCURACY.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-rose-50 rounded-lg overflow-hidden transition-colors"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFaq(index);
                  }}
                  className="w-full p-6 flex justify-between items-center cursor-pointer hover:bg-rose-100 transition-colors"
                >
                  <h4 className="text-xl font-semibold text-left">{item.q}</h4>
                  {activeFaq === index ? (
                    <Minus size={20} className="text-rose-400 flex-shrink-0" />
                  ) : (
                    <Plus size={20} className="text-rose-400 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden bg-white/50`}
                >
                  <p className="p-6 text-gray-700">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <ProductDetailsModal product={selectedProduct} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
    );
  };

    return (
    <ShopProvider>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/protein-pancakes" element={<ProteinPancakes />} />
          <Route path="/post-workout-smoothie" element={<PostWorkoutSmoothie />} />
          <Route path="/protein-energy-balls" element={<ProteinEnergyBalls />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:slug" element={<PostDetailPage />} />
           <Route path="/blog-hub" element={<BlogHub />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />
          <Route path="/payment/cancel" element={<PaymentFailure />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </CartProvider>
    </ShopProvider>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";
import ProteinPancakes from "./ProteinPancakes";
import PostWorkoutSmoothie from "./PostWorkoutSmoothie";
import ProteinEnergyBalls from "./ProteinEnergyBalls";
import Shop from "@shop/pages/Shop";
import Cart from "@shop/pages/Cart";
import Checkout from "@shop/pages/Checkout";
import PaymentSuccess from "@shop/pages/PaymentSuccess";
import PaymentFailure from "@shop/pages/PaymentFailure";
import { Button } from "./components/ui/Button";
import { HeroSlideshow } from "./extras/components/slideshows";
import { useProducts } from "@shop/core/hooks/useProducts";
import { ProductCard } from "@shop/ui/ProductCard";
import { ProductDetailsModal } from "@shop/ui/ProductDetailsModal";
import { Loading } from "./components/ui/Loading";
import PostsPage from "./posts/pages/PostsPage";
import PostDetailPage from "./posts/pages/PostDetailPage";
import BlogHub from "./posts/pages/BlogHub";
import ShippingPolicy from "./pages/ShippingPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import BlogPage from "./pages/BlogPage";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import BobGoTestPage from "./shipping/pages/BobGoTestPage";
import BrandsSlider from "./components/BrandsSlider";
import ProductPage from "./shop/pages/ProductPage";

function App() {
  // Update CSS var for scroll progress bar
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      document.documentElement.style.setProperty('--scroll-progress', progress + '%');
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // Preload posts cache on app start - temporarily disabled
  // useEffect(() => {
  //   preloadCache();
  // }, []);

  // Helmet-based SEO metadata
  const SEOHead = () => (
    <Helmet>
      {/* Keep the title around ~65-70 chars if possible */}
      <title>
        Buy Optimum Nutrition Whey Protein in South Africa - Invictus
      </title>

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
    const {
      products,
      loading: productsLoading,
      fetchProducts,
    } = useProducts({
      perPage: 4,
      orderBy: "date",
      order: "desc",
      featured: true,
    });
    const {
      products: allProducts,
      loading: allProductsLoading,
      fetchProducts: fetchAllProducts,
    } = useProducts({
      perPage: 20,
      orderBy: "date",
      order: "desc",
    });
    const {
      products: bestSellers,
      loading: bestSellersLoading,
      fetchProducts: fetchBestSellers,
    } = useProducts({ perPage: 4, orderBy: "popularity", order: "desc" });
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [scrollPositions, setScrollPositions] = useState({
      featured: 0,
      specials: 0,
      latest: 0,
    });

    useEffect(() => {
      fetchProducts();
      fetchAllProducts();
      fetchBestSellers();
    }, [fetchProducts, fetchAllProducts, fetchBestSellers]);

    const handleScroll = (id: string, _e: React.UIEvent<HTMLDivElement>) => {
      const container = document.getElementById(id);
      if (container) {
        setScrollPositions((prev) => ({
          ...prev,
          [id]: container.scrollLeft,
        }));
      }
    };

    return (
      <>
        <SEOHead />

        {/* Hero Slideshow */}
        <HeroSlideshow />

        {/* Featured Products Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="mb-4 text-tertiary">FEATURED PRODUCTS</h3>
              <p className=" text-lg">
                Discover our premium nutrition supplements
              </p>
            </div>

            {productsLoading ? (
              <div className="flex justify-center">
                <Loading text="Loading products..." />
              </div>
            ) : (
              <>
                {/* Mobile: horizontal scroll */}
                <div className="md:hidden -mx-4 px-4 mt-4 relative group">
                  <div
                    id="featured-products"
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    onScroll={(e) => handleScroll("featured", e)}
                  >
                    {products.slice(0, 8).map((product) => (
                      <div
                        key={product.id}
                        className="min-w-[260px] max-w-[280px] snap-start"
                      >
                        <ProductCard
                          product={product}
                          className="hover-lift"
                          onViewDetails={(p) => {
                            setSelectedProduct(p);
                            setModalOpen(true);
                          }}
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
                      onViewDetails={(p) => {
                        setSelectedProduct(p);
                        setModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="text-center mt-12">
              <Button
                variant="underline"
                size="lg"
                className="text-tertiary after:bg-tertiary"
                onClick={() => window.location.href = '/shop'}
              >
                <ArrowRight size={20} /> VIEW ALL PRODUCTS
              </Button>
            </div>
          </div>

          {/* JSON-LD for Merchant Listings */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "Product",
                name: "Optimum Nutrition Whey",
                image: [
                  "https://invictusnutrition.co.za/assets/optimum-nutrition.jpeg",
                ],
                description:
                  "Premium whey protein isolate. 24g protein per serving. Available in multiple sizes and flavors.",
                brand: {
                  "@type": "Brand",
                  name: "Optimum Nutrition",
                },
                offers: [
                  {
                    "@type": "Offer",
                    sku: "ONWhey2268g",
                    price: "2199.00",
                    priceCurrency: "ZAR",
                    availability: "https://schema.org/InStock",
                    url: "https://www.takealot.com/seller/invictus-brands?sellers=29887187",
                    hasMerchantReturnPolicy: {
                      "@type": "MerchantReturnPolicy",
                      applicableCountry: "ZA",
                      returnPolicyCategory: "https://schema.org/ExchangeRefund",
                      merchantReturnDays: "180",
                      returnPolicyUrl: "https://www.takealot.com/help/returns",
                    },
                    shippingDetails: {
                      "@type": "OfferShippingDetails",
                      shippingRate: {
                        "@type": "MonetaryAmount",
                        value: "0.00",
                        currency: "ZAR",
                      },
                      shippingDestination: {
                        "@type": "DefinedRegion",
                        addressCountry: "ZA",
                      },
                      deliveryTime: {
                        "@type": "ShippingDeliveryTime",
                        transitTime: {
                          "@type": "QuantitativeValue",
                          minValue: 2,
                          maxValue: 7,
                          unitCode: "DAY",
                        },
                      },
                    },
                  },
                  {
                    "@type": "Offer",
                    sku: "ONWhey908g",
                    price: "1049.00",
                    priceCurrency: "ZAR",
                    availability: "https://schema.org/InStock",
                    url: "https://www.takealot.com/seller/invictus-brands?sellers=29887187",
                    hasMerchantReturnPolicy: {
                      "@type": "MerchantReturnPolicy",
                      applicableCountry: "ZA",
                      returnPolicyCategory: "https://schema.org/ExchangeRefund",
                      merchantReturnDays: "180",
                      returnPolicyUrl: "https://www.takealot.com/help/returns",
                    },
                    shippingDetails: {
                      "@type": "OfferShippingDetails",
                      shippingRate: {
                        "@type": "MonetaryAmount",
                        value: "0.00",
                        currency: "ZAR",
                      },
                      shippingDestination: {
                        "@type": "DefinedRegion",
                        addressCountry: "ZA",
                      },
                      deliveryTime: {
                        "@type": "ShippingDeliveryTime",
                        transitTime: {
                          "@type": "QuantitativeValue",
                          minValue: 2,
                          maxValue: 7,
                          unitCode: "DAY",
                        },
                      },
                    },
                  },
                ],
              }),
            }}
          />
        </section>

        {/* Brands Section */}
        <section className="py-12 md:py-20 bg-primary border-t-2 border-tertiary/30 relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url(/assets/Banners/cover-background.png)" }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left mb-8 lg:mb-0">
                <h3 className="text-tertiary mb-4 text-2xl md:text-3xl">OUR BRANDS</h3>
                <p className="text-white text-base md:text-lg">
                  Discover premium nutrition brands trusted by athletes
                  worldwide
                </p>
              </div>

              <div className="w-full">
                <BrandsSlider />
              </div>
            </div>
          </div>
        </section>

        {/* On Sale Products Section */}
        <section className="py-20 bg-primary border-t-2 border-tertiary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="mb-4 text-tertiary">SPECIAL OFFERS</h3>
              <p className="text-secondary text-lg">
                Limited time deals on premium nutrition supplements
              </p>
            </div>

            {allProductsLoading ? (
              <div className="flex justify-center">
                <Loading text="Loading special offers..." />
              </div>
            ) : (
              <>
                {/* Mobile: horizontal scroll */}
                <div className="md:hidden -mx-4 px-4 mt-4 relative group">
                  <div
                    id="special-offers"
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    onScroll={(e) => handleScroll("specials", e)}
                  >
                    {allProducts
                      .filter((product) => product.onSale)
                      .slice(0, 12)
                      .map((product) => (
                        <div
                          key={product.id}
                          className="min-w-[260px] max-w-[280px] snap-start"
                        >
                          <ProductCard
                            product={product}
                            className="hover-lift"
                            onViewDetails={(p) => {
                              setSelectedProduct(p);
                              setModalOpen(true);
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* Desktop: grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {allProducts
                    .filter((product) => product.onSale)
                    .slice(0, 12)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        className="hover-lift"
                        onViewDetails={(p) => {
                          setSelectedProduct(p);
                          setModalOpen(true);
                        }}
                      />
                    ))}
                </div>
              </>
            )}

            {allProducts.filter((product) => product.onSale).length === 0 &&
              !allProductsLoading && (
                <div className="text-center py-12">
                  <div className="bg-primarySupport rounded-lg p-8 max-w-md mx-auto">
                    <svg
                      className="w-16 h-16 text-tertiary mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h4 className="text-xl font-semibold text-tertiary mb-2">
                      No Special Offers Right Now
                    </h4>
                    <p className="text-tertiary">
                      Check back soon for amazing deals on premium supplements!
                    </p>
                  </div>
                </div>
              )}

            {allProducts.filter((product) => product.onSale).length > 0 && (
              <div className="text-center mt-12">
                <Button
                  variant="underline"
                  size="lg"
                  className="text-tertiary after:bg-tertiary"
                  onClick={() => window.location.href = '/shop'}
                >
                  <ArrowRight size={20} /> VIEW ALL SPECIALS
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Invictus Section */}
        <section className="py-20 bg-primary border-t-2 border-tertiary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="mb-4 text-tertiary">
                WHY CHOOSE INVICTUS NUTRITION?
              </h3>
              <p className="text-secondary text-lg max-w-3xl mx-auto">
                We're committed to providing you with the highest quality
                supplements backed by science and delivered with excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-tertiary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 text-tertiary">PREMIUM QUALITY</h4>
                <p className="text-secondary-300">
                  All products are third-party tested and meet the highest
                  industry standards for purity and potency
                </p>
              </div>

              <div className="text-center">
                <div className="bg-tertiary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 text-tertiary">FAST DELIVERY</h4>
                <p className="text-secondary-300">
                  Quick and reliable shipping across South Africa with real-time
                  tracking and secure packaging
                </p>
              </div>

              <div className="text-center">
                <div className="bg-tertiary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 text-tertiary">EXPERT SUPPORT</h4>
                <p className="text-secondary-300">
                  Our nutrition experts are here to help you choose the right
                  products for your fitness goals
                </p>
              </div>

              <div className="text-center">
                <div className="bg-tertiary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 text-tertiary">
                  CUSTOMER SATISFACTION
                </h4>
                <p className="text-secondary-300">
                  Join thousands of satisfied customers who trust Invictus for
                  their nutrition needs
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
            <Button
                variant="underline"
                size="lg"
                onClick={() => window.location.href = '/shop'}
              >
                <ArrowRight size={20} /> GET EXPERT ADVICE
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Arrivals Section */}
        <section className="py-20 bg-primary border-t-2 border-tertiary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="mb-4 text-tertiary">LATEST ARRIVALS</h3>
              <p className="text-secondary text-lg">
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
                    onScroll={(e) => handleScroll("latest", e)}
                  >
                    {bestSellers.slice(0, 12).map((product) => (
                      <div
                        key={product.id}
                        className="min-w-[260px] max-w-[280px] snap-start"
                      >
                        <ProductCard
                          key={product.id}
                          product={product}
                          className="hover-lift"
                          onViewDetails={(p) => {
                            setSelectedProduct(p);
                            setModalOpen(true);
                          }}
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
                      onViewDetails={(p) => {
                        setSelectedProduct(p);
                        setModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-tertiary text-lg">
                  No latest arrivals available at the moment.
                </p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button
                variant="underline"
                size="lg"
                className="text-tertiary after:bg-tertiary"
                onClick={() => window.location.href = '/shop'}
              >
                <ArrowRight size={20} /> VIEW ALL PRODUCTS
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-primary border-t-2 border-tertiary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="mb-4 text-tertiary">FAQ</h3>
              <p className="text-white text-lg">Frequently Asked Questions About Our Products and Services</p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    q: "HOW LONG DOES SHIPPING TAKE?",
                    a: "We offer free shipping on orders over R2000. Standard delivery takes 3-5 business days across South Africa. Express shipping options are available for faster delivery.",
                  },
                  {
                    q: "WHAT IS YOUR RETURN POLICY?",
                    a: "We offer a 30-day return policy for unopened products in original packaging. If you're not satisfied with your purchase, contact our customer service team for assistance.",
                  },
                  {
                    q: "ARE YOUR SUPPLEMENTS SAFE AND TESTED?",
                    a: "Yes, all our products undergo rigorous third-party testing to ensure quality, purity, and label accuracy. We only stock supplements from trusted, certified manufacturers.",
                  },
                  {
                    q: "HOW SHOULD I STORE MY SUPPLEMENTS?",
                    a: "Store supplements in a cool, dry place away from direct sunlight. Keep containers tightly closed and follow any specific storage instructions on the product label.",
                  },
                  {
                    q: "DO YOU OFFER PAYMENT PLANS OR INSTALLMENTS?",
                    a: "We accept all major credit cards, EFT, and offer secure payment through PayFast. Contact us for information about payment plan options for larger orders.",
                  },
                  {
                    q: "WHAT IF I HAVE ALLERGIES OR DIETARY RESTRICTIONS?",
                    a: "All our products clearly list ingredients and allergens. We offer options for various dietary needs including vegan, gluten-free, and lactose-free products. Contact us for specific product recommendations.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-primary border-2 border-tertiary/30 rounded-lg p-6 hover:bg-tertiary hover:text-primary transition-all duration-300 group"
                  >
                    <h4 className="text-lg font-semibold text-tertiary group-hover:text-primary mb-4 transition-colors duration-300">
                      {item.q}
                    </h4>
                    <p className="text-white group-hover:text-primary leading-relaxed transition-colors duration-300">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        <ProductDetailsModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </>
    );
  };

  return (
    <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/protein-pancakes" element={<ProteinPancakes />} />
            <Route
              path="/post-workout-smoothie"
              element={<PostWorkoutSmoothie />}
            />
            <Route
              path="/protein-energy-balls"
              element={<ProteinEnergyBalls />}
            />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:slug" element={<PostDetailPage />} />
            <Route path="/blog-hub" element={<BlogHub />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />
            <Route path="/payment/cancel" element={<PaymentFailure />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/test-bobgo" element={<BobGoTestPage />} />
          </Routes>
  );
}

export default App;

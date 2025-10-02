import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';  
import { Helmet } from 'react-helmet';

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-primary text-tertiary">
      <Navigation isScrolled={isScrolled} />
      
      <Helmet>
        <title>About Us - Invictus Nutrition</title>
        <meta name="description" content="Learn about Invictus Nutrition's mission to provide premium supplements and expert guidance for your fitness journey." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-primary relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url(/assets/Banners/cover-background.png)" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="mb-6 text-tertiary">
            ABOUT INVICTUS NUTRITION
          </h1>
          <p className="text-white max-w-4xl mx-auto leading-relaxed mb-8">
            We are passionate about empowering your fitness journey with premium quality supplements, 
            backed by science and delivered with excellence. Our mission is to help you achieve your 
            goals through superior nutrition and expert guidance.
          </p>
        </div>
      </section>

      {/* Border Section */}
      <section className="bg-primary border-t-2 border-white border-b-2 border-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-white">Discover our story and commitment to excellence</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className="order-1 lg:order-1 space-y-6">
              <h2 className="text-tertiary">
                OUR STORY
              </h2>
              <div className="w-20 h-1 bg-tertiary"></div>
              <p className="text-lg text-white leading-relaxed">
                Invictus. The Latin word for "unconquered." It's more than just a name—it's the philosophy
                that defines us. For me, the gym has always been a second home. It's where I go to test my
                limits, to push past what I thought was possible, and to feel unconquered. I've spent my life
                helping others overcome their health challenges as a doctor. But my personal passion for
                fitness and nutrition is what truly led me to create Invictus Nutrition.
              </p>
              <p className="text-lg text-white leading-relaxed">
                For years, I've been in the gym, deeply invested in my own health and performance. This
                journey, however, made me aware of issues in the health market. The supplement industry was
                full of flashy promises and unproven claims, and very few products were backed by genuine
                medical knowledge or a true commitment to quality. I knew I could do better. I wanted to create
                something different: a brand built on the same principles of integrity, hard work, and
                determination that define who I am.
              </p>
              <div className="pt-4">
                <p className="text-tertiary font-semibold text-lg">Founder: Dr Saidur Molla</p>
              </div>
            </div>

            {/* Founder Image */}
            <div className="order-2 lg:order-2">
              <div className="relative">
                <div className="w-full aspect-square max-w-md mx-auto bg-tertiary/20 rounded-lg overflow-hidden border-2 border-tertiary/30">
                  <img 
                    src="/assets/saidur.png" 
                    alt="Dr Saidur Molla - Founder of Invictus Nutrition" 
                    className="w-full h-full object-cover object-center scale-90"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p className="italic text-white text-base">"Strength is forged in persistence."</p>
                  <p className="text-secondary text-sm mt-1">— Dr Saidur Molla</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Founder Section */}
      <section className="py-20 bg-primary border-t-2 border-tertiary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Co-Founder Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-full aspect-square max-w-md mx-auto bg-tertiary/20 rounded-lg overflow-hidden border-2 border-tertiary/30">
                  <img 
                    src="/assets/leila.jpg" 
                    alt="Dr Laila Choonara - Co-Founder of Invictus Nutrition" 
                    className="w-full h-full object-cover object-center scale-90"
                  />
                </div>
              </div>
            </div>

            {/* Co-Founder Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-tertiary">
                OUR CO-FOUNDER
              </h2>
              <div className="w-20 h-1 bg-tertiary"></div>
              <p className="text-lg text-white leading-relaxed">
                Through it all, my wife, Dr. Laila Choonara, has been my unwavering supporter. She is my co-
                founder and a brilliant doctor in her own right. Together, we set about empowering people to
                achieve their peak potential. Laila's belief in my vision helped me turn my personal mission into
                a reality.
              </p>
              <p className="text-lg text-white leading-relaxed">
                At Invictus Nutrition, we pour our medical expertise and personal passion into every product.
                We select products from brands that are obsessed with testing their products to maintain the
                highest of standards. We believe that what you put into your body is just as important as the
                effort you put into your training. Our supplements are designed to be a luxury, not in their price,
                but in their quality—crafted to fuel your body and mind so you can feel unconquered.
              </p>
              <p className="text-lg text-white leading-relaxed">
                Every product you find here is a reflection of our journey, a testament to our dedication, and a
                promise to you. We are not just selling supplements; we are sharing a piece of our story,
                helping you write yours—a story of strength, resilience, and ultimate victory.
              </p>
              <div className="pt-4">
                <p className="text-tertiary font-semibold text-lg">Welcome to the Invictus family!</p>
              </div>
            </div>
          </div>
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
            <button
              onClick={() => window.location.href = '/shop'}
              className="bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
            >
              START YOUR JOURNEY
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
}

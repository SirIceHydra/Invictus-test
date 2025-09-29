import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';

export const CookiesPolicy: React.FC = () => {
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
            COOKIES POLICY
          </h1>
          <p className="text-white max-w-4xl mx-auto leading-relaxed mb-8">
            Learn how Invictus Nutrition uses cookies to enhance your browsing experience and protect your privacy.
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
            <p className="text-white">Transparent and secure cookie usage for your peace of mind</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary border-2 border-white shadow-lg p-6">
              <p className="text-white leading-relaxed mb-8">
                We get it—privacy matters. Our goal is to be completely transparent about how we use cookies to enhance your experience. 
                Please read our policy below, and don't hesitate to reach out if you have any questions.
              </p>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Our Cookie Usage Policy</h2>
                <p className="text-white mb-4">
                  We use cookies to improve your browsing experience, remember your preferences, and provide you with personalized content. 
                  By using our website, you consent to our use of cookies as described in this policy.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">What Are Cookies?</h2>
                <p className="text-white mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                  They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Types of Cookies We Use</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-tertiary mb-2">Essential Cookies</h3>
                  <p className="text-white mb-4">
                    These cookies are necessary for the website to function properly. They enable basic functions like 
                    page navigation, access to secure areas, and remembering your shopping cart contents.
                  </p>
                  <p className="text-sm text-tertiary/80 italic">Cannot be disabled - Required for website functionality</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-tertiary mb-2">Analytics Cookies</h3>
                  <p className="text-white mb-4">
                    These cookies help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously. This helps us improve our website performance and user experience.
                  </p>
                  <p className="text-sm text-tertiary/80 italic">Optional - Helps us improve our website</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-tertiary mb-2">Marketing Cookies</h3>
                  <p className="text-white mb-4">
                    These cookies are used to track visitors across websites to display relevant and engaging advertisements. 
                    They help us show you products and offers that are most relevant to your interests.
                  </p>
                  <p className="text-sm text-tertiary/80 italic">Optional - For personalized advertising</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">How We Use Cookies</h2>
                <ul className="list-disc list-inside text-white leading-relaxed mb-6 space-y-2">
                  <li><strong className="text-white">Shopping Experience:</strong> Remember items in your cart and your preferences for a seamless shopping experience.</li>
                  <li><strong className="text-white">Website Performance:</strong> Monitor website traffic and performance to ensure optimal loading times and functionality.</li>
                  <li><strong className="text-white">Personalization:</strong> Provide personalized content, recommendations, and advertisements based on your interests.</li>
                  <li><strong className="text-white">Security:</strong> Protect against fraud and ensure the security of your account and transactions.</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Managing Your Cookie Preferences</h2>
                <p className="text-white mb-4">
                  You have the right to choose which cookies you accept. You can manage your cookie preferences through:
                </p>
                <ul className="list-disc list-inside text-white leading-relaxed mb-6 space-y-2">
                  <li><strong className="text-white">Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies. However, disabling essential cookies may affect website functionality.</li>
                  <li><strong className="text-white">Our Cookie Banner:</strong> When you first visit our website, you'll see a cookie consent banner where you can choose to accept all cookies or decline non-essential cookies.</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Third-Party Cookies</h2>
                <p className="text-white mb-4">
                  We may use third-party services that set their own cookies. These include:
                </p>
                <ul className="list-disc list-inside text-white leading-relaxed mb-6 space-y-2">
                  <li><strong className="text-white">Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong className="text-white">Social Media Platforms:</strong> For social media integration and advertising</li>
                  <li><strong className="text-white">Payment Processors:</strong> For secure payment processing and fraud prevention</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Contact Us</h2>
                <p className="text-white mb-4">
                  If you have any questions about our use of cookies or this Cookies Policy, please contact us:
                </p>
                <div className="bg-primary border-2 border-tertiary/30 p-4 rounded-lg">
                  <p className="text-white"><strong>Email:</strong> invictusnutrition@gmail.com</p>
                  <p className="text-white"><strong>Phone:</strong> +27 73 951 6670</p>
                  <p className="text-white"><strong>Address:</strong> Kenilworth, Johannesburg</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-tertiary mb-4">Updates to This Policy</h2>
                <p className="text-white">
                  We may update this Cookies Policy from time to time to reflect changes in our practices or for other 
                  operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
                  updated policy on our website with a new "Last updated" date.
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

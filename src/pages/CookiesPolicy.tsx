import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const CookiesPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section with Marble Background */}
      <div 
        className="relative pt-32 pb-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          height: '120%',
          top: '-10%'
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl text-tertiary mb-6">
            COOKIES POLICY
          </h1>
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Learn how Invictus Nutrition uses cookies to enhance your browsing experience and protect your privacy.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-tertiary text-primary font-semibold hover:bg-tertiary/90 transition-colors border-2 border-tertiary"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
          <p className="text-white/80 text-sm">
            Transparent and secure cookie usage for your peace of mind
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-primarySupport/20 backdrop-blur-sm border border-tertiary/20 p-8 md:p-12">
            <p className="text-white/90 leading-relaxed mb-6">
              We get it—privacy matters. Our goal is to be completely transparent about how we use cookies to enhance your experience. 
              Please read our policy below, and don't hesitate to reach out if you have any questions.
            </p>

            <h2 className="text-3xl font-normal text-tertiary mb-6">
              OUR COOKIE USAGE POLICY
            </h2>

            <p className="text-white/90 leading-relaxed mb-6">
              We use cookies to improve your browsing experience, remember your preferences, and provide you with personalized content. 
              By using our website, you consent to our use of cookies as described in this policy.
            </p>

            <h3 className="text-2xl font-normal text-tertiary mb-4">What Are Cookies?</h3>
            <p className="text-white/90 leading-relaxed mb-6">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They are widely used to make websites work more efficiently and to provide information to website owners.
            </p>

            <h3 className="text-2xl font-normal text-tertiary mb-4">Types of Cookies We Use</h3>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-white mb-3">Essential Cookies</h4>
              <p className="text-white/90 leading-relaxed mb-4">
                These cookies are necessary for the website to function properly. They enable basic functions like 
                page navigation, access to secure areas, and remembering your shopping cart contents.
              </p>
              <p className="text-sm text-tertiary/80 italic">Cannot be disabled - Required for website functionality</p>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-white mb-3">Analytics Cookies</h4>
              <p className="text-white/90 leading-relaxed mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting 
                information anonymously. This helps us improve our website performance and user experience.
              </p>
              <p className="text-sm text-tertiary/80 italic">Optional - Helps us improve our website</p>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-white mb-3">Marketing Cookies</h4>
              <p className="text-white/90 leading-relaxed mb-4">
                These cookies are used to track visitors across websites to display relevant and engaging advertisements. 
                They help us show you products and offers that are most relevant to your interests.
              </p>
              <p className="text-sm text-tertiary/80 italic">Optional - For personalized advertising</p>
            </div>

            <h3 className="text-2xl font-normal text-tertiary mb-4">How We Use Cookies</h3>
            <ul className="list-disc list-inside text-white/90 leading-relaxed mb-6 space-y-2">
              <li><strong className="text-white">Shopping Experience:</strong> Remember items in your cart and your preferences for a seamless shopping experience.</li>
              <li><strong className="text-white">Website Performance:</strong> Monitor website traffic and performance to ensure optimal loading times and functionality.</li>
              <li><strong className="text-white">Personalization:</strong> Provide personalized content, recommendations, and advertisements based on your interests.</li>
              <li><strong className="text-white">Security:</strong> Protect against fraud and ensure the security of your account and transactions.</li>
            </ul>

            <h3 className="text-2xl font-normal text-tertiary mb-4">Managing Your Cookie Preferences</h3>
            <p className="text-white/90 leading-relaxed mb-4">
              You have the right to choose which cookies you accept. You can manage your cookie preferences through:
            </p>
            <ul className="list-disc list-inside text-white/90 leading-relaxed mb-6 space-y-2">
              <li><strong className="text-white">Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies. However, disabling essential cookies may affect website functionality.</li>
              <li><strong className="text-white">Our Cookie Banner:</strong> When you first visit our website, you'll see a cookie consent banner where you can choose to accept all cookies or decline non-essential cookies.</li>
            </ul>

            <h3 className="text-2xl font-normal text-tertiary mb-4">Third-Party Cookies</h3>
            <p className="text-white/90 leading-relaxed mb-4">
              We may use third-party services that set their own cookies. These include:
            </p>
            <ul className="list-disc list-inside text-white/90 leading-relaxed mb-6 space-y-2">
              <li><strong className="text-white">Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong className="text-white">Social Media Platforms:</strong> For social media integration and advertising</li>
              <li><strong className="text-white">Payment Processors:</strong> For secure payment processing and fraud prevention</li>
            </ul>

            <h3 className="text-2xl font-normal text-tertiary mb-4">Contact Us</h3>
            <p className="text-white/90 leading-relaxed mb-4">
              If you have any questions about our use of cookies or this Cookies Policy, please contact us:
            </p>
            <div className="bg-primary/30 p-6 mb-6 border border-tertiary/20">
              <p className="text-white"><strong>Email:</strong> invictusbrands1@gmail.com</p>
              <p className="text-white"><strong>Phone:</strong> +27 73 951 6670</p>
              <p className="text-white"><strong>Address:</strong> Kenilworth, Johannesburg</p>
            </div>

            <h3 className="text-2xl font-normal text-tertiary mb-4">Updates to This Policy</h3>
            <p className="text-white/90 leading-relaxed">
              We may update this Cookies Policy from time to time to reflect changes in our practices or for other 
              operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
              updated policy on our website with a new "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

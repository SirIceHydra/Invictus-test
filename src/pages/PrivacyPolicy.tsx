import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function PrivacyPolicy() {
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

          <h1 className="text-4xl font-bold mb-8">PRIVACY POLICY</h1>
          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <p className="text-gray-700 leading-relaxed mb-8">
                Invictus Nutrition is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your choices regarding your data. By using our website, you agree to the collection and use of information in accordance with this policy.
              </p>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect a few different types of information to provide and improve our service to you.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>
                      <strong>Personal Information:</strong> When you make a purchase or create an account, we may collect personal information such as your name, email address, shipping address, phone number, and payment information.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>
                      <strong>Usage Data:</strong> We automatically collect information on how our website is accessed and used. This may include your IP address, browser type, pages you visit, the time and date of your visit, and other diagnostic data.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>
                      <strong>Cookies:</strong> We use "cookies" to track the activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the collected data for various purposes:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>To provide and maintain our service.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>To process your orders and manage your account.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>To notify you about changes to our service.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>To allow you to participate in interactive features of our service when you choose to do so.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>To provide customer support.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>To gather analysis or valuable information so that we can improve our service.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>To monitor the usage of our service.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">●</span>
                    <span>To detect, prevent, and address technical issues.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sharing Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We will not sell, rent, or trade your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential. For example, we use a third-party payment processor to handle transactions and a shipping carrier to deliver your orders.
                </p>
                <p className="text-gray-700 mb-4">
                  We may also disclose your personal information when required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Data Rights</h2>
                <p className="text-gray-700 mb-4">
                  You have the right to access, update, or delete your personal information. If you have an account with us, you can often do this directly within your account settings. If you need assistance, please contact us at <a href="mailto:invictusbrands1@gmail.com" className="text-rose-400 hover:text-rose-600 underline">invictusbrands1@gmail.com</a>
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Security</h2>
                <p className="text-gray-700 mb-4">
                  The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

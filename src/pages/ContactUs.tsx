import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/assets/Banners/cover-background.png)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-tertiary mb-4">Contact Us</h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Get in touch with our team. We're here to help with any questions or concerns you may have.
          </p>
          <Link 
            to="/" 
            className="bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold inline-flex items-center gap-2 mt-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Border Section */}
      <section className="bg-primary border-t-2 border-white border-b-2 border-white">
        <div className="h-2"></div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-primary border-2 border-white shadow-lg p-6">
              <h2 className="text-xl font-semibold text-tertiary mb-6">Get in Touch</h2>
              <p className="text-white mb-8">
                Have a question about our products, need help with an order, or want to learn more about our supplements? 
                We're here to help! Reach out to us using any of the methods below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-tertiary text-primary p-3 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-tertiary mb-2">Email Us</h3>
                    <p className="text-white mb-1">General Inquiries</p>
                    <a href="mailto:invictusnutrition@gmail.com" className="text-tertiary hover:text-tertiary/80 underline">
                      invictusnutrition@gmail.com
                    </a>
                    <p className="text-white mt-2 mb-1">Customer Service</p>
                    <a href="mailto:invictusbrands1@gmail.com" className="text-tertiary hover:text-tertiary/80 underline">
                      invictusbrands1@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-tertiary text-primary p-3 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-tertiary mb-2">Call Us</h3>
                    <p className="text-white mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-white mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-tertiary font-medium">+27 73 951 6670</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-tertiary text-primary p-3 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-tertiary mb-2">Visit Us</h3>
                    <p className="text-white">
                      Kenilworth<br />
                      Johannesburg<br />
                      South Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-tertiary text-primary p-3 rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-tertiary mb-2">Business Hours</h3>
                    <p className="text-white">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-primary border-2 border-white shadow-lg p-6">
              <h2 className="text-xl font-semibold text-tertiary mb-6">Send us a Message</h2>
              <p className="text-white mb-6">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-primary border border-tertiary">
                  <p className="text-tertiary text-sm">Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-primary border border-red-500">
                  <p className="text-red-400 text-sm">Sorry, there was an error sending your message. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-primary border-2 border-tertiary/30 rounded-lg text-white placeholder-gray-400 focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/20"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-primary border-2 border-tertiary/30 rounded-lg text-white placeholder-gray-400 focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/20"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-primary border-2 border-tertiary/30 rounded-lg text-white focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/20"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="product">Product Question</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-primary border-2 border-tertiary/30 rounded-lg text-white placeholder-gray-400 focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/20 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-tertiary to-primarySupport text-white py-4 px-6 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-transform flex items-center justify-center gap-2 font-semibold text-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;

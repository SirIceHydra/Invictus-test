import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, CreditCard, Package, Shield, Truck } from 'lucide-react';
import { useCart } from '../core/cart/CartContext';
import { useCheckout } from '../core/hooks/useCheckout';
import { useShipping } from '../../shipping/hooks/useShipping';
import { formatPrice } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CheckoutForm } from '../../types/cart';
import { Navigation } from '../../components/Navigation';
import { CartItemWithShipping } from '../../shipping/types/shipping';

interface CheckoutProps { className?: string }

export default function Checkout({ className = '' }: CheckoutProps) {
  const { cart, clearCart } = useCart();
  const { loading: checkoutLoading, error: checkoutError, createOrder, processPayment } = useCheckout();
  const { shippingRates, fetchShippingRates, selectShippingOption, getSelectedShippingCost } = useShipping();
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'South Africa', province: 'Gauteng', paymentMethod: 'payfast',
  });
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [autoCalculating, setAutoCalculating] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset shipping calculation when address changes
    if (['address', 'city', 'postalCode', 'province'].includes(name)) {
      setShippingCalculated(false);
    }
  };

  // Auto-calculate shipping when postal code is entered
  const handlePostalCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, postalCode: value }));
    
    // Reset shipping calculation
    setShippingCalculated(false);
    
    // Auto-calculate shipping if we have all required fields
    if (value.length >= 4 && formData.address && formData.city) {
      setAutoCalculating(true);
      // Small delay to avoid too many API calls while typing
      setTimeout(async () => {
        if (formData.address && formData.city && value.length >= 4) {
          try {
            // Convert cart items to include shipping dimensions
            const cartItemsWithShipping: CartItemWithShipping[] = cart.items.map(item => ({
              ...item,
              weight_kg: 0.5,
              length_cm: 20,
              width_cm: 15,
              height_cm: 10
            }));

            await fetchShippingRates(
              {
                street_address: formData.address,
                local_area: formData.city,
                city: formData.city,
                zone: formData.province,
                country: formData.country === 'South Africa' ? 'ZA' : formData.country,
                code: value,
                company: ''
              },
              cartItemsWithShipping,
              cart.total
            );
            
            setShippingCalculated(true);
          } catch (error) {
            console.error('Auto-shipping calculation failed:', error);
          } finally {
            setAutoCalculating(false);
          }
        }
      }, 1000); // 1 second delay
    }
  };

  const handleCalculateShipping = async () => {
    if (!formData.address || !formData.city || !formData.postalCode) {
      alert('Please fill in address, city, and postal code to calculate shipping');
      return;
    }

    try {
      // Convert cart items to include shipping dimensions
      const cartItemsWithShipping: CartItemWithShipping[] = cart.items.map(item => ({
        ...item,
        // Add default dimensions for supplements - you can customize these per product
        weight_kg: 0.5, // 500g default weight for supplement containers
        length_cm: 20,
        width_cm: 15,
        height_cm: 10
      }));

      await fetchShippingRates(
        {
          street_address: formData.address,
          local_area: formData.city,
          city: formData.city,
          zone: formData.province,
          country: formData.country === 'South Africa' ? 'ZA' : formData.country,
          code: formData.postalCode,
          company: ''
        },
        cartItemsWithShipping,
        cart.total
      );
      
      setShippingCalculated(true);
    } catch (error) {
      console.error('Error calculating shipping:', error);
      alert('Failed to calculate shipping rates. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.items.length === 0) { alert('Your cart is empty'); return; }
    
    // Check if shipping has been calculated
    if (!shippingCalculated) {
      alert('Please calculate shipping rates before proceeding to checkout');
      return;
    }
    
    try {
      const shippingCost = getSelectedShippingCost();
      const totalWithShipping = cart.total + shippingCost;
      
      console.log('Selected shipping option:', shippingRates.selectedOption);
      console.log('Shipping cost:', shippingCost);
      console.log('Total with shipping:', totalWithShipping);
      
      const orderResult = await createOrder(cart.items, formData, shippingRates.selectedOption || undefined);
      if (!orderResult.success || !orderResult.orderId) throw new Error(orderResult.error || 'Failed to create order');
      const paymentResult = await processPayment(orderResult.orderId, `ORDER-${orderResult.orderId}`, {
        firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone, total: totalWithShipping,
      });
      if (paymentResult.success) {
        clearCart();
        if (paymentResult.redirectUrl) {
          alert('Order created successfully! Redirecting to PayFast for secure payment...');
          window.location.href = paymentResult.redirectUrl;
        } else {
          window.location.href = `/payment/success?order_id=${paymentResult.orderId}`;
        }
      } else {
        throw new Error(paymentResult.error || 'Payment processing failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className={`min-h-screen bg-primary text-tertiary ${className}`}>
      <Navigation isScrolled={isScrolled} />
        <Helmet><title>Checkout - Invictus Nutrition</title><meta name="description" content="Complete your purchase" /></Helmet>
        
        {/* Hero Banner Section */}
        <section className="min-h-[400px] relative flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url(/assets/Banners/cover-background.png)" }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <h1 className="mb-4 text-tertiary">CHECKOUT</h1>
              <p className="mb-8 text-white">Complete your purchase</p>
              <div className="flex justify-center">
                <Link 
                  to="/shop" 
                  className="bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Border Section */}
        <section className="bg-primary border-t-2 border-white border-b-2 border-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-white">Ready to start shopping?</p>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-12">
          <div className="bg-primary border-2 border-white shadow-sm p-8 text-center">
            <Package className="w-16 h-16 text-tertiary mx-auto mb-4" />
            <h2 className="text-tertiary mb-2">Your cart is empty</h2>
            <p className="text-white mb-6">Please add some products to your cart before checkout.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-tertiary text-primary px-6 py-3 hover:bg-tertiary/90 transition-colors">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-primary text-tertiary ${className}`}>
      <Navigation isScrolled={isScrolled} />
      <Helmet><title>Checkout - Invictus Nutrition</title><meta name="description" content="Complete your purchase" /></Helmet>
      
      {/* Hero Banner Section */}
      <section className="min-h-[400px] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url(/assets/Banners/cover-background.png)" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="mb-4 text-tertiary">CHECKOUT</h1>
            <p className="mb-8 text-white">Complete your purchase</p>
            <div className="flex justify-center">
              <Link 
                to="/shop" 
                className="bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 py-4 text-lg font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Border Section */}
      <section className="bg-primary border-t-2 border-white border-b-2 border-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-white">Complete your secure checkout</p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-start mb-8">
          <Link to="/cart" className="flex items-center gap-2 text-tertiary hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Cart
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-primary border-2 border-white shadow-sm p-6">
              <h3 className="text-xl font-semibold text-tertiary mb-6">Shipping Information</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-medium text-white mb-1">First Name *</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-tertiary/40 bg-primary text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-white mb-1">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-tertiary/40 bg-primary text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-white mb-1">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-tertiary/40 bg-primary text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-white mb-1">Phone *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-3 py-2 border border-tertiary/40 bg-primary text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-xs font-medium text-white mb-1">Address *</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-3 py-2 border border-tertiary/40 bg-primary text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-xs font-medium text-white mb-1">City *</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-3 py-2 border border-tertiary/40 bg-primary text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                  <div>
                    <label htmlFor="province" className="block text-xs font-medium text-white mb-1">Province *</label>
                    <select 
                      id="province" 
                      name="province" 
                      value={formData.province} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-3 py-2 border border-tertiary/40 bg-primary text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary"
                    >
                      <option value="Gauteng">Gauteng</option>
                      <option value="Western Cape">Western Cape</option>
                      <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                      <option value="Eastern Cape">Eastern Cape</option>
                      <option value="Free State">Free State</option>
                      <option value="Limpopo">Limpopo</option>
                      <option value="Mpumalanga">Mpumalanga</option>
                      <option value="Northern Cape">Northern Cape</option>
                      <option value="North West">North West</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="postalCode" className="block text-xs font-medium text-white mb-1">Postal Code *</label>
                    <input 
                      type="text" 
                      id="postalCode" 
                      name="postalCode" 
                      value={formData.postalCode} 
                      onChange={handlePostalCodeChange}
                      placeholder="Enter postal code to calculate shipping"
                      required 
                      className="w-full px-3 py-2 border border-tertiary/40 bg-primary text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary" 
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-xs font-medium text-white mb-1">Country *</label>
                    <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} required className="w-full px-3 py-2 border border-tertiary/40 bg-primary text-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary" />
                  </div>
                </div>
                
                {/* Free Shipping Threshold Notification */}
                {cart.total >= parseFloat(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD || '1000') ? (
                  <div className="bg-primary border border-tertiary p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-tertiary" />
                      <span className="font-semibold text-tertiary">Free Shipping Unlocked!</span>
                    </div>
                    <p className="text-xs text-white">
                      You qualify for free shipping on orders over R{import.meta.env.VITE_FREE_SHIPPING_THRESHOLD || '1000'}. Your order total of {formatPrice(cart.total)} qualifies for free delivery.
                    </p>
                  </div>
                ) : (
                  <div className="bg-primary border border-tertiary p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-5 h-5 text-tertiary" />
                      <span className="font-semibold text-tertiary">Free Shipping Progress</span>
                    </div>
                    <p className="text-xs text-white mb-2">
                      Add {formatPrice(parseFloat(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD || '1000') - cart.total)} more to qualify for free shipping on orders over R{import.meta.env.VITE_FREE_SHIPPING_THRESHOLD || '1000'}.
                    </p>
                    <div className="w-full bg-tertiary/20 rounded-full h-2">
                      <div 
                        className="bg-tertiary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min((cart.total / parseFloat(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD || '1000')) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Shipping Calculation Section */}
                <div className="border-t border-tertiary/20 pt-6 mt-6">
                  <h3 className="text-xl font-semibold text-tertiary mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Options
                  </h3>
                  
                  {!shippingCalculated ? (
                    <div className="space-y-4">
                      {!formData.postalCode ? (
                        <div className="text-center py-8">
                          <Truck className="w-12 h-12 text-tertiary/40 mx-auto mb-4" />
                          <p className="text-xs text-white mb-2">
                            Enter your postal code above to automatically calculate shipping options
                          </p>
                          <p className="text-xs text-white">
                            Shipping rates will appear automatically once you enter a valid postal code
                          </p>
                        </div>
                      ) : autoCalculating ? (
                        <div className="text-center py-8">
                          <Loader2 className="w-8 h-8 text-tertiary animate-spin mx-auto mb-4" />
                          <p className="text-xs text-white">
                            Calculating shipping rates...
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-xs text-white">
                            Fill in your address details above, then click "Calculate Shipping" to see available options.
                          </p>
                          <button
                            type="button"
                            onClick={handleCalculateShipping}
                            disabled={!formData.address || !formData.city || !formData.postalCode || shippingRates.loading}
                            className="flex items-center gap-2 bg-tertiary text-primary px-4 py-2 hover:bg-tertiary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {shippingRates.loading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Calculating...
                              </>
                            ) : (
                              <>
                                <Truck className="w-4 h-4" />
                                Calculate Shipping
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-tertiary">Shipping Options</span>
                      </div>
                      
                      {shippingRates.error && (
                        <div className="p-3 bg-red-50 border border-red-200">
                          <p className="text-red-600 text-sm">{shippingRates.error}</p>
                        </div>
                      )}
                      
                      {shippingRates.options.length > 0 && (
                        <div className="space-y-2">
                          {shippingRates.options.map((option) => (
                            <label key={option.id} className="flex items-center gap-3 p-3 border border-tertiary/20 hover:border-tertiary/40 cursor-pointer transition-colors">
                              <input
                                type="radio"
                                name="shippingOption"
                                value={option.id}
                                checked={option.selected}
                                onChange={() => selectShippingOption(option.id)}
                                className="text-tertiary focus:ring-tertiary"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-tertiary">{option.name}</span>
                                  <span className="font-semibold text-tertiary">
                                    {option.price === 0 ? 'Free' : formatPrice(Number(option.price) || 0)}
                                  </span>
                                </div>
                                <p className="text-xs text-white mt-1">{option.description}</p>
                                {option.deliveryTime && (
                                  <p className="text-xs text-white mt-1">Delivery: {option.deliveryTime}</p>
                                )}
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {checkoutError && (<div className="p-3 bg-primary border border-tertiary"><p className="text-tertiary text-sm">{checkoutError}</p></div>)}
                <button type="submit" disabled={checkoutLoading} className="w-full bg-primary text-white border-2 border-tertiary hover:bg-tertiary hover:text-primary hover:scale-105 hover:shadow-lg transition-all duration-300 py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">{checkoutLoading ? (<><Loader2 className="w-5 h-5 animate-spin" />Processing...</>) : (<><CreditCard className="w-5 h-5" />Complete Order</>)}</button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-primary border-2 border-white shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-semibold text-tertiary mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4"><img src={item.image || '/placeholder-product.jpg'} alt={item.name} className="w-12 h-12 object-cover" /><div className="flex-1"><h4 className="text-lg font-semibold text-tertiary">{item.name}</h4><p className="text-sm text-white">Qty: {item.quantity}</p></div><p className="font-medium text-tertiary">{formatPrice(item.price * item.quantity)}</p></div>
                ))}
              </div>
              <div className="border-t border-black/20 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-white">Subtotal</span>
                  <span className="font-medium">{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Shipping</span>
                  <span className="font-medium">
                    {shippingCalculated && shippingRates.selectedOption ? (
                      shippingRates.selectedOption.price === 0 ? 'Free' : formatPrice(shippingRates.selectedOption.price)
                    ) : (
                      <span className="text-white">Calculate shipping</span>
                    )}
                  </span>
                </div>
                {shippingCalculated && shippingRates.selectedOption && (
                  <div className="text-xs text-white pl-2">
                    {shippingRates.selectedOption.name}
                    {shippingRates.selectedOption.deliveryTime && ` • ${shippingRates.selectedOption.deliveryTime}`}
                  </div>
                )}
                <div className="border-t border-black/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-tertiary">Total</span>
                    <span className="text-xl font-bold text-tertiary">
                      {shippingCalculated && shippingRates.selectedOption ? 
                        formatPrice(cart.total + shippingRates.selectedOption.price) : 
                        formatPrice(cart.total)
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary border border-tertiary"><div className="flex items-center gap-2 mb-2"><Shield className="w-5 h-5 text-tertiary" /><span className="text-sm font-medium text-tertiary">Secure Checkout</span></div><p className="text-xs text-white">Your payment information is encrypted and secure. We use PayFast for secure payment processing.</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


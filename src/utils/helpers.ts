// Utility functions for data transformation, validation, and common operations
// These help with WooCommerce API data processing and PayFast integration

import { WooCommerceProduct, Product } from '../types/product';
import { CartItem } from '../types/cart';
import { WOOCOMMERCE_CONFIG, DEFAULTS } from './constants';
import MD5 from 'crypto-js/md5';

/**
 * Strip HTML tags from text
 * @param html - HTML string
 * @returns Clean text without HTML tags
 */
export function stripHtmlTags(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Transform WooCommerce product data to simplified Product interface
 * @param wooProduct - Raw WooCommerce product data
 * @returns Simplified Product object for React components
 */
export function transformWooCommerceProduct(wooProduct: WooCommerceProduct): Product {
  // Validate input
  if (!wooProduct || typeof wooProduct !== 'object') {
    throw new Error('Invalid product data received');
  }

  // Extract brand from attributes
  let brand = undefined;
  
  if (wooProduct.attributes && Array.isArray(wooProduct.attributes) && wooProduct.attributes.length > 0) {
    const brandAttr = wooProduct.attributes.find(attr => 
      attr.name && (attr.name.toLowerCase() === 'brand' || attr.name.toLowerCase() === 'pa_brand')
    );
    
    if (brandAttr && brandAttr.options && Array.isArray(brandAttr.options) && brandAttr.options.length > 0) {
      brand = brandAttr.options[0];
    }
  }
  
  // If still not found, try to extract from product name (fallback)
  if (!brand && wooProduct.name) {
    const brandNames = [
      'Optimum Nutrition', 
      'MyProtein', 
      'Muscletech', 
      'Pharmafreak',
      'Applied Nutrition'
    ];
    for (const brandName of brandNames) {
      if (wooProduct.name.toLowerCase().includes(brandName.toLowerCase())) {
        brand = brandName;
        break;
      }
    }
  }
  


  return {
    id: wooProduct.id,
    name: wooProduct.name || 'Unnamed Product',
    description: wooProduct.description || '',
    shortDescription: stripHtmlTags(wooProduct.short_description || ''),
    price: parseFloat(wooProduct.price) || 0,
    regularPrice: parseFloat(wooProduct.regular_price) || 0,
    salePrice: wooProduct.sale_price ? parseFloat(wooProduct.sale_price) : undefined,
    onSale: wooProduct.on_sale || false,
    images: Array.isArray(wooProduct.images) ? wooProduct.images.map(img => img.src) : [],
    stockStatus: wooProduct.stock_status || 'instock',
    stockQuantity: wooProduct.stock_quantity || undefined,
    categories: Array.isArray(wooProduct.categories) ? wooProduct.categories.map(cat => cat.name) : [],
    brand,
    slug: wooProduct.slug || '',
    permalink: wooProduct.permalink || '',
  };
}

/**
 * Transform WooCommerce products array to simplified Product array
 * @param wooProducts - Array of WooCommerce product data
 * @returns Array of simplified Product objects
 */
export function transformWooCommerceProducts(wooProducts: WooCommerceProduct[]): Product[] {
  return wooProducts.map(transformWooCommerceProduct);
}

/**
 * Calculate cart total from cart items
 * @param items - Array of cart items
 * @returns Total price as number
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calculate total number of items in cart
 * @param items - Array of cart items
 * @returns Total item count
 */
export function calculateCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Format price to South African Rand
 * @param price - Price as number
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(price);
}

/**
 * Format price without currency symbol
 * @param price - Price as number
 * @returns Formatted price string without currency
 */
export function formatPriceNumber(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Generate WooCommerce API URL with authentication
 * @deprecated This function is deprecated - use WordPress secure endpoints instead
 * @param endpoint - API endpoint
 * @param params - Query parameters
 * @returns Complete API URL with authentication
 */
export function generateWooCommerceUrl(endpoint: string, params: Record<string, any> = {}): string {
  
  const url = new URL(`${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/invictus/v1${endpoint}`);
  
  // Add API key header instead of consumer key/secret
  // This should be handled by the fetch call, not in the URL
  
  // Add additional parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });
  
  return url.toString();
}

/**
 * Validate email address format
 * @param email - Email address to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (South African)
 * @param phone - Phone number to validate
 * @returns Boolean indicating if phone is valid
 */
export function isValidPhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // South African phone numbers should be 10-11 digits
  return cleaned.length >= 10 && cleaned.length <= 11;
}

/**
 * Validate required fields in checkout form
 * @param formData - Checkout form data
 * @returns Object with validation results
 */
export function validateCheckoutForm(formData: any): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  // Required fields
  if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
  if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
  if (!formData.email?.trim()) errors.email = 'Email is required';
  if (!isValidEmail(formData.email)) errors.email = 'Valid email is required';
  if (!formData.phone?.trim()) errors.phone = 'Phone number is required';
  if (!isValidPhone(formData.phone)) errors.phone = 'Valid phone number is required';
  if (!formData.address?.trim()) errors.address = 'Address is required';
  if (!formData.city?.trim()) errors.city = 'City is required';
  if (!formData.province?.trim()) errors.province = 'Province is required';
  if (!formData.postalCode?.trim()) errors.postalCode = 'Postal code is required';
  if (!formData.country?.trim()) errors.country = 'Country is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generate PayFast signature according to their exact documentation
 * @param data - PayFast payment data
 * @param passphrase - Passphrase for signature generation
 * @returns MD5 signature string
 */
export function generatePayFastSignature(data: Record<string, string>, passphrase: string = ''): string {
  // Step 1: Concatenation of name=value pairs with '&' as separator
  // The pairs must be listed in the order in which they appear in the attributes description
  // Do NOT use the alphabetical signature format, which uses alphabetical ordering!
  
  let pfOutput = '';
  const includedFields: string[] = [];
  
  // Iterate through data object keys in their original order (not alphabetical)
  for (const key in data) {
    if (data.hasOwnProperty(key) && key !== 'signature') {
      const value = data[key];
      if (value !== '' && value !== null && value !== undefined) {
        if (pfOutput !== '') {
          pfOutput += '&';
        }
        // URL encode the value but keep it as lowercase hex (PayFast requirement)
        const encodedValue = encodeURIComponent(value.trim()).replace(/%20/g, '+');
        pfOutput += `${key}=${encodedValue}`;
        includedFields.push(`${key}=${encodedValue}`);
      }
    }
  }
  
  // Step 2: Add passphrase to the end of the string
  // The passphrase is an extra security feature and is set by the Merchant
  if (passphrase && passphrase.trim() !== '') {
    const encodedPassphrase = encodeURIComponent(passphrase.trim()).replace(/%20/g, '+');
    pfOutput += `&passphrase=${encodedPassphrase}`;
  }
  
  // Remove last ampersand if present
  if (pfOutput.endsWith('&')) {
    pfOutput = pfOutput.slice(0, -1);
  }
  
  // Step 3: MD5 the parameter string and pass it as a hidden input named "signature"
  const signature = MD5(pfOutput).toString().toLowerCase();
  
  return signature;
}

/**
 * Debounce function to limit API calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function to limit API calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Local storage utilities with error handling
 */
export const storage = {
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {

      return null;
    }
  },
  
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {

    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {

    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {

    }
  },
};

/**
 * Generate unique ID for cart items
 * @returns Unique string ID
 */
export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Check if product is in stock
 * @param stockStatus - Product stock status
 * @param stockQuantity - Available stock quantity
 * @returns Boolean indicating if product is available
 */
export function isProductInStock(stockStatus: string, stockQuantity?: number): boolean {
  if (stockStatus === 'outofstock') return false;
  if (stockStatus === 'instock') return true;
  if (stockStatus === 'onbackorder') return true;
  if (stockQuantity !== undefined && stockQuantity <= 0) return false;
  return true;
}

/**
 * Get stock status text for display
 * @param stockStatus - Product stock status
 * @param stockQuantity - Available stock quantity
 * @returns Human-readable stock status
 */
export function getStockStatusText(stockStatus: string, stockQuantity?: number): string {
  switch (stockStatus) {
    case 'instock':
      return stockQuantity ? `${stockQuantity} in stock` : 'In stock';
    case 'outofstock':
      return 'Out of stock';
    case 'onbackorder':
      return 'On backorder';
    default:
      return 'Stock status unknown';
  }
} 
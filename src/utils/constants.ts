// Application Configuration
export const APP_CONFIG = {
  // Application name
  NAME: 'Invictus Nutrition',
  DESCRIPTION: 'Premium nutrition supplements and meal plans',
  
  // Version
  VERSION: '1.0.0',
  
  // Environment
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  
  // Base URLs
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  
  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  
  // Cache duration in milliseconds (5 minutes)
  CACHE_DURATION: 5 * 60 * 1000,
} as const;

// Loading states
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// PayFast Configuration
export const PAYFAST_CONFIG = {
  // Merchant credentials (should be in environment variables)
  MERCHANT_ID: import.meta.env.VITE_PAYFAST_MERCHANT_ID || '',
  MERCHANT_KEY: import.meta.env.VITE_PAYFAST_MERCHANT_KEY || '',
  PASSPHRASE: import.meta.env.VITE_PAYFAST_PASSPHRASE || '',
  
  // URLs
  SANDBOX_URL: 'https://sandbox.payfast.co.za/eng/process',
  PRODUCTION_URL: 'https://www.payfast.co.za/eng/process',
  
  // Return URLs
  RETURN_URL: import.meta.env.VITE_PAYFAST_RETURN_URL ,
  CANCEL_URL: import.meta.env.VITE_PAYFAST_CANCEL_URL ,
  NOTIFY_URL: import.meta.env.VITE_PAYFAST_NOTIFY_URL ,
  
  // Test mode
  TEST_MODE: import.meta.env.VITE_PAYFAST_TEST_MODE === 'true' || true,
} as const;

// WooCommerce Configuration
export const WOOCOMMERCE_CONFIG = {
  // Base URL (should be in environment variables)
  BASE_URL: import.meta.env.VITE_WORDPRESS_URL,
  
  // API Configuration
  API_VERSION: 'wc/v3',
  CONSUMER_KEY: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY,
  CONSUMER_SECRET: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_SECRET,
  
  // Pagination
  PRODUCTS_PER_PAGE: 12,
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // WooCommerce endpoints
  PRODUCTS: '/products',
  PRODUCT: (id: number) => `/products/${id}`,
  CATEGORIES: '/products/categories',
  ORDERS: '/orders',
  ORDER: (id: number) => `/orders/${id}`,
  
  // PayFast endpoints
  PAYFAST_PROCESS: PAYFAST_CONFIG.TEST_MODE ? PAYFAST_CONFIG.SANDBOX_URL : PAYFAST_CONFIG.PRODUCTION_URL,
} as const;

// Default values
export const DEFAULTS = {
  // Default country for shipping/billing
  COUNTRY: 'ZA',
  
  // Default currency
  CURRENCY: 'ZAR',
  
  // Default shipping method
  SHIPPING_METHOD: 'flat_rate',
  SHIPPING_METHOD_TITLE: 'Standard Shipping',
  
  // Default payment method
  PAYMENT_METHOD: 'payfast',
  PAYMENT_METHOD_TITLE: 'PayFast',
  
  // Cart persistence key
  CART_STORAGE_KEY: 'invictus-cart',
  
  // Order status
  ORDER_STATUS: 'pending',
  
  // Default pagination
  PAGE: 1,
  PER_PAGE: 12,
  
  // Default product image
  PRODUCT_IMAGE: '/assets/placeholder-product.jpg',
  
  // Default avatar
  USER_AVATAR: '/assets/placeholder-avatar.jpg',
} as const;

// Product categories
export const PRODUCT_CATEGORIES = {
  PROTEIN: 'protein',
  PRE_WORKOUT: 'pre-workout',
  POST_WORKOUT: 'post-workout',
  VITAMINS: 'vitamins',
  SUPPLEMENTS: 'supplements',
  MEAL_PLANS: 'meal-plans',
} as const;

// Product statuses
export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  PRIVATE: 'private',
  PUBLISH: 'publish',
} as const;

// Stock statuses
export const STOCK_STATUS = {
  IN_STOCK: 'instock',
  OUT_OF_STOCK: 'outofstock',
  ON_BACKORDER: 'onbackorder',
} as const;

// Order statuses
export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  ON_HOLD: 'on-hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const;

// Payment statuses
export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

// Shipping methods
export const SHIPPING_METHODS = {
  FLAT_RATE: 'flat_rate',
  FREE_SHIPPING: 'free_shipping',
  LOCAL_PICKUP: 'local_pickup',
} as const;

// Cart item limits
export const CART_LIMITS = {
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 99,
  MAX_ITEMS: 20,
} as const;

// Validation rules
export const VALIDATION = {
  // Email regex
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Phone regex (South African format)
  PHONE_REGEX: /^(\+27|0)[0-9]{9}$/,
  
  // Minimum order amount
  MIN_ORDER_AMOUNT: 50,
  
  // Maximum order amount
  MAX_ORDER_AMOUNT: 50000,
  
  // Name length limits
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  
  // Address length limits
  MIN_ADDRESS_LENGTH: 5,
  MAX_ADDRESS_LENGTH: 100,
} as const;

// UI Constants
export const UI = {
  // Breakpoints (matching Tailwind CSS)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  
  // Animation durations
  ANIMATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  
  // Z-index values
  Z_INDEX: {
    DROPDOWN: 10,
    MODAL: 20,
    OVERLAY: 30,
    TOOLTIP: 40,
    NOTIFICATION: 50,
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  // Generic errors
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  API_ERROR: 'API request failed. Please try again.',
  
  // Authentication errors
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  
  // Validation errors
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  
  // Cart errors
  CART_EMPTY: 'Your cart is empty.',
  CART_ITEM_NOT_FOUND: 'Item not found in cart.',
  INVALID_QUANTITY: 'Please enter a valid quantity.',
  
  // Product errors
  PRODUCT_NOT_FOUND: 'Product not found.',
  PRODUCT_OUT_OF_STOCK: 'This product is out of stock.',
  
  // Order errors
  ORDER_NOT_FOUND: 'Order not found.',
  ORDER_CREATION_FAILED: 'Failed to create order. Please try again.',
  
  // Payment errors
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  PAYMENT_CANCELLED: 'Payment was cancelled.',
  INVALID_PAYMENT_DATA: 'Invalid payment information.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  // Cart messages
  ITEM_ADDED_TO_CART: 'Item added to cart successfully.',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart.',
  CART_UPDATED: 'Cart updated successfully.',
  
  // Order messages
  ORDER_CREATED: 'Order created successfully.',
  ORDER_UPDATED: 'Order updated successfully.',
  
  // Payment messages
  PAYMENT_SUCCESSFUL: 'Payment completed successfully.',
  
  // Generic messages
  CHANGES_SAVED: 'Changes saved successfully.',
  EMAIL_SENT: 'Email sent successfully.',
} as const;

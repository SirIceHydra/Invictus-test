// WooCommerce service for product and order management
// This handles all interactions with the WooCommerce REST API

import { 
  apiGet, 
  apiPost, 
  apiPut, 
  getCachedData, 
  setCachedData 
} from './api';
import { WooCommerceProduct, Product, WooCommerceResponse } from '../types/product';
import { WooCommerceOrder } from '../types/cart';

// Order creation response interface
interface OrderCreationResponse {
  success: boolean;
  orderId?: number;
  orderNumber?: string;
  error?: string;
}
import { transformWooCommerceProducts, transformWooCommerceProduct } from '../utils/helpers';
import { WOOCOMMERCE_CONFIG, API_ENDPOINTS, PRODUCT_STATUS, STOCK_STATUS } from '../utils/constants';

// Product-related API functions

/**
 * Get all products from WooCommerce
 * @param params - Query parameters for filtering and pagination
 * @returns Promise with products data
 */
export async function getProducts(params: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  status?: string;
  min_price?: number;
  max_price?: number;
  orderby?: string;
  order?: 'asc' | 'desc';
  featured?: boolean;
} = {}): Promise<WooCommerceResponse<Product>> {
  const cacheKey = `products_${JSON.stringify(params)}`;
  
  // Check cache first
  const cached = getCachedData<WooCommerceResponse<Product>>(cacheKey);
  if (cached) return cached;
  
  try {
    // Set default parameters (removed featured and on_sale as they're not supported in all WooCommerce versions)
    const defaultParams = {
      status: PRODUCT_STATUS.PUBLISH,
      per_page: WOOCOMMERCE_CONFIG.PRODUCTS_PER_PAGE,
      ...params,
    };
    
    // Filter out undefined parameters to avoid sending "undefined" as a value
    const cleanParams = Object.fromEntries(
      Object.entries(defaultParams).filter(([_, value]) => value !== undefined && value !== null)
    );
    
    const response = await apiGet<any>(API_ENDPOINTS.PRODUCTS, cleanParams);
    
    // Unwrap WordPress response format: { success: true, data: [...], total: N }
    let wooProducts: WooCommerceProduct[] = [];
    
    if (response && response.success && Array.isArray(response.data)) {
      wooProducts = response.data;
    } else if (Array.isArray(response)) {
      wooProducts = response;
    } else {
      wooProducts = [];
    }
    
    // Validate we have an array
    if (!Array.isArray(wooProducts)) {
      throw new Error('Invalid response format from WordPress - expected array of products');
    }
    
    // Transform the response
    const transformedProducts = transformWooCommerceProducts(wooProducts);
    
    
    
    const result: WooCommerceResponse<Product> = {
      data: transformedProducts,
      total: response.total || wooProducts.length, // Use WordPress total or fallback to array length
      totalPages: Math.ceil((response.total || wooProducts.length) / (defaultParams.per_page || WOOCOMMERCE_CONFIG.PRODUCTS_PER_PAGE)),
      currentPage: defaultParams.page || 1,
    };
    
    // Cache the result
    setCachedData(cacheKey, result);
    
    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Get a single product by ID
 * @param productId - Product ID
 * @returns Promise with product data
 */
export async function getProduct(productId: number): Promise<Product> {
  const cacheKey = `product_${productId}`;
  
  // Check cache first
  const cached = getCachedData<Product>(cacheKey);
  if (cached) return cached;
  
  try {
    const response = await apiGet<WooCommerceProduct>(API_ENDPOINTS.PRODUCT(productId));
    const transformedProduct = transformWooCommerceProduct(response);
    
    // Cache the result
    setCachedData(cacheKey, transformedProduct);
    
    return transformedProduct;
  } catch (error) {
    throw error;
  }
}

/**
 * Get products by category
 * @param categoryId - Category ID
 * @param params - Additional query parameters
 * @returns Promise with products data
 */
export async function getProductsByCategory(
  categoryId: number,
  params: {
    page?: number;
    per_page?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}
): Promise<WooCommerceResponse<Product>> {
  return getProducts({
    ...params,
    category: categoryId.toString(),
  });
}

/**
 * Search products
 * @param searchTerm - Search term
 * @param params - Additional query parameters
 * @returns Promise with products data
 */
export async function searchProducts(
  searchTerm: string,
  params: {
    page?: number;
    per_page?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}
): Promise<WooCommerceResponse<Product>> {
  return getProducts({
    ...params,
    search: searchTerm,
  });
}

/**
 * Get featured products
 * @param params - Additional query parameters
 * @returns Promise with products data
 */
export async function getFeaturedProducts(
  params: {
    page?: number;
    per_page?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}
): Promise<WooCommerceResponse<Product>> {
  const cacheKey = `featured_products_${JSON.stringify(params)}`;
  
  // Check cache first
  const cached = getCachedData<WooCommerceResponse<Product>>(cacheKey);
  if (cached) return cached;
  
  try {
    // Set default parameters
    const defaultParams = {
      status: PRODUCT_STATUS.PUBLISH,
      per_page: WOOCOMMERCE_CONFIG.PRODUCTS_PER_PAGE,
      featured: true, // WooCommerce REST API supports featured parameter
      ...params,
    };
    
    // Filter out undefined parameters
    const cleanParams = Object.fromEntries(
      Object.entries(defaultParams).filter(([_, value]) => value !== undefined && value !== null)
    );
    
    const response = await apiGet<WooCommerceProduct[]>(API_ENDPOINTS.PRODUCTS, cleanParams);
    
    // Transform the response
    const transformedProducts = transformWooCommerceProducts(response);
    
    const result: WooCommerceResponse<Product> = {
      data: transformedProducts,
      total: response.length,
      totalPages: Math.ceil(response.length / (defaultParams.per_page || WOOCOMMERCE_CONFIG.PRODUCTS_PER_PAGE)),
      currentPage: defaultParams.page || 1,
    };
    
    // Cache the result
    setCachedData(cacheKey, result);
    
    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Get products on sale
 * @param params - Additional query parameters
 * @returns Promise with products data
 */
export async function getSaleProducts(
  params: {
    page?: number;
    per_page?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}
): Promise<WooCommerceResponse<Product>> {
  // Get all products and filter for sale items on frontend since on_sale parameter isn't supported in all WooCommerce versions
  const allProducts = await getProducts(params);
  
  // Filter for products that are on sale
  const saleProducts = allProducts.data.filter(product => product.onSale);
  
  return {
    ...allProducts,
    data: saleProducts,
    total: saleProducts.length,
  };
}

// Order-related API functions

/**
 * Create a new order in WooCommerce
 * @param orderData - Order data
 * @returns Promise with order creation response
 */
export async function createOrder(orderData: WooCommerceOrder): Promise<OrderCreationResponse> {
  try {
    const response = await apiPost<any>(API_ENDPOINTS.ORDERS, orderData);
    
    return {
      success: true,
      orderId: response.id,
      orderNumber: response.number,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    };
  }
}

/**
 * Get order by ID
 * @param orderId - Order ID
 * @returns Promise with order data
 */
export async function getOrder(orderId: number): Promise<any> {
  try {
    return await apiGet<any>(API_ENDPOINTS.ORDER(orderId));
  } catch (error) {
    throw error;
  }
}

/**
 * Update order status
 * @param orderId - Order ID
 * @param status - New status
 * @param note - Optional note
 * @returns Promise with updated order data
 */
export async function updateOrderStatus(
  orderId: number,
  status: string,
  note?: string
): Promise<any> {
  try {
    const updateData: any = { status };
    if (note) {
      updateData.note = note;
    }
    
    return await apiPut<any>(API_ENDPOINTS.ORDER(orderId), updateData);
  } catch (error) {
    throw error;
  }
}

// Category-related API functions

/**
 * Get all product categories
 * @param params - Query parameters
 * @returns Promise with categories data
 */
export async function getCategories(params: {
  page?: number;
  per_page?: number;
  hide_empty?: boolean;
  parent?: number;
  orderby?: string;
  order?: 'asc' | 'desc';
} = {}): Promise<any[]> {
  const cacheKey = `categories_${JSON.stringify(params)}`;
  
  // Check cache first
  const cached = getCachedData<any[]>(cacheKey);
  if (cached) return cached;
  
  try {
    const response = await apiGet<any[]>(API_ENDPOINTS.CATEGORIES, params);
    
    // Cache the result
    setCachedData(cacheKey, response);
    
    return response;
  } catch (error) {
    throw error;
  }
}

// Stock management functions

/**
 * Check if product is in stock
 * @param productId - Product ID
 * @returns Promise with stock status
 */
export async function checkProductStock(productId: number): Promise<{
  inStock: boolean;
  stockQuantity?: number;
  stockStatus: string;
}> {
  try {
    const product = await getProduct(productId);
    
    return {
      inStock: product.stockStatus === STOCK_STATUS.IN_STOCK,
      stockQuantity: product.stockQuantity,
      stockStatus: product.stockStatus,
    };
  } catch (error) {
    throw error;
  }
}

// Cache management functions

/**
 * Clear product cache
 * @param productId - Optional product ID to clear specific product cache
 */
export function clearProductCache(productId?: number): void {
  if (productId) {
    // Clear specific product cache
    const cacheKey = `product_${productId}`;
    // Note: We would need to implement removeFromCache in api.ts
    // For now, we'll rely on the cache expiration
  } else {
    // Clear all product-related cache
    // This would require implementing a cache key pattern matching
    // For now, we'll rely on the cache expiration
  }
}

/**
 * Refresh product data (clear cache and refetch)
 * @param productId - Product ID
 * @returns Promise with fresh product data
 */
export async function refreshProduct(productId: number): Promise<Product> {
  // Clear cache for this product
  clearProductCache(productId);
  
  // Fetch fresh data
  return getProduct(productId);
}

// All functions are already exported individually above 
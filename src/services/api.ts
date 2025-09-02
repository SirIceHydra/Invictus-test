// Base API service with axios configuration and error handling
// This provides a centralized way to handle API requests to WooCommerce

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { WOOCOMMERCE_CONFIG, ERROR_MESSAGES } from '../utils/constants';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3`,
  timeout: WOOCOMMERCE_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication
apiClient.interceptors.request.use(
  (config) => {
    // Add WooCommerce authentication parameters
    const params = new URLSearchParams(config.params || {});
    params.append('consumer_key', WOOCOMMERCE_CONFIG.CONSUMER_KEY);
    params.append('consumer_secret', WOOCOMMERCE_CONFIG.CONSUMER_SECRET);
    config.params = params;
    

    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          throw new Error('Invalid API credentials. Please check your configuration.');
        case 403:
          throw new Error('Access denied. Please check your API permissions.');
        case 404:
          throw new Error('Resource not found.');
        case 429:
          throw new Error('Too many requests. Please try again later.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(data?.message || ERROR_MESSAGES.API_ERROR);
      }
    } else if (error.request) {
      // Network error
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      // Other error
      throw new Error(error.message || ERROR_MESSAGES.API_ERROR);
    }
  }
);

// Generic API request function
export async function apiRequest<T>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

// GET request helper
export async function apiGet<T>(
  url: string,
  params: Record<string, any> = {}
): Promise<T> {

  return apiRequest<T>({
    method: 'GET',
    url,
    params,
  });
}

// POST request helper
export async function apiPost<T>(
  url: string,
  data: any,
  params: Record<string, any> = {}
): Promise<T> {
  return apiRequest<T>({
    method: 'POST',
    url,
    data,
    params,
  });
}

// PUT request helper
export async function apiPut<T>(
  url: string,
  data: any,
  params: Record<string, any> = {}
): Promise<T> {
  return apiRequest<T>({
    method: 'PUT',
    url,
    data,
    params,
  });
}

// DELETE request helper
export async function apiDelete<T>(
  url: string,
  params: Record<string, any> = {}
): Promise<T> {
  return apiRequest<T>({
    method: 'DELETE',
    url,
    params,
  });
}

// Cache management
const cache = new Map<string, { data: any; timestamp: number }>();

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  // Check if cache is still valid
  if (Date.now() - cached.timestamp > WOOCOMMERCE_CONFIG.CACHE_DURATION) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

export function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache(): void {
  cache.clear();
}

export function removeFromCache(key: string): void {
  cache.delete(key);
}

// Export the configured axios instance for direct use if needed
export { apiClient };

// Export types for better TypeScript support
export type ApiResponse<T> = Promise<T>;
export type ApiError = Error; 
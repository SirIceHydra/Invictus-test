// Custom hook for managing product data and API calls
// This provides a clean interface for fetching and managing products from WooCommerce

import { useState, useEffect, useCallback } from 'react';
import { Product, WooCommerceResponse } from '../types/product';
import { 
  getProducts, 
  getProduct, 
  getProductsByCategory, 
  searchProducts,
  getFeaturedProducts,
  getSaleProducts,
  getCategories
} from '../services/woocommerce';
import { LOADING_STATES, ERROR_MESSAGES } from '../utils/constants';

interface UseProductsOptions {
  page?: number;
  perPage?: number;
  category?: number;
  search?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
  fetchProducts: (options?: UseProductsOptions) => Promise<void>;
  fetchProduct: (id: number) => Promise<Product | null>;
  searchProducts: (term: string) => Promise<void>;
  getFeaturedProducts: () => Promise<void>;
  getSaleProducts: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  clearError: () => void;
}

export function useProducts(initialOptions: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentOptions, setCurrentOptions] = useState<UseProductsOptions>(initialOptions);

  // Fetch products with given options
  const fetchProducts = useCallback(async (options: UseProductsOptions = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: options.page || currentPage,
        per_page: options.perPage || 12,
        category: options.category?.toString(),
        search: options.search,
        orderby: options.orderBy || 'date',
        order: options.order || 'desc',
      };

      const response: WooCommerceResponse<Product> = await getProducts(params);
      
      setProducts(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setCurrentOptions(options);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  // Fetch a single product by ID
  const fetchProduct = useCallback(async (id: number): Promise<Product | null> => {
    try {
      const product = await getProduct(id);
      return product;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.PRODUCT_NOT_FOUND;
      setError(errorMessage);
      console.error(`Error fetching product ${id}:`, err);
      return null;
    }
  }, []);

  // Search products
  const searchProductsHandler = useCallback(async (term: string) => {
    await fetchProducts({
      ...currentOptions,
      search: term,
      page: 1, // Reset to first page for search
    });
  }, [fetchProducts, currentOptions]);

  // Get featured products
  const getFeaturedProductsHandler = useCallback(async () => {
    // Use the getFeaturedProducts function from the service instead
    try {
      setLoading(true);
      setError(null);
      const response = await getFeaturedProducts({ page: 1 });
      setProducts(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
      setError(errorMessage);
      console.error('Error fetching featured products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get products on sale
  const getSaleProductsHandler = useCallback(async () => {
    // Use the getSaleProducts function from the service instead
    try {
      setLoading(true);
      setError(null);
      const response = await getSaleProducts({ page: 1 });
      setProducts(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
      setError(errorMessage);
      console.error('Error fetching sale products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh products with current options
  const refreshProducts = useCallback(async () => {
    await fetchProducts(currentOptions);
  }, [fetchProducts, currentOptions]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load products on mount if initial options are provided
  useEffect(() => {
    if (Object.keys(initialOptions).length > 0) {
      fetchProducts(initialOptions);
    }
  }, []); // Only run on mount

  // Calculate if there are more pages
  const hasMore = currentPage < totalPages;

  return {
    products,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    hasMore,
    fetchProducts,
    fetchProduct,
    searchProducts: searchProductsHandler,
    getFeaturedProducts: getFeaturedProductsHandler,
    getSaleProducts: getSaleProductsHandler,
    refreshProducts,
    clearError,
  };
}

// Hook for managing a single product
interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  fetchProduct: (id: number) => Promise<void>;
  refreshProduct: () => Promise<void>;
  clearError: () => void;
}

export function useProduct(): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const fetchProduct = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    setCurrentId(id);
    
    try {
      const productData = await getProduct(id);
      setProduct(productData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.PRODUCT_NOT_FOUND;
      setError(errorMessage);
      console.error(`Error fetching product ${id}:`, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProduct = useCallback(async () => {
    if (currentId) {
      await fetchProduct(currentId);
    }
  }, [fetchProduct, currentId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    product,
    loading,
    error,
    fetchProduct,
    refreshProduct,
    clearError,
  };
}

// Hook for managing product categories
interface UseCategoriesReturn {
  categories: any[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  clearError: () => void;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const categoriesData = await getCategories({
        hide_empty: true,
        orderby: 'name',
        order: 'asc',
      });
      setCategories(categoriesData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
      setError(errorMessage);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    clearError,
  };
} 
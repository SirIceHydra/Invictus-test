import { useCallback, useMemo, useRef, useState } from 'react';
import { Product } from '../../../types/product';
import { useShopConfig } from '../ShopProvider';
import { WooCommerceDataProvider } from '../../adapters/catalog/woocommerce';
import { searchProducts, getFilteredProducts, SearchResult } from '../../../utils/searchUtils';

export interface UseProductsOptions {
  page?: number;
  perPage?: number;
  category?: number;
  brand?: string;
  search?: string;
  orderBy?: 'date' | 'price' | 'name' | 'popularity';
  order?: 'asc' | 'desc';
  onSale?: boolean;
  featured?: boolean;
  useEnhancedSearch?: boolean; // New option to enable enhanced search
}

export function useProducts(initial: UseProductsOptions = {}) {
  const config = useShopConfig();
  const provider = useMemo(() => WooCommerceDataProvider, [config.wooCommerce.baseUrl]);
  const defaultOptionsRef = useRef<UseProductsOptions>(initial);

  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Store all products for enhanced search
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const fetchProducts = useCallback(async (opts: UseProductsOptions = {}) => {
    setLoading(true);
    setError(null);
    try {
      const defaults = defaultOptionsRef.current;
      const useEnhancedSearch = opts.useEnhancedSearch ?? defaults.useEnhancedSearch ?? true;
      const searchTerm = opts.search ?? defaults.search;
      
      // If using enhanced search and we have a search term, fetch all products first
      if (useEnhancedSearch && searchTerm) {
        // Fetch a larger set of products for enhanced search
        const resp = await provider.getProducts({
          page: 1,
          perPage: 100, // Fetch more products for better search results
          categoryId: opts.category ?? defaults.category,
          orderBy: opts.orderBy ?? defaults.orderBy,
          order: opts.order ?? defaults.order,
          featured: opts.featured ?? defaults.featured,
        });
        
        // Store all products for enhanced search
        setAllProducts(resp.data);
        
        // Apply enhanced search
        const searchResults = searchProducts(resp.data, searchTerm, {
          caseSensitive: false,
          exactMatch: true,
          boostExactMatches: true,
          minScore: 0.1
        });
        
        setSearchResults(searchResults);
        let filteredProducts = getFilteredProducts(searchResults);
        
        // Apply additional filters
        filteredProducts = applyAdditionalFilters(filteredProducts, opts, defaults);
        
        setProducts(filteredProducts);
        setTotal(filteredProducts.length);
        setTotalPages(Math.ceil(filteredProducts.length / (opts.perPage ?? defaults.perPage ?? 12)));
        setCurrentPage(opts.page ?? defaults.page ?? 1);
      } else {
        // Use original WooCommerce search for non-enhanced search or no search term
        const resp = await provider.getProducts({
          page: opts.page ?? defaults.page,
          perPage: opts.perPage ?? defaults.perPage,
          categoryId: opts.category ?? defaults.category,
          search: searchTerm,
          orderBy: opts.orderBy ?? defaults.orderBy,
          order: opts.order ?? defaults.order,
          featured: opts.featured ?? defaults.featured,
        });
        
        // Store all products
        setAllProducts(resp.data);
        
        // Apply client-side filtering
        let filteredProducts = resp.data;
        filteredProducts = applyAdditionalFilters(filteredProducts, opts, defaults);
        
        setProducts(filteredProducts);
        setTotal(filteredProducts.length);
        setTotalPages(Math.ceil(filteredProducts.length / (opts.perPage ?? defaults.perPage ?? 12)));
        setCurrentPage(opts.page ?? defaults.page ?? 1);
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [provider]);

  // Helper function to apply additional filters
  const applyAdditionalFilters = (
    products: Product[],
    opts: UseProductsOptions,
    defaults: UseProductsOptions
  ): Product[] => {
    let filteredProducts = products;
    
    // Apply brand filtering on the client side if specified
    if (opts.brand || defaults.brand) {
      const brandFilter = opts.brand ?? defaults.brand;
      if (brandFilter) {
        filteredProducts = filteredProducts.filter(product => {
          const matches = product.brand && product.brand.toLowerCase() === brandFilter.toLowerCase();
          return matches;
        });
      }
    }

    // Apply onSale filtering on the client side if specified
    if (opts.onSale || defaults.onSale) {
      const onSaleFilter = opts.onSale ?? defaults.onSale;
      if (onSaleFilter) {
        filteredProducts = filteredProducts.filter(product => product.onSale);
      }
    }
    
    return filteredProducts;
  };

  return {
    products,
    allProducts,
    searchResults,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    fetchProducts,
  };
}



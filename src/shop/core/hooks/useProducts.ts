import { useCallback, useMemo, useRef, useState } from 'react';
import { Product } from '../../../types/product';
import { useShopConfig } from '../ShopProvider';
import { WooCommerceDataProvider } from '../../adapters/catalog/woocommerce';

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
}

export function useProducts(initial: UseProductsOptions = {}) {
  const config = useShopConfig();
  const provider = useMemo(() => WooCommerceDataProvider, [config.wooCommerce.baseUrl]);
  const defaultOptionsRef = useRef<UseProductsOptions>(initial);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = useCallback(async (opts: UseProductsOptions = {}) => {
    setLoading(true);
    setError(null);
    try {
      const defaults = defaultOptionsRef.current;
      const resp = await provider.getProducts({
        page: opts.page ?? defaults.page,
        perPage: opts.perPage ?? defaults.perPage,
        categoryId: opts.category ?? defaults.category,
        search: opts.search ?? defaults.search,
        orderBy: opts.orderBy ?? defaults.orderBy,
        order: opts.order ?? defaults.order,
        featured: opts.featured ?? defaults.featured,
      });
      
      // Apply client-side filtering
      let filteredProducts = resp.data;
      
      // Apply brand filtering on the client side if specified
      if (opts.brand || defaults.brand) {
        const brandFilter = opts.brand ?? defaults.brand;
        if (brandFilter) {
          console.log('Brand filter applied:', brandFilter);
          console.log('Available products with brands:', resp.data.map(p => ({ name: p.name, brand: p.brand })));
          console.log('Products with brand info:', resp.data.filter(p => p.brand).length, 'out of', resp.data.length);
          filteredProducts = resp.data.filter(product => {
            const matches = product.brand && product.brand.toLowerCase() === brandFilter.toLowerCase();
            console.log(`Product "${product.name}" brand: "${product.brand}" matches "${brandFilter}": ${matches}`);
            return matches;
          });
          console.log('Filtered products count:', filteredProducts.length);
        }
      }

      // Apply onSale filtering on the client side if specified
      if (opts.onSale || defaults.onSale) {
        const onSaleFilter = opts.onSale ?? defaults.onSale;
        if (onSaleFilter) {
          console.log('On Sale filter applied:', onSaleFilter);
          filteredProducts = filteredProducts.filter(product => product.onSale);
          console.log('On Sale filtered products count:', filteredProducts.length);
        }
      }
      
      setProducts(filteredProducts);
      setTotal(filteredProducts.length);
      setTotalPages(Math.ceil(filteredProducts.length / (opts.perPage ?? defaults.perPage ?? 12)));
      setCurrentPage(opts.page ?? defaults.page ?? 1);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [provider]);

  return {
    products,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    fetchProducts,
  };
}



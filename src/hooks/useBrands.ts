import { useState, useEffect, useCallback } from 'react';
import { woocommerceBrandsService, WooCommerceBrand } from '../services/woocommerce-brands';

interface UseBrandsReturn {
  brands: WooCommerceBrand[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useBrands(): UseBrandsReturn {
  const [brands, setBrands] = useState<WooCommerceBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const brandsData = await woocommerceBrandsService.fetchBrandsWithFallback();
      setBrands(brandsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch brands');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return {
    brands,
    loading,
    error,
    refetch: fetchBrands,
  };
}

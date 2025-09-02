import { useState, useEffect } from 'react';
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

  const fetchBrands = async () => {
    try {
      console.log('=== useBrands: Starting fetchBrands ===');
      setLoading(true);
      setError(null);
      const brandsData = await woocommerceBrandsService.fetchBrandsWithFallback();
      console.log('=== useBrands: Received brands data ===', brandsData);
      setBrands(brandsData);
    } catch (err) {
      console.error('=== useBrands: Error fetching brands ===', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch brands');
      console.error('Error fetching brands:', err);
    } finally {
      setLoading(false);
      console.log('=== useBrands: Loading finished ===');
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return {
    brands,
    loading,
    error,
    refetch: fetchBrands,
  };
}

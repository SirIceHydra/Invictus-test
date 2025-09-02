import { useCallback, useState } from 'react';
import { WooCommerceDataProvider } from '../../adapters/catalog/woocommerce';

export function useCategories() {
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await WooCommerceDataProvider.getCategories({});
      setCategories(list);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, loading, error, fetchCategories };
}



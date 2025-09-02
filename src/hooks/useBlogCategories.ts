import { useState, useEffect } from 'react';
import { woocommerceBlogCategoriesService, WooCommerceBlogCategory } from '../services/woocommerce-blog-categories';

interface UseBlogCategoriesReturn {
  categories: WooCommerceBlogCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useBlogCategories(): UseBlogCategoriesReturn {
  const [categories, setCategories] = useState<WooCommerceBlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const categoriesData = await woocommerceBlogCategoriesService.fetchBlogCategoriesWithFallback();
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog categories');
      console.error('Error fetching blog categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}

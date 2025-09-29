import { useState, useEffect } from 'react';
import { fetchCategories } from '../posts/services/wordpress-api';

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
  description: string;
}

interface UseWordPressCategoriesReturn {
  categories: WordPressCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useWordPressCategories(): UseWordPressCategoriesReturn {
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoriesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const categoriesData = await fetchCategories();
      
      // Filter out slideshow category from categories
      const filteredCategories = categoriesData.filter(cat => 
        cat.slug.toLowerCase() !== 'slideshow'
      );
      
      setCategories(filteredCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch WordPress categories');
      console.error('Error fetching WordPress categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategoriesData,
  };
}

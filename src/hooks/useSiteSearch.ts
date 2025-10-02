import { useState, useCallback, useMemo } from 'react';
import { useProducts } from '@shop/core/hooks/useProducts';
import { usePosts } from '../posts/hooks/usePosts';
import { searchProducts, SearchResult } from '../utils/searchUtils';

interface Article {
  id: number;
  title: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
  content?: string;
  categories?: Array<{ name: string; slug: string }>;
}

interface SearchSuggestion {
  type: 'product' | 'article';
  data: any;
  score: number;
  matchedFields: string[];
}

interface UseSiteSearchOptions {
  maxResults?: number;
  debounceMs?: number;
}

export function useSiteSearch(options: UseSiteSearchOptions = {}) {
  const { maxResults = 10, debounceMs = 300 } = options;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Fetch products and posts for search
  const { products, fetchProducts } = useProducts({ 
    perPage: 50, 
    useEnhancedSearch: true 
  });
  
  const { posts, loading: postsLoading, fetchPosts } = usePosts({ 
    perPage: 50 
  });

  // Enhanced search function for articles
  const searchArticles = useCallback((articles: Article[], searchTerm: string): SearchResult[] => {
    if (!searchTerm.trim() || !articles || !Array.isArray(articles)) return [];

    const normalizedSearchTerm = searchTerm.toLowerCase();
    const searchKeywords = normalizedSearchTerm.split(/\s+/).filter(keyword => keyword.length > 0);

    const results: SearchResult[] = [];

    for (const article of articles) {
      if (!article || !article.title) continue; // Skip invalid articles
      
      let totalScore = 0;
      const matchedFields: string[] = [];
      const matchedKeywords: string[] = [];

      // Scoring weights for different fields
      const weights = {
        title: 3.0,
        excerpt: 2.0,
        content: 1.0,
        categories: 2.5,
        exactMatch: 2.0
      };

      // Check for exact matches first
      if (article.title && article.title.toLowerCase().includes(normalizedSearchTerm)) {
        totalScore += weights.exactMatch * weights.title;
        matchedFields.push('title');
        matchedKeywords.push(normalizedSearchTerm);
      }

      // Check individual keywords
      for (const keyword of searchKeywords) {
        let keywordScore = 0;
        const keywordMatchedFields: string[] = [];

        // Check title
        if (article.title.toLowerCase().includes(keyword)) {
          keywordScore += weights.title;
          keywordMatchedFields.push('title');
        }

        // Check excerpt
        if (article.excerpt && article.excerpt.toLowerCase().includes(keyword)) {
          keywordScore += weights.excerpt;
          keywordMatchedFields.push('excerpt');
        }

        // Check content
        if (article.content && article.content.toLowerCase().includes(keyword)) {
          keywordScore += weights.content;
          keywordMatchedFields.push('content');
        }

        // Check categories
        if (article.categories && Array.isArray(article.categories)) {
          const categoryMatch = article.categories.some(cat => 
            (cat && cat.name && cat.name.toLowerCase().includes(keyword)) || 
            (cat && cat.slug && cat.slug.toLowerCase().includes(keyword))
          );
          if (categoryMatch) {
            keywordScore += weights.categories;
            keywordMatchedFields.push('categories');
          }
        }

        // Add keyword score to total if any matches found
        if (keywordScore > 0) {
          totalScore += keywordScore;
          matchedFields.push(...keywordMatchedFields);
          matchedKeywords.push(keyword);
        }
      }

      // Normalize score
      const normalizedScore = searchKeywords.length > 0 ? totalScore / searchKeywords.length : 0;

      if (normalizedScore > 0.1) {
        results.push({
          product: article as any, // Type assertion for compatibility
          score: Math.min(normalizedScore, 10),
          matchedFields: [...new Set(matchedFields)],
          matchedKeywords: [...new Set(matchedKeywords)]
        });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }, []);

  // Perform search
  const performSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      // Search products (with null check)
      const productResults = products && Array.isArray(products) 
        ? searchProducts(products, term, {
            caseSensitive: false,
            exactMatch: true,
            boostExactMatches: true,
            minScore: 0.1
          })
        : [];

      // Search articles (with null check)
      const articleResults = posts && Array.isArray(posts) 
        ? searchArticles(posts, term)
        : [];

      // Combine and format results
      const combinedSuggestions: SearchSuggestion[] = [
        ...productResults.slice(0, 5).map(result => ({
          type: 'product' as const,
          data: result.product,
          score: result.score,
          matchedFields: result.matchedFields
        })),
        ...articleResults.slice(0, 5).map(result => ({
          type: 'article' as const,
          data: result.product, // Using product field for compatibility
          score: result.score,
          matchedFields: result.matchedFields
        }))
      ];

      // Sort by score and limit results
      const sortedSuggestions = combinedSuggestions
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults);

      setSuggestions(sortedSuggestions);
    } catch (error) {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [products, posts, searchArticles, maxResults]);

  // Debounced search
  const search = useCallback((term: string) => {
    setSearchTerm(term);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      performSearch(term);
    }, debounceMs);

    setDebounceTimer(timer);
  }, [debounceTimer, performSearch, debounceMs]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSuggestions([]);
    setLoading(false);
    
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }
  }, [debounceTimer]);

  // Load initial data
  const loadData = useCallback(async () => {
    await Promise.all([
      fetchProducts(),
      fetchPosts()
    ]);
  }, [fetchProducts, fetchPosts]);

  return {
    searchTerm,
    suggestions,
    loading: loading || postsLoading,
    search,
    clearSearch,
    loadData
  };
}

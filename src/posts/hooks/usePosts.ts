import { useState, useEffect, useCallback } from 'react';
import { Post, PostsResponse, PostFilters } from '../types/post';
import { fetchPosts, fetchPost, fetchPostBySlug, searchPosts, getRelatedPosts } from '../services/wordpress-api';

interface UsePostsOptions {
  initialFilters?: PostFilters;
  autoFetch?: boolean;
}

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
  fetchPosts: (filters?: PostFilters) => Promise<void>;
  searchPosts: (query: string, filters?: Omit<PostFilters, 'search'>) => Promise<void>;
  clearError: () => void;
}

interface UsePostOptions {
  autoFetch?: boolean;
}

interface UsePostReturn {
  post: Post | null;
  loading: boolean;
  error: string | null;
  fetchPost: (id: number) => Promise<void>;
  fetchPostBySlug: (slug: string) => Promise<void>;
  clearError: () => void;
}

interface UseRelatedPostsReturn {
  relatedPosts: Post[];
  loading: boolean;
  error: string | null;
  fetchRelatedPosts: (postId: number, limit?: number) => Promise<void>;
  clearError: () => void;
}

// Hook for fetching multiple posts
export function usePosts(options: UsePostsOptions = {}): UsePostsReturn {
  const { initialFilters = {}, autoFetch = true } = options;
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Debug state changes
  useEffect(() => {
    console.log('📊 usePosts: Posts state changed to:', posts.length, 'posts');
  }, [posts]);

  const fetchPostsData = useCallback(async (filters: PostFilters = {}) => {
    console.log('🚀 usePosts: Starting fetch with filters:', filters);
    setLoading(true);
    setError(null);
    
    try {
      const response: PostsResponse = await fetchPosts(filters);
      console.log('📥 usePosts: Got response:', response);
      console.log('📝 usePosts: Posts array:', response.posts);
      
      setPosts(response.posts);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      
      console.log('✅ usePosts: State updated successfully');
    } catch (err) {
      console.error('❌ usePosts: Error occurred:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
      console.log('🏁 usePosts: Loading finished');
    }
  }, []);

  const searchPostsData = useCallback(async (query: string, filters: Omit<PostFilters, 'search'> = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: PostsResponse = await searchPosts(query, filters);
      setPosts(response.posts);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search posts');
      console.error('Error in usePosts search:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initial fetch
  useEffect(() => {
    console.log('🔄 usePosts: Initial fetch triggered');
    if (autoFetch) {
      fetchPostsData(initialFilters);
    }
  }, []); // Only run once on mount

  return {
    posts,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    fetchPosts: fetchPostsData,
    searchPosts: searchPostsData,
    clearError,
  };
}

// Hook for fetching a single post
export function usePost(options: UsePostOptions = {}): UsePostReturn {
  const { autoFetch = false } = options;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPostData = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const postData = await fetchPost(id);
      setPost(postData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch post');
      console.error('Error in usePost:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPostBySlugData = useCallback(async (slug: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const postData = await fetchPostBySlug(slug);
      setPost(postData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch post');
      console.error('Error in usePost by slug:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    post,
    loading,
    error,
    fetchPost: fetchPostData,
    fetchPostBySlug: fetchPostBySlugData,
    clearError,
  };
}

// Hook for fetching related posts
export function useRelatedPosts(): UseRelatedPostsReturn {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRelatedPostsData = useCallback(async (postId: number, limit: number = 3) => {
    setLoading(true);
    setError(null);
    
    try {
      const posts = await getRelatedPosts(postId, limit);
      setRelatedPosts(posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch related posts');
      console.error('Error in useRelatedPosts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    relatedPosts,
    loading,
    error,
    fetchRelatedPosts: fetchRelatedPostsData,
    clearError,
  };
}

// Hook for managing posts with pagination
export function usePostsWithPagination(initialFilters: PostFilters = {}) {
  const [filters, setFilters] = useState<PostFilters>(initialFilters);
  const postsHook = usePosts({ initialFilters: filters, autoFetch: false }); // Disable auto-fetch

  const goToPage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const setPerPage = useCallback((perPage: number) => {
    setFilters(prev => ({ ...prev, perPage, page: 1 }));
  }, []);

  const setCategory = useCallback((category: string) => {
    console.log('🎯 Setting category filter:', category);
    setFilters(prev => ({ ...prev, category, page: 1 }));
  }, []);

  const setTag = useCallback((tag: string) => {
    setFilters(prev => ({ ...prev, tag, page: 1 }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  }, []);

  const setOrderBy = useCallback((orderBy: 'date' | 'title' | 'modified') => {
    setFilters(prev => ({ ...prev, orderBy }));
  }, []);

  const setOrder = useCallback((order: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, order }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Refetch when filters change
  useEffect(() => {
    console.log('🔄 usePostsWithPagination: Filters changed to:', filters);
    postsHook.fetchPosts(filters);
  }, [filters, postsHook.fetchPosts]);

  return {
    ...postsHook,
    filters,
    goToPage,
    setPerPage,
    setCategory,
    setTag,
    setSearch,
    setOrderBy,
    setOrder,
    clearFilters,
  };
}

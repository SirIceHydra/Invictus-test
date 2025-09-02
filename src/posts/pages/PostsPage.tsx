import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ArrowLeft } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { PostGrid } from '../components/PostGrid';
import { usePostsWithPagination } from '../hooks/usePosts';
import { PostFilters } from '../types/post';

const PostsPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  
  const {
    posts,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    filters,
    goToPage,
    setPerPage,
    setCategory,
    setTag,
    setSearch,
    setOrderBy,
    setOrder,
    clearFilters,
  } = usePostsWithPagination({
    perPage: 9,
    orderBy: 'date',
    order: 'desc',
  });

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    console.log('🔍 PostsPage: Category from URL:', categoryFromUrl);
    console.log('🔍 PostsPage: Current filters.category:', filters.category);
    if (categoryFromUrl && categoryFromUrl !== filters.category) {
      console.log('🎯 PostsPage: Setting category filter to:', categoryFromUrl);
      setCategory(categoryFromUrl);
    }
  }, [searchParams, setCategory, filters.category]);

  // Debug posts changes
  useEffect(() => {
    console.log('📊 PostsPage: Posts updated:', posts.length, 'posts');
    if (filters.category) {
      console.log('📊 PostsPage: Posts for category:', filters.category);
    }
  }, [posts, filters.category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchQuery);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchQuery('');
  };

  const hasActiveFilters = filters.category || filters.tag || filters.search || filters.orderBy !== 'date' || filters.order !== 'desc';

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          {filters.category && (
            <div className="mb-4">
              <Link
                to="/blog-hub"
                className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-500 transition-colors font-semibold"
              >
                <ArrowLeft size={20} />
                Back to Blog Hub
              </Link>
            </div>
          )}
          <h1 className="text-4xl font-bold text-center mb-4">
            {filters.category ? `${filters.category.toUpperCase()} POSTS` : 'PROTEIN RECIPES & TIPS'}
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            {filters.category 
              ? `Discover all posts in the ${filters.category} category.`
              : 'Discover delicious protein recipes, nutrition tips, and fitness advice to help you achieve your health goals.'
            }
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search recipes and tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-rose-400 text-white px-4 py-1 rounded-md hover:bg-rose-500 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
              Filters
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.orderBy || 'date'}
                    onChange={(e) => setOrderBy(e.target.value as 'date' | 'title' | 'modified')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="modified">Last Modified</option>
                  </select>
                </div>

                {/* Sort Direction */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <select
                    value={filters.order || 'desc'}
                    onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>

                {/* Posts Per Page */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Posts Per Page</label>
                  <select
                    value={filters.perPage || 9}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  >
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                    <option value={12}>12</option>
                    <option value={18}>18</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {posts.length} of {total} posts
          </p>
          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Active filters:</span>
              {filters.search && (
                <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded">Search: {filters.search}</span>
              )}
              {filters.category && (
                <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded">Category: {filters.category}</span>
              )}
              {filters.tag && (
                <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded">Tag: {filters.tag}</span>
              )}
            </div>
          )}
        </div>

        {/* Posts Grid */}
        <PostGrid
          posts={posts}
          loading={loading}
          error={error}
          columns={3}
          showExcerpt={true}
          showReadingTime={true}
          imageSize="medium"
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
              {/* Previous Page */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 border rounded-md ${
                    currentPage === page
                      ? 'bg-rose-400 text-white border-rose-400'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Page */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;

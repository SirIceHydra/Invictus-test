import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { PostGrid } from '../posts/components/PostGrid';
import { usePosts } from '../posts/hooks/usePosts';
import { useBlogCategories } from '../hooks/useBlogCategories';
import { Search, Filter, ArrowRight, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const { posts, loading, fetchPosts } = usePosts({ 
    initialFilters: { perPage: 12, orderBy: 'date', order: 'desc' },
    autoFetch: true 
  });

  const { categories: blogCategoriesData, loading: categoriesLoading } = useBlogCategories();

  // Create blog categories with "All Articles" option
  const blogCategories = [
    { id: 'all', name: 'All Articles', count: posts.length },
    ...blogCategoriesData.map(category => ({
      id: category.slug,
      name: category.name,
      count: category.count || 0
    }))
  ];

  // Filter posts based on search term only (since category filtering is now done via API)
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Function to handle category selection
  const handleCategoryClick = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    if (categoryId === 'all') {
      // Fetch all posts
      await fetchPosts({ 
        perPage: 12, 
        orderBy: 'date', 
        order: 'desc' 
      });
    } else {
      // Fetch posts by category
      const category = blogCategoriesData.find(cat => cat.slug === categoryId);
      if (category) {
        await fetchPosts({ 
          perPage: 12, 
          orderBy: 'date', 
          order: 'desc',
          category: category.id.toString() // Use category ID for API filtering
        });
      }
    }
  };

  // Function to clear all filters
  const clearAllFilters = async () => {
    setSearchTerm('');
    setSelectedCategory('all');
    await fetchPosts({ 
      perPage: 12, 
      orderBy: 'date', 
      order: 'desc' 
    });
  };

  // Slider navigation functions
  const scrollLeft = () => {
    const container = document.getElementById('categories-slider');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
      setScrollPosition(Math.max(0, scrollPosition - 300));
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('categories-slider');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
      setScrollPosition(scrollPosition + 300);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation isScrolled={false} />
      
      {/* Hero Section */}
      <div className="pt-24 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
              INVICTUS NUTRITION BLOG
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover expert insights, nutrition tips, workout advice, and the latest in fitness science. 
              Our blog is your go-to resource for everything related to health, fitness, and supplementation.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-full shadow-lg p-2 mb-8 max-w-xl mx-auto">
              <div className="flex items-center">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-0 focus:ring-0 focus:outline-none text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
                     <div className="text-center mb-8">
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
             <p className="text-gray-600">Find articles that match your interests</p>
           </div>
           
           {/* Categories Slider */}
           <div className="relative max-w-7xl mx-auto">
             {/* Left Arrow */}
             {!categoriesLoading && (
               <button
                 onClick={scrollLeft}
                 className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
                 style={{ display: scrollPosition > 0 ? 'block' : 'none' }}
               >
                 <ChevronLeft className="w-6 h-6 text-gray-600" />
               </button>
             )}
             
             {/* Right Arrow */}
             {!categoriesLoading && (
               <button
                 onClick={scrollRight}
                 className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
               >
                 <ChevronRight className="w-6 h-6 text-gray-600" />
               </button>
             )}
             
             {/* Slider Container */}
             <div
               id="categories-slider"
               className="flex gap-6 overflow-x-auto scrollbar-hide px-4 py-2"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
             >
               {categoriesLoading ? (
                 // Loading skeleton
                 Array.from({ length: 6 }).map((_, index) => (
                   <div
                     key={index}
                     className="flex-shrink-0 p-6 rounded-xl text-center min-w-[200px] bg-gray-100 animate-pulse"
                   >
                     <div className="h-6 bg-gray-200 rounded mb-2"></div>
                     <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                   </div>
                 ))
               ) : (
                                   blogCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`flex-shrink-0 p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 min-w-[200px] ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white shadow-lg'
                          : category.count === 0
                          ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                      disabled={category.count === 0}
                    >
                      <div className="font-semibold mb-2 text-lg">{category.name}</div>
                      <div className={`text-sm ${
                        selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {category.count} article{category.count !== 1 ? 's' : ''}
                      </div>
                    </button>
                  ))
               )}
             </div>
           </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm || selectedCategory !== 'all' ? 'Search Results' : 'Latest Articles'}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'all' && ` in ${blogCategories.find(cat => cat.id === selectedCategory)?.name}`}
              </p>
                             {(searchTerm || selectedCategory !== 'all') && (
                 <button
                   onClick={clearAllFilters}
                   className="text-rose-400 hover:text-rose-500 font-medium mt-2 transition-colors"
                 >
                   Clear all filters
                 </button>
               )}
            </div>
            <Link
              to="/shop"
              className="bg-gradient-to-r from-rose-400 to-amber-400 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform text-white flex items-center gap-2"
            >
              SHOP NOW <ArrowRight size={20} />
            </Link>
          </div>

          {/* Blog Grid */}
          <PostGrid
            posts={filteredPosts}
            loading={loading}
            columns={3}
            showExcerpt={true}
            showReadingTime={true}
            imageSize="large"
          />

          {/* No Results Message */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? `No articles match your search for "${searchTerm}". Try different keywords or browse all articles.`
                    : 'No articles available in this category. Please check back later.'
                  }
                </p>
                                 <button
                   onClick={clearAllFilters}
                   className="bg-rose-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-rose-500 transition-colors"
                 >
                   View All Articles
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with Our Latest Articles
            </h3>
            <p className="text-gray-600 mb-8">
              Get notified when we publish new nutrition tips, workout guides, and supplement insights.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
              />
              <button className="bg-gradient-to-r from-rose-400 to-amber-400 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

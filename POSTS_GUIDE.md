# 📝 Posts Module Implementation Guide

## 📋 Overview

This guide shows developers how to implement the portable posts module in any React application. The posts module provides a complete blog system with WordPress integration, featuring dynamic content, SEO optimization, and responsive design.

---

## 🚀 Quick Start

### 1. Copy Posts Module
```bash
# Copy the entire posts folder to your React project
cp -r /path/to/source/src/posts ./src/
```

### 2. Install Dependencies
```bash
npm install axios react-router-dom @types/react-router-dom
npm install -D tailwindcss postcss autoprefixer
```

### 3. Configure Environment Variables
```env
# .env
VITE_WORDPRESS_URL=https://your-wordpress-site.com
VITE_WORDPRESS_API_VERSION=wp/v2
VITE_WORDPRESS_POSTS_PER_PAGE=10
VITE_WORDPRESS_CACHE_DURATION=300000
```

### 4. Add Routes
```tsx
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsPage from './posts/pages/PostsPage';
import PostDetailPage from './posts/pages/PostDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:slug" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}
```

### 5. Add to Homepage
```tsx
// App.tsx or HomePage.tsx
import { PostGrid } from './posts/components/PostGrid';
import { usePosts } from './posts/hooks/usePosts';

function HomePage() {
  const { posts, loading, error } = usePosts({ 
    autoFetch: true, 
    initialFilters: { perPage: 6 } 
  });

  return (
    <section id="blog" className="py-20 bg-gradient-to-t from-white to-orange-100">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold mb-12 text-center">BLOG POSTS</h3>
        <PostGrid posts={posts} loading={loading} error={error} />
      </div>
    </section>
  );
}
```

---

## 📁 Module Structure

```
src/posts/
├── components/                   # Reusable UI components
│   ├── PostCard.tsx             # Individual post display
│   ├── PostGrid.tsx             # Post grid layout
│   └── PostDetail.tsx           # Full post content
├── config/
│   └── wordpress.ts             # WordPress configuration
├── hooks/                       # Custom React hooks
│   ├── usePosts.ts              # Posts management
│   ├── usePost.ts               # Single post management
│   └── useRelatedPosts.ts       # Related posts
├── pages/                       # Page components
│   ├── PostsPage.tsx            # Posts listing page
│   └── PostDetailPage.tsx       # Single post page
├── services/
│   └── wordpress-api.ts         # WordPress API service
├── types/
│   └── post.ts                  # TypeScript interfaces
└── index.ts                     # Module exports
```

---

## 🔧 Core Components

### PostGrid
Displays a grid of blog posts:

```tsx
import { PostGrid } from './posts/components/PostGrid';

<PostGrid 
  posts={posts}
  loading={loading}
  error={error}
  showPagination={true}
  postsPerPage={12}
/>
```

### PostCard
Displays individual post cards:

```tsx
import { PostCard } from './posts/components/PostCard';

<PostCard 
  post={post}
  variant="default" // "default", "compact", "featured"
  showExcerpt={true}
  showMeta={true}
/>
```

### PostDetail
Displays full post content:

```tsx
import { PostDetail } from './posts/components/PostDetail';

<PostDetail 
  post={post}
  showRelatedPosts={true}
  showSocialShare={true}
/>
```

---

## 🛠️ Available Hooks

### usePosts
Manages posts data and API calls:

```tsx
import { usePosts } from './posts/hooks/usePosts';

const { 
  posts, 
  loading, 
  error, 
  total, 
  totalPages, 
  currentPage,
  fetchPosts, 
  searchPosts 
} = usePosts({
  autoFetch: true,
  initialFilters: {
    perPage: 10,
    page: 1,
    category: 'recipes'
  }
});

// Fetch with filters
fetchPosts({ 
  category: 'protein-recipes', 
  search: 'smoothie',
  page: 2,
  perPage: 6,
  orderBy: 'date',
  order: 'desc'
});
```

### usePost
Manages single post data:

```tsx
import { usePost } from './posts/hooks/usePost';

const { 
  post, 
  loading, 
  error, 
  fetchPost 
} = usePost('post-slug');

// Fetch specific post
fetchPost('my-post-slug');
```

### useRelatedPosts
Manages related posts:

```tsx
import { useRelatedPosts } from './posts/hooks/useRelatedPosts';

const { 
  relatedPosts, 
  loading, 
  error 
} = useRelatedPosts(postId, {
  limit: 3,
  excludeCurrent: true
});
```

---

## 🎨 UI Components

### PostCard Variants
```tsx
// Default card
<PostCard post={post} variant="default" />

// Compact card
<PostCard post={post} variant="compact" />

// Featured card
<PostCard post={post} variant="featured" />
```

### PostGrid Layouts
```tsx
// Grid layout
<PostGrid 
  posts={posts}
  layout="grid"
  columns={3}
/>

// List layout
<PostGrid 
  posts={posts}
  layout="list"
/>

// Masonry layout
<PostGrid 
  posts={posts}
  layout="masonry"
/>
```

### Loading States
```tsx
// Loading skeleton
<PostGrid 
  posts={[]}
  loading={true}
  skeletonCount={6}
/>

// Error state
<PostGrid 
  posts={[]}
  error="Failed to load posts"
/>
```

---

## 🔧 Configuration

### WordPress Configuration
```typescript
// src/posts/config/wordpress.ts
export const WORDPRESS_CONFIG = {
  BASE_URL: import.meta.env.VITE_WORDPRESS_URL,
  API_VERSION: import.meta.env.VITE_WORDPRESS_API_VERSION || 'wp/v2',
  
  ENDPOINTS: {
    POSTS: '/posts',
    CATEGORIES: '/categories',
    TAGS: '/tags',
    MEDIA: '/media',
  },
  
  DEFAULTS: {
    POSTS_PER_PAGE: 10,
    MAX_POSTS_PER_PAGE: 100,
    CACHE_DURATION: 10 * 60 * 1000, // 10 minutes
    TIMEOUT: 10000,
    MAX_RETRIES: 3,
  },
  
  POST_STATUSES: ['publish'],
  IMAGE_SIZES: {
    THUMBNAIL: 'thumbnail',
    MEDIUM: 'medium',
    LARGE: 'large',
    FULL: 'full',
  },
  
  READING_TIME: {
    WORDS_PER_MINUTE: 200,
    MIN_READING_TIME: 1,
  },
};
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/posts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#3B82F6',
              '&:hover': {
                color: '#2563EB',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

---

## 📝 Content Management

### WordPress Content Structure
```php
// Recommended WordPress post structure
function setup_posts_content() {
    // Add excerpt support
    add_post_type_support('post', 'excerpt');
    
    // Add featured image support
    add_theme_support('post-thumbnails');
    
    // Set excerpt length
    add_filter('excerpt_length', function($length) {
        return 20;
    });
}
add_action('init', 'setup_posts_content');
```

### SEO Optimization
```php
// Add SEO meta tags
function add_seo_meta_tags() {
    if (is_single()) {
        $post = get_post();
        $excerpt = wp_strip_all_tags(get_the_excerpt($post));
        $featured_image = get_the_post_thumbnail_url($post->ID, 'large');
        
        echo '<meta name="description" content="' . esc_attr($excerpt) . '">';
        echo '<meta property="og:title" content="' . esc_attr($post->post_title) . '">';
        echo '<meta property="og:description" content="' . esc_attr($excerpt) . '">';
        echo '<meta property="og:image" content="' . esc_url($featured_image) . '">';
    }
}
add_action('wp_head', 'add_seo_meta_tags');
```

---

## 🔍 Search & Filtering

### Search Implementation
```tsx
import { usePosts } from './posts/hooks/usePosts';

function SearchPosts() {
  const { searchPosts, loading } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchPosts(query, {
      perPage: 10,
      orderBy: 'relevance'
    });
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 border rounded-lg"
      />
    </div>
  );
}
```

### Category Filtering
```tsx
import { usePosts } from './posts/hooks/usePosts';

function CategoryFilter() {
  const { fetchPosts } = usePosts();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchPosts({
      category: category || undefined,
      page: 1,
      perPage: 10
    });
  };

  return (
    <select
      value={selectedCategory}
      onChange={(e) => handleCategoryChange(e.target.value)}
      className="px-4 py-2 border rounded-lg"
    >
      <option value="">All Categories</option>
      <option value="protein-recipes">Protein Recipes</option>
      <option value="smoothies">Smoothies</option>
      <option value="nutrition-tips">Nutrition Tips</option>
    </select>
  );
}
```

---

## 📱 Responsive Design

### Mobile-First Approach
```tsx
// PostGrid responsive columns
<PostGrid 
  posts={posts}
  columns={{
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 4
  }}
/>
```

### Image Optimization
```tsx
// Responsive images
<img
  src={post.featuredImage}
  alt={post.featuredImageAlt}
  className="w-full h-48 md:h-64 lg:h-80 object-contain"
  loading="lazy"
/>
```

---

## 🧪 Testing

### Unit Tests
```tsx
import { render, screen } from '@testing-library/react';
import PostCard from './posts/components/PostCard';

test('renders post card with title', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    excerpt: 'Test excerpt',
    slug: 'test-post',
    date: '2024-01-01',
    featuredImage: '/test-image.jpg',
    featuredImageAlt: 'Test image',
    author: 'Test Author',
    categories: ['Test Category'],
    tags: ['test'],
    readingTime: 5
  };

  render(<PostCard post={mockPost} />);
  expect(screen.getByText('Test Post')).toBeInTheDocument();
});
```

### Integration Tests
```tsx
import { renderHook, waitFor } from '@testing-library/react';
import { usePosts } from './posts/hooks/usePosts';

test('fetches posts from API', async () => {
  const { result } = renderHook(() => usePosts({ autoFetch: true }));

  await waitFor(() => {
    expect(result.current.posts).toHaveLength(10);
    expect(result.current.loading).toBe(false);
  });
});
```

---

## 🚀 Performance Optimization

### Caching Strategy
```typescript
// Cache configuration
export const CACHE_CONFIG = {
  DURATION: 10 * 60 * 1000, // 10 minutes
  MAX_SIZE: 100, // Maximum cached items
  STALE_WHILE_REVALIDATE: true,
};

// Preload cache
import { preloadCache } from './posts/services/wordpress-api';

// Preload popular posts
useEffect(() => {
  preloadCache();
}, []);
```

### Lazy Loading
```tsx
// Lazy load post detail page
const PostDetailPage = lazy(() => import('./posts/pages/PostDetailPage'));

// Lazy load images
<img
  src={post.featuredImage}
  loading="lazy"
  decoding="async"
  alt={post.featuredImageAlt}
/>
```

---

## 🔧 Customization

### Custom Styling
```css
/* Custom post styles */
.post-card {
  @apply bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300;
}

.post-card:hover {
  @apply transform -translate-y-1;
}

.post-excerpt {
  @apply text-gray-600 line-clamp-3;
}

.post-meta {
  @apply text-sm text-gray-500 flex items-center gap-2;
}
```

### Custom Components
```tsx
// Custom post card
const CustomPostCard = ({ post, ...props }) => {
  return (
    <div className="custom-post-card">
      <img src={post.featuredImage} alt={post.featuredImageAlt} />
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="post-meta">
        <span>{post.author}</span>
        <span>{post.date}</span>
        <span>{post.readingTime} min read</span>
      </div>
    </div>
  );
};
```

---

## 🆘 Troubleshooting

### Common Issues

1. **Posts not loading**
   - Check WordPress API URL
   - Verify CORS configuration
   - Check network requests in browser

2. **Images not displaying**
   - Verify image URLs in WordPress
   - Check image permissions
   - Ensure images are properly uploaded

3. **Search not working**
   - Verify WordPress search is enabled
   - Check API endpoint permissions
   - Test search directly in WordPress

### Debug Mode
```env
VITE_DEBUG_MODE=true
```

This enables detailed logging for troubleshooting.

---

## 📚 API Reference

### WordPress REST API
- `GET /wp-json/wp/v2/posts` - Fetch posts
- `GET /wp-json/wp/v2/posts/{id}` - Fetch single post
- `GET /wp-json/wp/v2/categories` - Fetch categories
- `GET /wp-json/wp/v2/tags` - Fetch tags
- `GET /wp-json/wp/v2/media` - Fetch media

### Posts API
- `fetchPosts(filters)` - Fetch posts with filters
- `fetchPost(slug)` - Fetch single post by slug
- `searchPosts(query, filters)` - Search posts
- `getRelatedPosts(postId, options)` - Get related posts

---

## ✅ Checklist

### Setup
- [ ] Posts module copied to project
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Routes added to app
- [ ] WordPress API configured

### Configuration
- [ ] WordPress URL configured
- [ ] CORS headers configured
- [ ] Permalinks set to "Post name"
- [ ] Featured images enabled
- [ ] Excerpts enabled

### Content
- [ ] Sample posts created in WordPress
- [ ] Featured images uploaded
- [ ] Categories and tags created
- [ ] Excerpts written
- [ ] SEO meta tags configured

### Testing
- [ ] Posts loading from API
- [ ] Search functionality working
- [ ] Category filtering working
- [ ] Post detail pages working
- [ ] Responsive design verified

### Production
- [ ] Production WordPress URL set
- [ ] HTTPS enabled
- [ ] Performance optimized
- [ ] SEO configured
- [ ] Analytics integrated

---

## 🎉 Success!

Your posts module is now integrated and ready to use! The module provides:

- ✅ **Complete blog functionality**
- ✅ **WordPress integration**
- ✅ **SEO optimization**
- ✅ **Responsive design**
- ✅ **Search and filtering**
- ✅ **Performance optimization**

The posts module can now be easily copied to other projects and integrated with minimal effort.

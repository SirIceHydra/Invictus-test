import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, Calendar } from 'lucide-react';
import { Post } from '../types/post';
import { Loading } from '../../components/ui/Loading';

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

interface PostDetailProps {
  post: Post | null;
  loading?: boolean;
  error?: string | null;
  showRelatedPosts?: boolean;
  relatedPosts?: Post[];
  className?: string;
}

export const PostDetail: React.FC<PostDetailProps> = ({
  post,
  loading = false,
  error = null,
  showRelatedPosts = false,
  relatedPosts = [],
  className = '',
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading text="Loading post..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Error Loading Post</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Post Not Found</h3>
        <p className="text-gray-600">The post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/">
            <img src="/assets/Invictus.svg" alt="Invictus Nutrition Logo" className="max-h-8" />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-500 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{decodeHtmlEntities(post.title)}</h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readingTime} min read</span>
              </div>
              
              {post.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
              )}
            </div>

            {/* Categories and Tags */}
            {(post.categories.length > 0 || post.tags.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category, index) => (
                  <span
                    key={`category-${index}`}
                    className="px-3 py-1 bg-rose-100 text-rose-600 text-sm rounded-full"
                  >
                    {category}
                  </span>
                ))}
                {post.tags.map((tag, index) => (
                  <span
                    key={`tag-${index}`}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full flex items-center gap-1"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-12"
            />
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="space-y-6"
            />
          </div>

          {/* Related Posts */}
          {showRelatedPosts && relatedPosts.length > 0 && (
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/posts/${relatedPost.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover-lift transition-all duration-300"
                  >
                    {relatedPost.featuredImage && (
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.featuredImageAlt}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 hover:text-rose-400 transition-colors">
                        {decodeHtmlEntities(relatedPost.title)}
                      </h3>
                      <p className="text-sm text-gray-500">{formatDate(relatedPost.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
};

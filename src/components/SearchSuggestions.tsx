import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';

interface Article {
  id: number;
  title: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
}

interface SearchSuggestion {
  type: 'product' | 'article';
  data: Product | Article;
  score: number;
  matchedFields: string[];
}

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  loading: boolean;
  onSuggestionClick: () => void;
}

export function SearchSuggestions({ suggestions, loading, onSuggestionClick }: SearchSuggestionsProps) {
  if (loading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-primary border border-tertiary/20 rounded-lg shadow-lg z-50 mt-1">
        <div className="p-4 text-center text-tertiary">
          <div className="animate-spin w-5 h-5 border-2 border-tertiary border-t-transparent rounded-full mx-auto mb-2"></div>
          Searching...
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  const productSuggestions = suggestions.filter(s => s.type === 'product') as Array<SearchSuggestion & { data: Product }>;
  const articleSuggestions = suggestions.filter(s => s.type === 'article') as Array<SearchSuggestion & { data: Article }>;

  return (
    <div className="absolute top-full left-0 w-96 bg-primary border border-tertiary/20 rounded-lg shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
      <div className="p-4">
        {/* Product Suggestions */}
        {productSuggestions.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-tertiary mb-2 uppercase tracking-wide">
              Products ({productSuggestions.length})
            </h3>
            <div className="space-y-2">
              {productSuggestions.slice(0, 3).map((suggestion) => (
                <Link
                  key={`product-${suggestion.data.id}`}
                  to={`/product/${suggestion.data.id}`}
                  onClick={onSuggestionClick}
                  className="flex items-center gap-3 p-2 hover:bg-tertiary/10 rounded-md transition-colors group"
                >
                  <div className="w-12 h-12 bg-primarySupport rounded-md overflow-hidden flex-shrink-0">
                    {suggestion.data.images && suggestion.data.images.length > 0 ? (
                      <img
                        src={suggestion.data.images[0]}
                        alt={suggestion.data.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-tertiary/60">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white group-hover:text-tertiary transition-colors truncate">
                      {suggestion.data.name}
                    </h4>
                    <p className="text-xs text-tertiary/80">
                      {suggestion.data.brand && (
                        <span className="font-medium">{suggestion.data.brand}</span>
                      )}
                      {suggestion.data.categories && suggestion.data.categories.length > 0 && (
                        <span className="ml-1">
                          • {suggestion.data.categories[0]}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-tertiary font-semibold">
                      R{suggestion.data.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Article Suggestions */}
        {articleSuggestions.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-tertiary mb-2 uppercase tracking-wide">
              Articles ({articleSuggestions.length})
            </h3>
            <div className="space-y-2">
              {articleSuggestions.slice(0, 3).map((suggestion) => (
                <Link
                  key={`article-${suggestion.data.id}`}
                  to={`/posts/${suggestion.data.slug}`}
                  onClick={onSuggestionClick}
                  className="flex items-center gap-3 p-2 hover:bg-tertiary/10 rounded-md transition-colors group"
                >
                  <div className="w-12 h-12 bg-primarySupport rounded-md overflow-hidden flex-shrink-0">
                    {suggestion.data.coverImage ? (
                      <img
                        src={suggestion.data.coverImage}
                        alt={suggestion.data.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-tertiary/60">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white group-hover:text-tertiary transition-colors line-clamp-2">
                      {suggestion.data.title}
                    </h4>
                    {suggestion.data.excerpt && (
                      <p className="text-xs text-tertiary/80 line-clamp-1 mt-1">
                        {suggestion.data.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* View All Results */}
        {suggestions.length > 6 && (
          <div className="mt-4 pt-3 border-t border-tertiary/20">
            <Link
              to="/shop" // Redirect to shop page for now
              onClick={onSuggestionClick}
              className="block text-center text-sm text-tertiary hover:text-white transition-colors"
            >
              View all {suggestions.length} results →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

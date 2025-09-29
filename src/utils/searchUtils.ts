// Enhanced search utilities for product search
// Provides multi-field keyword matching across product names, categories, and brands

import { Product } from '../types/product';

export interface SearchResult {
  product: Product;
  score: number;
  matchedFields: string[];
  matchedKeywords: string[];
}

export interface SearchOptions {
  caseSensitive?: boolean;
  exactMatch?: boolean;
  minScore?: number;
  boostExactMatches?: boolean;
}

/**
 * Enhanced search function that matches keywords across multiple product fields
 * @param products - Array of products to search through
 * @param searchTerm - Search term entered by user
 * @param options - Search configuration options
 * @returns Array of search results with relevance scores
 */
export function searchProducts(
  products: Product[],
  searchTerm: string,
  options: SearchOptions = {}
): SearchResult[] {
  const {
    caseSensitive = false,
    exactMatch = false,
    minScore = 0.1,
    boostExactMatches = true
  } = options;

  if (!searchTerm.trim()) {
    return products.map(product => ({
      product,
      score: 1,
      matchedFields: [],
      matchedKeywords: []
    }));
  }

  const normalizedSearchTerm = caseSensitive ? searchTerm : searchTerm.toLowerCase();
  const searchKeywords = extractKeywords(normalizedSearchTerm);

  const results: SearchResult[] = [];

  for (const product of products) {
    const result = calculateProductScore(
      product,
      searchKeywords,
      normalizedSearchTerm,
      {
        caseSensitive,
        exactMatch,
        boostExactMatches
      }
    );

    if (result.score >= minScore) {
      results.push(result);
    }
  }

  // Sort by relevance score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Extract individual keywords from search term
 * @param searchTerm - The search term
 * @returns Array of individual keywords
 */
function extractKeywords(searchTerm: string): string[] {
  return searchTerm
    .split(/\s+/)
    .filter(keyword => keyword.length > 0)
    .map(keyword => keyword.trim());
}

/**
 * Calculate relevance score for a product based on search criteria
 * @param product - Product to score
 * @param searchKeywords - Individual keywords from search term
 * @param fullSearchTerm - Complete search term
 * @param options - Search options
 * @returns Search result with score and match details
 */
function calculateProductScore(
  product: Product,
  searchKeywords: string[],
  fullSearchTerm: string,
  options: {
    caseSensitive: boolean;
    exactMatch: boolean;
    boostExactMatches: boolean;
  }
): SearchResult {
  const { caseSensitive, exactMatch, boostExactMatches } = options;
  let totalScore = 0;
  const matchedFields: string[] = [];
  const matchedKeywords: string[] = [];

  // Normalize product data
  const productName = caseSensitive ? product.name : product.name.toLowerCase();
  const productDescription = caseSensitive ? product.description : product.description.toLowerCase();
  const productShortDescription = caseSensitive ? product.shortDescription : product.shortDescription.toLowerCase();
  const productBrand = product.brand ? (caseSensitive ? product.brand : product.brand.toLowerCase()) : '';
  const productCategories = product.categories.map(cat => caseSensitive ? cat : cat.toLowerCase());

  // Scoring weights for different fields
  const weights = {
    name: 3.0,           // Product name is most important
    brand: 2.5,          // Brand is very important
    categories: 2.0,     // Categories are important
    shortDescription: 1.5, // Short description is moderately important
    description: 1.0,    // Full description is least important
    exactMatch: 2.0      // Boost for exact matches
  };

  // Check for exact matches first (if enabled)
  if (exactMatch && boostExactMatches) {
    if (productName.includes(fullSearchTerm)) {
      totalScore += weights.exactMatch * weights.name;
      matchedFields.push('name');
      matchedKeywords.push(fullSearchTerm);
    }
    if (productBrand && productBrand.includes(fullSearchTerm)) {
      totalScore += weights.exactMatch * weights.brand;
      matchedFields.push('brand');
      matchedKeywords.push(fullSearchTerm);
    }
    if (productCategories.some(cat => cat.includes(fullSearchTerm))) {
      totalScore += weights.exactMatch * weights.categories;
      matchedFields.push('categories');
      matchedKeywords.push(fullSearchTerm);
    }
  }

  // Check individual keywords
  for (const keyword of searchKeywords) {
    let keywordScore = 0;
    const keywordMatchedFields: string[] = [];

    // Check product name
    if (productName.includes(keyword)) {
      keywordScore += weights.name;
      keywordMatchedFields.push('name');
    }

    // Check brand
    if (productBrand && productBrand.includes(keyword)) {
      keywordScore += weights.brand;
      keywordMatchedFields.push('brand');
    }

    // Check categories
    if (productCategories.some(cat => cat.includes(keyword))) {
      keywordScore += weights.categories;
      keywordMatchedFields.push('categories');
    }

    // Check short description
    if (productShortDescription.includes(keyword)) {
      keywordScore += weights.shortDescription;
      keywordMatchedFields.push('shortDescription');
    }

    // Check full description
    if (productDescription.includes(keyword)) {
      keywordScore += weights.description;
      keywordMatchedFields.push('description');
    }

    // Add keyword score to total if any matches found
    if (keywordScore > 0) {
      totalScore += keywordScore;
      matchedFields.push(...keywordMatchedFields);
      matchedKeywords.push(keyword);
    }
  }

  // Normalize score (divide by number of keywords to prevent bias toward longer search terms)
  const normalizedScore = searchKeywords.length > 0 ? totalScore / searchKeywords.length : 0;

  return {
    product,
    score: Math.min(normalizedScore, 10), // Cap score at 10
    matchedFields: [...new Set(matchedFields)], // Remove duplicates
    matchedKeywords: [...new Set(matchedKeywords)] // Remove duplicates
  };
}

/**
 * Filter products based on search results
 * @param searchResults - Results from searchProducts function
 * @returns Array of products sorted by relevance
 */
export function getFilteredProducts(searchResults: SearchResult[]): Product[] {
  return searchResults.map(result => result.product);
}

/**
 * Get search suggestions based on product data
 * @param products - Array of products
 * @param searchTerm - Current search term
 * @param maxSuggestions - Maximum number of suggestions to return
 * @returns Array of search suggestions
 */
export function getSearchSuggestions(
  products: Product[],
  searchTerm: string,
  maxSuggestions: number = 5
): string[] {
  if (!searchTerm.trim() || searchTerm.length < 2) {
    return [];
  }

  const suggestions = new Set<string>();
  const normalizedSearchTerm = searchTerm.toLowerCase();

  for (const product of products) {
    // Add product name suggestions
    if (product.name.toLowerCase().includes(normalizedSearchTerm)) {
      suggestions.add(product.name);
    }

    // Add brand suggestions
    if (product.brand && product.brand.toLowerCase().includes(normalizedSearchTerm)) {
      suggestions.add(product.brand);
    }

    // Add category suggestions
    product.categories.forEach(category => {
      if (category.toLowerCase().includes(normalizedSearchTerm)) {
        suggestions.add(category);
      }
    });

    // Break if we have enough suggestions
    if (suggestions.size >= maxSuggestions) {
      break;
    }
  }

  return Array.from(suggestions).slice(0, maxSuggestions);
}

/**
 * Highlight search terms in text
 * @param text - Text to highlight
 * @param searchTerm - Search term to highlight
 * @param className - CSS class for highlighted text
 * @returns HTML string with highlighted search terms
 */
export function highlightSearchTerms(
  text: string,
  searchTerm: string,
  className: string = 'search-highlight'
): string {
  if (!searchTerm.trim()) {
    return text;
  }

  const keywords = extractKeywords(searchTerm.toLowerCase());
  let highlightedText = text;

  keywords.forEach(keyword => {
    const regex = new RegExp(`(${keyword})`, 'gi');
    highlightedText = highlightedText.replace(regex, `<span class="${className}">$1</span>`);
  });

  return highlightedText;
}

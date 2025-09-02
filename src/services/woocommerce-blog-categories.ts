interface WooCommerceBlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  image?: {
    src: string;
    alt: string;
  };
  parent?: number;
  children?: WooCommerceBlogCategory[];
}

interface WooCommerceResponse {
  data: WooCommerceBlogCategory[];
  total: number;
  totalPages: number;
}

class WooCommerceBlogCategoriesService {
  private baseUrl: string;
  private consumerKey: string;
  private consumerSecret: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_WOOCOMMERCE_URL || '';
    this.consumerKey = import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY || '';
    this.consumerSecret = import.meta.env.VITE_WOOCOMMERCE_CONSUMER_SECRET || '';
  }

  private getAuthHeader(): string {
    const credentials = btoa(`${this.consumerKey}:${this.consumerSecret}`);
    return `Basic ${credentials}`;
  }

  async fetchBlogCategories(): Promise<WooCommerceBlogCategory[]> {
    try {
      // Fetch all blog categories from WordPress (including empty ones)
      const url = `${this.baseUrl}/wp-json/wp/v2/categories?per_page=100`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WooCommerceBlogCategory[] = await response.json();
      
      // Sort by name and return all categories (including empty ones)
      return data.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching blog categories from WordPress:', error);
      return [];
    }
  }

  async fetchBlogCategoriesWithFallback(): Promise<WooCommerceBlogCategory[]> {
    try {
      const categories = await this.fetchBlogCategories();
      
      // If no categories found, return fallback categories
      if (categories.length === 0) {
        return [
          { id: 1, name: 'Nutrition', slug: 'nutrition', count: 1 },
          { id: 2, name: 'Workouts', slug: 'workouts', count: 1 },
          { id: 3, name: 'Supplements', slug: 'supplements', count: 1 },
          { id: 4, name: 'Fitness Tips', slug: 'fitness-tips', count: 1 },
          { id: 5, name: 'Weight Loss', slug: 'weight-loss', count: 1 },
          { id: 6, name: 'Muscle Building', slug: 'muscle-building', count: 1 },
          { id: 7, name: 'Health & Wellness', slug: 'health-wellness', count: 1 },
          { id: 8, name: 'Recipes', slug: 'recipes', count: 1 },
          { id: 9, name: 'Product Reviews', slug: 'product-reviews', count: 1 },
        ];
      }
      
      return categories;
    } catch (error) {
      console.error('Error in fetchBlogCategoriesWithFallback:', error);
      // Return fallback categories on error
      return [
        { id: 1, name: 'Nutrition', slug: 'nutrition', count: 1 },
        { id: 2, name: 'Workouts', slug: 'workouts', count: 1 },
        { id: 3, name: 'Supplements', slug: 'supplements', count: 1 },
        { id: 4, name: 'Fitness Tips', slug: 'fitness-tips', count: 1 },
        { id: 5, name: 'Weight Loss', slug: 'weight-loss', count: 1 },
        { id: 6, name: 'Muscle Building', slug: 'muscle-building', count: 1 },
        { id: 7, name: 'Health & Wellness', slug: 'health-wellness', count: 1 },
        { id: 8, name: 'Recipes', slug: 'recipes', count: 1 },
        { id: 9, name: 'Product Reviews', slug: 'product-reviews', count: 1 },
      ];
    }
  }
}

export const woocommerceBlogCategoriesService = new WooCommerceBlogCategoriesService();
export type { WooCommerceBlogCategory };

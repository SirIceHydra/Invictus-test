interface WooCommerceCategory {
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
  children?: WooCommerceCategory[];
}

interface WooCommerceResponse {
  data: WooCommerceCategory[];
  total: number;
  totalPages: number;
}

class WooCommerceCategoriesService {
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

  async fetchCategories(): Promise<WooCommerceCategory[]> {
    try {
      const url = `${this.baseUrl}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WooCommerceCategory[] = await response.json();
      
      // Filter out categories with count 0 (no products) and sort by name
      return data
        .filter(category => category.count && category.count > 0)
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      return [];
    }
  }

  async fetchCategoriesWithFallback(): Promise<WooCommerceCategory[]> {
    try {
      const categories = await this.fetchCategories();
      
      // If no categories found, return fallback categories
      if (categories.length === 0) {
        return [
          { id: 1, name: 'Protein', slug: 'protein', count: 1 },
          { id: 2, name: 'Mass Gainer', slug: 'mass-gainer', count: 1 },
          { id: 3, name: 'Pre-workout', slug: 'pre-workout', count: 1 },
          { id: 4, name: 'Creatine', slug: 'creatine', count: 1 },
          { id: 5, name: 'BCAA\'s', slug: 'bcaa', count: 1 },
          { id: 6, name: 'Fat Burners', slug: 'fat-burners', count: 1 },
          { id: 7, name: 'Vitality', slug: 'vitality', count: 1 },
        ];
      }
      
      return categories;
    } catch (error) {
      // Return fallback categories on error
      return [
        { id: 1, name: 'Protein', slug: 'protein', count: 1 },
        { id: 2, name: 'Mass Gainer', slug: 'mass-gainer', count: 1 },
        { id: 3, name: 'Pre-workout', slug: 'pre-workout', count: 1 },
        { id: 4, name: 'Creatine', slug: 'creatine', count: 1 },
        { id: 5, name: 'BCAA\'s', slug: 'bcaa', count: 1 },
        { id: 6, name: 'Fat Burners', slug: 'fat-burners', count: 1 },
        { id: 7, name: 'Vitality', slug: 'vitality', count: 1 },
      ];
    }
  }
}

export const woocommerceCategoriesService = new WooCommerceCategoriesService();
export type { WooCommerceCategory };

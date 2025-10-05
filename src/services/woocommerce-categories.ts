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

  constructor() {
    this.baseUrl = import.meta.env.VITE_WORDPRESS_URL || '';
  }

  async fetchCategories(): Promise<WooCommerceCategory[]> {
    try {
      // Call WordPress secure endpoint
      const url = `${this.baseUrl}/wp-json/invictus/v1/products/categories?per_page=100&hide_empty=true`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': 'invictus-react-2024',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return [];
      }

      const result = await response.json();
      
      // WordPress endpoint returns { success: true, data: [...], total: N }
      if (result.success && result.data) {
        return result.data
          .filter((category: WooCommerceCategory) => category.count && category.count > 0)
          .sort((a: WooCommerceCategory, b: WooCommerceCategory) => a.name.localeCompare(b.name));
      }
      
      return [];
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

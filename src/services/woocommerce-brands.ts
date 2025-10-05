interface WooCommerceBrand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  image?: {
    src: string;
    alt: string;
  };
}

interface WooCommerceResponse {
  data: WooCommerceBrand[];
  total: number;
  totalPages: number;
}

class WooCommerceBrandsService {
  private baseUrl: string;
  private consumerKey: string;
  private consumerSecret: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_WORDPRESS_URL || '';
    this.consumerKey = ''; // No longer needed
    this.consumerSecret = ''; // No longer needed
  }

  private getAuthHeader(): string {
    // No longer needed - using WordPress API key instead
    return '';
  }

  async fetchBrands(): Promise<WooCommerceBrand[]> {
    try {
      // Call WordPress secure endpoint
      const brandsUrl = `${this.baseUrl}/wp-json/invictus/v1/products/brands?per_page=100`;
      
      const response = await fetch(brandsUrl, {
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
        return result.data.sort((a: WooCommerceBrand, b: WooCommerceBrand) => a.name.localeCompare(b.name));
      }
      
      return [];
    } catch (error) {
      return [];
    }
  }

  async fetchBrandsWithFallback(): Promise<WooCommerceBrand[]> {
    try { // eslint-disable-line no-unused-vars
      const brands = await this.fetchBrands();
      
      // If no brands found, return empty array
      if (brands.length === 0) {
        return [];
      }
      return brands;
    } catch (error) {
      // Return empty array on error
      return [];
    }
  }
}

export const woocommerceBrandsService = new WooCommerceBrandsService();
export type { WooCommerceBrand };

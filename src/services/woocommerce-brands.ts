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
    this.baseUrl = import.meta.env.VITE_WOOCOMMERCE_URL || '';
    this.consumerKey = import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY || '';
    this.consumerSecret = import.meta.env.VITE_WOOCOMMERCE_CONSUMER_SECRET || '';
  }

  private getAuthHeader(): string {
    const credentials = btoa(`${this.consumerKey}:${this.consumerSecret}`);
    return `Basic ${credentials}`;
  }

  async fetchBrands(): Promise<WooCommerceBrand[]> {
    try { // eslint-disable-line no-unused-vars
      
      // Try to fetch brands from the product_brand taxonomy
      const brandsUrl = `${this.baseUrl}/wp-json/wc/v3/products/brands?per_page=100`;
      
      const response = await fetch(brandsUrl, {
        method: 'GET',
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: WooCommerceBrand[] = await response.json();
        
        // Don't filter by count for now - return all brands
        const filteredBrands = data
          .sort((a, b) => a.name.localeCompare(b.name));
        return filteredBrands;
      }
      
      
      // Try alternative endpoints for brands
      const alternativeEndpoints = [
        `${this.baseUrl}/wp-json/wc/v3/products/brand?per_page=100`,
        `${this.baseUrl}/wp-json/wc/v3/products/attributes/3/terms?per_page=100`,
        `${this.baseUrl}/wp-json/wp/v2/product_brand?per_page=100`
      ];
      
      for (const endpoint of alternativeEndpoints) {
        try {
          const altResponse = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Authorization': this.getAuthHeader(),
              'Content-Type': 'application/json',
            },
          });
          
          if (altResponse.ok) {
            const data: WooCommerceBrand[] = await altResponse.json();
            
            const filteredBrands = data
              .filter(brand => brand.count && brand.count > 0)
              .sort((a, b) => a.name.localeCompare(b.name));
            
            return filteredBrands;
          }
        } catch (error) {
        }
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching brands from WooCommerce:', error);
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
      console.error('Error in fetchBrandsWithFallback:', error);
      // Return empty array on error
      return [];
    }
  }
}

export const woocommerceBrandsService = new WooCommerceBrandsService();
export type { WooCommerceBrand };

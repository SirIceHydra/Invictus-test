import { ShopDataProvider, ProductQuery } from '../../core/ports';
import { getProducts, getProduct, getCategories as wcGetCategories, createOrder } from '../../../services/woocommerce';

export const WooCommerceDataProvider: ShopDataProvider = {
  async getProducts(query?: ProductQuery) {
    // Map orderBy values to WooCommerce API parameters
    let orderby = query?.orderBy;
    let perPage = query?.perPage;
    
    // For popularity sorting, we need to fetch more products and sort client-side
    if (orderby === 'popularity') {
      orderby = 'date'; // Use date as base sorting
      perPage = Math.max(perPage || 12, 20); // Fetch more products for better sorting
    }
    
    const resp = await getProducts({
      page: query?.page,
      per_page: perPage,
      category: query?.categoryId?.toString(),
      search: query?.search,
      orderby: orderby,
      order: query?.order,
      featured: query?.featured,
    });
    
    // If popularity sorting was requested, sort by a popularity indicator
    if (query?.orderBy === 'popularity') {
      // Sort by onSale status first (popular products are often on sale), then by price
      resp.data.sort((a, b) => {
        // On-sale products first
        if (a.onSale && !b.onSale) return -1;
        if (!a.onSale && b.onSale) return 1;
        
        // Then by price (lower price first, as popular products are often affordable)
        return a.price - b.price;
      });
      
      // Limit to the original requested perPage
      if (query?.perPage && resp.data.length > query.perPage) {
        resp.data = resp.data.slice(0, query.perPage);
      }
    }
    
    // If price sorting was requested, sort by price numerically
    if (query?.orderBy === 'price') {
      console.log('🔍 Price sorting requested:', query?.order);
      console.log('📊 Products before sorting:', resp.data.map(p => ({ name: p.name, price: p.price, type: typeof p.price })));
      
      resp.data.sort((a, b) => {
        const priceA = parseFloat(a.price.toString());
        const priceB = parseFloat(b.price.toString());
        
        console.log(`🔄 Comparing: ${a.name} (${priceA}) vs ${b.name} (${priceB})`);
        
        if (query?.order === 'asc') {
          return priceA - priceB; // Low to High
        } else {
          return priceB - priceA; // High to Low
        }
      });
      
      console.log('📊 Products after sorting:', resp.data.map(p => ({ name: p.name, price: p.price })));
      
      // Limit to the original requested perPage
      if (query?.perPage && resp.data.length > query.perPage) {
        resp.data = resp.data.slice(0, query.perPage);
      }
    }
    
    // Additional case: If orderBy is not 'price' but the user has selected price-related ordering
    // This handles cases where the UI might not be setting orderBy correctly
    if (query?.orderBy !== 'price' && (query?.order === 'asc' || query?.order === 'desc') && resp.data.length > 0) {
      console.log('🔍 Detected price sorting intent from order parameter, applying price sorting');
      
      resp.data.sort((a, b) => {
        const priceA = parseFloat(a.price.toString());
        const priceB = parseFloat(b.price.toString());
        
        if (query?.order === 'asc') {
          return priceA - priceB; // Low to High
        } else {
          return priceB - priceA; // High to Low
        }
      });
    }
    
    return resp;
  },
  async getProduct(id: number) {
    return getProduct(id);
  },
  async getCategories() {
    const cats = await wcGetCategories({ hide_empty: true });
    return cats.map((c: any) => ({ id: c.id, name: c.name }));
  },
  async createOrder(payload: any) {
    return createOrder(payload);
  },
};



import { Product } from '../../types/product';

export interface ProductQuery {
  page?: number;
  perPage?: number;
  categoryId?: number;
  search?: string;
  orderBy?: 'date' | 'price' | 'name' | 'popularity';
  order?: 'asc' | 'desc';
  featured?: boolean;
}

export interface ShopDataProvider {
  getProducts(query?: ProductQuery): Promise<{ data: Product[]; total: number; totalPages: number; currentPage: number } >;
  getProduct(id: number): Promise<Product>;
  getCategories(params?: { hideEmpty?: boolean }): Promise<Array<{ id: number; name: string }>>;
  createOrder(payload: any): Promise<{ success: boolean; orderId?: number; orderNumber?: string; error?: string }>;
}

export interface PaymentStartRequest {
  orderId: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  amount: number;
  itemName: string;
  itemDescription?: string;
}

export interface PaymentStartResult {
  method: 'form-post' | 'redirect-url';
  url: string;
  fields?: Record<string, string>;
}

export interface PaymentProvider {
  startPayment(req: PaymentStartRequest): Promise<PaymentStartResult>;
}



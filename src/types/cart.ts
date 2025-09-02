// TypeScript interfaces for cart and order management
// These handle the shopping cart state and order creation

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stockQuantity?: number;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CartUpdate {
  productId: number;
  quantity: number;
}

// WooCommerce order creation interfaces
export interface WooCommerceOrder {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: WooCommerceAddress;
  shipping: WooCommerceAddress;
  line_items: WooCommerceLineItem[];
  shipping_lines: WooCommerceShippingLine[];
  fee_lines: WooCommerceFeeLine[];
  coupon_lines: WooCommerceCouponLine[];
  meta_data: WooCommerceMetaData[];
  customer_note: string;
  status: string;
}

export interface WooCommerceAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface WooCommerceLineItem {
  product_id: number;
  quantity: number;
  variation_id?: number;
  meta_data?: WooCommerceMetaData[];
}

export interface WooCommerceShippingLine {
  method_id: string;
  method_title: string;
  total: string;
}

export interface WooCommerceFeeLine {
  name: string;
  amount: string;
  tax_status: string;
}

export interface WooCommerceCouponLine {
  code: string;
  amount: string;
}

export interface WooCommerceMetaData {
  key: string;
  value: any;
}

// PayFast integration interfaces
export interface PayFastPaymentData {
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first: string;
  name_last: string;
  email_address: string;
  cell_number?: string;
  amount: string;
  item_name: string;
  item_description?: string;
  custom_str1?: string;
  custom_str2?: string;
  custom_str3?: string;
  custom_str4?: string;
  custom_str5?: string;
  custom_int1?: string;
  custom_int2?: string;
  custom_int3?: string;
  custom_int4?: string;
  custom_int5?: string;
  email_confirmation: string;
  confirmation_address: string;
  payment_method: string;
}

export interface PayFastResponse {
  success: boolean;
  error?: string;
  paymentId?: string;
  redirectUrl?: string;
  message?: string;
}

// Checkout form interfaces
export interface CheckoutForm {
  billing: {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  orderNotes: string;
  paymentMethod: 'payfast';
} 
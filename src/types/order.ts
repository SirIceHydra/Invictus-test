// TypeScript interfaces for order management and status tracking
// These handle order creation, status updates, and payment processing

export interface Order {
  id: number;
  number: string;
  status: OrderStatus;
  dateCreated: string;
  dateModified: string;
  total: number;
  subtotal: number;
  totalTax: number;
  shippingTotal: number;
  currency: string;
  paymentMethod: string;
  paymentMethodTitle: string;
  setPaid: boolean;
  billing: Address;
  shipping: Address;
  lineItems: OrderLineItem[];
  shippingLines: ShippingLine[];
  feeLines: FeeLine[];
  couponLines: CouponLine[];
  metaData: MetaData[];
  customerNote: string;
  payfastPaymentId?: string;
  customerId?: number;
  transactionId?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'on-hold'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed'
  | 'trash';

export interface Address {
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
}

export interface OrderLineItem {
  id: number;
  name: string;
  productId: number;
  variationId?: number;
  quantity: number;
  taxClass: string;
  subtotal: number;
  subtotalTax: number;
  total: number;
  totalTax: number;
  taxes: Tax[];
  metaData: MetaData[];
  sku: string;
  price: number;
}

export interface ShippingLine {
  id: number;
  methodTitle: string;
  methodId: string;
  total: number;
  totalTax: number;
  taxes: Tax[];
  metaData: MetaData[];
}

export interface FeeLine {
  id: number;
  name: string;
  taxClass: string;
  taxStatus: string;
  total: number;
  totalTax: number;
  taxes: Tax[];
  metaData: MetaData[];
}

export interface CouponLine {
  id: number;
  code: string;
  discount: number;
  discountTax: number;
  metaData: MetaData[];
}

export interface Tax {
  total: number;
  subtotal: number;
}

export interface MetaData {
  id: number;
  key: string;
  value: any;
}

// PayFast payment status tracking
export interface PayFastPaymentStatus {
  payment_status: 'COMPLETE' | 'PENDING' | 'FAILED' | 'CANCELLED';
  pf_payment_id: string;
  merchant_id: string;
  amount_gross: string;
  amount_fee: string;
  amount_net: string;
  name_first: string;
  name_last: string;
  email_address: string;
  item_name: string;
  item_description?: string;
  custom_str1?: string; // Order ID
  custom_str2?: string;
  custom_str3?: string;
  custom_str4?: string;
  custom_str5?: string;
  custom_int1?: string;
  custom_int2?: string;
  custom_int3?: string;
  custom_int4?: string;
  custom_int5?: string;
  signature: string;
}

// Order creation response
export interface OrderCreationResponse {
  success: boolean;
  orderId?: number;
  orderNumber?: string;
  paymentUrl?: string;
  error?: string;
}

// Order status update
export interface OrderStatusUpdate {
  orderId: number;
  status: OrderStatus;
  note?: string;
}

// Payment processing result
export interface PaymentResult {
  success: boolean;
  orderId?: number;
  paymentId?: string;
  redirectUrl?: string;
  error?: string;
  message?: string;
}

// WooCommerce API specific types
export interface WooCommerceOrder {
  id: number;
  number: string;
  status: string;
  date_created: string;
  date_modified: string;
  total: string;
  subtotal: string;
  total_tax: string;
  shipping_total: string;
  currency: string;
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  customer_id: number;
  billing: WooCommerceAddress;
  shipping: WooCommerceAddress;
  line_items: WooCommerceLineItem[];
  shipping_lines: WooCommerceShippingLine[];
  fee_lines: any[];
  coupon_lines: any[];
  meta_data: any[];
  customer_note: string;
  transaction_id?: string;
}

export interface WooCommerceAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state?: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface WooCommerceLineItem {
  product_id: number;
  quantity: number;
  name: string;
  price: string;
  total?: string;
  meta_data?: any[];
}

export interface WooCommerceShippingLine {
  method_id: string;
  method_title: string;
  total: string;
} 
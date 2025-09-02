// TypeScript interfaces for WooCommerce product data
// These match the WooCommerce REST API v3 response structure

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_to: string | null;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: WooCommerceDownload[];
  download_limit: number;
  download_expiry: number;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: WooCommerceDimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: WooCommerceCategory[];
  tags: WooCommerceTag[];
  images: WooCommerceImage[];
  attributes: WooCommerceAttribute[];
  default_attributes: WooCommerceDefaultAttribute[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  meta_data: WooCommerceMetaData[];
  _links: WooCommerceLinks;
}

export interface WooCommerceDownload {
  id: number;
  name: string;
  file: string;
}

export interface WooCommerceDimensions {
  length: string;
  width: string;
  height: string;
}

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooCommerceTag {
  id: number;
  name: string;
  slug: string;
}

export interface WooCommerceImage {
  id: number;
  date_created: string;
  date_modified: string;
  src: string;
  name: string;
  alt: string;
}

export interface WooCommerceAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooCommerceDefaultAttribute {
  id: number;
  name: string;
  option: string;
}

export interface WooCommerceMetaData {
  id: number;
  key: string;
  value: any;
}

export interface WooCommerceLinks {
  self: WooCommerceLink[];
  collection: WooCommerceLink[];
}

export interface WooCommerceLink {
  href: string;
}

// Simplified product interface for React components
export interface Product {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  regularPrice: number;
  salePrice?: number;
  onSale: boolean;
  images: string[];
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  stockQuantity?: number;
  categories: string[];
  brand?: string;
  slug: string;
  permalink: string;
}

// API response wrapper
export interface WooCommerceResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
} 
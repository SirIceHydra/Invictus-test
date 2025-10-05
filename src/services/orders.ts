import { apiPost, apiGet, apiPut } from './api';
import { WooCommerceOrder, Order, OrderStatus } from '../types/order';
import { CartItem } from '../types/cart';
import { CheckoutForm } from '../types/checkout';
import { ShippingOption } from '../shipping/types/shipping';
import { WOOCOMMERCE_CONFIG, ERROR_MESSAGES } from '../utils/constants';

const API_ENDPOINTS = {
  ORDERS: '/orders/create',
  ORDER: (id: number) => `/orders/${id}`,
} as const;

/**
 * Create a new order in WooCommerce
 */
export async function createOrder(
  cartItems: CartItem[],
  customerData: CheckoutForm,
  shippingOption?: ShippingOption
): Promise<Order> {
  try {
    
    // Transform cart items to WooCommerce line items
    const lineItems = cartItems.map(item => ({
      product_id: item.productId,
      quantity: item.quantity,
      name: item.name,
      price: item.price.toString(),
    }));

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = shippingOption ? shippingOption.price : 0;
    const total = subtotal + shippingCost;

    // Prepare order data
    const orderData: WooCommerceOrder = {
      payment_method: 'payfast',
      payment_method_title: 'PayFast',
      set_paid: false, // Will be set to true after payment confirmation
      billing: {
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone,
        address_1: customerData.address,
        city: customerData.city,
        state: customerData.province,
        postcode: customerData.postalCode,
        country: customerData.country,
      },
      shipping: {
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        address_1: customerData.address,
        city: customerData.city,
        state: customerData.province,
        postcode: customerData.postalCode,
        country: customerData.country,
      },
      line_items: lineItems,
      shipping_lines: shippingOption ? [
        {
          method_id: shippingOption.id,
          method_title: shippingOption.name,
          total: shippingOption.price.toFixed(2),
        },
      ] : [
        {
          method_id: 'free_shipping',
          method_title: 'Free Shipping',
          total: '0.00',
        },
      ],
      total: total.toString(),
      status: 'pending',
      customer_note: 'Order placed via React frontend',
    };

    const response = await apiPost<any>(API_ENDPOINTS.ORDERS, orderData);
    
    // Check if WordPress returned the expected format
    if (!response.success) {
      throw new Error(response.error || 'Order creation failed on WordPress');
    }

    // WordPress returns { success: true, order_id: N, order_number: "123" }
    // Create a minimal Order object with the data we have
    const order: Order = {
      id: response.order_id,
      number: response.order_number,
      status: 'pending' as OrderStatus,
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      total,
      subtotal,
      totalTax: 0,
      shippingTotal: shippingCost,
      currency: 'ZAR',
      paymentMethod: 'payfast',
      paymentMethodTitle: 'PayFast',
      setPaid: false,
      billing: {
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        company: '',
        address1: customerData.address,
        address2: '',
        city: customerData.city,
        state: customerData.province,
        postcode: customerData.postalCode,
        country: customerData.country,
        email: customerData.email,
        phone: customerData.phone,
      },
      shipping: {
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        company: '',
        address1: customerData.address,
        address2: '',
        city: customerData.city,
        state: customerData.province,
        postcode: customerData.postalCode,
        country: customerData.country,
        email: '',
        phone: '',
      },
      lineItems: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        productId: item.productId,
        quantity: item.quantity,
        taxClass: '',
        subtotal: item.price * item.quantity,
        subtotalTax: 0,
        total: item.price * item.quantity,
        totalTax: 0,
        taxes: [],
        metaData: [],
        sku: '',
        price: item.price,
      })),
      shippingLines: shippingOption ? [{
        id: 0,
        methodTitle: shippingOption.name,
        methodId: shippingOption.id,
        total: shippingOption.price,
        totalTax: 0,
        taxes: [],
        metaData: [],
      }] : [],
      feeLines: [],
      couponLines: [],
      metaData: [],
      customerNote: 'Order placed via React frontend',
      customerId: 0,
      transactionId: '',
    };

    return order;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ORDER_CREATION_FAILED);
  }
}

/**
 * Get order by ID
 */
export async function getOrder(orderId: number): Promise<Order> {
  try {
    const response = await apiGet<WooCommerceOrder>(API_ENDPOINTS.ORDER(orderId));
    
    const order: Order = {
      id: response.id,
      number: response.number,
      status: response.status as OrderStatus,
      dateCreated: response.date_created,
      dateModified: response.date_modified,
      total: parseFloat(response.total),
      subtotal: parseFloat(response.subtotal),
      totalTax: parseFloat(response.total_tax),
      shippingTotal: parseFloat(response.shipping_total),
      currency: response.currency,
      paymentMethod: response.payment_method,
      paymentMethodTitle: response.payment_method_title,
      setPaid: response.set_paid,
      billing: {
        firstName: response.billing.first_name,
        lastName: response.billing.last_name,
        company: response.billing.company || '',
        address1: response.billing.address_1,
        address2: response.billing.address_2 || '',
        city: response.billing.city,
        state: response.billing.state || '',
        postcode: response.billing.postcode,
        country: response.billing.country,
        email: response.billing.email || '',
        phone: response.billing.phone || '',
      },
      shipping: {
        firstName: response.shipping.first_name,
        lastName: response.shipping.last_name,
        company: response.shipping.company || '',
        address1: response.shipping.address_1,
        address2: response.shipping.address_2 || '',
        city: response.shipping.city,
        state: response.shipping.state || '',
        postcode: response.shipping.postcode,
        country: response.shipping.country,
        email: response.shipping.email || '',
        phone: response.shipping.phone || '',
      },
      lineItems: response.line_items.map(item => ({
        id: item.product_id,
        name: item.name,
        productId: item.product_id,
        quantity: item.quantity,
        taxClass: '',
        subtotal: parseFloat(item.total || '0'),
        subtotalTax: 0,
        total: parseFloat(item.total || '0'),
        totalTax: 0,
        taxes: [],
        metaData: item.meta_data || [],
        sku: '',
        price: parseFloat(item.price),
      })),
      shippingLines: response.shipping_lines.map(line => ({
        id: 0,
        methodTitle: line.method_title,
        methodId: line.method_id,
        total: parseFloat(line.total),
        totalTax: 0,
        taxes: [],
        metaData: [],
      })),
      feeLines: response.fee_lines || [],
      couponLines: response.coupon_lines || [],
      metaData: response.meta_data || [],
      customerNote: response.customer_note,
      customerId: response.customer_id,
      transactionId: response.transaction_id,
    };

    return order;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ORDER_FETCH_FAILED);
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {
  try {
    const response = await apiPut<WooCommerceOrder>(API_ENDPOINTS.ORDER(orderId), {
      status,
    });

    const order: Order = {
      id: response.id,
      number: response.number,
      status: response.status as OrderStatus,
      total: parseFloat(response.total),
      currency: response.currency,
      customerId: response.customer_id,
      billing: response.billing,
      shipping: response.shipping,
      lineItems: response.line_items,
      dateCreated: response.date_created,
      dateModified: response.date_modified,
      paymentMethod: response.payment_method,
      paymentMethodTitle: response.payment_method_title,
      transactionId: response.transaction_id,
    };

    return order;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ORDER_UPDATE_FAILED);
  }
}

/**
 * Get customer orders
 */
export async function getCustomerOrders(customerId: number): Promise<Order[]> {
  try {
    const response = await apiGet<WooCommerceOrder[]>(API_ENDPOINTS.ORDERS, {
      customer: customerId,
      per_page: 50,
    });

    return response.map(order => ({
      id: order.id,
      number: order.number,
      status: order.status as OrderStatus,
      dateCreated: order.date_created,
      dateModified: order.date_modified,
      total: parseFloat(order.total),
      subtotal: parseFloat(order.subtotal),
      totalTax: parseFloat(order.total_tax),
      shippingTotal: parseFloat(order.shipping_total),
      currency: order.currency,
      paymentMethod: order.payment_method,
      paymentMethodTitle: order.payment_method_title,
      setPaid: order.set_paid,
      billing: {
        firstName: order.billing.first_name,
        lastName: order.billing.last_name,
        company: order.billing.company || '',
        address1: order.billing.address_1,
        address2: order.billing.address_2 || '',
        city: order.billing.city,
        state: order.billing.state || '',
        postcode: order.billing.postcode,
        country: order.billing.country,
        email: order.billing.email || '',
        phone: order.billing.phone || '',
      },
      shipping: {
        firstName: order.shipping.first_name,
        lastName: order.shipping.last_name,
        company: order.shipping.company || '',
        address1: order.shipping.address_1,
        address2: order.shipping.address_2 || '',
        city: order.shipping.city,
        state: order.shipping.state || '',
        postcode: order.shipping.postcode,
        country: order.shipping.country,
        email: order.shipping.email || '',
        phone: order.shipping.phone || '',
      },
      lineItems: order.line_items.map(item => ({
        id: item.product_id,
        name: item.name,
        productId: item.product_id,
        quantity: item.quantity,
        taxClass: '',
        subtotal: parseFloat(item.total || '0'),
        subtotalTax: 0,
        total: parseFloat(item.total || '0'),
        totalTax: 0,
        taxes: [],
        metaData: item.meta_data || [],
        sku: '',
        price: parseFloat(item.price),
      })),
      shippingLines: order.shipping_lines.map(line => ({
        id: 0,
        methodTitle: line.method_title,
        methodId: line.method_id,
        total: parseFloat(line.total),
        totalTax: 0,
        taxes: [],
        metaData: [],
      })),
      feeLines: order.fee_lines || [],
      couponLines: order.coupon_lines || [],
      metaData: order.meta_data || [],
      customerNote: order.customer_note,
      customerId: order.customer_id,
      transactionId: order.transaction_id,
    }));
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ORDERS_FETCH_FAILED);
  }
} 
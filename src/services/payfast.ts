// PayFast service for payment processing and integration
// This handles PayFast payment gateway integration with WooCommerce

import { PayFastPaymentData, PayFastResponse, PayFastPaymentStatus } from '../types/cart';
import { PAYFAST_CONFIG, API_ENDPOINTS, DEFAULTS, WOOCOMMERCE_CONFIG } from '../utils/constants';
import { generatePayFastSignature } from '../utils/helpers';

/**
 * Generate PayFast payment data for order
 * @param orderData - Order information
 * @returns PayFast payment data object
 */
export function generatePayFastPaymentData(orderData: {
  orderId: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  amount: number;
  itemName: string;
  itemDescription?: string;
}): PayFastPaymentData {
  // Split customer name properly
  const nameParts = orderData.customerName.trim().split(' ');
  const firstName = nameParts[0] || 'Customer';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  // Create payment data (no more secrets needed!)
  const paymentData: PayFastPaymentData = {};
  
  // Add fields (no merchant credentials needed - handled by WordPress)
  paymentData.return_url = PAYFAST_CONFIG.RETURN_URL;
  paymentData.cancel_url = PAYFAST_CONFIG.CANCEL_URL;
  paymentData.notify_url = PAYFAST_CONFIG.NOTIFY_URL;
  
  paymentData.name_first = firstName;
  paymentData.name_last = lastName;
  paymentData.email_address = orderData.customerEmail;
  
  // Only add cell_number if provided
  if (orderData.customerPhone && orderData.customerPhone.trim()) {
    paymentData.cell_number = orderData.customerPhone.trim();
  }
  
  paymentData.amount = orderData.amount.toFixed(2);
  paymentData.item_name = orderData.itemName;
  paymentData.item_description = orderData.itemDescription || orderData.itemName;
  
  paymentData.custom_str1 = orderData.orderId.toString();
  paymentData.custom_str2 = orderData.orderNumber;
  paymentData.custom_str3 = 'Invictus Nutrition';
  
  paymentData.email_confirmation = '1';
  paymentData.confirmation_address = orderData.customerEmail;
  paymentData.payment_method = 'eft';
  
  
  return paymentData;
}

/**
 * Generate PayFast payment form data
 * NOTE: Signature generation now handled by WordPress backend
 * @param paymentData - PayFast payment data
 * @returns Form data (signature will be added by WordPress)
 */
export function generatePayFastFormData(paymentData: PayFastPaymentData): PayFastPaymentData {
  // Return payment data without signature - WordPress will add it
  return paymentData;
}

/**
 * Create PayFast payment form and submit
 * @param paymentData - PayFast payment data
 * @returns Promise with payment response
 */
export async function submitPayFastPayment(paymentData: PayFastPaymentData): Promise<PayFastResponse> {
  try {
    // Call WordPress endpoint to generate PayFast payment data
    const response = await fetch(`${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/invictus/v1/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'invictus-react-2024',
      },
      body: JSON.stringify({
        customer_name: paymentData.name_first + ' ' + (paymentData.name_last || ''),
        customer_email: paymentData.email_address,
        amount: paymentData.amount,
        item_name: paymentData.item_name,
        order_id: paymentData.custom_str1,
        return_url: paymentData.return_url,
        cancel_url: paymentData.cancel_url,
      }),
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to create payment');
    }

    // Create form element with server-generated payment data
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = result.payment_url;
    form.style.display = 'none';
    
    // Add form fields from WordPress response
    Object.entries(result.form_data).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });
    
    // Add form to document and submit
    document.body.appendChild(form);
    form.submit();
    
    // Remove form from document
    document.body.removeChild(form);
    
    return {
      success: true,
      message: 'Payment form submitted successfully',
      redirectUrl: result.payment_url,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit payment',
    };
  }
}

/**
 * Validate PayFast payment response
 * NOTE: Signature validation should be done on WordPress backend
 * @param responseData - Response data from PayFast
 * @returns Boolean indicating if response has required fields
 */
export function validatePayFastResponse(responseData: Record<string, string>): boolean {
  try {
    // Basic validation - check for required fields
    return !!(
      responseData.payment_status &&
      responseData.amount_gross &&
      responseData.email_address
    );
  } catch (error) {
    return false;
  }
}

/**
 * Process PayFast payment status update
 * @param statusData - Payment status data from PayFast
 * @returns Processed payment status
 */
export function processPayFastPaymentStatus(statusData: PayFastPaymentStatus): {
  isValid: boolean;
  orderId?: number;
  paymentStatus: string;
  amount: number;
  customerEmail: string;
  error?: string;
} {
  try {
    // Validate the response
    if (!validatePayFastResponse(statusData)) {
      return {
        isValid: false,
        error: 'Invalid PayFast response signature',
      };
    }
    
    // Extract order ID from custom field
    const orderId = statusData.custom_str1 ? parseInt(statusData.custom_str1, 10) : undefined;
    
    return {
      isValid: true,
      orderId,
      paymentStatus: statusData.payment_status,
      amount: parseFloat(statusData.amount_gross),
      customerEmail: statusData.email_address,
    };
  } catch (error) {
    return {
      isValid: false,
      error: 'Failed to process payment status',
    };
  }
}

/**
 * Create PayFast payment URL for direct access
 * NOTE: This function is deprecated - use WordPress endpoint instead
 * @param paymentData - PayFast payment data
 * @returns Complete PayFast payment URL
 */
export function createPayFastPaymentUrl(paymentData: PayFastPaymentData): string {
  const params = new URLSearchParams();
  
  Object.entries(paymentData).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });
  
  return `${API_ENDPOINTS.PAYFAST_PROCESS}?${params.toString()}`;
}

/**
 * Handle PayFast success response
 * @param responseData - Response data from PayFast
 * @returns Processed success response
 */
export async function handlePayFastSuccess(responseData: Record<string, string>): Promise<{
  success: boolean;
  orderId?: number;
  message: string;
}> {
  try {
    // Validate the response
    if (!validatePayFastResponse(responseData)) {
      return {
        success: false,
        message: 'Invalid PayFast response',
      };
    }
    
    // Extract order ID
    const orderId = responseData.custom_str1 ? parseInt(responseData.custom_str1, 10) : undefined;
    
    return {
      success: true,
      orderId,
      message: 'Payment completed successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to process payment success',
    };
  }
}

/**
 * Handle PayFast failure response
 * @param responseData - Response data from PayFast
 * @returns Processed failure response
 */
export async function handlePayFastFailure(responseData: Record<string, string>): Promise<{
  success: boolean;
  orderId?: number;
  message: string;
}> {
  try {
    // Extract order ID even for failed payments
    const orderId = responseData.custom_str1 ? parseInt(responseData.custom_str1, 10) : undefined;
    
    return {
      success: false,
      orderId,
      message: 'Payment failed or was cancelled',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to process payment failure',
    };
  }
}

/**
 * Get PayFast test credentials for development
 * @returns Test merchant credentials
 */
export function getPayFastTestCredentials(): { merchantId: string; merchantKey: string } {
  return {
    merchantId: '10038944',
    merchantKey: '6vnf8i5hgirrs',
  };
}

/**
 * Check if PayFast is properly configured
 * @returns Boolean indicating if PayFast is configured
 */
export function isPayFastConfigured(): boolean {
  return !!(
    PAYFAST_CONFIG.RETURN_URL &&
    PAYFAST_CONFIG.CANCEL_URL &&
    WOOCOMMERCE_CONFIG.BASE_URL
  );
}

/**
 * Get PayFast configuration status
 * @returns Configuration status object
 */
export function getPayFastConfigStatus(): {
  isConfigured: boolean;
  isTestMode: boolean;
  hasValidUrls: boolean;
} {
  return {
    isConfigured: isPayFastConfigured(),
    isTestMode: PAYFAST_CONFIG.TEST_MODE,
    hasValidUrls: !!(PAYFAST_CONFIG.RETURN_URL && PAYFAST_CONFIG.CANCEL_URL),
  };
} 
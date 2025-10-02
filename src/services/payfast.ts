// PayFast service for payment processing and integration
// This handles PayFast payment gateway integration with WooCommerce

import { PayFastPaymentData, PayFastResponse, PayFastPaymentStatus } from '../types/cart';
import { PAYFAST_CONFIG, API_ENDPOINTS, DEFAULTS } from '../utils/constants';
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
  
  // Create payment data in the exact order PayFast expects for signature generation
  const paymentData: PayFastPaymentData = {};
  
  // Add fields in PayFast's expected order
  paymentData.merchant_id = PAYFAST_CONFIG.MERCHANT_ID;
  paymentData.merchant_key = PAYFAST_CONFIG.MERCHANT_KEY;
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
 * @param paymentData - PayFast payment data
 * @returns Form data with signature
 */
export function generatePayFastFormData(paymentData: PayFastPaymentData): PayFastPaymentData & { signature: string } {
  // Generate signature with passphrase
  
  const signature = generatePayFastSignature(paymentData, PAYFAST_CONFIG.PASSPHRASE);
  
  return {
    ...paymentData,
    signature,
  };
}

/**
 * Create PayFast payment form and submit
 * @param paymentData - PayFast payment data
 * @returns Promise with payment response
 */
export async function submitPayFastPayment(paymentData: PayFastPaymentData): Promise<PayFastResponse> {
  try {
    // Check if PayFast is properly configured
    if (!isPayFastConfigured()) {
      
      // Import mock payment service dynamically
      const { submitMockPayment } = await import('./mockPayment');
      return await submitMockPayment(paymentData);
    }
    
    
    // Generate form data with signature
    const formData = generatePayFastFormData(paymentData);
    
    // Create form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = API_ENDPOINTS.PAYFAST_PROCESS;
    form.style.display = 'none';
    
    // Add form fields
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
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
      redirectUrl: API_ENDPOINTS.PAYFAST_PROCESS,
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
 * @param responseData - Response data from PayFast
 * @returns Boolean indicating if response is valid
 */
export function validatePayFastResponse(responseData: Record<string, string>): boolean {
  try {
    // Extract signature from response
    const receivedSignature = responseData.signature;
    if (!receivedSignature) {
      return false;
    }
    
    // Generate expected signature
    const expectedSignature = generatePayFastSignature(responseData, PAYFAST_CONFIG.PASSPHRASE);
    
    // Compare signatures
    return receivedSignature === expectedSignature;
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
 * @param paymentData - PayFast payment data
 * @returns Complete PayFast payment URL
 */
export function createPayFastPaymentUrl(paymentData: PayFastPaymentData): string {
  const formData = generatePayFastFormData(paymentData);
  const params = new URLSearchParams();
  
  Object.entries(formData).forEach(([key, value]) => {
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
    PAYFAST_CONFIG.MERCHANT_ID &&
    PAYFAST_CONFIG.MERCHANT_KEY &&
    PAYFAST_CONFIG.RETURN_URL &&
    PAYFAST_CONFIG.CANCEL_URL
  );
}

/**
 * Get PayFast configuration status
 * @returns Configuration status object
 */
export function getPayFastConfigStatus(): {
  isConfigured: boolean;
  isTestMode: boolean;
  merchantId: string;
  hasValidUrls: boolean;
} {
  return {
    isConfigured: isPayFastConfigured(),
    isTestMode: PAYFAST_CONFIG.TEST_MODE,
    merchantId: PAYFAST_CONFIG.MERCHANT_ID,
    hasValidUrls: !!(PAYFAST_CONFIG.RETURN_URL && PAYFAST_CONFIG.CANCEL_URL),
  };
} 
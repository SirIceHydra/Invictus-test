// Mock payment service for testing
// This simulates PayFast payment processing without real API calls

import { PayFastPaymentData, PayFastResponse } from '../types/cart';
import { Order, OrderStatus } from '../types/order';
import { updateOrderStatus } from './orders';

interface MockPaymentOptions {
  simulateSuccess?: boolean;
  simulateDelay?: number;
  simulateError?: string;
}

/**
 * Mock PayFast payment submission
 */
export async function submitMockPayment(
  paymentData: PayFastPaymentData,
  options: MockPaymentOptions = {}
): Promise<PayFastResponse> {
  const {
    simulateSuccess = true,
    simulateDelay = 2000,
    simulateError = null,
  } = options;


  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, simulateDelay));

  if (simulateError) {
    return {
      success: false,
      error: simulateError,
    };
  }

  if (simulateSuccess) {
    
    // Extract order ID from custom field
    const orderId = paymentData.custom_str1 ? parseInt(paymentData.custom_str1, 10) : null;
    
    if (orderId) {
      try {
        // Update order status to completed
        await updateOrderStatus(orderId, 'completed');
      } catch (error) {
      }
    }

    return {
      success: true,
      message: 'Payment processed successfully',
      paymentId: `mock_${Date.now()}`,
      redirectUrl: '/payment/success',
    };
  }

  return {
    success: false,
    error: 'Payment failed',
  };
}

/**
 * Mock payment success page handler
 */
export function handleMockPaymentSuccess(orderId: number): {
  success: boolean;
  orderId: number;
  message: string;
} {
  
  return {
    success: true,
    orderId,
    message: 'Payment completed successfully!',
  };
}

/**
 * Mock payment failure page handler
 */
export function handleMockPaymentFailure(orderId: number): {
  success: false;
  orderId: number;
  message: string;
} {
  
  return {
    success: false,
    orderId,
    message: 'Payment failed. Please try again.',
  };
}

/**
 * Generate mock payment form for testing
 */
export function generateMockPaymentForm(paymentData: PayFastPaymentData): string {
  const formData = new URLSearchParams();
  
  Object.entries(paymentData).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  return `
    <div style="padding: 20px; border: 2px solid #ccc; border-radius: 8px; margin: 20px;">
      <h3>🧪 Mock Payment Form (Testing)</h3>
      <p><strong>Order ID:</strong> ${paymentData.custom_str1}</p>
      <p><strong>Amount:</strong> R${paymentData.amount}</p>
      <p><strong>Customer:</strong> ${paymentData.name_first} ${paymentData.name_last}</p>
      <p><strong>Email:</strong> ${paymentData.email_address}</p>
      
      <div style="margin: 20px 0;">
        <button onclick="simulatePaymentSuccess()" style="background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin-right: 10px;">
          ✅ Simulate Success
        </button>
        <button onclick="simulatePaymentFailure()" style="background: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 4px;">
          ❌ Simulate Failure
        </button>
      </div>
      
      <div id="payment-result" style="margin-top: 20px;"></div>
    </div>
    
    <script>
      function simulatePaymentSuccess() {
        document.getElementById('payment-result').innerHTML = 
          '<div style="color: green; padding: 10px; background: #e8f5e8; border-radius: 4px;">✅ Payment successful! Redirecting...</div>';
        setTimeout(() => {
          window.location.href = '/payment/success?order_id=${paymentData.custom_str1}';
        }, 2000);
      }
      
      function simulatePaymentFailure() {
        document.getElementById('payment-result').innerHTML = 
          '<div style="color: red; padding: 10px; background: #ffe8e8; border-radius: 4px;">❌ Payment failed! Redirecting...</div>';
        setTimeout(() => {
          window.location.href = '/payment/failure?order_id=${paymentData.custom_str1}';
        }, 2000);
      }
    </script>
  `;
} 
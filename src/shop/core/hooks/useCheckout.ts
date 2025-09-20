// Shop-native checkout hook (migrated from legacy implementation)
import { useState, useCallback } from 'react';
import { CartItem } from '../../../types/cart';
import { CheckoutForm } from '../../../types/checkout';
import { OrderStatus, PaymentResult } from '../../../types/order';
import { PayFastPaymentData } from '../../../types/cart';
import { ShippingOption } from '../../../shipping/types/shipping';
import { generatePayFastPaymentData, submitPayFastPayment } from '../../../services/payfast';
import { createOrder, updateOrderStatus } from '../../../services/orders';
import { validateCheckoutForm } from '../../../utils/helpers';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../utils/constants';

interface UseCheckoutReturn {
  loading: boolean;
  error: string | null;
  orderId: number | null;
  paymentUrl: string | null;
  createOrder: (cartItems: CartItem[], formData: CheckoutForm, shippingOption?: ShippingOption) => Promise<PaymentResult>;
  processPayment: (orderId: number, orderNumber: string, customerData: any) => Promise<PaymentResult>;
  clearError: () => void;
  resetCheckout: () => void;
}

export function useCheckout(): UseCheckoutReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const createOrderHandler = useCallback(async (
    cartItems: CartItem[],
    formData: CheckoutForm,
    shippingOption?: ShippingOption
  ): Promise<PaymentResult> => {
    setLoading(true);
    setError(null);
    setOrderId(null);
    setPaymentUrl(null);

    try {
      const validation = validateCheckoutForm(formData);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors).join(', '));
      }
      if (cartItems.length === 0) {
        throw new Error(ERROR_MESSAGES.CART_EMPTY);
      }

      console.log('=== USECHECKOUT DEBUG ===');
      console.log('About to call createOrder with shippingOption:', shippingOption);
      console.log('shippingOption type:', typeof shippingOption);
      console.log('shippingOption is null?', shippingOption === null);
      console.log('shippingOption is undefined?', shippingOption === undefined);
      
      const order = await createOrder(cartItems, formData, shippingOption);
      setOrderId(order.id);

      return { success: true, orderId: order.id, message: SUCCESS_MESSAGES.ORDER_CREATED };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.ORDER_CREATION_FAILED;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const processPayment = useCallback(async (
    orderId: number,
    orderNumber: string,
    customerData: any
  ): Promise<PaymentResult> => {
    setLoading(true);
    setError(null);
    try {
      const paymentData: PayFastPaymentData = generatePayFastPaymentData({
        orderId,
        orderNumber,
        customerName: `${customerData.firstName} ${customerData.lastName}`,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        amount: customerData.total,
        itemName: `Order #${orderNumber}`,
        itemDescription: `Invictus Nutrition Order #${orderNumber}`,
      });

      const paymentResponse = await submitPayFastPayment(paymentData);
      if (paymentResponse.success) {
        await updateOrderStatus(orderId, 'processing' as OrderStatus);
        return {
          success: true,
          orderId,
          paymentId: paymentResponse.paymentId,
          redirectUrl: paymentResponse.redirectUrl,
          message: SUCCESS_MESSAGES.PAYMENT_SUCCESS,
        };
      }
      throw new Error(paymentResponse.error || ERROR_MESSAGES.PAYMENT_FAILED);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.PAYMENT_FAILED;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const resetCheckout = useCallback(() => {
    setLoading(false);
    setError(null);
    setOrderId(null);
    setPaymentUrl(null);
  }, []);

  return { loading, error, orderId, paymentUrl, createOrder: createOrderHandler, processPayment, clearError, resetCheckout };
}



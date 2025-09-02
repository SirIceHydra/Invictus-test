import { PaymentProvider, PaymentStartRequest, PaymentStartResult } from '../../core/ports';
import { generatePayFastPaymentData, generatePayFastFormData, submitPayFastPayment } from '../../../services/payfast';

export const PayFastPaymentProvider: PaymentProvider = {
  async startPayment(req: PaymentStartRequest): Promise<PaymentStartResult> {
    const data = generatePayFastPaymentData({
      orderId: req.orderId,
      orderNumber: req.orderNumber,
      customerName: req.customerName,
      customerEmail: req.customerEmail,
      customerPhone: req.customerPhone,
      amount: req.amount,
      itemName: req.itemName,
      itemDescription: req.itemDescription,
    });

    const formData = generatePayFastFormData(data);

    return {
      method: 'form-post',
      url: 'https://sandbox.payfast.co.za/eng/process',
      fields: formData as any,
    };
  },
};



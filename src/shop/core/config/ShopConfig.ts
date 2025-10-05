import { PAYFAST_CONFIG, WOOCOMMERCE_CONFIG } from '../../../utils/constants';

export type ShopPaymentProviderName = 'payfast' | 'mock' | 'paygate';

export interface ShopConfig {
  paymentProvider: ShopPaymentProviderName;
  currency: string;
  wooCommerce: {
    baseUrl: string;
    productsPerPage: number;
  };
  payfast: {
    returnUrl: string;
    cancelUrl: string;
    notifyUrl: string;
    testMode: boolean;
  };
}

export const ShopConfigFromExisting = (): ShopConfig => {
  return {
    paymentProvider: 'payfast',
    currency: 'ZAR',
    wooCommerce: {
      baseUrl: WOOCOMMERCE_CONFIG.BASE_URL,
      productsPerPage: WOOCOMMERCE_CONFIG.PRODUCTS_PER_PAGE,
    },
    payfast: {
      returnUrl: PAYFAST_CONFIG.RETURN_URL,
      cancelUrl: PAYFAST_CONFIG.CANCEL_URL,
      notifyUrl: PAYFAST_CONFIG.NOTIFY_URL,
      testMode: PAYFAST_CONFIG.TEST_MODE,
    },
  };
};



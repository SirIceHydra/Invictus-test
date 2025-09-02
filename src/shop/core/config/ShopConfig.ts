import { PAYFAST_CONFIG, WOOCOMMERCE_CONFIG } from '../../../utils/constants';

export type ShopPaymentProviderName = 'payfast' | 'mock' | 'paygate';

export interface ShopConfig {
  paymentProvider: ShopPaymentProviderName;
  currency: string;
  wooCommerce: {
    baseUrl: string;
    consumerKey: string;
    consumerSecret: string;
    productsPerPage: number;
  };
  payfast: {
    merchantId: string;
    merchantKey: string;
    passphrase?: string;
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
      consumerKey: WOOCOMMERCE_CONFIG.CONSUMER_KEY,
      consumerSecret: WOOCOMMERCE_CONFIG.CONSUMER_SECRET,
      productsPerPage: WOOCOMMERCE_CONFIG.PRODUCTS_PER_PAGE,
    },
    payfast: {
      merchantId: PAYFAST_CONFIG.MERCHANT_ID,
      merchantKey: PAYFAST_CONFIG.MERCHANT_KEY,
      passphrase: PAYFAST_CONFIG.PASSPHRASE,
      returnUrl: PAYFAST_CONFIG.RETURN_URL,
      cancelUrl: PAYFAST_CONFIG.CANCEL_URL,
      notifyUrl: PAYFAST_CONFIG.NOTIFY_URL,
      testMode: PAYFAST_CONFIG.TEST_MODE,
    },
  };
};



# 🛒 Shop Module Implementation Guide

## 📋 Overview

This guide shows developers how to implement the portable shop module in any React application. The shop module provides a complete e-commerce solution with WooCommerce integration and PayFast payments.

---

## 🚀 Quick Start

### 1. Copy Shop Module
```bash
# Copy the entire shop folder to your React project
cp -r /path/to/source/src/shop ./src/
```

### 2. Install Dependencies
```bash
npm install axios react-router-dom @types/react-router-dom
npm install -D tailwindcss postcss autoprefixer
```

### 3. Configure Environment Variables
```env
# .env
VITE_WORDPRESS_URL=https://your-wordpress-site.com
VITE_WOOCOMMERCE_CONSUMER_KEY=your_consumer_key
VITE_WOOCOMMERCE_CONSUMER_SECRET=your_consumer_secret
VITE_PAYFAST_MERCHANT_ID=your_merchant_id
VITE_PAYFAST_MERCHANT_KEY=your_merchant_key
VITE_PAYFAST_TEST_MODE=true
```

### 4. Add Routes
```tsx
// App.tsx
import { ShopProvider } from './shop/core/ShopProvider';
import ShopPage from './shop/pages/Shop';
import CartPage from './shop/pages/Cart';
import CheckoutPage from './shop/pages/Checkout';

function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}
```

---

## 📁 Module Structure

```
src/shop/
├── adapters/                    # External service adapters
│   ├── catalog/
│   │   └── woocommerce.ts      # WooCommerce API adapter
│   └── payments/
│       └── payfast.ts          # PayFast payment adapter
├── components/                  # Reusable UI components
│   ├── ProductCard.tsx         # Individual product display
│   ├── ProductGrid.tsx         # Product grid layout
│   └── ProductDetailsModal.tsx # Product details popup
├── core/                       # Core business logic
│   ├── cart/
│   │   └── CartContext.tsx     # Shopping cart state
│   ├── config/
│   │   └── ShopConfig.ts       # Configuration constants
│   ├── hooks/                  # Custom React hooks
│   │   ├── useCart.ts          # Cart management
│   │   ├── useCategories.ts    # Category management
│   │   ├── useCheckout.ts      # Checkout process
│   │   └── useProducts.ts      # Product management
│   ├── ports.ts                # Interface definitions
│   └── ShopProvider.tsx        # Main provider component
├── pages/                      # Page components
│   ├── Shop.tsx                # Shop page
│   ├── Cart.tsx                # Cart page
│   ├── Checkout.tsx            # Checkout page
│   ├── PaymentSuccess.tsx      # Success page
│   └── PaymentFailure.tsx      # Failure page
├── services/                   # Business services
├── ui/                         # UI components
└── index.ts                    # Module exports
```

---

## 🔧 Core Components

### ShopProvider
The main provider that wraps your app with shop functionality:

```tsx
import { ShopProvider } from './shop/core/ShopProvider';

function App() {
  return (
    <ShopProvider>
      {/* Your app components */}
    </ShopProvider>
  );
}
```

### Product Management
```tsx
import { useProducts } from './shop/core/hooks/useProducts';

function ProductList() {
  const { products, loading, error } = useProducts();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Cart Management
```tsx
import { useCart } from './shop/core/hooks/useCart';

function Cart() {
  const { items, addItem, removeItem, updateQuantity, total } = useCart();
  
  return (
    <div>
      {items.map(item => (
        <CartItem 
          key={item.id} 
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
        />
      ))}
      <div>Total: R{total}</div>
    </div>
  );
}
```

---

## 🛍️ Available Hooks

### useProducts
Manages product data and API calls:

```tsx
const { 
  products, 
  loading, 
  error, 
  fetchProducts, 
  searchProducts 
} = useProducts();

// Fetch with filters
fetchProducts({ 
  category: 'protein', 
  search: 'whey',
  page: 1,
  perPage: 12 
});
```

### useCart
Manages shopping cart state:

```tsx
const { 
  items, 
  total, 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart 
} = useCart();

// Add product to cart
addItem({
  id: 1,
  name: 'Whey Protein',
  price: 299.99,
  quantity: 1,
  image: '/product-image.jpg'
});
```

### useCategories
Manages product categories:

```tsx
const { 
  categories, 
  loading, 
  error, 
  fetchCategories 
} = useCategories();
```

### useCheckout
Manages checkout process:

```tsx
const { 
  checkout, 
  processing, 
  error, 
  processOrder 
} = useCheckout();

// Process order
await processOrder({
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+27123456789'
  },
  shipping: {
    address: '123 Main St',
    city: 'Cape Town',
    postalCode: '8001'
  }
});
```

---

## 🎨 UI Components

### ProductCard
Displays individual products:

```tsx
import { ProductCard } from './shop/components/ProductCard';

<ProductCard 
  product={product}
  onAddToCart={handleAddToCart}
  showQuickView={true}
/>
```

### ProductGrid
Displays products in a grid:

```tsx
import { ProductGrid } from './shop/components/ProductGrid';

<ProductGrid 
  products={products}
  loading={loading}
  error={error}
  onProductClick={handleProductClick}
/>
```

### ProductDetailsModal
Shows product details in a modal:

```tsx
import { ProductDetailsModal } from './shop/components/ProductDetailsModal';

<ProductDetailsModal 
  product={selectedProduct}
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  onAddToCart={handleAddToCart}
/>
```

---

## 💳 Payment Integration

### PayFast Configuration
```tsx
import { useCheckout } from './shop/core/hooks/useCheckout';

const { processOrder } = useCheckout();

// Process payment
const result = await processOrder(orderData);
if (result.success) {
  // Redirect to PayFast
  window.location.href = result.paymentUrl;
}
```

### Payment Callbacks
```tsx
// Payment success page
import { PaymentSuccess } from './shop/pages/PaymentSuccess';

// Payment failure page
import { PaymentFailure } from './shop/pages/PaymentFailure';
```

---

## 🔧 Configuration

### ShopConfig.ts
```typescript
export const SHOP_CONFIG = {
  // WooCommerce settings
  WOOCOMMERCE: {
    BASE_URL: import.meta.env.VITE_WORDPRESS_URL,
    CONSUMER_KEY: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY,
    CONSUMER_SECRET: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_SECRET,
    PRODUCTS_PER_PAGE: 12,
  },
  
  // PayFast settings
  PAYFAST: {
    MERCHANT_ID: import.meta.env.VITE_PAYFAST_MERCHANT_ID,
    MERCHANT_KEY: import.meta.env.VITE_PAYFAST_MERCHANT_KEY,
    TEST_MODE: import.meta.env.VITE_PAYFAST_TEST_MODE === 'true',
  },
  
  // Cart settings
  CART: {
    STORAGE_KEY: 'shop-cart',
    MAX_ITEMS: 50,
  },
};
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/shop/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
    },
  },
};
```

---

## 🧪 Testing

### Unit Tests
```tsx
import { render, screen } from '@testing-library/react';
import { ShopProvider } from './shop/core/ShopProvider';
import ProductList from './components/ProductList';

test('renders products', () => {
  render(
    <ShopProvider>
      <ProductList />
    </ShopProvider>
  );
  
  expect(screen.getByText('Products')).toBeInTheDocument();
});
```

### Integration Tests
```tsx
import { useProducts } from './shop/core/hooks/useProducts';

test('fetches products from API', async () => {
  const { result } = renderHook(() => useProducts(), {
    wrapper: ShopProvider,
  });
  
  await waitFor(() => {
    expect(result.current.products).toHaveLength(10);
  });
});
```

---

## 🚀 Deployment

### Build Configuration
```bash
# Build for production
npm run build

# The shop module will be included in the build
```

### Environment Variables
```env
# Production .env
VITE_WORDPRESS_URL=https://your-production-site.com
VITE_WOOCOMMERCE_CONSUMER_KEY=your_production_key
VITE_WOOCOMMERCE_CONSUMER_SECRET=your_production_secret
VITE_PAYFAST_MERCHANT_ID=your_production_merchant_id
VITE_PAYFAST_MERCHANT_KEY=your_production_merchant_key
VITE_PAYFAST_TEST_MODE=false
```

---

## 🔧 Customization

### Styling
```css
/* Custom shop styles */
.shop-product-card {
  @apply bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow;
}

.shop-cart-item {
  @apply border-b border-gray-200 py-4;
}
```

### Adding Features
```tsx
// Extend the cart context
const CustomCartProvider = ({ children }) => {
  const cart = useCart();
  
  // Add custom functionality
  const addToWishlist = (product) => {
    // Custom wishlist logic
  };
  
  return (
    <CartContext.Provider value={{ ...cart, addToWishlist }}>
      {children}
    </CartContext.Provider>
  );
};
```

---

## 🆘 Troubleshooting

### Common Issues

1. **Products not loading**
   - Check WooCommerce API credentials
   - Verify CORS configuration
   - Check network requests in browser

2. **Cart not persisting**
   - Check localStorage permissions
   - Verify cart storage key
   - Check for JavaScript errors

3. **Payment not working**
   - Verify PayFast credentials
   - Check test mode settings
   - Verify return URLs

### Debug Mode
```env
VITE_DEBUG_MODE=true
```

This enables detailed logging for troubleshooting.

---

## 📚 API Reference

### WooCommerce API
- `GET /products` - Fetch products
- `GET /products/categories` - Fetch categories
- `POST /orders` - Create orders

### PayFast API
- Payment processing
- Signature generation
- Callback handling

### Cart API
- `addItem(product)` - Add to cart
- `removeItem(id)` - Remove from cart
- `updateQuantity(id, quantity)` - Update quantity
- `clearCart()` - Clear all items

---

## ✅ Checklist

### Setup
- [ ] Shop module copied to project
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Routes added to app
- [ ] ShopProvider wrapping app

### Configuration
- [ ] WooCommerce API credentials set
- [ ] PayFast credentials configured
- [ ] CORS headers configured
- [ ] Tailwind CSS configured

### Testing
- [ ] Products loading from API
- [ ] Cart functionality working
- [ ] Checkout process working
- [ ] Payment integration tested
- [ ] Error handling verified

### Production
- [ ] Production environment variables set
- [ ] HTTPS enabled
- [ ] PayFast test mode disabled
- [ ] Performance optimized

---

## 🎉 Success!

Your shop module is now integrated and ready to use! The module provides:

- ✅ **Complete e-commerce functionality**
- ✅ **WooCommerce integration**
- ✅ **PayFast payment processing**
- ✅ **Responsive UI components**
- ✅ **Type-safe development**
- ✅ **Easy customization**

The shop module can now be easily copied to other projects and integrated with minimal effort.

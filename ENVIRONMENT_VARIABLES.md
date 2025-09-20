# 🔧 Environment Variables Guide

## 📋 Overview

This guide shows exactly what environment variables need to be configured in your `.env` file for both development and production environments. These variables are essential for the shop and posts modules to function properly.

---

## 🚀 Quick Start

### 1. Create .env File
```bash
# Create .env file in your project root
touch .env
```

### 2. Copy Template
```env
# Copy the template below and fill in your values
```

---

## 📝 Development Environment (.env)

### WordPress Configuration
```env
# WordPress Configuration
VITE_WORDPRESS_URL=https://your-wordpress-site.com
VITE_WORDPRESS_API_VERSION=wp/v2
VITE_WORDPRESS_POSTS_PER_PAGE=10
VITE_WORDPRESS_CACHE_DURATION=300000
```

### WooCommerce Configuration
```env
# WooCommerce Configuration
VITE_WORDPRESS_URL=https://your-wordpress-site.com
VITE_WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### PayFast Configuration
```env
# PayFast Configuration
VITE_PAYFAST_MERCHANT_ID=10000100
VITE_PAYFAST_MERCHANT_KEY=46f0cd694581a
VITE_PAYFAST_PASSPHRASE=

# PayFast URLs
VITE_PAYFAST_RETURN_URL=http://localhost:5173/payment/success
VITE_PAYFAST_CANCEL_URL=http://localhost:5173/payment/cancel
VITE_PAYFAST_NOTIFY_URL=https://your-wordpress-site.com/wc-api/payfast

# PayFast Test Mode
VITE_PAYFAST_TEST_MODE=true
```

### Debug Configuration
```env
# Debug Mode (for development)
VITE_DEBUG_MODE=true
```

---

## 🚀 Production Environment (.env.production)

### WordPress Configuration
```env
# WordPress Configuration
VITE_WORDPRESS_URL=https://your-production-wordpress-site.com
VITE_WORDPRESS_API_VERSION=wp/v2
VITE_WORDPRESS_POSTS_PER_PAGE=10
VITE_WORDPRESS_CACHE_DURATION=600000
```

### WooCommerce Configuration
```env
# WooCommerce Configuration
VITE_WORDPRESS_URL=https://your-production-wordpress-site.com
VITE_WOOCOMMERCE_CONSUMER_KEY=your_production_consumer_key
VITE_WOOCOMMERCE_CONSUMER_SECRET=your_production_consumer_secret
```

### PayFast Configuration
```env
# PayFast Configuration
VITE_PAYFAST_MERCHANT_ID=your_production_merchant_id
VITE_PAYFAST_MERCHANT_KEY=your_production_merchant_key
VITE_PAYFAST_PASSPHRASE=your_production_passphrase

# PayFast URLs
VITE_PAYFAST_RETURN_URL=https://your-react-domain.com/payment/success
VITE_PAYFAST_CANCEL_URL=https://your-react-domain.com/payment/cancel
VITE_PAYFAST_NOTIFY_URL=https://your-wordpress-site.com/wc-api/payfast

# PayFast Test Mode
VITE_PAYFAST_TEST_MODE=false
```

### Production Configuration
```env
# Production Mode
VITE_DEBUG_MODE=false
```

---

## 🔍 Variable Descriptions

### WordPress Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_WORDPRESS_URL` | Your WordPress site URL | `https://your-site.com` | ✅ |
| `VITE_WORDPRESS_API_VERSION` | WordPress REST API version | `wp/v2` | ✅ |
| `VITE_WORDPRESS_POSTS_PER_PAGE` | Number of posts per page | `10` | ✅ |
| `VITE_WORDPRESS_CACHE_DURATION` | Cache duration in milliseconds | `300000` | ✅ |

### WooCommerce Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_WORDPRESS_URL` | Your WooCommerce site URL | `https://your-site.com` | ✅ |
| `VITE_WOOCOMMERCE_CONSUMER_KEY` | WooCommerce API consumer key | `ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | ✅ |
| `VITE_WOOCOMMERCE_CONSUMER_SECRET` | WooCommerce API consumer secret | `cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | ✅ |

### PayFast Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_PAYFAST_MERCHANT_ID` | PayFast merchant ID | `10000100` (test) | ✅ |
| `VITE_PAYFAST_MERCHANT_KEY` | PayFast merchant key | `46f0cd694581a` (test) | ✅ |
| `VITE_PAYFAST_PASSPHRASE` | PayFast passphrase | `your_passphrase` | ❌ |
| `VITE_PAYFAST_RETURN_URL` | Success page URL | `http://localhost:5173/payment/success` | ✅ |
| `VITE_PAYFAST_CANCEL_URL` | Cancel page URL | `http://localhost:5173/payment/cancel` | ✅ |
| `VITE_PAYFAST_NOTIFY_URL` | Notification URL | `https://your-site.com/wc-api/payfast` | ✅ |
| `VITE_PAYFAST_TEST_MODE` | Enable test mode | `true` (dev) / `false` (prod) | ✅ |

### Debug Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_DEBUG_MODE` | Enable debug logging | `true` (dev) / `false` (prod) | ❌ |

---

## 🔐 Security Considerations

### 1. Never Commit .env Files
```bash
# Add to .gitignore
.env
.env.local
.env.production
.env.staging
```

### 2. Use Different Credentials
```bash
# Development: Use test credentials
VITE_PAYFAST_MERCHANT_ID=10000100
VITE_PAYFAST_MERCHANT_KEY=46f0cd694581a

# Production: Use real credentials
VITE_PAYFAST_MERCHANT_ID=your_real_merchant_id
VITE_PAYFAST_MERCHANT_KEY=your_real_merchant_key
```

### 3. HTTPS in Production
```bash
# Always use HTTPS in production
VITE_WORDPRESS_URL=https://your-production-site.com
VITE_WORDPRESS_URL=https://your-production-site.com
VITE_PAYFAST_RETURN_URL=https://your-react-domain.com/payment/success
```

---

## 🧪 Testing Environment Variables

### 1. Verify Variables Are Loaded
```typescript
// Add this to your main component to verify variables
console.log('WordPress URL:', import.meta.env.VITE_WORDPRESS_URL);
console.log('WooCommerce URL:', import.meta.env.VITE_WORDPRESS_URL);
console.log('PayFast Test Mode:', import.meta.env.VITE_PAYFAST_TEST_MODE);
```

### 2. Test API Connections
```bash
# Test WordPress API
curl -X GET "https://your-wordpress-site.com/wp-json/wp/v2/posts"

# Test WooCommerce API
curl -X GET "https://your-wordpress-site.com/wp-json/wc/v3/products" \
  -H "consumer_key: your_consumer_key" \
  -H "consumer_secret: your_consumer_secret"
```

---

## 🔧 Configuration Examples

### Local Development
```env
# Local Development (.env)
VITE_WORDPRESS_URL=https://invictus-nutrition-local.local
VITE_WORDPRESS_URL=https://invictus-nutrition-local.local
VITE_WOOCOMMERCE_CONSUMER_KEY=ck_local_consumer_key
VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_local_consumer_secret
VITE_PAYFAST_MERCHANT_ID=10000100
VITE_PAYFAST_MERCHANT_KEY=46f0cd694581a
VITE_PAYFAST_TEST_MODE=true
VITE_DEBUG_MODE=true
```

### Staging Environment
```env
# Staging Environment (.env.staging)
VITE_WORDPRESS_URL=https://staging.invictus-nutrition.com
VITE_WORDPRESS_URL=https://staging.invictus-nutrition.com
VITE_WOOCOMMERCE_CONSUMER_KEY=ck_staging_consumer_key
VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_staging_consumer_secret
VITE_PAYFAST_MERCHANT_ID=10000100
VITE_PAYFAST_MERCHANT_KEY=46f0cd694581a
VITE_PAYFAST_TEST_MODE=true
VITE_DEBUG_MODE=false
```

### Production Environment
```env
# Production Environment (.env.production)
VITE_WORDPRESS_URL=https://invictus-nutrition.com
VITE_WORDPRESS_URL=https://invictus-nutrition.com
VITE_WOOCOMMERCE_CONSUMER_KEY=ck_production_consumer_key
VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_production_consumer_secret
VITE_PAYFAST_MERCHANT_ID=your_real_merchant_id
VITE_PAYFAST_MERCHANT_KEY=your_real_merchant_key
VITE_PAYFAST_PASSPHRASE=your_real_passphrase
VITE_PAYFAST_TEST_MODE=false
VITE_DEBUG_MODE=false
```

---

## 🚀 Deployment Configuration

### Vercel Deployment
```bash
# Add environment variables in Vercel dashboard
# Go to Project Settings → Environment Variables
# Add each variable with appropriate values for production
```

### Netlify Deployment
```bash
# Add environment variables in Netlify dashboard
# Go to Site Settings → Environment Variables
# Add each variable with appropriate values for production
```

### Traditional Hosting
```bash
# Create .env.production file
# Upload with your build files
# Ensure .env.production is not in .gitignore for deployment
```

---

## 🆘 Troubleshooting

### Common Issues

#### 1. Variables Not Loading
```bash
# Problem: Environment variables not available in app
# Solution: 
- Ensure variables start with VITE_
- Restart development server
- Check .env file location (project root)
```

#### 2. API Connection Errors
```bash
# Problem: API calls failing
# Solution:
- Verify URLs are correct
- Check API credentials
- Ensure CORS is configured
- Test API endpoints directly
```

#### 3. PayFast Integration Issues
```bash
# Problem: PayFast payments not working
# Solution:
- Verify merchant credentials
- Check test mode setting
- Ensure return URLs are accessible
- Test with PayFast sandbox
```

---

## ✅ Checklist

### Development Setup
- [ ] `.env` file created in project root
- [ ] WordPress URL configured
- [ ] WooCommerce credentials added
- [ ] PayFast test credentials added
- [ ] Debug mode enabled
- [ ] Variables tested in application

### Production Setup
- [ ] `.env.production` file created
- [ ] Production WordPress URL configured
- [ ] Production WooCommerce credentials added
- [ ] Production PayFast credentials added
- [ ] Test mode disabled
- [ ] Debug mode disabled
- [ ] HTTPS URLs configured
- [ ] Environment variables deployed

### Security
- [ ] `.env` files added to `.gitignore`
- [ ] Different credentials for dev/prod
- [ ] HTTPS used in production
- [ ] Sensitive data not committed

---

## 🎉 Success!

Your environment variables are now properly configured! The application can now:

- ✅ **Connect to WordPress** for blog posts
- ✅ **Connect to WooCommerce** for products
- ✅ **Process payments** through PayFast
- ✅ **Handle different environments** (dev/staging/prod)
- ✅ **Maintain security** with proper credential management

Remember to update these variables when deploying to different environments or when credentials change.

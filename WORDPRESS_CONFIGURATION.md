# 🌐 WordPress Configuration Guide

## 📋 Overview

This comprehensive guide walks you through setting up WordPress, WooCommerce, PayFast, and blog posts for your React frontend. Follow these steps to configure everything needed for both e-commerce and blog functionality.

---

## 🚀 Quick Start Checklist

- [ ] WordPress Installation
- [ ] WooCommerce Setup
- [ ] PayFast Integration
- [ ] Blog Posts Configuration
- [ ] API Configuration
- [ ] CORS Setup
- [ ] Environment Variables
- [ ] Testing & Verification

---

## 🏗️ WordPress Installation

### Option 1: Local Development (Recommended)

#### Using Local by Flywheel
```bash
# 1. Download Local from https://localwp.com/
# 2. Install and launch Local
# 3. Click "Create a new site"
# 4. Choose "Custom" setup
# 5. Configure site:
   Site Name: invictus-nutrition-local
   Admin Username: admin
   Admin Password: password123
   Admin Email: admin@invictus-nutrition.local
# 6. Choose "Preferred" environment
# 7. Wait for installation to complete
```

#### Site URLs
```
Frontend: https://invictus-nutrition-local.local
Admin: https://invictus-nutrition-local.local/wp-admin
```

### Option 2: Shared Hosting

#### cPanel Installation
```bash
# 1. Download WordPress from wordpress.org
# 2. Upload to hosting via cPanel File Manager
# 3. Create MySQL database in cPanel
# 4. Run WordPress installation
# 5. Configure site settings
```

### Option 3: Managed WordPress Hosting

#### Recommended Providers
- **SiteGround** - Excellent performance, easy setup
- **Kinsta** - Premium managed hosting
- **WP Engine** - Enterprise-grade hosting
- **Bluehost** - Budget-friendly option

---

## ⚙️ WordPress Initial Configuration

### 1. Basic Settings
```bash
# Go to Settings → General
Site Title: Invictus Nutrition
Tagline: Premium Nutrition & Supplements
WordPress Address: https://your-domain.com
Site Address: https://your-domain.com
```

### 2. Permalinks (CRITICAL)
```bash
# Go to Settings → Permalinks
# Select: "Post name" (/%postname%/)
# This is essential for SEO and clean URLs
# Click "Save Changes"
```

### 3. Reading Settings
```bash
# Go to Settings → Reading
Your homepage displays: A static page
Homepage: Home
Posts page: Posts
Blog pages show at most: 10 posts
```

---

## 🛒 WooCommerce Setup

### 1. Install WooCommerce
```bash
# Go to Plugins → Add New
# Search for "WooCommerce"
# Click "Install Now"
# Click "Activate"
```

### 2. Run WooCommerce Setup Wizard
```bash
# Follow the setup wizard:
Store Address: 123 Main Street, Cape Town, Western Cape, 8001
Industry: Health & Beauty
Product Types: Physical products, Downloads
Business Details: Fill in your business information
Theme: Choose appropriate theme
```

### 3. Configure WooCommerce Settings
```bash
# Go to WooCommerce → Settings

# General Tab
Base location: South Africa
Currency: ZAR (R)
Currency position: Left
Thousand separator: ,
Decimal separator: .
Number of decimals: 2

# Products Tab
Shop page: Shop
Cart page: Cart
Checkout page: Checkout
My account page: My account
Terms and conditions page: Terms

# Payments Tab
Enable PayFast: ✓
```

### 4. Generate API Credentials
```bash
# Go to WooCommerce → Settings → Advanced → REST API
# Click "Add Key"
Description: React Frontend API
User: Select admin user
Permissions: Read/Write
# Click "Generate API Key"

# Save these credentials (you'll need them for .env file):
Consumer Key: ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Consumer Secret: cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 💳 PayFast Integration

### 1. Create PayFast Merchant Account
```bash
# 1. Go to https://www.payfast.co.za
# 2. Click "Register"
# 3. Complete merchant verification process
# 4. Note: Use test credentials for development
```

### 2. Install PayFast Plugin
```bash
# Go to Plugins → Add New
# Search for "WooCommerce PayFast Gateway"
# Click "Install Now"
# Click "Activate"
```

### 3. Configure PayFast Settings
```bash
# Go to WooCommerce → Settings → Payments
# Enable "PayFast"
# Click "Manage"

# Configure settings:
Merchant ID: 10000100 (test) / your_merchant_id (production)
Merchant Key: 46f0cd694581a (test) / your_merchant_key (production)
Test Mode: Enabled (for development)
```

### 4. Test PayFast Integration
```bash
# Test Credentials:
Test Card: 4000000000000002
Expiry: Any future date
CVV: Any 3 digits

# Test Payment Flow:
1. Create a test product in WooCommerce
2. Add to cart
3. Proceed to checkout
4. Select PayFast payment method
5. Complete test payment
```

---

## 📝 Blog Posts Configuration

### 1. Essential Plugins Installation
```bash
# Go to Plugins → Add New

# Required Plugins:
1. Yoast SEO (Free)
   - SEO optimization
   - Meta descriptions
   - XML sitemaps

2. WP Rocket (Premium - Recommended)
   - Caching
   - Image optimization
   - Database optimization

3. Smush (Free)
   - Image compression
   - WebP conversion

4. Wordfence Security (Free)
   - Security scanning
   - Firewall protection

5. UpdraftPlus (Free)
   - Automated backups
   - Cloud storage integration
```

### 2. Content Structure Setup
```bash
# Go to Posts → Categories
# Create categories:
1. Protein Recipes
   - Slug: protein-recipes
   - Description: High-protein meal ideas

2. Smoothies & Shakes
   - Slug: smoothies-shakes
   - Description: Protein shakes and smoothies

3. Snacks & Energy Balls
   - Slug: snacks-energy-balls
   - Description: Healthy snacks and energy balls

4. Meal Prep
   - Slug: meal-prep
   - Description: Weekly meal preparation

5. Nutrition Tips
   - Slug: nutrition-tips
   - Description: Health and nutrition advice

# Go to Posts → Tags
# Create tags:
1. High Protein
2. Quick & Easy
3. Vegetarian
4. Gluten Free
5. Post Workout
6. Breakfast
7. Lunch
8. Dinner
9. Snacks
10. Meal Prep
```

### 3. Sample Content Creation
```bash
# Go to Posts → Add New
# Create 3-5 sample posts with:

# Post 1: Protein Smoothie Recipe
Title: "Post-Workout Protein Smoothie"
Category: Smoothies & Shakes
Tags: High Protein, Post Workout, Quick & Easy
Featured Image: Upload high-quality smoothie image
Excerpt: "Boost your recovery with this delicious post-workout protein smoothie..."
Content: Full recipe with ingredients and instructions

# Post 2: Energy Ball Recipe
Title: "No-Bake Protein Energy Balls"
Category: Snacks & Energy Balls
Tags: High Protein, Quick & Easy, Snacks
Featured Image: Upload energy balls image
Excerpt: "Perfect on-the-go snack packed with protein and energy..."
Content: Full recipe with ingredients and instructions

# Post 3: Nutrition Tips
Title: "5 Essential Nutrition Tips for Muscle Building"
Category: Nutrition Tips
Tags: High Protein, Nutrition Tips
Featured Image: Upload nutrition image
Excerpt: "Learn the fundamental nutrition principles for building muscle..."
Content: Educational content with tips and advice
```

---

## 🔧 API Configuration

### 1. REST API Settings
```php
// Add to functions.php or custom plugin
add_action('init', function() {
    // Ensure REST API is enabled
    add_filter('rest_enabled', '__return_true');
    add_filter('rest_jsonp_enabled', '__return_true');
});
```

### 2. CORS Configuration
```php
// Add to functions.php
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
});
```

### 3. Alternative: .htaccess Method
```apache
# Add to .htaccess file in WordPress root
<IfModule mod_headers.c>
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

### 4. Test API Endpoints
```bash
# Test basic API functionality
curl -X GET "https://your-domain.com/wp-json/wp/v2/posts"

# Test WooCommerce API
curl -X GET "https://your-domain.com/wp-json/wc/v3/products" \
  -H "consumer_key: your_consumer_key" \
  -H "consumer_secret: your_consumer_secret"

# Test with parameters
curl -X GET "https://your-domain.com/wp-json/wp/v2/posts?per_page=3&_embed"
```

---

## 🔐 Security Configuration

### 1. Basic Security
```bash
# Install and configure Wordfence Security
# Go to Wordfence → Dashboard
# Enable real-time protection
# Enable firewall protection
# Enable malware scanning
# Enable login security
```

### 2. User Security
```bash
# Go to Users → Your Profile
# Use strong password
# Enable two-factor authentication
# Use HTTPS only
```

### 3. API Security
```php
// Add to functions.php (optional - for additional security)
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    if (!is_user_logged_in()) {
        return new WP_Error('rest_not_logged_in', 'You are not currently logged in.', array('status' => 401));
    }
    return $result;
});
```

---

## ⚡ Performance Optimization

### 1. Caching Configuration
```bash
# Configure WP Rocket (if installed)
# Go to WP Rocket → Settings

# Page Cache
Enable page cache: ✓
Set cache lifetime: 1 hour
Enable mobile cache: ✓

# File Optimization
Minify CSS: ✓
Minify JavaScript: ✓
Combine CSS files: ✓
Combine JavaScript files: ✓
Defer JavaScript loading: ✓

# Media Optimization
Enable lazy loading: ✓
Enable WebP conversion: ✓
Enable image optimization: ✓
```

### 2. Database Optimization
```bash
# Go to WP Rocket → Database
# Clean database every 30 days: ✓
# Remove post revisions: ✓
# Remove auto-drafts: ✓
# Remove trashed posts: ✓
# Remove spam comments: ✓
```

### 3. Image Optimization
```bash
# Configure Smush Plugin
# Go to Smush → Settings
# Enable lossless compression: ✓
# Enable WebP conversion: ✓
# Enable lazy loading: ✓
# Run bulk optimization on all images
```

---

## 📊 SEO Configuration

### 1. Yoast SEO Setup
```bash
# Go to SEO → General
# Connect to Google Search Console
# Connect to Google Analytics
# Set up social media profiles

# Go to SEO → Titles & Metas
# Configure title templates:
Post Title Template: %%title%% | %%sitename%%
Category Title Template: %%category%% Archives | %%sitename%%
Tag Title Template: %%tag%% Archives | %%sitename%%

# Configure meta description templates:
Post Meta Description: %%excerpt%%
Category Meta Description: %%category_description%%
Tag Meta Description: %%tag_description%%
```

### 2. XML Sitemap
```bash
# Go to SEO → General → Features
# Enable XML Sitemaps: ✓
# Submit to Google Search Console

# Sitemap URLs:
Posts: https://your-domain.com/sitemap_index.xml
Posts: https://your-domain.com/post-sitemap.xml
Categories: https://your-domain.com/category-sitemap.xml
Tags: https://your-domain.com/post_tag-sitemap.xml
```

---

## 🔧 Environment Variables

### 1. Create .env File
```env
# .env file for your React frontend

# WordPress Configuration
VITE_WORDPRESS_URL=https://your-wordpress-site.com
VITE_WORDPRESS_API_VERSION=wp/v2
VITE_WORDPRESS_POSTS_PER_PAGE=10
VITE_WORDPRESS_CACHE_DURATION=300000

# WooCommerce Configuration
VITE_WOOCOMMERCE_URL=https://your-wordpress-site.com
VITE_WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

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

# Debug Mode (for development)
VITE_DEBUG_MODE=true
```

### 2. Production Environment Variables
```env
# Production .env
VITE_WORDPRESS_URL=https://your-production-wordpress-site.com
VITE_WOOCOMMERCE_URL=https://your-production-wordpress-site.com
VITE_WOOCOMMERCE_CONSUMER_KEY=your_production_consumer_key
VITE_WOOCOMMERCE_CONSUMER_SECRET=your_production_consumer_secret
VITE_PAYFAST_MERCHANT_ID=your_production_merchant_id
VITE_PAYFAST_MERCHANT_KEY=your_production_merchant_key
VITE_PAYFAST_RETURN_URL=https://your-react-domain.com/payment/success
VITE_PAYFAST_CANCEL_URL=https://your-react-domain.com/payment/cancel
VITE_PAYFAST_NOTIFY_URL=https://your-wordpress-site.com/wc-api/payfast
VITE_PAYFAST_TEST_MODE=false
VITE_DEBUG_MODE=false
```

---

## 🧪 Testing & Verification

### 1. WordPress API Testing
```bash
# Test WordPress REST API
curl -X GET "https://your-domain.com/wp-json/wp/v2/posts"

# Test WooCommerce API
curl -X GET "https://your-domain.com/wp-json/wc/v3/products" \
  -H "consumer_key: your_consumer_key" \
  -H "consumer_secret: your_consumer_secret"

# Test categories
curl -X GET "https://your-domain.com/wp-json/wp/v2/categories"

# Test media
curl -X GET "https://your-domain.com/wp-json/wp/v2/media"
```

### 2. Frontend Integration Testing
```bash
# Start React development server
npm run dev

# Test blog posts
Visit: http://localhost:5173/posts
Check: Posts loading from WordPress API

# Test shop functionality
Visit: http://localhost:5173/shop
Check: Products loading from WooCommerce API

# Test cart functionality
Add products to cart
Check: Cart persistence and functionality

# Test PayFast checkout
Proceed to checkout
Check: PayFast payment flow
```

### 3. CORS Testing
```bash
# Check browser console for CORS errors
# If errors occur, verify CORS configuration in WordPress

# Test CORS headers
curl -I -H "Origin: http://localhost:5173" \
  "https://your-domain.com/wp-json/wp/v2/posts"
```

---

## 🚀 Production Deployment

### 1. SSL Certificate
```bash
# Enable HTTPS on WordPress site
# Update all URLs to use HTTPS
# Verify PayFast integration works with HTTPS
```

### 2. Performance Optimization
```bash
# Enable caching
# Configure CDN for images
# Optimize database
# Enable compression
```

### 3. Security Hardening
```bash
# Disable PayFast test mode
# Update CORS origins for production domain
# Enable security plugins
# Regular backups
```

---

## 🆘 Troubleshooting

### Common Issues

#### 1. CORS Errors
```bash
# Problem: CORS errors in browser console
# Solution: Add CORS headers to .htaccess or functions.php

# .htaccess method
<IfModule mod_headers.c>
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

#### 2. API Authentication Errors
```bash
# Problem: 401 Unauthorized errors
# Solution: 
- Verify Consumer Key and Secret are correct
- Check API permissions are set to "Read/Write"
- Ensure WooCommerce REST API is enabled
```

#### 3. PayFast Integration Issues
```bash
# Problem: Payment redirect fails
# Solution:
- Verify Merchant ID and Key are correct
- Check PayFast plugin configuration
- Test in sandbox mode first
- Verify return URLs are accessible
```

#### 4. Posts Not Loading
```bash
# Problem: Blog posts not displaying
# Solution:
- Verify posts are published
- Check post visibility settings
- Verify API endpoints are working
- Check for JavaScript errors
```

---

## ✅ Final Checklist

### WordPress Setup
- [ ] WordPress installed and configured
- [ ] Permalinks set to "Post name"
- [ ] Essential plugins installed
- [ ] CORS headers configured
- [ ] REST API enabled and tested

### WooCommerce Setup
- [ ] WooCommerce installed and configured
- [ ] PayFast plugin installed and configured
- [ ] API credentials generated
- [ ] Sample products added
- [ ] Payment flow tested

### Blog Posts Setup
- [ ] Categories and tags created
- [ ] Sample content created
- [ ] Featured images uploaded
- [ ] SEO configured
- [ ] Performance optimized

### Security & Performance
- [ ] Security plugin configured
- [ ] HTTPS enabled
- [ ] Caching enabled
- [ ] Images optimized
- [ ] Database optimized

### Testing
- [ ] API endpoints tested
- [ ] Frontend integration tested
- [ ] Payment flow tested
- [ ] Mobile responsiveness checked
- [ ] Performance tested

---

## 🎉 Success!

Your WordPress site is now fully configured for both e-commerce and blog functionality! The setup provides:

- ✅ **Complete WordPress installation**
- ✅ **WooCommerce e-commerce platform**
- ✅ **PayFast payment processing**
- ✅ **Blog posts system**
- ✅ **API integration ready**
- ✅ **SEO optimization**
- ✅ **Performance optimization**
- ✅ **Security hardening**

Your React frontend can now seamlessly integrate with WordPress for both shop and blog functionality.

---

## 📚 Additional Resources

- [WordPress Codex](https://codex.wordpress.org/)
- [WooCommerce Documentation](https://docs.woocommerce.com/)
- [PayFast Integration Guide](https://www.payfast.co.za/documentation/)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)

For additional support or questions, refer to the troubleshooting section or contact the development team.

import React, { useEffect, useState } from 'react';
import { ProductGrid } from '../ui/ProductGrid';
import { ProductDetailsModal } from '../ui/ProductDetailsModal';
import { useCategories } from '../core/hooks/useCategories';
import { useProducts } from '../core/hooks/useProducts';
import { useBrands } from '../../hooks/useBrands';
import { Search, Filter, Grid, List, ShoppingCart, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [brandId, setBrandId] = useState<string>('');
  const [onSale, setOnSale] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<'date' | 'price' | 'name'>('date');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { products, loading, error, fetchProducts } = useProducts({ perPage: 12, orderBy: 'date', order: 'desc' });
  const { categories, loading: catsLoading, fetchCategories } = useCategories();
  const { brands, loading: brandsLoading, error: brandsError, refetch: fetchBrands } = useBrands();
  
  // Debug logging for brands
  useEffect(() => {
    console.log('=== Shop: Brands updated ===', brands);
    console.log('=== Shop: Brands loading ===', brandsLoading);
    console.log('=== Shop: Brands error ===', brandsError);
  }, [brands, brandsLoading, brandsError]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []); // Empty dependency array - only run once on mount

  // Handle URL parameters for category and brand filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    const onSaleParam = searchParams.get('onSale');
    
    if (categoryParam) {
      const categoryId = parseInt(categoryParam);
      if (!isNaN(categoryId)) {
        setCategoryId(categoryId);
      }
    }
    
    if (brandParam) {
      setBrandId(brandParam);
    }

    if (onSaleParam) {
      setOnSale(onSaleParam === 'true');
    }
    
    // Fetch products with all filters
    fetchProducts({ 
      page: 1, 
      category: categoryParam ? parseInt(categoryParam) : undefined,
      brand: brandParam || undefined,
      onSale: onSaleParam === 'true'
    });
  }, [searchParams]); // Only depend on searchParams, not fetchProducts

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts({ 
        page: 1, 
        search: searchTerm,
        category: categoryId ? Number(categoryId) : undefined,
        brand: brandId || undefined,
        onSale: onSale
      });
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm, categoryId, brandId, onSale]); // Depend on search term and filters

  return (
    <div className="min-h-screen bg-primary text-tertiary">
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url(/assets/Banners/cover-background.png)" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-4 relative z-10 text-tertiary">OUR SHOP</h1>
            <p className="mb-8 relative z-10 text-white">PREMIUM NUTRITION SUPPLEMENTS FOR PEAK PERFORMANCE</p>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-10 py-3 border border-tertiary/40 bg-primary text-tertiary focus:ring-2 focus:ring-tertiary focus:border-transparent text-lg"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <Link to="/cart" className="flex items-center gap-2 bg-gradient-to-r from-tertiary to-primarySupport text-white px-6 py-3 hover:scale-105 transition-transform font-semibold">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Filters and Controls */}
      <section className="bg-primary border-t-2 border-white border-b-2 border-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-tertiary" />
                <span className="font-medium text-white">Filters:</span>
              </div>
              <select 
                value={categoryId} 
                onChange={(e) => { 
                  const val = e.target.value ? Number(e.target.value) : ''; 
                  setCategoryId(val as any); 
                  const params: Record<string, string> = {};
                  if (val) {
                    params.category = val.toString();
                  }
                  if (brandId) {
                    params.brand = brandId;
                  }
                  if (onSale) {
                    params.onSale = 'true';
                  }
                  setSearchParams(Object.keys(params).length > 0 ? params : {});
                  fetchProducts({ 
                    page: 1, 
                    search: searchTerm,
                    category: val ? Number(val) : undefined,
                    brand: brandId || undefined,
                    onSale: onSale
                  }); 
                }} 
                className="border border-tertiary/40 rounded-lg px-4 py-2 focus:ring-2 focus:ring-tertiary focus:border-transparent bg-primary text-tertiary" 
                disabled={catsLoading}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
              </select>
              <select 
                value={brandId} 
                onChange={(e) => { 
                  const val = e.target.value; 
                  setBrandId(val); 
                  const params: Record<string, string> = {};
                  if (categoryId) {
                    params.category = categoryId.toString();
                  }
                  if (val) {
                    params.brand = val;
                  }
                  if (onSale) {
                    params.onSale = 'true';
                  }
                  setSearchParams(Object.keys(params).length > 0 ? params : {});
                  fetchProducts({ 
                    page: 1, 
                    search: searchTerm,
                    category: categoryId ? Number(categoryId) : undefined,
                    brand: val || undefined,
                    onSale: onSale
                  }); 
                }} 
                className="border border-tertiary/40 rounded-lg px-4 py-2 focus:ring-2 focus:ring-tertiary focus:border-transparent bg-primary text-tertiary" 
                disabled={brandsLoading}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (<option key={brand.id} value={brand.name}>{brand.name}</option>))}
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="onSale"
                  checked={onSale}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setOnSale(checked);
                    const params: Record<string, string> = {};
                    if (categoryId) {
                      params.category = categoryId.toString();
                    }
                    if (brandId) {
                      params.brand = brandId;
                    }
                    if (checked) {
                      params.onSale = 'true';
                    }
                    setSearchParams(Object.keys(params).length > 0 ? params : {});
                    fetchProducts({ 
                      page: 1, 
                      search: searchTerm,
                      category: categoryId ? Number(categoryId) : undefined,
                      brand: brandId || undefined,
                      onSale: checked
                    });
                  }}
                  className="w-4 h-4 text-tertiary border-gray-300 rounded focus:ring-tertiary focus:ring-2"
                />
                <label htmlFor="onSale" className="text-sm font-medium text-white cursor-pointer">
                  On Sale
                </label>
              </div>
              <select onChange={(e) => fetchProducts({ 
                page: 1, 
                search: searchTerm,
                orderBy: e.target.value as any,
                category: categoryId ? Number(categoryId) : undefined,
                brand: brandId || undefined,
                onSale: onSale
              })} className="border border-tertiary/40 rounded-lg px-4 py-2 focus:ring-2 focus:ring-tertiary focus:border-transparent bg-primary text-tertiary">
                <option value="date">Newest</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
              <select onChange={(e) => fetchProducts({ 
                page: 1, 
                search: searchTerm,
                order: e.target.value as any,
                category: categoryId ? Number(categoryId) : undefined,
                brand: brandId || undefined,
                onSale: onSale
              })} className="border border-tertiary/40 rounded-lg px-4 py-2 focus:ring-2 focus:ring-tertiary focus:border-transparent bg-primary text-tertiary">
                <option value="desc">High to Low</option>
                <option value="asc">Low to High</option>
              </select>
              <div className="flex items-center gap-2 border border-tertiary rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-tertiary text-primary' : 'text-white hover:bg-tertiary/20'}`} title="Grid view"><Grid className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-tertiary text-primary' : 'text-white hover:bg-tertiary/20'}`} title="List view"><List className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductGrid 
            products={products} 
            loading={loading} 
            error={error} 
            variant={viewMode} 
            columns={viewMode === 'list' ? 1 : 4} 
            onViewDetails={(p) => { setSelectedProduct(p); setModalOpen(true); }} 
          />
        </div>
        
      </section>
      <ProductDetailsModal product={selectedProduct} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}




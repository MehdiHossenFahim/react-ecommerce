import React, { useState, useEffect, useMemo } from 'react';
import { fetchAllProducts, fetchCategories } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import ProductGridSkeleton from '../components/products/ProductSkeleton';
import FilterBar from '../components/products/FilterBar';
import { AlertCircle, RefreshCw, ShoppingBag, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Load products and categories on mount
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetchAllProducts(),
        fetchCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error('API Fetch error:', err);
      setError(err.message || 'Unable to connect to the store API. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter and sort products using useMemo for high performance
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search by name
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((p) => p.title.toLowerCase().includes(query));
    }

    // 2. Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Price Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-high') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white mb-10 p-8 sm:p-12 shadow-2xl">
        {/* Background glow graphics */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold mb-4 border border-white/15">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Discover The Trendiest Catalog 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
            Curated Quality for Your Everyday Lifestyle.
          </h1>
          <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed mb-6">
            Shop the latest fashion, high-tech electronics, and fine jewelry with instant cart sync, real-time filters, and guaranteed fast shipping.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#products-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-900 font-extrabold text-sm hover:bg-indigo-50 transition shadow-lg shadow-black/10 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Catalog</span>
            </a>
            <div className="flex items-center gap-6 text-xs text-indigo-200">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> 20+ Top Brands
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" /> Verified Authentic
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section id="products-section" className="scroll-mt-24">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Products
            </h2>
            <p className="text-sm text-slate-500">
              Browse, filter by category, or search for your favorite essentials.
            </p>
          </div>
        </div>

        {/* Search, Filter & Sort Component */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
          totalResults={filteredProducts.length}
          onResetFilters={handleResetFilters}
        />

        {/* Loading State */}
        {isLoading && <ProductGridSkeleton count={8} />}

        {/* Error State */}
        {!isLoading && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-xl mx-auto my-12">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-rose-900 mb-2">
              Failed to Load Products
            </h3>
            <p className="text-sm text-rose-700 mb-6">{error}</p>
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Empty Filter / Search Result State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              No products found
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              We couldn't find any products matching your current filters or search term.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, SlidersHorizontal, X, ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProductCard } from '../components/ui/ProductCard';
import { Button, Badge } from '../components/ui/Button';
import { products } from '../data/products';
import { clsx } from "clsx";

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [itemsToShow, setItemsToShow] = useState(12);

  // Filter States
  const [filters, setFilters] = useState({
    gender: searchParams.get('gender') || 'all',
    category: searchParams.get('category')?.split(',') || [],
    priceRange: [0, 10000],
    sizes: [],
    colors: [],
    tags: searchParams.get('tag') ? [searchParams.get('tag')] : []
  });

  useEffect(() => {
    // Sync filters with URL
    setFilters(prev => ({
      ...prev,
      gender: searchParams.get('gender') || 'all',
      tags: searchParams.get('tag') ? [searchParams.get('tag')] : []
    }));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const genderMatch = filters.gender === 'all' || product.gender === filters.gender || product.gender === 'unisex';
      const categoryMatch = filters.category.length === 0 || filters.category.includes(product.category);
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const sizeMatch = filters.sizes.length === 0 || product.sizes.some(s => filters.sizes.includes(s));
      const tagMatch = filters.tags.length === 0 || 
        (filters.tags.includes('new') && product.isNew) || 
        (filters.tags.includes('sale') && product.isSale);
      
      return genderMatch && categoryMatch && priceMatch && sizeMatch && tagMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.isNew ? 1 : -1;
      return 0;
    });
  }, [filters, sortBy]);

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const clearAllFilters = () => {
    setFilters({
      gender: 'all',
      category: [],
      priceRange: [0, 10000],
      sizes: [],
      colors: [],
      tags: []
    });
    setSearchParams({});
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24 container mx-auto px-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <nav className="flex mb-4 gap-2 text-[10px] font-bold tracking-widest uppercase text-violet-400">
              <Link to="/">Home</Link> / <span className="text-navy-900">Shop All</span>
            </nav>
            <h1 className="font-display text-5xl font-bold text-navy-900">Explore Collection</h1>
            <p className="font-body text-gray-500 mt-2">Showing {filteredProducts.length} premium pieces</p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 md:flex-initial flex items-center justify-center gap-3 px-6 h-12 border border-violet-100 rounded-lg font-body text-sm font-bold text-navy-900 hover:bg-violet-50 transition-all"
            >
              <Filter size={18} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              {(filters.category.length + filters.sizes.length + filters.tags.length > 0) && (
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-violet-800 text-white text-[10px]">
                  {filters.category.length + filters.sizes.length + filters.tags.length}
                </span>
              )}
            </button>
            <div className="relative group flex-1 md:flex-initial">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-6 h-12 border border-violet-100 rounded-lg font-body text-sm font-bold text-navy-900 pr-12 focus:outline-none focus:ring-1 focus:ring-violet-400"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-violet-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-12 relative items-start">
          {/* filters Sidebar (Desktop) */}
          <aside className={clsx(
            "w-72 sticky top-32 lg:block transition-all duration-300",
            showFilters ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12 pointer-events-none w-0 overflow-hidden"
          )}>
            <div className="flex flex-col gap-10">
              {/* Gender */}
              <div>
                <h4 className="font-body text-xs font-bold uppercase tracking-widest text-navy-900 mb-6">Gender</h4>
                <div className="flex flex-col gap-3">
                  {['all', 'men', 'women', 'unisex'].map(g => (
                    <label key={g} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="gender" 
                        checked={filters.gender === g}
                        onChange={() => setFilters(prev => ({ ...prev, gender: g }))}
                        className="w-4 h-4 text-violet-800 border-violet-200 focus:ring-violet-800" 
                      />
                      <span className="font-body text-sm text-gray-600 group-hover:text-violet-800 capitalize">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h4 className="font-body text-xs font-bold uppercase tracking-widest text-navy-900 mb-6">Category</h4>
                <div className="flex flex-col gap-3">
                  {['tops', 'bottoms', 'dresses', 'outerwear', 'accessories', 'shoes'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={filters.category.includes(cat)}
                        onChange={() => toggleFilter('category', cat)}
                        className="w-4 h-4 rounded text-violet-800 border-violet-200 focus:ring-violet-800" 
                      />
                      <span className="font-body text-sm text-gray-600 group-hover:text-violet-800 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="font-body text-xs font-bold uppercase tracking-widest text-navy-900 mb-6">Sizes</h4>
                <div className="grid grid-cols-4 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', '26', '28', '30', '32', '34', '36', 'OS'].map(size => (
                    <button
                      key={size}
                      onClick={() => toggleFilter('sizes', size)}
                      className={clsx(
                        "h-10 rounded border font-body text-[10px] font-bold flex items-center justify-center transition-all",
                        filters.sizes.includes(size) ? "bg-violet-800 text-white border-violet-800 shadow-md" : "border-violet-100 text-navy-900 hover:border-violet-400"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-body text-xs font-bold uppercase tracking-widest text-navy-900 mb-6">Price Range</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                  className="w-full accent-violet-800"
                />
                <div className="flex justify-between mt-4 font-body text-xs font-semibold text-gray-500">
                  <span>₹0</span>
                  <span>₹{filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-3 border-t border-violet-50 pt-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={filters.tags.includes('new')}
                    onChange={() => toggleFilter('tags', 'new')}
                    className="w-4 h-4 rounded text-violet-800 border-violet-200 focus:ring-violet-800" 
                  />
                  <span className="font-body text-sm font-bold text-navy-900 group-hover:text-violet-800">New Arrivals</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={filters.tags.includes('sale')}
                    onChange={() => toggleFilter('tags', 'sale')}
                    className="w-4 h-4 rounded text-violet-800 border-violet-200 focus:ring-violet-800" 
                  />
                  <span className="font-body text-sm font-bold text-red-600 group-hover:text-red-700">On Sale</span>
                </label>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-6 flex gap-2 border-dashed"
                onClick={clearAllFilters}
              >
                Clear All filters
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-violet-100 rounded-3xl">
                <Sparkles className="text-violet-200 mb-6" size={64} />
                <h3 className="font-display text-4xl font-bold text-navy-900 mb-4">No Matches Found</h3>
                <p className="font-body text-gray-500 text-center max-w-md">
                  We couldn't find any products matching your filters. Try adjusting your search criteria.
                </p>
                <Button variant="primary" className="mt-8 px-10" onClick={clearAllFilters}>
                  Clear All filters
                </Button>
              </div>
            ) : (
              <>
                <div className={clsx(
                  "grid gap-x-8 gap-y-12 transition-all duration-500",
                  showFilters ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                )}>
                  {filteredProducts.slice(0, itemsToShow).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {itemsToShow < filteredProducts.length && (
                  <div className="mt-24 flex justify-center">
                    <Button 
                      variant="primary" 
                      className="px-12 h-14 uppercase tracking-[0.2em] font-bold text-xs"
                      onClick={() => setItemsToShow(prev => prev + 12)}
                    >
                      Load More Items
                    </Button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

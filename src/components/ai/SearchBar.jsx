import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight, Loader2, History, TrendingUp, Package } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { useAI } from '../../hooks/useAI';
import { clsx } from "clsx";

export const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const { loading: aiLoading, getSearchIntent } = useAI();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    // Basic local filtering
    if (query.length > 2) {
      const found = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4);
      setResults(found);
    } else {
      setResults([]);
      setAiSuggestions([]);
    }
  }, [query]);

  const handleAISearch = async (e) => {
    if (e.key === 'Enter' && query.length > 3) {
      const intent = await getSearchIntent(query);
      if (Array.isArray(intent)) {
        const aiFound = products.filter(p => intent.includes(p.category)).slice(0, 3);
        setAiSuggestions(aiFound);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-white lg:bg-navy-900/40 lg:backdrop-blur-xl flex justify-center items-start lg:pt-32"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-4xl bg-white lg:rounded-3xl shadow-4xl overflow-hidden flex flex-col h-full lg:h-max lg:max-h-[80vh]"
          >
            {/* Search Input Area */}
            <div className="p-8 border-b border-violet-50 flex items-center gap-6">
              <Search className="text-violet-800 shrink-0" size={32} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleAISearch}
                placeholder="Search pieces, brands, or ask 'What should I wear for a summer wedding?'"
                className="flex-1 font-display text-3xl font-black text-navy-900 placeholder:text-gray-200 outline-none h-16"
              />
              <button 
                onClick={onClose}
                className="p-3 rounded-full hover:bg-violet-50 text-gray-400 hover:text-navy-900 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-8">
              {!query && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                  <div>
                    <h4 className="font-body text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6 flex items-center gap-3">
                      <TrendingUp size={14} /> Trending Searches
                    </h4>
                    <div className="space-y-4">
                      {['Digital Lavender Blazer', 'Wedding Collection', 'Sustainable Essentials', 'Oversized Tees'].map(t => (
                        <button key={t} onClick={() => setQuery(t)} className="block font-display text-2xl font-bold text-navy-900 hover:text-violet-800 transition-colors">{t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-body text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6 flex items-center gap-3">
                      <History size={14} /> Quick Collections
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {['Summer', 'Office', 'Party', 'Casual', 'Accessories'].map(c => (
                        <Link key={c} to={`/shop?tag=${c.toLowerCase()}`} onClick={onClose} className="px-5 py-2.5 rounded-full border border-violet-100 font-body text-xs font-bold text-navy-900 hover:bg-violet-800 hover:text-white transition-all">{c}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {results.length > 0 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <h4 className="font-body text-[10px] font-black uppercase tracking-widest text-violet-400 border-b border-violet-50 pb-4">Top Matches</h4>
                  {results.map(p => (
                    <Link key={p.id} to={`/product/${p.id}`} onClick={onClose} className="flex items-center gap-6 group">
                      <div className="w-16 h-20 bg-gray-50 rounded-sm overflow-hidden shrink-0 shadow-lg border border-black/5">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1">
                        <p className="font-display text-xl font-bold text-navy-900 group-hover:text-violet-800 transition-colors mb-1">{p.name}</p>
                        <p className="font-body text-[10px] font-black uppercase text-gray-400 tracking-widest">{p.brand} • {formatPrice(p.price)}</p>
                      </div>
                      <ArrowRight size={20} className="text-gray-100 group-hover:text-violet-800 transition-colors" />
                    </Link>
                  ))}
                  <Link to={`/shop?q=${query}`} onClick={onClose} className="block w-full py-4 text-center font-body text-xs font-black uppercase tracking-widest text-violet-800 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors">
                    View all {query} results
                  </Link>
                </div>
              )}

              {aiLoading && (
                <div className="py-12 flex flex-col items-center text-center gap-6">
                  <Loader2 className="animate-spin text-violet-800" size={32} />
                  <p className="font-body text-gray-400 uppercase text-[10px] font-bold tracking-[0.3em]">AI searching your style vibe...</p>
                </div>
              )}

              {aiSuggestions.length > 0 && !aiLoading && (
                <div className="mt-12 p-8 bg-violet-50 rounded-3xl border border-violet-100 animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-violet-800 rounded-lg shadow-xl"><Sparkles size={16} className="text-white" /></div>
                    <h4 className="font-display text-xl font-bold text-navy-900 italic">AI Curated Selection</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {aiSuggestions.map(p => (
                       <Link key={p.id} to={`/product/${p.id}`} onClick={onClose} className="flex flex-col gap-4 group">
                        <div className="h-48 aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-sm border border-black/5">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <p className="font-display font-bold text-navy-900 line-clamp-1">{p.name}</p>
                       </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hint Footer */}
            <div className="p-6 bg-gray-50/50 flex justify-between items-center px-8 border-t border-violet-50/50">
               <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-300">
                  <span className="flex items-center gap-2"><kbd className="px-1.5 py-0.5 bg-white border border-gray-100 rounded text-navy-900">ESC</kbd> to close</span>
                  <span className="flex items-center gap-2"><kbd className="px-1.5 py-0.5 bg-white border border-gray-100 rounded text-navy-900">ENTER</kbd> for AI</span>
               </div>
               <div className="text-[10px] font-bold text-violet-300 uppercase tracking-widest flex items-center gap-2">
                 Powered by <span className="text-violet-800">DripNest Brain</span> <Sparkles size={10} />
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

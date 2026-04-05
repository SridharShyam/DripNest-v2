import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2, RefreshCcw } from 'lucide-react';
import { useAI } from '../../hooks/useAI';
import { Button } from '../ui/Button';
import { products } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';

export const StyleAdvisor = () => {
  const [vibe, setVibe] = useState('');
  const { loading, response, getStyleAdvice } = useAI();
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const handleAdvice = async (e) => {
    e.preventDefault();
    if (!vibe.trim()) return;

    await getStyleAdvice(vibe);
    
    // Simple mock logic to pick 3 random products based on vibe
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setRecommendedProducts(shuffled.slice(0, 3));
  };

  return (
    <div className="bg-gradient-to-br from-violet-200 to-violet-50 rounded-2xl p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-400/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-6 p-4 bg-white/50 backdrop-blur-md rounded-full shadow-lg"
        >
          <Sparkles className="text-violet-800" size={32} />
        </motion.div>
        
        <h2 className="font-display text-4xl font-bold text-navy-900 mb-4 flex items-center gap-4">
          Meet Your AI Style Advisor <Sparkles className="text-violet-500 animate-pulse" />
        </h2>
        <p className="font-body text-navy-900/60 mb-10 text-lg">
          Describe your vibe — from "casual Friday in Mumbai" to "minimalist evening in Berlin" — and our AI will build your perfect look.
        </p>

        <form onSubmit={handleAdvice} className="w-full flex flex-col gap-4">
          <textarea
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            placeholder="e.g. I need a sophisticated outfit for a rooftop cocktail party..."
            className="w-full h-32 p-6 rounded-xl border-2 border-violet-200 focus:border-violet-600 focus:ring-0 transition-all font-body text-lg resize-none shadow-sm bg-white/80"
          />
          <Button 
            disabled={loading || !vibe.trim()} 
            className="w-full lg:w-max mx-auto px-12 h-14 text-lg font-bold"
            variant="primary"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" size={20} />}
            {loading ? "Styling your look..." : "Get Recommendations"}
          </Button>
        </form>

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 w-full text-left"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-2xl font-bold text-violet-800">Your Custom Style Guide</h3>
                  <button onClick={() => { setVibe(''); setRecommendedProducts([]); }} className="text-violet-400 hover:text-violet-800 transition-colors">
                    <RefreshCcw size={18} />
                  </button>
                </div>
                
                <div className="prose prose-violet max-w-none font-body text-lg text-navy-900/80 mb-10 whitespace-pre-wrap leading-relaxed">
                  {response}
                </div>

                <div className="h-px bg-violet-100 mb-10" />

                <h4 className="font-display text-xl font-bold text-navy-900 mb-6">Recommended for You</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

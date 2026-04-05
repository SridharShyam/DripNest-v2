import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Zap, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProductCard } from '../components/ui/ProductCard';
import { Button, Badge } from '../components/ui/Button';
import { StyleAdvisor } from '../components/ai/StyleAdvisor';
import { products } from '../data/products';
import { useNotificationStore } from '../store/userStore';
import toast from 'react-hot-toast';

export const Home = () => {
  const [email, setEmail] = useState('');
  const addAlert = useNotificationStore((state) => state.addAlert);

  const newArrivals = products.filter(p => p.isNew).slice(0, 8);
  const trending = products.filter(p => !p.isNew && p.rating >= 4.7).slice(0, 6);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addAlert({ email, productId: null, productName: 'General Drop' });
    toast.success("You're on the list! We'll notify you of new drops.", {
      style: { background: '#3C3489', color: '#fff' }
    });
    setEmail('');
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex overflow-hidden">
        {/* Left Panel - Men */}
        <Link 
          to="/shop?gender=men" 
          className="relative flex-1 group overflow-hidden border-r border-white/10"
        >
          <img 
            src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=80" 
            alt="Men's Fashion"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 text-white z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center"
            >
              <h2 className="font-display text-8xl font-bold tracking-tighter mb-6">Moscot</h2>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black px-12 h-16 uppercase tracking-[0.3em] text-xs font-black">
                Explore Men
              </Button>
            </motion.div>
          </div>
        </Link>

        {/* Right Panel - Women */}
        <Link 
          to="/shop?gender=women" 
          className="relative flex-1 group overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" 
            alt="Women's Fashion"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 text-white z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-center"
            >
              <h2 className="font-display text-8xl font-bold tracking-tighter mb-6">Aura</h2>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black px-12 h-16 uppercase tracking-[0.3em] text-xs font-black">
                Explore Women
              </Button>
            </motion.div>
          </div>
        </Link>

        {/* Center Logo Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-20">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'backOut' }}
            className="flex flex-col items-center gap-4 py-8 px-12 bg-black/10 backdrop-blur-md rounded-full border border-white/20"
          >
            <h1 className="font-display text-8xl font-black text-white tracking-widest leading-none">DN</h1>
          </motion.div>
        </div>

        {/* Text Ticker */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-3xl border-t border-white/10 text-white py-4 overflow-hidden z-20">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-20 font-body text-[10px] font-black uppercase tracking-[0.5em] items-center"
          >
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className="flex items-center gap-20">
                <span>Summer Drop 2024</span>
                <Sparkles size={12} className="text-violet-400" />
                <span>Limited Edition Essentials</span>
                <Sparkles size={12} className="text-violet-400" />
                <span>Global Tracked Shipping</span>
                <Sparkles size={12} className="text-violet-400" />
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Editorial Cut (Pop-up images section) */}
      <section id="editorial-cut" className="py-32 overflow-hidden bg-white relative">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          {/* Female Pop-up */}
          <motion.div 
            initial={{ x: -100, opacity: 0, rotate: -3 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="relative group"
          >
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-4xl border border-violet-50 bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80" 
                alt="Editorial Female"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <motion.div 
               initial={{ y: 80, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="absolute -bottom-16 -right-12 bg-navy-900 text-white p-12 rounded-[2.5rem] max-w-xs shadow-4xl backdrop-blur-xl border border-white/10"
            >
               <h3 className="font-display text-4xl font-bold mb-4 tracking-tight">Aura Muse</h3>
               <p className="font-body text-sm text-gray-400 leading-relaxed mb-6 opacity-80">Ethereal silks and structured linens. A collection for the visionaries.</p>
               <Link to="/shop?gender=women" className="group flex items-center gap-3 font-body text-[10px] font-black uppercase tracking-[0.3em] text-violet-400">
                 Explore Aura
                 <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
               </Link>
            </motion.div>
          </motion.div>

          {/* Male Pop-up */}
          <motion.div 
            initial={{ x: 100, opacity: 0, rotate: 3 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            className="relative group mt-48 md:mt-0"
          >
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-4xl border border-violet-50 bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&w=1200&q=80" 
                alt="Editorial Male"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <motion.div 
               initial={{ y: 80, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="absolute -bottom-16 -left-12 bg-violet-800 text-white p-12 rounded-[2.5rem] max-w-xs shadow-4xl backdrop-blur-xl border border-white/10"
            >
               <h3 className="font-display text-4xl font-bold mb-4 tracking-tight">Moscot Core</h3>
               <p className="font-body text-sm text-violet-100 leading-relaxed mb-6 opacity-80">Precision tailored essentials for the modern vanguard. Rugged refinement.</p>
               <Link to="/shop?gender=men" className="group flex items-center gap-3 font-body text-[10px] font-black uppercase tracking-[0.3em] text-white">
                 Shop Moscot
                 <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
               </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 text-[18vw] font-display font-black text-violet-50/30 whitespace-nowrap pointer-events-none select-none">
          COLLECTIVE
        </div>
      </section>

      {/* Featured Categories (Chips) */}
      <section className="py-12 border-b border-violet-50 sticky top-16 bg-white z-40 shadow-sm">
        <div className="container mx-auto px-6 overflow-x-auto no-scrollbar flex gap-4">
          {['Essentials', 'Outerwear', 'Tailoring', 'Accessories', 'Streetwear', 'Formal'].map(cat => (
            <Link 
              key={cat}
              to={`/shop?category=${cat.toLowerCase()}`}
              className="whitespace-nowrap px-10 py-4 rounded-full border border-violet-100 font-body text-[10px] font-black uppercase tracking-[0.2em] text-navy-900 transition-all hover:bg-navy-900 hover:text-white hover:border-navy-900 shadow-sm"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <Badge variant="outline" className="mb-6 px-6">SEASON SURGE 2024</Badge>
            <h2 className="font-display text-7xl font-bold text-navy-900 leading-tight">Vanguard Pieces</h2>
          </div>
          <Link to="/shop?tag=new" className="flex items-center gap-4 group">
            <span className="font-body text-xs font-black uppercase tracking-[0.3em] text-violet-800">Visit Lookbook</span>
            <div className="w-12 h-12 rounded-full border border-violet-100 flex items-center justify-center group-hover:bg-violet-800 group-hover:text-white transition-all duration-500">
               <ArrowRight size={20} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Style Advisor Section */}
      <section className="py-32 bg-violet-50 mx-6 rounded-[3rem] overflow-hidden">
        <StyleAdvisor />
      </section>

      {/* Trust Badges */}
      <section className="py-32 border-y border-violet-50">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-3xl bg-violet-50 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-12 shadow-inner">
              <Truck className="text-violet-800" size={32} />
            </div>
            <h4 className="font-display text-2xl font-bold mb-3">Prime Cargo</h4>
            <p className="font-body text-sm text-gray-400 uppercase tracking-widest font-bold">24hr Departure</p>
          </div>
          <div className="flex flex-col items-center text-center group">
             <div className="w-20 h-20 rounded-3xl bg-violet-50 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-12 shadow-inner">
              <ShieldCheck className="text-violet-800" size={32} />
            </div>
            <h4 className="font-display text-2xl font-bold mb-3">Vault Security</h4>
            <p className="font-body text-sm text-gray-400 uppercase tracking-widest font-bold">Tokenized Pay</p>
          </div>
          <div className="flex flex-col items-center text-center group">
             <div className="w-20 h-20 rounded-3xl bg-violet-50 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-12 shadow-inner">
              <RotateCcw className="text-violet-800" size={32} />
            </div>
            <h4 className="font-display text-2xl font-bold mb-3">Infinite Refund</h4>
            <p className="font-body text-sm text-gray-400 uppercase tracking-widest font-bold">No-Ask Policy</p>
          </div>
          <div className="flex flex-col items-center text-center group">
             <div className="w-20 h-20 rounded-3xl bg-violet-50 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-12 shadow-inner">
              <Zap className="text-violet-800" size={32} />
            </div>
            <h4 className="font-display text-2xl font-bold mb-3">Silk Atelier</h4>
            <p className="font-body text-sm text-gray-400 uppercase tracking-widest font-bold">Egyptian Grade</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-40 bg-navy-900 text-white relative flex items-center">
        <div className="container mx-auto px-6 flex flex-col items-center text-center max-w-4xl relative z-10">
          <Badge variant="outline" className="mb-10 px-8 border-violet-400 text-violet-400">THE PRIVILEGE CLUB</Badge>
          <h2 className="font-display text-[8vw] md:text-7xl font-bold mb-10 leading-tight">Join the Vibe.</h2>
          <form onSubmit={handleSubscribe} className="w-full flex flex-col md:flex-row gap-6 mb-12">
            <input 
              type="email" 
              placeholder="Enter your email for the secret link" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-10 h-20 font-body text-xl focus:bg-white/10 focus:border-violet-400 outline-none transition-all"
              required
            />
            <Button size="lg" className="h-20 px-16 uppercase tracking-[0.3em] font-black text-sm shadow-xl shadow-violet-900/40">
              Notify Me
            </Button>
          </form>
          <p className="font-body text-xs text-gray-500 uppercase tracking-widest">Only 1 email per week. Guaranteed privacy.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

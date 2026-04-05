import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';
import { clsx } from "clsx";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setSearchOpen, toggleCart } = useUIStore();
  const location = useLocation();
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/shop?gender=men' },
    { name: 'Women', path: '/shop?gender=women' },
    { name: 'New Arrivals', path: '/shop?tag=new' },
    { name: 'Sale', path: '/shop?tag=sale' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "bg-white/80 backdrop-blur-2xl shadow-xl h-20 py-4" 
            : "bg-transparent h-28 py-8"
        )}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <button 
            className="lg:hidden" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} className={clsx(isScrolled || location.pathname !== '/' ? "text-navy-900" : "text-white")} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className={clsx(
              "font-display text-4xl font-black tracking-tighter transition-all duration-500 group-hover:tracking-widest",
              isScrolled || location.pathname !== '/' ? "text-violet-800" : "text-white"
            )}>
              DRIPNEST
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "font-body text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group overflow-hidden py-1",
                  isScrolled || location.pathname !== '/' ? "text-navy-900" : "text-white"
                )}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-violet-800 transition-transform duration-500 -translate-x-[101%] group-hover:translate-x-0" />
              </Link>
            ))}
            <Link
              to="/style-advisor"
              className={clsx(
                "flex items-center gap-2 font-body text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 px-6 py-2.5 rounded-full border shadow-inner",
                isScrolled || location.pathname !== '/' 
                  ? "text-white bg-violet-800 border-violet-800 hover:bg-navy-900 hover:border-navy-900" 
                  : "text-white border-white/40 bg-white/10 backdrop-blur hover:bg-white hover:text-navy-900 hover:border-white"
              )}
            >
              <Sparkles size={14} />
              AI Studio
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 lg:gap-8">
            <button 
              onClick={() => setSearchOpen(true)}
              className={clsx(
                "transition-all duration-300 hover:scale-110",
                isScrolled || location.pathname !== '/' ? "text-navy-900" : "text-white"
              )}
            >
              <Search size={22} />
            </button>

            <Link 
              to="/wishlist" 
              className={clsx(
                "relative transition-all duration-300 hover:scale-110",
                isScrolled || location.pathname !== '/' ? "text-navy-900" : "text-white"
              )}
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-black text-white shadow-xl">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button 
              onClick={toggleCart}
              className={clsx(
                "relative transition-all duration-300 hover:scale-110",
                isScrolled || location.pathname !== '/' ? "text-navy-900" : "text-white"
              )}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-violet-800 text-[8px] font-black text-white shadow-xl border border-white/20">
                  {cartCount}
                </span>
              )}
            </button>
            
            <Link 
              to="/profile" 
              className={clsx(
                "p-2 rounded-full border border-transparent transition-all duration-500",
                isScrolled || location.pathname !== '/' 
                  ? "text-navy-900 hover:bg-violet-50 hover:border-violet-100" 
                  : "text-white hover:bg-white/10 hover:border-white/20"
              )}
            >
              <User size={22} />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Slide-in */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white p-8 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display text-3xl font-bold text-violet-800">DRIPNEST</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-navy-900">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-display text-4xl text-navy-900 hover:text-violet-800 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-violet-100 my-4" />
              <Link to="/profile" className="flex items-center gap-4 text-xl font-body">
                <User size={24} /> Account
              </Link>
              <Link to="/track-order" className="flex items-center gap-4 text-xl font-body">
                <Search size={24} /> Track Order
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();
  const shipping = total > 999 ? 0 : 149;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Area */}
          <div className="flex-1">
            <h1 className="font-display text-5xl font-bold text-navy-900 mb-4">Your Shopping Bag</h1>
            <p className="font-body text-gray-500 mb-12 italic">You have {items.length} premium pieces in your curated bag.</p>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-violet-100 rounded-3xl">
                <div className="w-24 h-24 rounded-full bg-violet-50 flex items-center justify-center mb-6 text-violet-200">
                  <ShoppingBag size={48} />
                </div>
                <h3 className="font-display text-3xl font-bold text-navy-900 mb-4">Your bag is empty.</h3>
                <p className="font-body text-gray-500 mb-12 max-w-sm text-center">Looks like you haven't added any luxury pieces yet. Explore our curated collections to get started.</p>
                <Link to="/shop">
                  <Button variant="primary" className="px-16 h-16 uppercase tracking-[0.2em] font-black">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-10">
                {items.map((item) => (
                  <motion.div 
                    layout
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex flex-col md:flex-row gap-8 pb-10 border-b border-violet-50 group"
                  >
                    <Link to={`/product/${item.id}`} className="block w-full md:w-48 aspect-[3/4] bg-gray-50 rounded-sm overflow-hidden shrink-0 shadow-lg border border-black/5">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </Link>
                    
                    <div className="flex-1 flex flex-col pt-2">
                       <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-body text-[10px] font-black uppercase tracking-[0.3em] text-violet-400 mb-1">{item.brand}</p>
                          <Link to={`/product/${item.id}`} className="font-display text-3xl font-bold text-navy-900 hover:text-violet-800 transition-colors leading-tight block">{item.name}</Link>
                        </div>
                        <button onClick={() => removeItem(item.id, item.size, item.color)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                          <Trash2 size={20} />
                        </button>
                       </div>

                       <div className="flex gap-6 mb-8 mt-4 font-body text-xs font-bold uppercase tracking-widest text-gray-500">
                         <span className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">SIZE: {item.size}</span>
                         <span className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">COLOR: <div className="w-3 h-3 rounded-full border border-black/5" style={{ backgroundColor: item.color }} /></span>
                       </div>

                       <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center w-36 h-12 border border-violet-100 rounded-lg overflow-hidden p-1">
                          <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="flex-1 h-full flex items-center justify-center hover:bg-violet-50 text-navy-900"><Minus size={14} /></button>
                          <span className="flex-1 text-center font-body font-black text-navy-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="flex-1 h-full flex items-center justify-center hover:bg-violet-50 text-navy-900"><Plus size={14} /></button>
                        </div>
                        <div className="text-right">
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
                           <p className="font-display text-2xl font-black text-navy-900">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          {items.length > 0 && (
            <aside className="w-full lg:w-96 flex flex-col gap-8 h-max sticky top-32">
              <div className="bg-violet-50 rounded-3xl p-8 shadow-inner border border-violet-100">
                <h3 className="font-display text-2xl font-bold text-navy-900 mb-8">Summary</h3>
                <div className="space-y-4 mb-8 font-body font-medium text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-navy-900">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-navy-900">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="text-navy-900">{formatPrice(total * 0.12)}</span>
                  </div>
                  <div className="h-px bg-violet-200 mt-4" />
                  <div className="flex justify-between text-2xl font-display font-black text-navy-900 pt-2">
                    <span>Order Total</span>
                    <span>{formatPrice(total + (total * 0.12) + shipping)}</span>
                  </div>
                </div>

                <Link to="/checkout" className="block w-full">
                  <Button size="lg" className="w-full h-16 uppercase tracking-[0.2em] font-black text-sm shadow-xl">
                    Checkout Now
                    <ArrowRight size={20} className="ml-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <p className="text-[10px] text-center mt-6 text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                  Complimentary luxury packaging with every signature order. Safe & tracked delivery guaranteed.
                </p>
              </div>

              {/* Need help ? */}
              <div className="bg-navy-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-max p-4 opacity-5 pointer-events-none transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-125">
                  <ShoppingBag size={140} />
                 </div>
                 <h4 className="font-display text-xl font-bold mb-4 relative z-10">Need any assistance?</h4>
                 <p className="font-body text-xs text-violet-200 opacity-80 mb-6 relative z-10 leading-relaxed">Our fashion concierge is available 24/7 to help you with size and fit.</p>
                 <Link to="#" className="font-body text-xs font-black border-b border-violet-400 pb-1 hover:text-violet-400 transition-all uppercase tracking-widest relative z-10">Chat with us</Link>
              </div>
            </aside>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

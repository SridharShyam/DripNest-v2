import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2, Tag, ChevronLeft } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatters';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const total = getTotal();
  const finalTotal = discountApplied ? total * 0.9 : total;
  const shipping = total > 999 ? 0 : 149;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white shadow-3xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-violet-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-violet-800" />
                <h2 className="font-display text-2xl font-bold text-navy-900">Your Bag ({items.length})</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 rounded-full hover:bg-violet-50 transition-colors text-navy-900"
              >
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-8 py-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div className="w-20 h-20 rounded-full bg-violet-50 flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-violet-200" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">Your bag is empty.</h3>
                  <p className="font-body text-gray-500 mb-8">Start adding pieces to your digital closet!</p>
                  <Button variant="primary" onClick={onClose} className="px-10">Start Browsing</Button>
                </div>
              ) : (
                <div className="space-y-8 py-4">
                  {items.map((item) => (
                    <motion.div 
                      key={`${item.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-6 group"
                    >
                      <Link to={`/product/${item.id}`} onClick={onClose} className="w-24 aspect-[3/4] bg-gray-50 rounded-sm overflow-hidden shrink-0 shadow-sm border border-black/5">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1">
                          <Link to={`/product/${item.id}`} onClick={onClose} className="font-display font-bold text-lg text-navy-900 hover:text-violet-800 transition-colors line-clamp-1">{item.name}</Link>
                          <button onClick={() => removeItem(item.id, item.size, item.color)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="font-body text-xs font-bold text-violet-400 uppercase tracking-widest mb-4">
                          Size: {item.size} • <span className="inline-block w-2 h-2 rounded-full border border-black/10 align-middle" style={{ backgroundColor: item.color }} /> Color
                        </p>
                        
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-4 border border-violet-50 rounded-sm px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="p-1 hover:text-violet-800"><Minus size={12} /></button>
                            <span className="font-body text-sm font-black w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="p-1 hover:text-violet-800"><Plus size={12} /></button>
                          </div>
                          <span className="font-body font-bold text-navy-900">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-violet-50 bg-gradient-to-b from-white to-violet-50">
                <div className="mb-6">
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      placeholder="Promo Code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-white border border-violet-100 rounded-sm px-4 h-12 text-sm font-body focus:outline-none focus:border-violet-800"
                    />
                    <Button 
                      variant="outline" 
                      className="px-6 h-12"
                      onClick={() => {
                        if (promoCode === 'DRIP10') setDiscountApplied(true);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                  {discountApplied && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 p-2 rounded">
                      <Tag size={12} /> PROMO DRIP10 APPLIED (-10%)
                    </motion.div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-body text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-sm font-body text-green-600">
                      <span>Discount (10%)</span>
                      <span>-{formatPrice(total * 0.1)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-body text-gray-500">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="h-px bg-violet-100 my-2" />
                  <div className="flex justify-between text-xl font-display font-black text-navy-900">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal + shipping)}</span>
                  </div>
                </div>

                <Link to="/checkout" onClick={onClose} className="block w-full">
                  <Button size="lg" className="w-full h-16 uppercase tracking-[0.2em] font-black text-sm group">
                    Secure Checkout
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="ml-3">
                      <ArrowRight size={20} />
                    </motion.span>
                  </Button>
                </Link>
                <button 
                  onClick={onClose} 
                  className="w-full mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-violet-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

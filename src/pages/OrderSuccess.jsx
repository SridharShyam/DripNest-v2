import { motion } from 'framer-motion';
import { Check, ArrowRight, ShoppingBag, Search, Package, MapPin, Truck } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button, Badge } from '../components/ui/Button';
import { formatPrice } from '../utils/formatters';

export const OrderSuccess = () => {
  const { state } = useLocation();
  const { orderId, total, items, address } = state || { 
    orderId: 'DN-921023', total: 3897, 
    items: [], address: { firstName: 'Shyam', lastName: 'S', city: 'Mumbai', pincode: '400063' } 
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-40 pb-24 container mx-auto px-6 flex flex-col items-center">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="w-32 h-32 rounded-full bg-green-500 text-white flex items-center justify-center mb-12 shadow-2xl relative"
        >
          <Check size={64} strokeWidth={3} />
          {/* Confetti-like elements */}
          {[1, 2, 3, 4, 5, 6].map(i => (
             <motion.div 
               key={i}
               initial={{ x: 0, y: 0, scale: 0 }}
               animate={{ x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200, scale: 1, opacity: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="absolute w-2 h-2 rounded-full bg-violet-400"
             />
          ))}
        </motion.div>

        <h1 className="font-display text-5xl font-black text-navy-900 mb-6 text-center leading-tight">Order Placed Successfully!</h1>
        <p className="font-body text-xl text-gray-500 mb-12 text-center max-w-2xl leading-relaxed">
          Payment gateway coming soon — your order is confirmed! Thank you for choosing <span className="font-bold text-violet-800">DripNest</span>. We're preparing your curated pieces for departure.
        </p>

        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <div className="bg-violet-50 rounded-3xl p-10 shadow-inner border border-violet-100">
             <div className="flex justify-between items-center mb-8">
               <h3 className="font-display text-2xl font-bold text-navy-900">Order Details</h3>
               <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">CONFIRMED</Badge>
             </div>
             <div className="space-y-4 font-body font-medium text-gray-600">
               <div className="flex justify-between">
                 <span>Order ID</span>
                 <span className="font-bold text-navy-900 uppercase tracking-widest">{orderId}</span>
               </div>
               <div className="flex justify-between">
                 <span>Date</span>
                 <span className="font-bold text-navy-900">May 5, 2024</span>
               </div>
               <div className="flex justify-between">
                 <span>Total Amount</span>
                 <span className="font-bold text-violet-800 text-lg">{formatPrice(total)}</span>
               </div>
               <div className="h-px bg-violet-100 my-4" />
               <div className="flex gap-4 items-start">
                 <MapPin className="text-violet-800 shrink-0 mt-1" size={18} />
                 <div>
                   <p className="font-bold text-navy-900">Deliver to</p>
                   <p className="text-sm">{address.firstName} {address.lastName}</p>
                   <p className="text-sm">{address.address1 || 'B-24, Hemant Tower'}, {address.city}, {address.pincode}</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-navy-900 text-white rounded-3xl p-10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-max h-full p-10 opacity-5 pointer-events-none transition-transform group-hover:scale-110 duration-[2000ms]">
                <Package size={200} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-8 relative z-10 flex items-center gap-3">
                <Truck size={24} className="text-violet-400" />
                Next Steps
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4 items-start">
                   <div className="w-8 h-8 rounded-full bg-violet-800/50 flex items-center justify-center shrink-0 font-bold border border-white/20">1</div>
                   <p className="font-body text-sm text-gray-300 leading-relaxed">Our atelier is carefully inspecting and packing your items with signature DripNest packaging.</p>
                </div>
                <div className="flex gap-4 items-start">
                   <div className="w-8 h-8 rounded-full bg-violet-800/50 flex items-center justify-center shrink-0 font-bold border border-white/20">2</div>
                   <p className="font-body text-sm text-gray-300 leading-relaxed">You will receive a tracking link via SMS & email once your package departs Mumbai.</p>
                </div>
                <div className="flex gap-4 items-start">
                   <div className="w-8 h-8 rounded-full bg-violet-800/50 flex items-center justify-center shrink-0 font-bold border border-white/20">3</div>
                   <p className="font-body text-sm text-gray-500 leading-relaxed italic">Stay tuned for some exclusive style tips in your inbox.</p>
                </div>
              </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mb-20">
          <Link to={`/track/${orderId}`} className="flex-1">
            <Button variant="primary" size="lg" className="w-full h-16 uppercase tracking-[0.2em] font-black group">
              Track Order
              <Search size={18} className="ml-3 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full h-16 uppercase tracking-[0.2em] font-black group">
              Keep Shopping
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
